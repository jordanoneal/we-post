import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
    id: number;
    text: string;
    
    author: IUser;
    post: IPost;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface ICreateComment {
    text: string;
    postId: number;
    authorId: number;
}

export interface IUpdateComment {
    text?: string;
}