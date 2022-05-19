import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import {Upvote} from "./Upvote"; 


@ObjectType()
@Entity()
export class User extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number; 

    @Field( () =>  String)
    @CreateDateColumn()
    createdAt: Date;   

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;   

    @Field()
    @Column({unique: true}) 
    username!: string; 

    @Field()
    @Column({unique: true}) 
    email!: string; 

    @Column({type: 'text'}) 
    password!: string; 

    @OneToMany(() => Post, post => post.creator) 
    posts: Post[];

    @OneToMany(() => Upvote, (upvote) => upvote.user)
    upvote: Upvote[]; 

}