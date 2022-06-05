import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Education } from "./Education";
import { Experience } from "./Experience";

@ObjectType()
@Entity()
export class Resume extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    _id!: number; 

    @Field( () =>  String)
    @CreateDateColumn()
    createdAt: Date;   

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;   

    @Field()
    @Column() 
    title!: string; 

    @Field(() => [String])
    @Column("text", {array: true}) 
    skills!: string[]; 

    @OneToMany(() => Education, education => education.resume, {onDelete: "CASCADE", nullable: true})
    education?: Education[]

    @OneToMany(() => Experience, experience => experience.resume, {onDelete: "CASCADE", nullable: true})
    experience?: Experience[]

    @Field(() => Number)
    @Column("int")
    creatorId?: number; 
 
}

