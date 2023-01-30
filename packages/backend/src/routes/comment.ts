import express from 'express'
import { CommentService } from '../services/comment-service'
import { ICreateCommentParams, IUpdateCommentParams } from 'common.interfaces'

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

comment.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const comment = await CommentService.retrieveCommentById(id);

            return res.status(200).json(comment);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })
    .patch(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const params = req.body as IUpdateCommentParams

            const response = await CommentService.updateComment(id, params);
            return res.status(201).json(response);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })
    .delete(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const response = await CommentService.deleteComment(id);

            return res.status(200).json(response);
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })

export { comment as commentRouter };