import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { FC } from "react";
import { ListingItemProps } from "../flashsale/FlashSaleItem";

export interface ProductListingProps extends ListingItemProps {
  name: string;
  sold: number;
}

const ProductListingItem: FC<ProductListingProps> = ({
  filepath,
  price,
  name,
  sold,
}) => {
  return (
    <Card className="flex flex-col justify-between text-left p-1">
      <CardHeader className="flex items-center p-0">
        <img src={filepath} alt={name} className="object-cover rounded-lg h-48 w-48" />
      </CardHeader>
      <CardContent className="p-1 text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-red-600 font-medium">${price}</p>
        <p className="text-xs">{sold} sold</p>
      </CardContent>
    </Card>
  );
};

export default ProductListingItem;
