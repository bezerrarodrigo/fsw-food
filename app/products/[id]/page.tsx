import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "./components/product-details";

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

  const serializedProduct = {
    imageUrl: product.imageUrl,
    name: product.name,
    price: Number(product.price),
    discountPercentage: product.discountPercentage,
    description: product.description,
    restaurant: {
      imageUrl: product.restaurant.imageUrl,
      name: product.restaurant.name,
      deliveryFee: Number(product.restaurant.deliveryFee),
      deliveryTime: product.restaurant.deliveryTimeMinutes,
    },
  };

  return <ProductDetails product={serializedProduct} />;
};

export default ProductInfo;
