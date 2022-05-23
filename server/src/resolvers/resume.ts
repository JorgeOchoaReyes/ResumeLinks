import {Resolver, Query, Arg, Int, Mutation, Field, InputType, Ctx, FieldResolver, Root, ObjectType} from "type-graphql"; 
import { MyContext } from "src/types";
import { mydataSource } from "../dataSource";
import { Resume } from "src/entities/Resume";

@InputType()
class ResumeInput {

    @Field()
    name: string; 

    @Field()
    experience?: Experience[]; 

    @Field()
    education?: Education[]; 

    @Field()
    skill?: string[];

}

@ObjectType() 
class Experience {
    
    @Field()
    date!: string;
    
    @Field()
    company!: string;

    @Field()
    description!: string; 

}

@ObjectType() 
class Education {

    @Field()
    date!: string;
    
    @Field()
    school!: string;

    @Field()
    description!: string; 

}



@Resolver(Resume) 
export class PostResolver {

    
    

}