import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IComment, IPost, IUser } from "common/interfaces";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Comment implements IComment {
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