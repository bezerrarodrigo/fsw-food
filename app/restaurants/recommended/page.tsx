import Header from "@/app/components/header";
import RestaurantItem from "@/app/components/restaurant-item";
import { prisma } from "@/lib/prisma";

const RecommendedRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
        <div className="grid grid-cols-2 justify-items-center">
          {restaurants.map((restaurant) => {
            return (
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
