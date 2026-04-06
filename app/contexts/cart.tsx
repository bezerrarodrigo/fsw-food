"use client";

import { Product } from "@/generated/prisma/client";
import { createContext, useState } from "react";

export type SerializedProduct = Omit<Product, "price"> & { price: number };

interface CartProduct extends SerializedProduct {
  quantity: number;
}

interface CartContextProps {
  products: CartProduct[];
  addProductToCart: (product: SerializedProduct) => void;
}

export const CartContext = createContext<CartContextProps>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  //states
  const [products, setProducts] = useState<CartProduct[]>([]);

  //functions
  const addProductToCart = (product: SerializedProduct) => {
    setProducts((prev) => [...prev, { ...product, quantity: 0 }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
