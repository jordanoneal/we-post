import dotenv from 'dotenv';

dotenv.config({
    path: '.env',
});

if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined!');
export const NODE_ENV = process.env.NODE_ENV;

if (!process.env.APP_PORT) throw new Error('APP_PORT is not defined!');
export const APP_PORT = parseInt(process.env.APP_PORT);

if (!process.env.DB_PORT) throw new Error('DB_PORT is not defined!')
export const DB_PORT = parseInt(process.env.DB_PORT);

if (!process.env.DB_USERNAME) throw new Error('DB_USERNAME is not defined!');
export const DB_USERNAME = process.env.DB_USERNAME;

if (!process.env.DB_HOST) throw new Error('DB_HOST is not defined!');
export const DB_HOST = process.env.DB_HOST;

if (!process.env.DB_NAME) throw new Error('DB_NAME is not defined!');
export const DB_NAME = process.env.DB_NAME;

if (!process.env.DB_PASSWORD) throw new Error('DB_PASSWORD is not defined!');
export const DB_PASSWORD = process.env.DB_PASSWORD;

if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined!');
export const JWT_SECRET = process.env.JWT_SECRET;

if(!process.env.REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET is not defined!');
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;