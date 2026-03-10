import { formatPrice } from "@/app/helpers/price";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ImageHeader from "./components/image-header";
import DiscountBadge from "@/app/components/discount-badge";

interface ProductInfoProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductInfo = async ({ params }: ProductInfoProps) => {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
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

      <div className="p-5">
        <div className="flex gap-2 items-center">
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

        <div>
          <h1 className="font-semibold text-xl mb-3 mt-1">{product.name}</h1>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex gap-1 relative">
              <h2 className="text-xl font-semibold">{formatPrice(product)}</h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="font-light line-through text-muted-foreground text-xs">
                {Number(product.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            )}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
