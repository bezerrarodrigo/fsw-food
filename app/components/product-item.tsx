import { Badge } from "@/components/ui/badge";
import { Product } from "@/generated/prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "../helpers/price";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
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
        {product.discountPercentage && (
          <Badge className="absolute top-2 left-1 font-bold">
            <ArrowDown size={16} />
            <span className="text-xs font-bold">
              {product.discountPercentage}%
            </span>
          </Badge>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">{formatPrice(product)}</h2>
          {product.discountPercentage > 0 && (
            <span className="font-light line-through text-muted-foreground text-xs">
              {Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
