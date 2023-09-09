import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import supabase from "@/supabaseClient";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
    // Fetch reviews when the dialog is opened
    fetchReviews(productId);
  };

  const closeDialog = () => {
    setIsOpen(false);
    // Clear reviews when the dialog is closed (optional)
    setReviews([]);
  };

  const fetchReviews = async (productId) => {
    console.log("fetching for ", productId)
    try {
      // Replace this with your actual API request or Supabase query
      const {data: reviews, error} = await supabase.from("reviews").select("*").eq("product_id", productId);

      console.log(reviews)
      if (reviews) {
        setReviews(reviews);
      } else {
        console.error("Error fetching reviews:", error)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div>
      <Dialog isOpen={isOpen} onClose={closeDialog}>
        <DialogTrigger onClick={openDialog}>Reviews</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reviews for Product</DialogTitle>
            <DialogDescription>
              {reviews.length === 0 ? (
                <p>No reviews available.</p>
              ) : (
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id}>{review.description}</li>
                  ))}
                </ul>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
