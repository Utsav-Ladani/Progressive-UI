import { likesDB, postsDB, repostsDB } from "./db/posts.js";
import { usersDB } from "./db/users.js";

export class PostSSE {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    send() {
        this.handleTerminationGracefully();

        this.setHeaders();
        this.sendPosts();
    }

    setHeaders() {
        this.res.setHeader('Content-Type', 'text/event-stream');
        this.res.setHeader('Cache-Control', 'no-cache');
        this.res.setHeader('Connection', 'keep-alive');
    }

    handleTerminationGracefully() {
        this.req.on('close', () => {
            this.res.end();
        });
    }

    async sendPosts() {
        await sleep(1000);

        const posts = postsDB;

        this.res.write('event: posts\n');
        this.res.write(`data: ${JSON.stringify(posts)}\n\n`);

        await this.sendPostsAuthors(posts);
        await this.sendLikes(posts);
        await this.sendReposts(posts);
    }

    async sendPostsAuthors(posts) {
        await sleep(1000);

        for (const post of posts) {
            const author = usersDB.find(user => user.id === post.authorId);

            const authorPayload = {
                postId: post.id,
                author: author.name,
            }

            this.res.write('event: author\n');
            this.res.write(`data: ${JSON.stringify(authorPayload)}\n\n`);
        }
    }

    async sendLikes(posts) {
        await sleep(1000);

        for (const post of posts) {
            const likedBy = likesDB
                .filter(like => like.postId === post.id)
                .map(like => like.userId)
                .map(userId => usersDB.find(user => user.id === userId))
                .map(user => user.name)

            const likesPayload = {
                postId: post.id,
                likes: likedBy
            }

            this.res.write('event: likes\n');
            this.res.write(`data: ${JSON.stringify(likesPayload)}\n\n`);
        }
    }

    async sendReposts(posts) {
        await sleep(1000);

        for (const post of posts) {
            const repostedBy = repostsDB
                .filter(repost => repost.postId === post.id)
                .map(repost => repost.userId)
                .map(userId => usersDB.find(user => user.id === userId))
                .map(user => user.name)

            const repostsPayload = {
                postId: post.id,
                reposts: repostedBy
            }

            this.res.write('event: reposts\n');
            this.res.write(`data: ${JSON.stringify(repostsPayload)}\n\n`);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
