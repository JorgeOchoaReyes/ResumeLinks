import "reflect-metadata"; 
import 'dotenv-safe/config';
import {COOKIE_NAME, __prod__} from "./constants";
import express from "express";
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {PostResolver} from './resolvers/post'; 
import {HelloResolver} from './resolvers/hello'; 
import {UserResolver} from './resolvers/user'; 
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors'; 
import { ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { mydataSource } from "./dataSource";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
require('dotenv-safe').config();

const main = async () => {
        
    let connection = await mydataSource.initialize();
    connection.runMigrations();


    const app = express(); 
    let RedisStore = connectRedis(session);
    let redisClient = new Redis(); //On deploy add this process.env.REDIS_URL
    app.set("proxy", 1);

    app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}));
 
    
    redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', function () {
        console.log('Connected to redis successfully');
    });
  
    app.use(
        session({
            name: COOKIE_NAME, 
            store: new RedisStore(
                { 
                    client: redisClient
            }),
            cookie: {
                maxAge: 1000* 60 * 60* 24* 365 * 10,
                httpOnly: false, 
                sameSite: "lax", 
                secure: __prod__,
                domain: __prod__ ? '.3sides.xyz' : undefined                
            },
            resave: false,
            secret: process.env.SESSION_SECRET, 
            saveUninitialized: false
        })     
    );
 
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        plugins: [
            process.env.NODE_ENV === 'production'
              ? ApolloServerPluginLandingPageDisabled()
              : ApolloServerPluginLandingPageGraphQLPlayground(),
          ],
        context: ({req, res})=>({req , res, redisClient}) 
    }) 
   
    await apolloServer.start(); 

    apolloServer.applyMiddleware({app, cors: false}); 

    app.listen(parseInt(process.env.PORT), () => {
        console.log('Server started on localhost:' + process.env.PORT)
    }); 
}

main().catch((err) => {
    console.log(err); 
}); 

