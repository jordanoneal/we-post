import 'reflect-metadata';
import { DataSource } from "typeorm";
import { DB_PORT, DB_USERNAME, DB_HOST, DB_NAME, DB_PASSWORD } from './environment';
import { User, Post, Comment } from './entities'

const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Post, Comment],
    subscribers: [],
    migrations: [],
});

export async function initializeDB() {
    await AppDataSource.initialize();
};