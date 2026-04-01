import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { BikeIcon, Heart, Star, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RestaurantItemData = Omit<Restaurant, "deliveryFee"> & {
  deliveryFee: number | Restaurant["deliveryFee"];
};

interface RestaurantItemProps {
  restaurant: RestaurantItemData;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="space-y-3 mt-4">
        <div className={cn("h-37.5 relative aspect-square", className)}>
          <Image
            className="object-cover rounded-lg shadow-md"
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
          />
          <Badge className="absolute top-2 left-1 bg-white">
            <Star className="fill-yellow-500 text-yellow-500" size={16} />
            <span className="text-xs font-semibold text-black">5.0</span>
          </Badge>
          <Button className="absolute top-2 right-2 bg-gray-700 rounded-full h-7 w-7">
            <Heart className="fill-white" size={12} />
          </Button>
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="truncate font-semibold text-sm">{restaurant.name}</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground flex gap-1 items-center">
                <BikeIcon className="text-primary" size={12} />
                {Number(restaurant.deliveryFee) === 0 ? (
                  <span>Entrega Grátis</span>
                ) : (
                  <span>
                    {Number(restaurant.deliveryFee).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs text-muted-foreground flex gap-1 items-center">
                <TimerIcon className="text-primary" size={12} />
                <span>{restaurant.deliveryTimeMinutes}min</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
