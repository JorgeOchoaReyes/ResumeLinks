import { type } from "os";
import { Field,  ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
    
    @Field(() => [String])
    @Column("text", {array: true}) 
    education!: string[]; 
    
    @Field(() => [String])
    @Column("text", {array: true}) 
    experience!: string[]; 

    @OneToOne(() => User, user => user.resume)
    creator: User; 

}


