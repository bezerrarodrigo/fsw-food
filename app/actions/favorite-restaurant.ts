"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const toggleFavoriteRestaurant = async (restaurantId: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const existingFavorite = await prisma.userFavoriteRestaurants.findUnique({
    where: {
      userId_restaurantId: {
        userId: session.user.id,
        restaurantId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.userFavoriteRestaurants.delete({
      where: {
        userId_restaurantId: {
          userId: session.user.id,
          restaurantId,
        },
      },
    });

    return { isFavorited: false };
  }

  await prisma.userFavoriteRestaurants.create({
    data: {
      userId: session.user.id,
      restaurantId,
    },
  });

  return { isFavorited: true };
};
