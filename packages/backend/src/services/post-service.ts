import { Post } from "../entities/post";
import { getRepository, Repository } from "typeorm";
import { ICreatePostParams, IPost, IUpdatePostParams } from "common.interfaces";
import { UserService } from "./user-service";

class PostService {
    private postRepository!: Repository<Post>;

    public getPostRepository(): Repository<Post> {
        if (this.postRepository) return this.postRepository;
        return this.postRepository = getRepository(Post);
    }

    public async retrieveAllPosts(): Promise<IPost[]> {
        return await this.getPostRepository().find({
            relations: ['author', 'comments', 'comments.author']
        });
    };

    public async retrievePostById(id: number): Promise<IPost> {
        const post = await this.getPostRepository().findOne({
            where: {
                id: id
            }
        })
        if (!post) throw new Error('Could not retrieve Post by id');
        return post;
    }

    public async createPost(params: ICreatePostParams): Promise<IPost> {
        // If no params.authorId is provided, throw an error
        if (!params.authorId) throw new Error('No authorId provided');

        const post = new Post();
        post.title = params.title;
        post.text = params.text;
        post.author = await UserService.retrieveUserById(params.authorId);

        return await this.getPostRepository().save(post);
    }

    public async updatePost(id: number, params: IUpdatePostParams): Promise<IPost> {
        const post = await this.retrievePostById(id);
        if (!post) throw new Error('Post does not exist');

        const updatedPost = Object.assign(post, params);
        return await this.getPostRepository().save(updatedPost);
    }

    public async deletePost(id: number): Promise<boolean> {
        const post = await this.retrievePostById(id);
        if (!post) throw new Error('Post does not exist');

        await this.getPostRepository().delete({ id: post.id });
        return true;
    }
}

const instance = new PostService();

export { instance as PostService }