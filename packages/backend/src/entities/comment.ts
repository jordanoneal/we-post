import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IComment, ICreateCommentParams, IPost, IUser } from "common.interfaces";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Comment implements IComment {
    constructor(data?: ICreateCommentParams) {
        if (data) Object.assign(this, data);
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @ManyToOne(() => User, (user) => user.comments)
    author!: IUser;

    @ManyToOne(() => Post, (post) => post.comments)
    post!: IPost;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date | null;
}