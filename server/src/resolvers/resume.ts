import {Resolver, Query, Arg,Mutation, Field, InputType, Ctx, ObjectType} from "type-graphql"; 
import { MyContext } from "src/types";
import { mydataSource } from "../dataSource";
import { Resume } from "../entities/Resume";
import { User } from "../entities/User";
import { Experience } from "../entities/Experience";
import { Education } from "../entities/Education";

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

    
    @Mutation ( () => Resume) 
    async createResume(
        @Arg("input") input: ResumeInput,
        @Ctx() {req}: MyContext
        ): Promise<Resume> {
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


            return await Resume.create({
                title: input.title,
                skills: input.skill,
                education: arrayEd,
                experience: arrayExp,
                creator: user ? user : undefined
            }).save(); 
    }

    @Query(() => ResumeOutput, {nullable: true})
    async findResume(
        @Arg("_id") id: number,
        @Ctx() {req}: MyContext
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