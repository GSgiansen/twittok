// components/Post.tsx
import React from "react";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle, CardDescription } from "./ui/card";

interface PostProps {
  text: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean;
  username: string;
  onToggleLike: () => void;
  quantity: number;
}

const Post: React.FC<PostProps> = ({
  text,
  imageUrl,
  likes,
  likedByUser,
  username,
  onToggleLike,
  quantity

}) => {
  return (
    <Card className="p-4 border rounded-md mb-4">
      <CardTitle className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="font-medium text-[1rem]">{username}</div>
      </CardTitle>
      <CardDescription className="mt-2 text-justify text-gray-200">
        {text}
      </CardDescription>
      {imageUrl && (
        <img src={imageUrl} alt="Post" className="rounded-lg mt-3 w-full" />
      )}
      <div className="mt-2 flex items-center justify-between">
  <div className="flex items-center">
    {likedByUser ? (
      <FaHeart
        onClick={onToggleLike}
        className="cursor-pointer mr-2 text-red-500"
      />
    ) : (
      <FaRegHeart
        onClick={onToggleLike}
        className="cursor-pointer mr-2 text-gray-400"
      />
    )}
    <span>{likes}</span>
  </div>

  <div className="mr-2 flex items-center">
    <span className="mr-2">Quantity:</span>
    <span>{quantity}</span>
  </div>
</div>

    </Card>

  );
};

export default Post;
