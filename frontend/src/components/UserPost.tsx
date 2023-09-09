import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface UserPostProps {
  description: string;
  price: number;
  quantity: number;
  // Add other product properties as needed
}

const UserPost: React.FC<UserPostProps> = ({
  description,
  price,
  quantity,
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
        <div className="mr-2 flex items-center">
          <span className="mr-2">Price: ${price}</span>
          <span>Quantity: {quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
