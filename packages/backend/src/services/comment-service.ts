import { getRepository, Repository } from 'typeorm';
// import { Comment } from 'backend.entities';
import { Comment } from '../entities/comment'

import { IComment, ICreateCommentParams } from 'common.interfaces';

class CommentService {
    private commentRepository: Repository<Comment>;
    constructor() {
        this.commentRepository = getRepository(Comment);
    }

    public getCommentRepository(): Repository<Comment> {
        if (this.commentRepository) return this.commentRepository;
        return this.commentRepository = getRepository(Comment);
    }

    public async retrieveAllComments(): Promise<IComment[]> {
        return await this.getCommentRepository().find();
    }

    public async retrieveCommentById(id: number): Promise<IComment> {
        const comment = await this.getCommentRepository().findOne({
            where: {
                id: id
            }
        })

        if (!comment) throw new Error('Could not retrieve Comment by id');
        return comment;
    }

    public async createComment(params: ICreateCommentParams): Promise<IComment> {
        const createParams = {
            text: params.text,
            postId: params.postId,
            authorId: params.authorId
        };
        const comment = new Comment(createParams);
        return await this.getCommentRepository().save(comment);
    }
}

const instance = new CommentService();

export { instance as CommentService };