
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FaFilter } from "react-icons/fa";
import Post from "./Post";
import supabase from "@/supabaseClient";
import { get } from "http";

interface PostData {
  postID: number;
  text: string;
  imageUrl?: string;
  likes: number;
  likedByUser: boolean;
  username: string;
  quantity: number;
}

const Feed: React.FC = (session) => {
  const [posts, setPosts] = useState<PostData[]>(
    []
    );
  const userEmail = session.session.session.user.email;
  const uuid = session.session.session.user.id;
  useEffect(() => {
      // Define a function to fetch posts
      const userEmail = session.session.session.user.email;
      const getPostsDataBase = async () => {
        try {
          let { data: products, error } = await supabase
            .from('products')
            .select('*');
  
          if (error) {
            console.error('Error fetching data:', error.message);
          } else {
            // Map fetched data to PostData and update state
            const newPosts = products?.map((product) => ({
              postID: product.id,
              text: product.description,
              imageUrl: product.description,
              likes: product.likes,
              likedByUser: false,
              username: product.user_seller,
              quantity: product.quantity,
            }));
  
            if (newPosts) {
              setPosts(newPosts);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
      // Call the data fetching function when the component mounts
      getPostsDataBase();
    }, []);
  
  // linking  the uuid to the email 
  // const getEmailFromUid = async (uid: string) => {
  //   console.log(uid)
  //   try {
  //     let { data: users, error } = await supabase.auth.getUser(uid);
  //     console.log(users)
      
  //   if (error) {
  //       console.error('Error fetching data:', error.message);
  //     }
  //   }
  //   catch (error) {
  //     console.error('Error fetching data:', error.message);
  //   }

  // }


  const [newPostText, setNewPostText] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string>("");
  const [productNumber, setProductNumber] = useState<number>(0);

  const handleToggleLike = (index: number) => {
    const updatedPosts = [...posts];
    if (updatedPosts[index].likedByUser) {
      updatedPosts[index].likes -= 1;
    } else {
      updatedPosts[index].likes += 1;
    }
    updatedPosts[index].likedByUser = !updatedPosts[index].likedByUser;
    setPosts(updatedPosts);
  };

  const generatePostID = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async () => {
    if (newPostText) {
      const num = generatePostID();
      setPosts([
        {
          postID: num,
          text: newPostText,
          imageUrl: newPostImage,
          likes: 0,
          likedByUser: false,
          username: userEmail,
          quantity: productNumber,
        },
        ...posts,
      ]);

      const { error } = await supabase
    .from('products')
    .insert({id: num, description: newPostText, likes: 0, user_seller: uuid, price: 200, quantity: productNumber})
      
      setProductNumber(0);
      setNewPostText("");
      setNewPostImage("");
    }
  };

  const handleSentimentFilter = () => {
    //Link the filter here
  };

  return (
    <div className="max-w-2xl mx-auto rounded-md">
      <div className="grid w-full gap-2 py-2">
        <Textarea
          placeholder="What's the hottest product?"
          className="w-full p-2 rounded-md mb-2 text-white"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Link to product (optional)"
          className="w-full p-2 rounded-md mb-2 text-tiktok-black"
          value={newPostImage}
          onChange={(e) => setNewPostImage(e.target.value)}
          style = {{color: "white"}}
        />
        <Input 
          type="text"
          placeholder="Number of products"
          className="w-full p-2 rounded-md mb-2 text-tiktok-black"
          value={productNumber}
          onChange={(e) => setProductNumber(e.target.value)}
          style = {{color: "white"}}

        />
        <Button
          onClick={handleSubmit}
          className="bg-tiktok-red text-white mb-2"
        >
          Post
        </Button>
      </div>
      {posts.map((post, index) => (
        <Post
          key={index}
          {...post}
          onToggleLike={() => handleToggleLike(index)}
        />
      ))}
    </div>
  );
};

export default Feed;
