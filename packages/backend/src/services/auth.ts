import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../environment';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export const generateAccessToken = (user: { id: number, username: string, email: string }) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '15s' });
    return token;
}

export const generateRefreshToken = (user: { id: number, username: string, email: string }) => {
    const token = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return token;
}