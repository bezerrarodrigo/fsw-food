"use client";

import { Restaurant } from "@/generated/prisma/browser";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/header";
import RestaurantItem from "../components/restaurant-item";
import { searchForRestaurants } from "./_actions/page";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("search");

  //states
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Restaurantes Encontrados</h2>
        <div className="flex flex-col">
          {restaurants.map((restaurant) => {
            return (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="w-full"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
