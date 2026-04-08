"use client";

import { Product } from "@/generated/prisma/client";
import { createContext, useMemo, useState } from "react";

export type SerializedProduct = Omit<Product, "price"> & { price: number };

export interface CartProduct extends SerializedProduct {
  quantity: number;
  restaurant: { deliveryFee: number };
}

interface CartContextProps {
  subtotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  deliveryFee: number;
  products: CartProduct[];
  addProductToCart: (
    product: SerializedProduct & { restaurant: { deliveryFee: number } },
    quantity: number,
  ) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  deleteProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  deliveryFee: 0,
  addProductToCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  deleteProductFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  //states
  const [products, setProducts] = useState<CartProduct[]>([]);

  //variables
  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      const discount = product.discountPercentage
        ? (product.price * product.discountPercentage) / 100
        : 0;
      return acc + (product.price - discount) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subtotalPrice - totalPrice;

  const deliveryFee = useMemo(() => {
    if (products.length === 0) return 0;
    return products[0].restaurant.deliveryFee;
  }, [products]);

  //functions
  const addProductToCart = (
    product: SerializedProduct & { restaurant: { deliveryFee: number } },
    quantity: number,
  ) => {
    if (products.some((p) => p.id === product.id)) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p,
        ),
      );
    } else {
      setProducts((prev) => [...prev, { ...product, quantity }]);
    }
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p,
      ),
    );
  };

  const deleteProductFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        deleteProductFromCart,
        subtotalPrice,
        totalPrice,
        totalDiscount,
        deliveryFee,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
