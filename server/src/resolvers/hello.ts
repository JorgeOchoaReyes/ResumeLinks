import {Resolver, Query} from "type-graphql"; 
//Container resolver to use for future to quickly ctrl c + v

@Resolver() 
export class HelloResolver {
    @Query( () => String) 
    hello() {
        return "Bye"
    }
}