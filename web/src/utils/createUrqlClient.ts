import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { LoginMutation, MeQuery, MeDocument, LogoutMutation, RegisterMutation} from "../generated/graphql";
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
    resolvers: {
    },
    updates: {
      Mutation: {
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
