import { Field,  ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Upvote } from "./Upvote";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    _id!: number; 

    @Field( () =>  String)
    @CreateDateColumn()
    createdAt: Date;   

    @OneToMany(() => Upvote, (upvote) => upvote.post)
    upvote: Upvote[]; 

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;   

    @Field()
    @Column() 
    title!: string; 

    @Field()
    @Column()
    text!: string; 

    @Field()
    @Column({type: "int", default: 0})
    points!: number; 

    @Field()
    @Column()
    creatorId: number; 

    @Field(() => User)
    @ManyToOne(() => User, user => user.posts) 
    creator: User; 

}
