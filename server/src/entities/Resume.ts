import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { User } from "./User";

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

    @OneToMany(() => Education, education => education.resume, {onDelete: "CASCADE"})
    education?: Education[]

    @OneToMany(() => Experience, experience => experience.resume, {onDelete: "CASCADE"})
    experience?: Experience[]

    @Field(() => Number)
    @Column("int")
    creatorId?: number; 

    @OneToOne(() => User, user => user.resume, {cascade: true, onDelete: "CASCADE" })
    creator?: User; 
 
}

