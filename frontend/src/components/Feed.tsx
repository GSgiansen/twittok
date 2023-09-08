// components/Feed.tsx
import React, { useState } from 'react';
import Post from './Post';

interface PostData {
  text: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean; 
}

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([
        {
          text: "Placeholder 1 for feed",
          imageUrl: "https://via.placeholder.com/300x150?text=Placeholder+1",
          likes: 325,
          likedByUser: false
        },
        {
          text: "Placeholder 2 for feed",
          imageUrl: "https://via.placeholder.com/300x150?text=Placeholder+2",
          likes: 124,
          likedByUser: false
        },
        {
          text: "Placeholder 3 for feed",
          imageUrl: "https://via.placeholder.com/300x150?text=Placeholder+3",
          likes: 871,
          likedByUser: false
        }
      ]);
      
  const [newPostText, setNewPostText] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string>("");

  const handleToggleLike = (index: number) => {
    const updatedPosts = [...posts];
    if (updatedPosts[index].likedByUser) {
      updatedPosts[index].likes -= 1;
    } else {
      updatedPosts[index].likes += 1;
    }
    updatedPosts[index].likedByUser = !updatedPosts[index].likedByUser;
    setPosts(updatedPosts);
  };

  const handleSubmit = () => {
    if (newPostText) {
      setPosts([{ text: newPostText, imageUrl: newPostImage, likes: 0, likedByUser: false}, ...posts]);
      setNewPostText("");
      setNewPostImage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-tiktok-black p-4 rounded-md">
      <div className="mb-6">
        <textarea
          placeholder="What the hottest product?"
          className="w-full p-2 rounded-md mb-2 bg-tiktok-red text-white"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Image URL (optional)" 
          className="w-full p-2 rounded-md mb-2 bg-tiktok-aqua text-tiktok-black"
          value={newPostImage}
          onChange={(e) => setNewPostImage(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-tiktok-red text-white p-2 rounded-md">
          Post
        </button>
      </div>
      
      {posts.map((post, index) => (
        <Post key={index} {...post} onToggleLike={() => handleToggleLike(index)}/>
      ))}
    </div>
  );
}

export default Feed;
