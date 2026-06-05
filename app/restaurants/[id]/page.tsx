import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import RestaurantDetails from "../components/restaurant-details";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

interface RestaurantPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
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

  if (!restaurant) {
    return notFound();
  }

  const { favoriteRestaurants, ...restaurantData } = restaurant;

  return (
    <RestaurantDetails
      restaurant={{
        ...restaurantData,
        isFavorited: favoriteRestaurants.length > 0,
      }}
    />
  );
};

export default RestaurantPage;
