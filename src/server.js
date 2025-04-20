import express from 'express';
import { PostSSE } from './PostSSE.js';

const app = express();

app.get('/api/posts', async (req, res) => {
    const postSSE = new PostSSE(req, res);

    postSSE.send();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
