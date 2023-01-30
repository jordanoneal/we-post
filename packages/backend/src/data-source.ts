import { createConnection, Connection } from 'typeorm';
import { DB_PORT, DB_USERNAME, DB_HOST, DB_NAME, DB_PASSWORD } from './environment';
import { Comment } from './entities/comment';
import { Post } from './entities/post';
import { User } from './entities/user';

export async function initializeDB(): Promise<Connection> {
    return await createConnection({
        type: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        synchronize: true,
        logging: true,
        entities: [User, Post, Comment],
    });
};