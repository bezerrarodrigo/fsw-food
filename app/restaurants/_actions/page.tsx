"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const searchForRestaurants = async (search: string) => {
  const session = await getServerSession(authOptions);

  const restaurants = await prisma.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
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

  return restaurants.map((restaurant) => {
    const { favoriteRestaurants, ...restaurantData } = restaurant;

    return {
      ...restaurantData,
      deliveryFee: Number(restaurant.deliveryFee),
      isFavorited: favoriteRestaurants.length > 0,
    };
  });
};
