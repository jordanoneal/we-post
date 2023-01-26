import express from 'express'
// import { CommentService } from 'backend.services';
import { CommentService } from '../services/comment-service'

import { ICreateCommentParams } from 'common.interfaces'

const comment = express.Router()

comment.route('/')
    .get(async (req, res) => {
        try {
            const comments = await CommentService.retrieveAllComments();
            return res.status(200).json(comments);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })
    .post(async (req, res) => {
        try {
            const params = req.body as ICreateCommentParams;
            const comment = await CommentService.createComment(params);

            return res.status(201).json(comment);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })

export { comment as commentRouter };