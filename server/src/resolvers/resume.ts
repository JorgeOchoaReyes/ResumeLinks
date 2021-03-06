import {Resolver, Query, Arg,Mutation, Field, InputType, Ctx, ObjectType, UseMiddleware} from "type-graphql"; 
import { MyContext } from "src/types";
import { mydataSource } from "../dataSource";
import { Resume } from "../entities/Resume";
import { User } from "../entities/User";
import { Experience } from "../entities/Experience";
import { Education } from "../entities/Education";
import { isAuth } from "../middleware/isAuth";

@InputType() 
class EducationInput  {
  
    @Field()
    date!: string;
    
    @Field()
    school!: string;

    @Field()
    description!: string; 

}

@InputType() 
class ExperienceInput {
  
    @Field()
    date: string;
    
    @Field()
    company: string;

    @Field()
    description: string; 
}

@ObjectType()
class ResumeOutput {
    @Field()
    _id!: number; 

    @Field( () =>  String, {nullable: true})
    createdAt: Date;   

    @Field(() => String, {nullable: true})
    updatedAt: Date;   

    @Field()
    title!: string; 

    @Field(() => [String], {nullable: true})
    skills!: string[]; 
 
    @Field(() => [Education], {nullable: true})
    education?: Education[]

    @Field(() => [Experience], {nullable: true})
    experience?: Experience[]


}

@InputType()
class ResumeInput {
    @Field()
    title: string; 

    @Field(() => [String])
    skill!: string[];

    @Field(() => [EducationInput])
    education: EducationInput[];

    @Field(() => [ExperienceInput])
    experience: ExperienceInput[];

}

@Resolver(Resume) 
export class ResumeResolver {   
    @Mutation ( () => Resume, {nullable: true}) 
    async createResume(
        @Arg("input") input: ResumeInput,
        @Ctx() {req}: MyContext
        ): Promise<Resume | null> {
            if(!req.session.userId) {
                throw new Error("Not authenticated"); 
            }
                        
            let arrayEd = []; 
            for(let i = 0; i < input.education.length; i++) {
                const ed = new Education();
                ed.date = input.education[i].date;
                ed.description = input.education[i].description; 
                ed.school = input.education[i].school;
                const created = await mydataSource.manager.save(ed);
                arrayEd.push(created); 
            }

            let arrayExp= []; 
            for(let i = 0; i < input.experience.length; i++) {
                const exp = new Experience();
                exp.date = input.experience[i].date;
                exp.description = input.experience[i].description; 
                exp.company = input.experience[i].company;
                const created = await mydataSource.manager.save(exp);
                arrayExp.push(created); 
            }

            const user = await User.findOne({where: {_id: req.session.userId}});
            if(!user) {
                console.log("User does not exist")
                return null; 
            }

            const res = await Resume.create({
                title: input.title,
                skills: input.skill,
                education: arrayEd,
                experience: arrayExp,
                creatorId: user._id
            }).save();

            user.resumeId = res._id; 
            //console.log(res._id)
            await mydataSource.manager.save(user); 
            
            return res;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteResume(
        @Ctx() {req}: MyContext
    ): Promise<Boolean> {

        //how to delte OTM <=> MTO <=> OTO relations 
        try {
            const user = await User.findOne({where: {_id: req.session.userId}}); 
            if(!user || !user.resumeId) return false;
            const id = user.resumeId;
            try{
                console.log(id);
                await Resume.delete(id);
                user.resumeId = -1; 
                mydataSource.manager.save(user); 
                return true; 
            } catch (err) {
                return false;
            }
        }
        catch (err) {
            return false; 
        }

    }

    @Mutation(() => ResumeOutput, {nullable: true})
    @UseMiddleware(isAuth)
    async editResume(
        @Arg("input") input: ResumeInput,
        @Ctx() {req}: MyContext
    ): Promise<ResumeOutput | undefined> {
        let res; 
        const user = await User.findOne({where: {_id: req.session.userId}}); 
        if(!user || !user.resumeId) return undefined; 
        
        try {
            const id = user.resumeId;
            try{
                await Resume.delete(id);
                user.resumeId = -1; 
                mydataSource.manager.save(user);  
                res = true; 
            } catch (err) {
               res = false; 
            }
        } catch (err) { 
            res = false 
        }

        if(res == true) {
            let arrayEd = []; 
            for(let i = 0; i < input.education.length; i++) {
                const ed = new Education();
                ed.date = input.education[i].date;
                ed.description = input.education[i].description; 
                ed.school = input.education[i].school;
                const created = await mydataSource.manager.save(ed);
                arrayEd.push(created); 
            }

            let arrayExp= [];   
            for(let i = 0; i < input.experience.length; i++) {
                const exp = new Experience();
                exp.date = input.experience[i].date;
                exp.description = input.experience[i].description; 
                exp.company = input.experience[i].company;
                const created = await mydataSource.manager.save(exp);
                arrayExp.push(created); 
            }

            const res = await Resume.create({
                title: input.title,
                skills: input.skill,
                education: arrayEd,
                experience: arrayExp,
                creatorId: user._id
            }).save();

            user.resumeId = res._id; 
            await mydataSource.manager.save(user); 
            return res; 
        } 
        return undefined; 
    }

    @Query(() => ResumeOutput, {nullable: true})
    async findResume(
        @Arg("_id") id: number
        ): Promise<ResumeOutput | undefined> {

            let fullResume = await Resume.findOne({
                where: {
                    _id: id
                },
                join: {
                    alias: "resume",
                    leftJoinAndSelect: {
                        "experience": "resume.experience" ,
                        "education": "resume.education",
                    }
                }
            }) as ResumeOutput;

            if(!fullResume) return undefined; 
   
            return fullResume; 
    }

}