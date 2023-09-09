import React, { useEffect, useState } from "react";
import supabase from "@/supabaseClient"; // Import your Supabase client instance here
import { Session } from "@supabase/supabase-js"; // Import Session type from supabase library
import UserPost from "./UserPost";

interface ProductData {
  id: number;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  // Add other product properties as needed
}

interface ListingsProps {
  session: Session | null; // Accept session as a prop
}

const Listings: React.FC<ListingsProps> = ({ session }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  //@ts-ignore
  const sess = session.session
  const uuid = sess.user.id;

  const randomProduct = () => {
    // choose from the 5 assets loaded alr
    // return the product name
    const num = Math.floor(Math.random() * 5);
    const products = ["public/airpods.jpeg", "public/airpods_max.jpeg", 
    "public/beats.jpeg", "beats.jpeg", "public/xm5.jpeg"];
    return products[num];
  }

  useEffect(() => {
    // Define a function to fetch products created by the current user session
    const getProducts = async () => {
      try {
        let { data: products, error } = await supabase
          .from('products')
          .select('*')
          .eq('user_seller', uuid); // Filter by the user's ID

        if (error) {
          console.error('Error fetching products:', error.message);
        } else {
          setProducts(products || []);
        }
      } catch (error) {
        //@ts-ignore
        console.error('Error fetching products:', error.message);
      }
    };

    // Call the data fetching function when the component mounts
    if (uuid) {
      getProducts();
    }
  }, [session, uuid]);

  return (
    <div>
      <h2 className = "text-2xl font-bold mb-4">Your Listings</h2>
      {products.length === 0 ? (
        <p>No listings found.</p>
      ) : 
      (
        products.map((product) => (
          
          <UserPost
            key={product.id}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            imageUrl={randomProduct()}
          />
        ))
      )
      }
    </div>
  );
};

export default Listings;
