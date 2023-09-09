//@ts-ignore
import React, { FC } from "react";
import { ProductListingProps } from "./ProductListingItem";
import ProductListingItem from "./ProductListingItem";

interface ProductListingsProps {}

const ProductListings: FC<ProductListingsProps> = () => {
  const items: ProductListingProps[] = [
    {
      name: "Sony WH-1000XM5",
      filepath: "./xm5.jpeg",
      price: 300,
      sold: 9,
    },
    {
      name: "AirPods Pro",
      filepath: "./airpods.jpeg",
      price: 250,
      sold: 10,
    },
    {
      name: "AirPods Max",
      filepath: "./airpods_max.jpeg",
      price: 700,
      sold: 5,
    },
    {
      name: "Beats Fit Pro",
      filepath: "./beats.jpeg",
      price: 150,
      sold: 20,
    },
  ];
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {items.map((item, i) => (
        <ProductListingItem key={i} {...item}></ProductListingItem>
      ))}
    </div>
  );
};

export default ProductListings;
