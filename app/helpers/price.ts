import { Product } from "@/generated/prisma/client";

export function formatPrice(product: Product): string {
  if (product.discountPercentage === 0) {
    return Number(product.price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const discountedPrice =
    Number(product.price) -
    (Number(product.price) * product.discountPercentage) / 100;
  return discountedPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
