import express from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user-service';
import { comparePassword } from '../services/auth';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../environment';
import { IUser } from 'common.interfaces';
import { generateAccessToken, generateRefreshToken } from '../services/auth';

const auth = express.Router();

auth.route('/login')
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;

            const users = await UserService.retrieveAllUsers();

            const user = users.find(user => user.username === username) as IUser;
            if (!user) return res.status(400).json('User not found');

            const payload = { id: user.id, username: user.username, email: user.email };

            if (!await comparePassword(password, user.password)) return res.status(401).json('Not Allowed');

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            await UserService.updateUser(user.id, { refreshToken });

            return res.status(201).json({ accessToken, refreshToken });
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })

// Use refresh token to generate new access token
auth.route('/token')
    .post((req, res) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.status(401).json('Not Allowed');

            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err: any, user: any) => {
                const userFromDB = await UserService.retrieveUserById(user.id);

                if (userFromDB.refreshToken !== refreshToken) return res.status(401).json('Not Allowed');

                const payload = { id: userFromDB.id, username: userFromDB.username, email: userFromDB.email };
                const accessToken = generateAccessToken(payload);

                return res.status(201).json({ accessToken });
            })
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })

// Revoke refresh token
auth.route('/logout')
    .delete(async (req, res) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) return res.status(401).json('Not Allowed');

            const user = await UserService.retrieveUserByRefreshToken(refreshToken);
            if (!user) return res.status(401).json('Not Allowed');

            await UserService.updateUser(user.id, { refreshToken: null });

            return res.status(200).json('Logged out');
        }
        catch (err: any) {
            return res.status(400).json(err.toString());
        }
    })

export { auth as authRouter };