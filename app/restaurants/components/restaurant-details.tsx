import InfoDeliveryCard from "@/app/components/infoDelivery-card";
import ProductList from "@/app/components/products-list";
import ImageHeader from "@/app/products/[id]/components/image-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, StarIcon } from "lucide-react";
import Image from "next/image";

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  deliveryFee: number | string | { toString(): string };
  deliveryTimeMinutes: number;
  categories: {
    id: string;
    name: string;
  }[];
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number | string | { toString(): string };
    discountPercentage: number;
    restaurant: {
      name: string;
    };
  }[];
}

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

const RestaurantDetails = async ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div>
      <div className="w-full h-53.75 relative">
        <ImageHeader
          product={{
            imageUrl: restaurant.imageUrl,
            name: restaurant.name,
          }}
        />
        <Button
          size="icon"
          className="absolute top-4 right-4 bg-gray-700 rounded-full"
        >
          <Heart size={20} className="fill-white" />
        </Button>
      </div>

      <div className="py-5 relative rounded-tl-3xl rounded-tr-3xl bg-white -mt-6 shadow-lg h-screen">
        <div className="flex items-center justify-between px-5">
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 relative">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-lg font-semibold">{restaurant.name}</p>
          </div>
          <Badge className="bg-foreground">
            <StarIcon className="fill-yellow-500 text-yellow-500" />
            <span className=" font-semibold text-white">5.0</span>
          </Badge>
        </div>
        <InfoDeliveryCard
          deliveryFee={restaurant.deliveryFee}
          deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
        />

        <div className="overflow-x-scroll mt-6 flex gap-4 px-5 [&&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((category) => (
            <Badge
              variant="secondary"
              key={category.id}
              className="mr-2 mb-2 min-w-44"
            >
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {/* TODO: produtos mais pedidos */}
          <h2 className="font-semibold text-md px-5">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
