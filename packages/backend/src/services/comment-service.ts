import { getRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comment'
import { IComment, ICreateCommentParams, IUpdateCommentParams } from 'common.interfaces';
import { PostService } from './post-service';
import { UserService } from './user-service';

class CommentService {
    private commentRepository!: Repository<Comment>;

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
        if (!params.authorId) throw new Error('No authorId provided');
        if (!params.postId) throw new Error('No postId provided');

        const comment = new Comment();
        comment.text = params.text;
        comment.post = await PostService.retrievePostById(params.postId);
        comment.author = await UserService.retrieveUserById(params.authorId);

        return await this.getCommentRepository().save(comment);
    }

    public async updateComment(id: number, params: IUpdateCommentParams): Promise<IComment> {
        const comment = await this.retrieveCommentById(id);
        if (!comment) throw new Error('Comment does not exist');

        const updatedComment = Object.assign(comment, params);
        return await this.getCommentRepository().save(updatedComment);
    }

    public async deleteComment(id: number): Promise<boolean> {
        const comment = await this.retrieveCommentById(id);
        if (!comment) throw new Error('Comment does not exist');

        await this.getCommentRepository().delete({ id: comment.id });
        return true;
    }
}

const instance = new CommentService();

export { instance as CommentService };