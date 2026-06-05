"use client";

import { toggleFavoriteRestaurant } from "@/app/actions/favorite-restaurant";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState, useTransition } from "react";

interface FavoriteRestaurantButtonProps {
  restaurantId: string;
  isFavorited?: boolean;
  className?: string;
}

const FavoriteRestaurantButton = ({
  restaurantId,
  isFavorited = false,
  className,
}: FavoriteRestaurantButtonProps) => {
  const { status } = useSession();
  const [favorite, setFavorite] = useState(isFavorited);
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = () => {
    if (status !== "authenticated") {
      signIn();
      return;
    }

    startTransition(async () => {
      try {
        const response = await toggleFavoriteRestaurant(restaurantId);
        setFavorite(response.isFavorited);
      } catch (error) {
        console.error("Erro ao favoritar restaurante", error);
      }
    });
  };

  return (
    <Button
      type="button"
      size="icon"
      disabled={isPending}
      onClick={handleToggleFavorite}
      className={cn("bg-gray-700 rounded-full", className)}
    >
      <Heart
        size={20}
        className={cn(
          "transition-colors",
          favorite ? "fill-red-500 text-red-500" : "fill-white text-white",
        )}
      />
    </Button>
  );
};

export default FavoriteRestaurantButton;
