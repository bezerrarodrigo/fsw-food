import { prisma } from "@/lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  //TODO: buscar restaurantes com maior número de pedidos
  const restaurants = await prisma.restaurant.findMany({
    take: 10,
  });

  return (
    <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden mb-6">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
