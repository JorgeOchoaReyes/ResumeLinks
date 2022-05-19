import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Upvote extends BaseEntity{
 
    @PrimaryColumn()
    userId: number; 

    @Column({type: "int"})
    value: number; 

    @ManyToOne(() => User)
    user: User;  

    @PrimaryColumn()
    postId: number; 

    @ManyToOne(() => Post) 
    post: Post; 

}