import { prisma } from "@/lib/prisma";
import RestaurantDetails from "../components/restaurant-details";
import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
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
    },
  });
  if (!restaurant) {
    return notFound();
  }

  return <RestaurantDetails restaurant={restaurant} />;
};

export default RestaurantPage;
