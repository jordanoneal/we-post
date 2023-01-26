// import { Post } from "backend.entities";
import { Post } from "../entities/post";
import { getRepository, Repository } from "typeorm";
import { ICreatePostParams, IPost } from "common.interfaces";
// import { UserService } from "./user-service";
import { UserService } from "./user-service";

class PostService {
    private postRepository: Repository<Post>;
    constructor() {
        this.postRepository = getRepository(Post);
    }

    public getPostRepository(): Repository<Post> {
        if (this.postRepository) return this.postRepository;
        return this.postRepository = getRepository(Post);
    }

    public async retrieveAllPosts(): Promise<IPost[]> {
        return await this.getPostRepository().find();
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
        const author = await UserService.retrieveUserById(params.authorId);
        if (!author) throw new Error('Could not retrieve Post author');

        const post = new Post();
        post.title = params.title;
        post.text = params.text;
        post.author = author;

        return await this.getPostRepository().save(post);
    }
}

const instance = new PostService();

export { instance as PostService }