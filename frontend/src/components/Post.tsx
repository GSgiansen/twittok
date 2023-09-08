// components/Post.tsx
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import the regular heart as well

interface PostProps {
  text: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean;
  onToggleLike: () => void;
}

const Post: React.FC<PostProps> = ({ text, imageUrl, likes, likedByUser, onToggleLike }) => {
  return (
    <div className="p-4 border rounded-md mb-4 bg-white">
      <p className="mb-2">{text}</p>
      {imageUrl && <img src={imageUrl} alt="Post" className="max-w-full rounded-md" />}
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
