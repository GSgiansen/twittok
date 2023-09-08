// components/Feed.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FaFilter } from 'react-icons/fa';
import Post from './Post';

interface PostData {
  text: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean; 
  username: string;
}

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([
        {
          text: "Placeholder 1 for feed",
          imageUrl: "https://via.placeholder.com/300x150?text=Placeholder",
          likes: 325,
          likedByUser: false,
          username: "User 1"
        },
        {
          text: "Placeholder 2 for feed that is slightly longer",
          imageUrl: "https://via.placeholder.com/300x150?text=Placeholder",
          likes: 124,
          likedByUser: false,
          username: "User 2"
        },
        {
          text: "Placeholder 3 for feed that is very long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed justo tristique, ultricies nisl non, congue risus.",
          imageUrl: "https://via.placeholder.com/300x150?text=Placeholder",
          likes: 871,
          likedByUser: false,
          username: "User 3"
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
      setPosts([{ text: newPostText, imageUrl: newPostImage, likes: 0, likedByUser: false, username: "Guest"}, ...posts]);
      setNewPostText("");
      setNewPostImage("");
    }
  };

  const handleSentimentFilter = () => {
    //Link the filter here
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-tiktok-black p-4 rounded-md">
      <div className="grid w-full gap-2">
        <textarea
          placeholder="What's the hottest product?"
          className="w-full p-2 rounded-md mb-2 bg-tiktok-red text-white"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Link to product (optional)" 
          className="w-full p-2 rounded-md mb-2 bg-tiktok-aqua text-tiktok-black"
          value={newPostImage}
          onChange={(e) => setNewPostImage(e.target.value)}
        />
        <Button onClick={handleSubmit} className='bg-tiktok-red text-white mb-2'>
            Post
        </Button>
      </div>
      <div className="flex justify-end mb-4">
                <FaFilter size={24} className="cursor-pointer text-tiktok-red"/>
            </div>
      {posts.map((post, index) => (
        <Post key={index} {...post} onToggleLike={() => handleToggleLike(index)}/>
      ))}
    </div>
  );
}

export default Feed;
