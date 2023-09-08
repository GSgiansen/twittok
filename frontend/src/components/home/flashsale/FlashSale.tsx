import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { FC } from "react";
import CountdownTimer from "./CountdownTimer";
import FlashSaleItem, { ListingItemProps } from "./FlashSaleItem";

interface FlashSaleProps {}

const FlashSale: FC<FlashSaleProps> = () => {
  const items: ListingItemProps[] = [
    {
      filepath: "./xm5.jpeg",
      price: 300,
    },
    {
      filepath: "./airpods.jpeg",
      price: 250,
    },
    {
      filepath: "./airpods_max.jpeg",
      price: 700,
    },
    {
      filepath: "./beats.jpeg",
      price: 150,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Flash Sale</CardTitle>
        <CountdownTimer />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {items.map((item, i) => (
            <FlashSaleItem
              key={i}
              filepath={item.filepath}
              price={item.price}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashSale;
