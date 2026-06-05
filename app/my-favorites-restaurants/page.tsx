import { prisma } from "@/lib/prisma";
import Header from "../components/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import RestaurantItem from "../components/restaurant-item";

export default async function FavoriteRestaurants() {
  //auth
  const session = await getServerSession(authOptions);

  //db
  const userFavoritesRestaurants = await prisma.restaurant.findMany({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
        <div className="grid grid-cols-2 justify-items-center">
          {userFavoritesRestaurants.map((restaurant) => {
            return (
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            );
          })}
        </div>
      </div>
    </>
  );
}
