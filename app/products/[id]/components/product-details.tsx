"use client";

import Cart from "@/app/components/cart";
import DiscountBadge from "@/app/components/discount-badge";
import InfoDeliveryCard from "@/app/components/infoDelivery-card";
import ProductList from "@/app/components/products-list";
import { CartContext, SerializedProduct } from "@/app/contexts/cart";
import { formatPrice } from "@/app/helpers/price";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ImageHeader from "./image-header";

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
  const {
    addProductToCart,
    products: cartProducts,
    clearCart,
  } = useContext(CartContext);

  //state
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  //handlers
  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleToCartClick() {
    const hasDifferentRestaurant =
      cartProducts.length > 0 &&
      cartProducts.some((p) => p.restaurantId !== product.restaurant.name);

    if (hasDifferentRestaurant) {
      setIsConfirmDialogOpen(true);
      return;
    }

    addProductToCart(product, quantity);
    setIsCartOpen(true);
  }

  function handleClearAndAdd() {
    clearCart();
    addProductToCart(product, quantity);
    setIsConfirmDialogOpen(false);
    setIsCartOpen(true);
  }

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

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Produto de outro restaurante</DialogTitle>
            <DialogDescription>
              Você possui itens de outro restaurante no carrinho. Deseja limpar
              o carrinho e adicionar este produto, ou manter os itens atuais?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
              className="w-full"
            >
              Manter carrinho
            </Button>
            <Button onClick={handleClearAndAdd} className="w-full">
              Limpar e adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
