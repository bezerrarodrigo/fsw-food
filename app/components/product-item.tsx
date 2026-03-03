import { Badge } from "@/components/ui/badge";
import { Product } from "@/generated/prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const originalPrice = Number(product.price);
  const discountedPrice =
    originalPrice - (originalPrice * product.discountPercentage) / 100;

  return (
    <div className="w-37.5 space-y-2">
      <div className="h-37.5 min-w-37.5 w-full relative">
        <Image
          className="object-cover rounded-lg shadow-md"
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 37.5rem) 37.5rem, 100vw"
        />
        <Badge className="absolute top-2 left-2">
          <ArrowDown size={16} />
          {product.discountPercentage}%
        </Badge>
      </div>
      <div className="flex flex-col">
        <span className="">{product.name}</span>
        <div className="flex gap-2">
          <span className="font-semibold">
            {discountedPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="font-light line-through">
            {originalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
