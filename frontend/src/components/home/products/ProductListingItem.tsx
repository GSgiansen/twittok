import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import { ListingItemProps } from "../flashsale/FlashSaleItem";

export interface ProductListingProps extends ListingItemProps {
  name: string;
  sold: number;
}

const ProductListingItem: FC<ProductListingProps> = ({ filepath, price, name, sold }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Detailed information about the product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Price: ${price}</p>
          <p>{sold} items sold</p>
          <img src={filepath} alt={name} className="object-cover rounded-lg h-48 w-48" />
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductListingItem;
