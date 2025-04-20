import { useEffect, useState } from "react";
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="container__title">Posts</h1>
      <Posts />
    </div>
  )
}

function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/posts');

    eventSource.addEventListener('posts', (event) => {
      const data = JSON.parse(event.data);
      setPosts(data);
    });

    const handleDataEvent = (event) => {
      const data = JSON.parse(event.data);
      setPosts(prevPosts => prevPosts.map(
        post => post.id === data.postId
          ? { ...post, ...data }
          : post
      ));
    }

    eventSource.addEventListener('author', handleDataEvent);
    eventSource.addEventListener('likes', handleDataEvent);
    eventSource.addEventListener('reposts', handleDataEvent);

    return () => {
      eventSource.close();
    }
  }, []);

  if (!posts) return <p>Loading...</p>;

  return (
    <ul className="posts">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}

function Post({ post }) {
  console.log(post);
  return (
    <li className="post">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__content">{post.content}</p>
      {
        typeof post.author === 'string' && (
          <p className="post__author"><strong>Author:</strong> {post.author}</p>
        )
      }
      {
        Array.isArray(post.likes) && (
          <p className="post__likes"><strong>Liked by:</strong> {post.likes.join(', ')}</p>
        )
      }
      {
        Array.isArray(post.reposts) && (
          <p className="post__reposts"><strong>Reposted by:</strong> {post.reposts.join(', ')}</p>
        )
      }
    </li>
  )
}

export default App
