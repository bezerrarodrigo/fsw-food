import { prisma } from "@/lib/prisma";
import Header from "../components/header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import FavoritesRestaurantsList from "./components/favorites-restaurants-list";

export default async function FavoriteRestaurants() {
  //auth
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <>
        <Header />
        <div className="px-5 space-y-4">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <p className="text-sm text-muted-foreground">
            Faça login para ver seus restaurantes favoritos.
          </p>
        </div>
      </>
    );
  }

  //db
  const userFavoritesRestaurants =
    await prisma.userFavoriteRestaurants.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        restaurant: true,
      },
    });

  return (
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
        <FavoritesRestaurantsList
          restaurants={userFavoritesRestaurants.map(({ restaurant }) => ({
            ...restaurant,
            deliveryFee: Number(restaurant.deliveryFee),
            isFavorited: true,
          }))}
        />
      </div>
    </>
  );
}
