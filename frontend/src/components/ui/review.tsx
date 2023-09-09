import React from "react";

interface ReviewProps {
  description: string;
  id: number;
  sentimentScore: number;
  productId: number;
}

const Review: React.FC<ReviewProps> = ({
  description,
  id,
  sentimentScore,
  productId,
}) => {
  return (
<div 
  className={`w-full p-2 rounded-md mb-2 text-white border ${
    sentimentScore > 0
      ? 'border-green-500'
      : sentimentScore < 0
      ? 'border-red-500'
      : 'border-gray-300'
  }`}
>
  <h4>Review #{id}</h4>
  <p>Description: {description}</p>
  <p>Sentiment Score: {sentimentScore}</p>
  <p>Product ID: {productId}</p>
</div>


  );
};

export default Review;
