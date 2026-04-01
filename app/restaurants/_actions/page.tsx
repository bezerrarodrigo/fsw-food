"use server";

import { prisma } from "@/lib/prisma";

export const searchForRestaurants = async (search: string) => {
  const restaurants = await prisma.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants.map((restaurant) => ({
    ...restaurant,
    deliveryFee: Number(restaurant.deliveryFee),
  }));
};
