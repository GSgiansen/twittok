// components/Feed.tsx
import React, { useState } from 'react';
import Post from './Post';

interface PostData {
  text: string;
  imageUrl?: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [newPostText, setNewPostText] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string>("");

  const handleSubmit = () => {
    if (newPostText) {
      setPosts([{ text: newPostText, imageUrl: newPostImage }, ...posts]);
      setNewPostText("");
      setNewPostImage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="mb-6">
        <textarea
          placeholder="What's happening?"
          className="w-full p-2 rounded-md mb-2"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Image URL (optional)" 
          className="w-full p-2 rounded-md mb-2"
          value={newPostImage}
          onChange={(e) => setNewPostImage(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md">
          Tweet
        </button>
      </div>
      
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}

export default Feed;
