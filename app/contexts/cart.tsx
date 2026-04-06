"use client";

import { Product } from "@/generated/prisma/client";
import { createContext, useState } from "react";

export type SerializedProduct = Omit<Product, "price"> & { price: number };

export interface CartProduct extends SerializedProduct {
  quantity: number;
}

interface CartContextProps {
  products: CartProduct[];
  addProductToCart: (product: SerializedProduct, quantity: number) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  deleteProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextProps>({
  products: [],
  addProductToCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  deleteProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  //states
  const [products, setProducts] = useState<CartProduct[]>([]);

  //functions
  const addProductToCart = (product: SerializedProduct, quantity: number) => {
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

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        deleteProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
