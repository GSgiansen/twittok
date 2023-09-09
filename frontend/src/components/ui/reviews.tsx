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
import { Textarea } from "./textarea";



const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");

  const openDialog = () => {
    setIsOpen(true);
    // Fetch reviews when the dialog is opened
    fetchReviews(productId);
  };

  const closeDialog = () => {
    setIsOpen(false);
    // Clear reviews when the dialog is closed (optional)
    setReviews([]); //who's in paris??? the NNNnnNNNNn
  };

  const fetchReviews = async (productId) => {
    console.log("fetching for ", productId)
    try {
      // Replace this with your actual API request or Supabase query
      const {data: reviews, error} = await supabase.from("reviews").select("*").eq("product_id", productId);
      if (reviews) {
        setReviews(reviews);
      } else {
        console.error("Error fetching reviews:", error)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("session is ", session)
    const num = Math.floor(Math.random() * 1000000000)
    const {error} = await supabase.from('reviews').insert({ id:num, product_id: productId, description: review
        , commenter: session.session.user.id
    })
    if (error) {
        console.error("Error inserting review:", error);
        }
    else {
        console.log("Review inserted successfully")
        }
    setReviews([...reviews, {id:num, product_id: productId, description: review}])
    setReview("")
  }

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
                <div>
                    <Textarea
                    placeholder="What about the product ?"
                    className="m-2 w-full p-2 rounded-md mb-2 text-white"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    />
                    <button className="button m-2" type="button" onClick={handleSubmit}
                    >
                        Submit
                    </button>

                    <ul>
                        {reviews.map((review) => (
                        <li className="m-2" key={review.id}>{review.description}</li>
                        ))}
                    </ul>


                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
