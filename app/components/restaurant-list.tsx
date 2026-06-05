import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  //TODO: buscar restaurantes com maior número de pedidos
  const restaurants = await prisma.restaurant.findMany({
    take: 10,
    include: {
      favoriteRestaurants: {
        where: {
          userId: session?.user?.id,
        },
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden mb-6">
      {restaurants.map((restaurant) => {
        const { favoriteRestaurants, ...restaurantData } = restaurant;

        return (
          <RestaurantItem
            className="min-w-75"
            key={restaurant.id}
            restaurant={{
              ...restaurantData,
              deliveryFee: Number(restaurantData.deliveryFee),
              isFavorited: favoriteRestaurants.length > 0,
            }}
          />
        );
      })}
    </div>
  );
};

export default RestaurantList;
