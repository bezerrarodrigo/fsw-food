import Header from "@/app/components/header";
import RestaurantItem from "@/app/components/restaurant-item";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);

  const restaurants = await prisma.restaurant.findMany({
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
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
        <div className="grid grid-cols-2 justify-items-center">
          {restaurants.map((restaurant) => {
            const { favoriteRestaurants, ...restaurantData } = restaurant;

            return (
              <RestaurantItem
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
      </div>
    </>
  );
};

export default RecommendedRestaurants;
