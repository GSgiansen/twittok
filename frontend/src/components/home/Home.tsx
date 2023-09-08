import { FC } from "react";
import FlashSale from "./flashsale/FlashSale";
import ProductListings from "./products/ProductListings";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <div className="text-left">
        <FlashSale />
        <ProductListings />
      </div>
    </>
  );
};

export default Home;
