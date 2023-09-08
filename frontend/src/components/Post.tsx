// components/Post.tsx
import React from 'react';

interface PostProps {
  text: string;
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({ text, imageUrl }) => {
  return (
    <div className="p-4 border rounded-md mb-4">
      <p className="mb-2">{text}</p>
      {imageUrl && <img src={imageUrl} alt="Post" className="max-w-full rounded-md" />}
    </div>
  );
}

export default Post;

