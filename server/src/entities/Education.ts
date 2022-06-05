import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Resume } from "./Resume";

@Entity()
@ObjectType() 
export class Education extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    _id!: number; 

    @Field(() => String, {nullable: true})
    @Column()
    date?: string;
    
    @Field(() => String, {nullable: true})
    @Column()
    school?: string; 

    @Field(() => String, {nullable: true})
    @Column()
    description?: string; 

    @ManyToOne(() => Resume, resume => resume.education, {onDelete: "CASCADE", nullable: true})
    resume!: Resume
}