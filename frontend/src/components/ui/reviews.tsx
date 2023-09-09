import  { useContext, useState } from "react";
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
import { AuthContext } from "@/App";
import Review from "./review";
//@ts-ignore
const Reviews = ({ productId }) => {
  const authObject = useContext(AuthContext);
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
//@ts-ignore
  const fetchReviews = async (productId) => {
    console.log("fetching for ", productId);
    try {
      // Replace this with your actual API request or Supabase query
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId);
      if (reviews) {
        console.log("reviews is ", reviews)
        //@ts-ignore
        setReviews(reviews);
      } else {
        console.error("Error fetching reviews:", error);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const calculateAverageSentiment = () => {
    if (reviews.length === 0) {
      return 0;
    }
  
    let sumSentiment = 0;
    for (const review of reviews) {
      //@ts-ignore
      sumSentiment += review.sentiment;
    }
  
    return sumSentiment / reviews.length;
  };
  
  // Calculate the average sentiment score
  const averageSentiment = calculateAverageSentiment();
  

  const handleSubmit = async () => {
    console.log("session is ", authObject);
    const num = Math.floor(Math.random() * 1000000000);
    const { error } = await supabase
      .from("reviews")
      .insert({
        id: num,
        product_id: productId,
        description: review,
        //@ts-ignore
        commenter: authObject.user.id,
      });
    if (error) {
      console.error("Error inserting review:", error);
    } else {
      console.log("Review inserted successfully");
    }
    // setReviews([
    //   ...reviews,
    //   { id: num, product_id: productId, description: review },
    // ]);
    setReview("");
    setTimeout(() => {
      fetchReviews(productId);
    }, 6000);
  };
  //@ts-ignore
  var sum = 0;
  //@ts-ignore
  let count = 0;

  return (
    <div>
      <Dialog //@ts-ignore
      isOpen={isOpen} onClose={closeDialog}>
        <DialogTrigger onClick={openDialog}>Reviews</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reviews for Product</DialogTitle>
            <DialogDescription>
              <Textarea
                placeholder="What about the product ?"
                className="m-2 w-full p-2 rounded-md mb-2 text-white"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button
                className="button m-2"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <div className="m-2 text-2xl font-bold">
                Average sentiment score: {averageSentiment.toFixed(2)}
              </div>
              {reviews.length === 0 ? (
              <div className="m-2">No reviews available.</div>
            ) : (
              
              reviews.map((review, index) => (
                <Review
                //@ts-ignore
                 className="m-2"
                  key={index}
                  //@ts-ignore
                  id={review.id}
                  //@ts-ignore
                  description={review.description}
                  //@ts-ignore
                  sentimentScore={review.sentiment}
                  //@ts-ignore
                  productId={review.product_id}
                />
              ))
            )
            }
            


            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
