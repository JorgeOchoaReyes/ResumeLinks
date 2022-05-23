import { Field,  ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity{

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

    @Field()
    @Column()
    text!: string; 

    @Field()
    @Column({type: "int", default: 0})
    points!: number; 

    @Field()
    @Column()
    creatorId: number; 


}
