import express from 'express';
import { APP_PORT } from './environment';
import { initializeDB } from './data-source';

class Server {
    public app = express();
}

const PORT = APP_PORT || 3000;
const server = new Server();

const runServer = async () => {
    await initializeDB();
    server.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

runServer();