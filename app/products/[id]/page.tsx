import { prisma } from "@/lib/prisma";

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
  });
  return <div>{product?.name}</div>;
};

export default ProductInfo;
