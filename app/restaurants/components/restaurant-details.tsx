import ImageHeader from "@/app/products/[id]/components/image-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
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
          className="absolute top-2 right-2 bg-gray-700/50 rounded-full"
        >
          <Heart className="fill-white" />
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
          <Badge className=" bg-gray-900">
            <Star className="fill-yellow-500" />
            <span className="text-xs font-semibold text-white">5.0</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
