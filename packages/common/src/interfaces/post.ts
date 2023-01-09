import { IComment } from "./comment";
import { IUser } from "./user";

export interface IPost {
    id: number;
    title: string;
    text: string;
    likes: number;
    
    author: IUser;
    comments: IComment[];

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface ICreatePostParams {
    title: string;
    text: string;
    authorId: number;
}

export interface IUpdatePostParams {
    title?: string;
    text?: string;
    likes?: number;
}