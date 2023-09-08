import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient'; // Import your Supabase client instance here
import Product from './Product';

function ShowProducts({ uuid }) {
  const [products, setProducts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [reviewsData, setReviewsData] = useState({});

  useEffect(() => {
    // Fetch products associated with the given UUID
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, description, price')
        .eq('user_seller', uuid);

      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data);
      }
    }

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, [uuid]);

  useEffect(() => {
    // Fetch reviews associated with each product and store them in reviewsData
    async function fetchReviews() {
      const reviews = {};
      for (const product of products) {
        const { data, error } = await supabase
          .from('reviews')
          .select('description')
          .eq('product_id', product.id);
        if (!error) {
          reviews[product.id] = data;
        }
      }
      setReviewsData(reviews);
    }

    // Call the fetchReviews function when products are fetched
    if (products.length > 0) {
      fetchReviews();
    }
  }, [products]);

  const handleCommentClick = (productId) => {
    // Set the selected product ID for adding a comment
    setSelectedProductId(productId);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    // Check if a product is selected for commenting
    if (selectedProductId === null) {
      return;
    }

    const number = Math.floor(Math.random() * 1000);

    // Perform the comment insertion here using Supabase
    const { error } = await supabase
      .from('reviews')
      .insert({
        id: number,
        description: commentText,
        product_id: selectedProductId,
      });

    if (error) {
      console.error('Error adding comment:', error.message);
    } else {
      // Clear the comment text and reset the selected product
      setCommentText('');
      setSelectedProductId(null);
      console.log('Comment added successfully.');
    }
  };

  return (
    <div className="container">
      <h2 className="mainHeader">Products for User {uuid}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="card">
            <p className="text-lg">
              <strong>Product ID:</strong> {product.id}
            </p>
            <p className="description">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-sm">
              <strong>Price:</strong> ${product.price}
            </p>
            <button
              onClick={() => handleCommentClick(product.id)}
              className="button primary"
            >
              Add Comment
            </button>
            {selectedProductId === product.id && (
              <div>
                <form>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="comment-input"
                    placeholder="Enter your comment..."
                    style={{ color: 'black' }}
                  />
                  <button onClick={handleAddComment} type="submit"> 
                    Post Comment
                  </button>
                </form>
              </div>
            )}

            {/* Map through the reviewsData for this product */}
            {reviewsData[product.id] && (
              <div className="reviews">
                <h3>Reviews:</h3>
                <ul>
                  {reviewsData[product.id].map((review, index) => (
                    <li key={index}>
                      <p>{review.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowProducts;
