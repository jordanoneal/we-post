import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
    id: number;
    text: string;
    // edited: boolean;

    author: IUser;
    post: IPost;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface ICreateCommentParams {
    text: string;
    postId: number;
    authorId: number;
}

export interface IUpdateCommentParams {
    text?: string;
}