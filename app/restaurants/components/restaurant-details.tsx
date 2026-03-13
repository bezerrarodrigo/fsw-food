import ProductList from "@/app/components/products-list";
import ImageHeader from "@/app/products/[id]/components/image-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { BikeIcon, Heart, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  deliveryFee: number;
  deliveryTimeMinutes: number;
}

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

const RestaurantDetails = async ({ restaurant }: RestaurantDetailsProps) => {
  const restaurantProducts = await prisma.product.findMany({
    where: {
      restaurantId: restaurant.id,
    },
  });

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
        <Card className="mt-6 mx-5">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>
              {restaurant.deliveryFee == 0 ? (
                <span className="font-medium">Grátis</span>
              ) : (
                <span className="font-medium">
                  {Number(restaurant.deliveryFee).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Tempo</span>
                <TimerIcon size={14} />
              </div>
              <span>{restaurant.deliveryTimeMinutes}min</span>
            </div>
          </div>
        </Card>
        <div className="px-5 mt-6">
          <h2 className="font-semibold text-md">Mais Pedidos</h2>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
