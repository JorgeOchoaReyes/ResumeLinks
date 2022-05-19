import { MyContext } from "src/types";
import{ User }from '../entities/User'; 
import {Resolver, Ctx, Mutation, Arg, Field, ObjectType, Query, FieldResolver, Root} from "type-graphql"; 
import argon2 from 'argon2';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../Util/validateRegister";
import {v4} from 'uuid';
import { sendEmail } from "../Util/sendEmail";
import { mydataSource } from "../dataSource";


@ObjectType()
class FieldError {
    @Field() 
    field: string 

    @Field()
    message: string
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true}) 
    user?:User 
}

@Resolver(User) 
export class UserResolver {
    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() {req}: MyContext) {
        //allows current user to see their own email
        if(req.session.userId === user._id) {
            return user.email
        }
        //if the user is not the one then they can not see the email 
        return null; 
    }

    @Mutation(() => UserResponse) 
    async register(
        @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Ctx() {req}: MyContext
    ): Promise<UserResponse> {

        const errors = validateRegister(options); 

        if(errors) {
            return {errors}; 
        }

        const hashedPassword = await argon2.hash(options.password);

        let user; 
        try {
            //alternative method if issues arise 
            const res = await mydataSource.createQueryBuilder().insert().into(User).values(
                {
                    username: options.username,
                    email: options.email, 
                    password: hashedPassword
                }
            ).returning('*').execute();
            user =  res.raw[0];
        } catch (err) {
            if(err.detail.includes("already exists")) {
                return {
                    errors: [{
                        field: 'username',
                        message: 'Username already exists'
                    }]
                }
            }
            console.log("message: ", err.message); 
        }

        req.session.userId = user._id; 

        console.log(req.session); 
        
        return {user};
    }

    @Mutation(() => UserResponse) 
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req} : MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne(
        usernameOrEmail.includes('@') ? 
         {where: {email: usernameOrEmail}} 
         : 
         {where: {username: usernameOrEmail}});

        if(!user) {
            return {
                errors: [
                    {
                        field: "usernameOrEmail",
                        message: "Username does not exist!",
                    },
                ]
            }
        }

        const valid = await argon2.verify(user.password, password); 
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect password",
                    },
                ]
            }
        }

        let sess = req.session;
        //Helps to persisit login 
        sess!.userId= user._id; 
        return { user }

    }

    @Query(() => User, {nullable: true}) 
    async me(
        @Ctx() {req}: MyContext
    ) {

        if(!req.session.userId) {
            return null; 
        }

        let userid = req.session.userId;
        return await User.findOne({where: {_id: userid}})
    }

    @Mutation(() => Boolean) 
    async logout(
        @Ctx() {req, res} : MyContext
    ){
        let sess = req.session;       
        return new Promise (resolve => sess.destroy((err) => {
            if (err) {
                console.log(err); 
                resolve(false);
                return;
            }
            res.clearCookie(COOKIE_NAME)
            resolve(true);
        })); 

    }

    @Mutation(() => Boolean) 
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redisClient} : MyContext
    ) {
        const user = await User.findOne({where: {email: email}}); 
        if(!user) {
            //do not tell them if the email exist since they can find emails this way
            return true; 
        }

        const token = v4(); //random token

        await redisClient.set(FORGET_PASSWORD_PREFIX + token, user._id, "EX", 1000* 60 * 60 * 24*3); //saving token in redis

        sendEmail(email, `<a href="http://localhost:3000/change-password/${token}"> Reset Password </a>`);

        return true; 
    }

    @Mutation(() => UserResponse)
    async changePassword (
        @Arg('token') token: string, 
        @Arg('newPassword') newPassword: string, 
        @Ctx() {req, redisClient}:MyContext
    ): Promise<UserResponse> {
        if(newPassword.length <= 2) {
            return { errors: [{
                    field: 'password', 
                    message: 'Password too short, must be greater than 2 letters.'
                }]
            }
        }

        //verify token 
        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redisClient.get(FORGET_PASSWORD_PREFIX + token); 

        if(!userId) return {
            errors: [{
                field: "token",
                message: "Token has expired."
            }]
        }

        const userIdParse = parseInt(userId); 
        const user = await User.findOne({where:  {_id: userIdParse}});
        
        if(!user) return {
            errors: [{
                field: "token",
                message: "User no longer exists."
            }]
        }

        User.update({_id: userIdParse}, {
            password: await argon2.hash(newPassword)
        })

        await redisClient.del(key);

        //optional, logs in user after resetting password
        req.session.userId = user._id;

        return {user}; 


    }
    


}