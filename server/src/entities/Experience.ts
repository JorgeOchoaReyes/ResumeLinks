import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Resume } from "./Resume";


@Entity()
@ObjectType() 
export class Experience extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    _id!: number; 
    
    @Field(() => String, {nullable: true})
    @Column()
    date?: string;
    
    @Field(() => String, {nullable: true})
    @Column()
    company?: string;

    @Field(() => String, {nullable: true})
    @Column()
    description?: string; 

    @ManyToOne(() => Resume, resume => resume.experience, {onDelete: "CASCADE", nullable: true})
    resume?: Resume

}