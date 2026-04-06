"use client";

import DiscountBadge from "@/app/components/discount-badge";
import InfoDeliveryCard from "@/app/components/infoDelivery-card";
import ProductList from "@/app/components/products-list";
import { formatPrice } from "@/app/helpers/price";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ImageHeader from "./image-header";
import { CartContext, SerializedProduct } from "@/app/contexts/cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "@/app/components/cart";

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
  product: SerializedProduct & {
    restaurant: {
      imageUrl: string;
      name: string;
      deliveryFee: number;
      deliveryTime: number;
    };
  };
  complementaryProducts: ComplementaryProduct[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  //contexts
  const { addProductToCart, products } = useContext(CartContext);

  //state
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  //handlers
  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleToCartClick() {
    addProductToCart(product);
    setIsCartOpen(true);
  }

  console.log(products);

  return (
    <>
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
                <h2 className="text-xl font-semibold">
                  {formatPrice(product)}
                </h2>
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

          <InfoDeliveryCard
            deliveryFee={product.restaurant.deliveryFee}
            deliveryTimeMinutes={product.restaurant.deliveryTime}
          />

          <div className="mt-4 px-5">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold px-5">Sucos</h3>
            <ProductList products={complementaryProducts} />
          </div>

          <div className="px-5 mt-6">
            <Button
              className="w-full h-12 font-semibold"
              onClick={handleToCartClick}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={() => setIsCartOpen(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Meu carrinho</SheetTitle>
            <SheetDescription>Itens adicionados ao carrinho.</SheetDescription>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductDetails;
