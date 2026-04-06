"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { CartContext, CartProduct } from "../contexts/cart";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct: product }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    deleteProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="flex gap-2 px-4 items-center space-y-6">
      <div className="h-20 w-20 relative">
        <Image
          className="rounded-lg object-cover"
          src={product.imageUrl}
          alt={product.name}
          fill
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-xs font-semibold">{product.name}</h3>
        <div className="flex items-center gap-1">
          <div className="flex">
            <h2 className="font-semibold text-xs">
              {(
                Number(product.price) *
                (1 - product.discountPercentage / 100) *
                product.quantity
              ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </h2>
          </div>
          {product.discountPercentage > 0 && (
            <span className="font-light line-through  text-muted-foreground text-xs">
              {(Number(product.price) * product.quantity).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                },
              )}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-center">
          <Button
            size="icon-xs"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={() => decreaseProductQuantity(product.id)}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <span className="w-4 text-sm">{product.quantity}</span>
          <Button
            size="icon-xs"
            variant="ghost"
            className=" border-muted-foreground bg-primary text-white"
            onClick={() => increaseProductQuantity(product.id)}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="ml-auto border border-solid border-muted-foreground"
        onClick={() => deleteProductFromCart(product.id)}
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
