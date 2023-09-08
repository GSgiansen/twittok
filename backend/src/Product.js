import React from 'react';

// Create a new Product component to render the product details
function Product({ productData }) {
  return (
    <div className="product">
      <h3>{productData.name}</h3>
      <p>Description: {productData.description}</p>
      <p>Price: ${productData.price}</p>
      {/* You can add more product details here */}
    </div>
  );
}

export default Product;
