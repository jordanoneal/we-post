import { IComment, IPost, IUser } from "common/interfaces";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";
import { Comment } from "./comment";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ type: 'varchar', unique: true, length: 20 })
    username!: string;

    @Column({ type: 'varchar', unique: true, length: 50 })
    email!: string;

    @Column()
    bio!: string;

    @Column({ type: 'jsonb' })
    followers!: IUser[];

    @Column({ type: 'jsonb' })
    following!: IUser[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments!: IComment[];

    @OneToMany(() => Post, (post) => post.author)
    posts!: IPost[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date | null;
}