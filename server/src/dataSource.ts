import { DataSource } from "typeorm";
import path from 'path'; 
import 'dotenv-safe/config';
require('dotenv-safe').config();

export let mydataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true, 
    // synchronize: true, 
    entities: [path.join(__dirname, "./entities/*")],
    migrations: [path.join(__dirname, "./migrations/*")],
}); 
 