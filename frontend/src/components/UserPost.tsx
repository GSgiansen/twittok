import React from "react";
import { FaRegHeart } from "react-icons/fa";

interface UserPostProps {
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  // Add other product properties as needed
}

const UserPost: React.FC<UserPostProps> = ({
  description,
  price,
  quantity,
  imageUrl,
}) => {
  return (
    <div className="product-card p-4 border rounded-md mb-4">
      <h3 className="font-medium text-[1rem] mb-2">{description}</h3>
      <p className="text-justify text-gray-200">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center">
          <FaRegHeart
            className="cursor-pointer mr-2 text-gray-400"
          />
          <span>0</span>
        </div>
        <img
          src={imageUrl}
          alt="Post"
          className="rounded-lg mt-3 ml-40 h-32 w-32 flex items-center justify-center"
        />
        <div className="mr-2 flex items-center">
          <span className="mr-2 ml-3 text-red-500">Price: ${price}</span>
          <span>Quantity: {quantity}</span>
        </div>

      </div>
    </div>
  );
};

export default UserPost;
