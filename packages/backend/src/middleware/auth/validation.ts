import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../environment';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Not authorized' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.user = decoded;
        next();
    } catch (err: any) {
        return res.status(401).json(err.toString());
    }
};
