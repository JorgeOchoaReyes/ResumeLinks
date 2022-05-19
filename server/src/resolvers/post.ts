import { Post } from "../entities/Post";
import {Resolver, Query, Arg, Int, Mutation, Field, InputType, Ctx, FieldResolver, Root, ObjectType} from "type-graphql"; 
import { MyContext } from "src/types";
import { mydataSource } from "../dataSource";
import { Upvote } from "../entities/Upvote";

@InputType()
class PostInput {
    @Field()
    title: string; 
    @Field()
    text: string; 
}


@ObjectType() 
class PaginatedPost {
    @Field(() => [Post])
    posts: Post[];
    
    @Field()
    hasMore: boolean; 
}


@Resolver(Post) 
export class PostResolver {

    //We grab a small snippet only to reduce what we load and req in frontend
    @FieldResolver(() => String)
    textSnippet(
        @Root() root: Post
    ) {
        return root.text.slice(0, 50); 
    }


    @Mutation(() => Boolean)
    async vote(
        @Arg('postId', () => Int) postId: number,
        @Arg("value", () => Int) value: number,
        @Ctx() {req}: MyContext
    ) {

        const {userId} = req.session; 
        const isUpvote = value !== -1;
        const realValue = isUpvote ? 1 : -1;

        const upvote = await Upvote.findOne({where: {postId: postId, userId: userId}})

        if(upvote && upvote.value !==realValue) {

            await mydataSource.transaction(async tm => {
                await tm.query(`
                update upvote 
                set value = $1 
                where "postId" = $2 and "userId" = $3 
                `, [realValue, postId, userId])

                await tm.query(`
                update post 
                set points = points + $1 
                where _id = $2 
                `, [2*realValue, postId])

            })
        } else if(!upvote) {

            await mydataSource.transaction(async tm => {
                await tm.query(`
                insert into upvote ("userId", "postId", value)
                values ($1, $2, $3)
                `, [userId, postId, realValue])

                await tm.query(`
                update post
                set points = points + $1
                where _id = $2
                `, [realValue, postId])
            })
        }

         

        return true;
    }

    //get all post 
    @Query( () => PaginatedPost) 
    async posts(
        @Arg('limit', () => Int) limit: number, 
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null
    ): Promise<PaginatedPost> {
        //Pagination using cursor 
        const realLimit = Math.min(50, limit); 
        const realLimitPlusOne = realLimit + 1; 

        const replacements: any[] = [realLimitPlusOne]; 
        if(cursor) {
            replacements.push(new Date(parseInt(cursor))); 
        }


        const posts = await mydataSource.query(`
        select p.*,
        json_build_object(
            '_id', u._id,
            'email', u.email, 
            'createdAt', u."createdAt",
            'updatedAt', u."updatedAt",
            'username', u.username) creator
        from post p
        inner join public.user u on u._id = p."creatorId"
        ${cursor ? `where p."createdAt" < $2`: ``}
        order by p."createdAt" DESC
        limit $1
        `, replacements )


        return {posts: posts.slice(0, realLimit), hasMore: posts.length === realLimitPlusOne}; 
    }

    // find one post
    @Query ( () => Post, {nullable: true}) 
    async post(
        @Arg("_id", () => Int) _id: number ): Promise<Post | null> {
 
            
            const p = await mydataSource.query(`
                select p.*, 
                json_build_object(
                    '_id', u._id,
                    'createdAt', u."createdAt",
                    'updatedAt', u."updatedAt",
                    'username', u.username) creator
                from post p
                inner join public.user u on u._id = p."creatorId"

                where p._id = $1 

            `, [_id])

            console.log("FIND POST", p[0]); 
            return p[0]; 
            // {where: {_id: _id},relations: ['creator']}
    }
        
    //create a post
    @Mutation ( () => Post) 
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() {req}: MyContext
        ): Promise<Post> {
            if(!req.session.userId) {
                throw new Error("Not authenticated"); 
            }
            return Post.create({
                ...input, 
                creatorId: req.session.userId

            }).save(); 
    }

    //update post
    @Mutation ( () => Post, {nullable: true}) 
    async updatePost(
        @Arg("_id", () => Int) _id: number,
        @Arg("title", () => String, {nullable: true}) title: string
        ): Promise<Post | null> {
            const post = await Post.findOne({where: {_id: _id}}); 
            if (!post) {
                return null; 
            }
            if (typeof title !== 'undefined') {
                await Post.update({_id}, {title});
            }
            return post; 
    }


    @Mutation ( () => Boolean) 
    async deletePost(
        @Arg("_id", () => Int) _id: number
        ): Promise<boolean> {
            try {
                await Post.delete(_id);  
                return true; 
            } catch (err) {
                return false; 
            }
    }
    

}