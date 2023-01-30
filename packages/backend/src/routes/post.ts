import express from 'express';
import { PostService } from '../services/post-service';
import { ICreatePostParams, IUpdatePostParams } from 'common.interfaces';

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

post.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const post = await PostService.retrievePostById(id);

            return res.status(200).json(post);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })
    .patch(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const params = req.body as IUpdatePostParams

            const response = await PostService.updatePost(id, params);
            return res.status(201).json(response);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })
    .delete(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const response = await PostService.deletePost(id);

            return res.status(200).json(response);
        }
        catch(err: any) {
            return res.status(400).json(err.toString());
        }
    })

export { post as postRouter }