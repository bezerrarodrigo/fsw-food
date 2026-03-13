"use client";

import DiscountBadge from "@/app/components/discount-badge";
import { formatPrice } from "@/app/helpers/price";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ImageHeader from "./image-header";
import ProductList from "@/app/components/products-list";

interface ProductDetailsProduct {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  restaurant: {
    imageUrl: string;
    name: string;
    deliveryFee: number;
    deliveryTime: number;
  };
}

interface ComplementaryProduct {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  discountPercentage: number;
  restaurant: {
    name: string;
  };
}

interface ProductDetailsProps {
  product: ProductDetailsProduct;
  complementaryProducts: ComplementaryProduct[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  //state
  const [quantity, setQuantity] = useState(1);

  //handlers
  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <div>
      <div className="w-full h-89 relative">
        <ImageHeader
          product={{
            imageUrl: product.imageUrl,
            name: product.name,
          }}
        />
      </div>

      <div className="py-5 relative rounded-tl-3xl rounded-tr-3xl bg-white -mt-6 shadow-lg">
        <div className="flex gap-2 items-center px-5">
          <div className="h-6 w-6 relative">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        <div className="px-5">
          <h1 className="font-semibold text-xl mb-3 mt-1">{product.name}</h1>
        </div>

        <div className="flex items-center justify-between px-5">
          <div className="flex flex-col">
            <div className="flex gap-1 relative">
              <h2 className="text-xl font-semibold">{formatPrice(product)}</h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="font-light line-through  text-muted-foreground text-sm">
                De:{" "}
                {Number(product.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              disabled={quantity <= 1}
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button onClick={handleIncreaseQuantity}>
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>

        <Card className="mt-6 mx-5">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>
              {product.restaurant.deliveryFee === 0 ? (
                <span className="font-medium">Grátis</span>
              ) : (
                <span className="font-medium">
                  {Number(product.restaurant.deliveryFee).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Tempo</span>
                <TimerIcon size={14} />
              </div>
              <span>{product.restaurant.deliveryTime}min</span>
            </div>
          </div>
        </Card>

        <div className="mt-4 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold px-5">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="px-5 mt-6">
          <Button className="w-full h-12 font-semibold">
            Adicionar a sacola
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
