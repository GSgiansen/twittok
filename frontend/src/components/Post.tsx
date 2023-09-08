// components/Post.tsx
import React from 'react';
import { FaHeart, FaRegHeart, FaUserCircle } from 'react-icons/fa';

interface PostProps {
  text: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean;
  username: string;
  onToggleLike: () => void;
}

const Post: React.FC<PostProps> = ({ text, imageUrl, likes, likedByUser, username, onToggleLike }) => {
  return (
    <div className="p-4 border rounded-md mb-4 bg-white">
      <div className="flex">
        <FaUserCircle size={40} className="mr-3 text-gray-500 flex-shrink-0"/>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="mb-2">{text}</p>
        </div>
      </div>
      {imageUrl && <img src={imageUrl} alt="Post" className="max-w-full rounded-md mt-3" />}
      <div className="mt-2 flex items-center">
        {likedByUser ? (
          <FaHeart onClick={onToggleLike} className="cursor-pointer mr-2 text-red-500" />
        ) : (
          <FaRegHeart onClick={onToggleLike} className="cursor-pointer mr-2 text-gray-400" />
        )}
        <span>{likes}</span>
      </div>
    </div>
  );
}

export default Post;
