import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    if(!context.req.session.userId) {
        throw new Error("Not authenticated"); 
    }
    return next(); 
}

//call these using   @UseMiddleware(isAuth) in the resolvers, see createPost resolver. 