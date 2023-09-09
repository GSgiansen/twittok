
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
  const [email, setEmail] = useState<string>("");
  
  
  const uuid = session.session.session.user.id;


  useEffect(() => {
      // Define a function to fetch posts
      const userEmail = session.session.session.user.email;
      const getPostsDataBase = async () => {
        try {
          let { data: products, error } = await supabase
          .from("products")
          .select(
            `id, user_seller, description, price, likes, quantity, profiles(id, username)`
          );          
          if (error) {
            console.error('Error fetching data:', error.message);
          } else {
            // Map fetched data to PostData and update state
            const newPosts = products?.map((product) => ({
              postID: product.id,
              text: product.description,
              imageUrl: randomProduct(),
              likes: product.likes,
              likedByUser: false,
              username: product.profiles.username,
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

  

  const [newPostText, setNewPostText] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string>("");
  const [productNumber, setProductNumber] = useState<number>(0);

  const getUsernameFromuuid = async (uuid: string) => { 
    const {data: profiles, error} = await supabase.from("profiles").select("*").eq("id", uuid);
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      return profiles[0].username;
    }
  }



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

  const randomProduct = () => {
    // choose from the 5 assets loaded alr
    // return the product name
    const num = Math.floor(Math.random() * 5);
    const products = ["public/airpods.jpeg", "public/airpods_max.jpeg", 
    "public/beats.jpeg", "beats.jpeg", "public/xm5.jpeg"];
    return products[num];
  }

  const generatePostID = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async () => {
    if (newPostText) {
      const num = generatePostID();
      const username = await getUsernameFromuuid(uuid);
      setPosts([
        {
          postID: num,
          text: newPostText,
          imageUrl: newPostImage,
          likes: 0,
          likedByUser: false,
          username: username,
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
          key={post.postID}
          {...post}
          onToggleLike={() => handleToggleLike(index)}
        />
      ))}
    </div>
  );
};

export default Feed;
