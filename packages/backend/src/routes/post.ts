import express from 'express';
// import { PostService } from 'backend.services';
import { PostService } from '../services/post-service';
import { ICreatePostParams } from 'common.interfaces';

const post = express.Router();

post.route('/')
    .get(async (req, res) => {
        try {
            const posts = await PostService.retrieveAllPosts();
            return res.status(200).json(posts);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })
    .post(async (req, res) => {
        try {
            const params = req.body as ICreatePostParams;
            const post = await PostService.createPost(params);

            return res.status(201).json(post);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })

export { post as postRouter }