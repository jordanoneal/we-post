import { IComment, IPost, IUser } from "common/interfaces";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";

@Entity()
export class Post implements IPost {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    text!: string;

    @ManyToOne(() => User, (user) => user.posts)
    author!: IUser;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments!: IComment[];

    @Column()
    likes!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date | null;
}