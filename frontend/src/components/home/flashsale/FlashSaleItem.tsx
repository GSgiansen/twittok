import { Card, CardDescription } from "@/components/ui/card";
import { FC } from "react";

export interface ListingItemProps {
  filepath: string;
  price: number;
}

const FlashSaleItem: FC<ListingItemProps> = ({ filepath, price }) => {
  return (
    <Card className="flex flex-col justify-between text-left w-[70px] p-1">
      <img src={filepath} alt={filepath} className="object-cover rounded-lg h-16 w-16" />
      <CardDescription className="font-medium text-xs">
        ${price}
      </CardDescription>
    </Card>
  );
};

export default FlashSaleItem;
