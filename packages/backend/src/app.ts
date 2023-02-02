import express from 'express';
import { APP_PORT } from './environment';
import { initializeDB } from './data-source';
import { commentRouter } from './routes/comment';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from './routes/auth';

class Server {
    public app = express();
}

const PORT = APP_PORT || 3000;
const server = new Server();

const initializeRoutes = () => {
    console.log('Initializing routes...');

    server.app.use(cors({
        credentials: true,
        origin: 'http://localhost:3001',
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    server.app.use(bodyParser.json());

    server.app.use('/auth', authRouter);

    server.app.use('/comments', commentRouter);
    server.app.use('/users', userRouter);
    server.app.use('/posts', postRouter);
}

const runServer = async () => {
    await initializeDB();
    initializeRoutes();
    server.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

runServer();