import { IComment, ICreateUserParams, IPost, IUser } from "common.interfaces";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";
import { Comment } from "./comment";

@Entity()
export class User implements IUser {
    constructor(data?: ICreateUserParams) {
        if (data) Object.assign(this, data);
    }

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

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ nullable: true })
    bio!: string;

    @Column({ nullable: true })
    refreshToken!: string;

    @Column({ type: 'jsonb', nullable: true })
    followers!: IUser[];

    @Column({ type: 'jsonb', nullable: true })
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