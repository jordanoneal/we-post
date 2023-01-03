import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
    path: '.env'
});

class Server {
    public app = express();
}

const server = new Server();
const PORT = process.env.APP_PORT || 5000;

server.app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});