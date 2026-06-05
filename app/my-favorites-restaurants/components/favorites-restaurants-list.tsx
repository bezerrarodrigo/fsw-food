"use client";

import RestaurantItem from "@/app/components/restaurant-item";
import { Restaurant } from "@/generated/prisma/client";
import { useState } from "react";

type FavoriteRestaurantData = Omit<Restaurant, "deliveryFee"> & {
  deliveryFee: number | Restaurant["deliveryFee"];
  isFavorited?: boolean;
};

interface FavoritesRestaurantsListProps {
  restaurants: FavoriteRestaurantData[];
}

const FavoritesRestaurantsList = ({
  restaurants,
}: FavoritesRestaurantsListProps) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(restaurants);

  const handleFavoriteChange = (restaurantId: string, isFavorited: boolean) => {
    if (isFavorited) {
      return;
    }

    setFavoriteRestaurants((currentRestaurants) =>
      currentRestaurants.filter((restaurant) => restaurant.id !== restaurantId),
    );
  };

  return (
    <div className="grid grid-cols-2 justify-items-center">
      {favoriteRestaurants.map((restaurant) => {
        return (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            onFavoriteChange={(isFavorited) =>
              handleFavoriteChange(restaurant.id, isFavorited)
            }
          />
        );
      })}
    </div>
  );
};

export default FavoritesRestaurantsList;
