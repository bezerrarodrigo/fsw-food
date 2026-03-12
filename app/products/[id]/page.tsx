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

  const juices = await prisma.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
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

  const serializedJuices = juices.map((juice) => ({
    id: juice.id,
    imageUrl: juice.imageUrl,
    name: juice.name,
    price: Number(juice.price),
    discountPercentage: juice.discountPercentage,
    restaurant: {
      name: juice.restaurant.name,
    },
  }));

  return (
    <ProductDetails
      product={serializedProduct}
      complementaryProducts={serializedJuices}
    />
  );
};

export default ProductInfo;
