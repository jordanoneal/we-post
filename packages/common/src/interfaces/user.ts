import { IComment } from './comment';
import { IPost } from './post';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    bio?: string;

    followers?: IUser[];
    following?: IUser[];

    posts?: IPost[];
    comments?: IComment[];

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface ICreateUserParams {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

export interface IUpdateUserParams {
    username?: string;
    bio?: string;
}