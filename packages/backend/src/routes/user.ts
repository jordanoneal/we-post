import express from 'express';
import { UserService } from '../services/user-service';
import { ICreateUserParams, IUpdateUserParams } from 'common.interfaces';

const user = express.Router();

user.route('/')
    .get(async (req, res) => {
        try {
            const users = await UserService.retrieveAllUsers();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(400).json(error.toString());
        }
    })
    .post(async (req, res) => {
        try {
            const params = req.body as ICreateUserParams;
            console.log(params);
            const user = await UserService.createUser(params);
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json(error.toString());
        }
    })

user.route('/:id')
    .get(async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.retrieveUserById(id);

            return res.status(200).json(user);

        } catch (error: any) {
            return res.status(400).json(error.toString());
        }
    })
    .patch(async (req, res) => {
        try {
            const updateParams = req.body as IUpdateUserParams;
            const id = parseInt(req.params.id);

            const response = await UserService.updateUser(id, updateParams);
            return res.status(200).json(response);
        } catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })


export { user as userRouter };