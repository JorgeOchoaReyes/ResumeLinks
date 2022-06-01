import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resume } from "./Resume";

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

    @Field({nullable: true})
    @Column()
    resumeId?: number;

    @OneToOne(() => Resume, resume => resume.creator)
    @JoinColumn()
    resume?: Resume;

}