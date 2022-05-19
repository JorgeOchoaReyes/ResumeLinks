import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { LoginMutation, MeQuery, MeDocument, LogoutMutation, RegisterMutation, VoteMutationVariables } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import {pipe, tap} from 'wonka'; 
import Router from 'next/router';
import gql from 'graphql-tag'

//Global Error Handling 
const errorExchange: Exchange = ({forward}) => ops$ => {

  return pipe(
    forward(ops$),
    tap(({error}) => {
        if (error) {
          if(error?.message.includes("not authenthicated")) {
            Router.replace('/login');
        }
      }
    })
  )
}

//URQL Config
export const createUrqlClient = (ssrExchange: any) => { 
  let url = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:4000/graphql'
  return {
    url: url as string,
    fetchOptions: {
    credentials: 'include' as const,
    }, 
    exchanges: [dedupExchange, cacheExchange({
    keys: {
      PaginatedPost: () => null
    }, 
    resolvers: {
      Query: {
        posts: CursorPagination()
      }
    },
    updates: {
      Mutation: {
        vote: (_result, args, cache, info) => {
          const {postId, value} = args as VoteMutationVariables;

          const data = cache.readFragment(
            gql`
              fragment _ on Post {
                _id 
                points
              }
            `, 
            {_id: postId, points: value}
          )
          
          if(data) {
            const newPoints = data?.points + value; 
            cache.writeFragment(
              gql`
                fragment __ on Post {
                  points
                } 
              `,
              {_id: postId, points: newPoints}
            );

          }

        },
        CreatePost: (_result, args, cache, info) => {
          cache.invalidate('Query', 'posts', 
            {
              limit: 15
            }
          )
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(cache, {query: MeDocument}, 
          _result, 
          (result, query) => {
              if(result.login.errors) {
                return query;
              } else {
                return {
                  me: result.login.user
                };
              }
          }  
          )
        }, 
        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(cache, {query: MeDocument}, 
          _result, 
          (result, query) => {
              if(result.register.errors) {
                return query;
              } else {
                return {
                  me: result.register.user
                };
              }
          }  
          )
        }, 
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache, 
            {query: MeDocument},
            _result, 
            () => ({me: null})
          )
        }
      }
    }
  }),
  errorExchange, 
  ssrExchange,
    fetchExchange],
  }

};

const CursorPagination = (): Resolver => {

  return (_parent, fieldArgs, cache, info) => {
    
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    

    //Here we check our cache of queries and get only the post ones 
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);

    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldkey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isInCache = cache.resolve(entityKey, fieldkey);
    info.partial = !isInCache; 

    const results: string[] = []; 
    let hasMore = true; 
    fieldInfos.forEach(fi => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, 'posts') as string[];
      const _hasMore = cache.resolve(key, 'hasMore'); 
      if(!_hasMore) {
        hasMore = _hasMore as boolean; 
      }

      results.push(...data); 
    })
    
    return {
      __typename: "PaginatedPost", 
      hasMore: hasMore, 
      posts: results
    }; 

    // const visited = new Set();
    // let result: NullArray<string> = [];
    // let prevOffset: number | null = null;

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i];
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue;
    //   }

    //   const links = cache.resolve(entityKey, fieldKey) as string[];
    //   const currentOffset = args[offsetArgument];

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== 'number'
    //   ) {
    //     continue;
    //   }

    //   const tempResult: NullArray<string> = [];

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j];
    //     if (visited.has(link)) continue;
    //     tempResult.push(link);
    //     visited.add(link);
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === 'after')
    //   ) {
    //     result = [...result, ...tempResult];
    //   } else {
    //     result = [...tempResult, ...result];
    //   }

    //   prevOffset = currentOffset;
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    // if (hasCurrentPage) {
    //   return result;
    // } else if (!(info as any).store.schema) {
    //   return undefined;
    // } else {
    //   info.partial = true;
    //   return result;
    // }
  };
};