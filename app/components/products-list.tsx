import { prisma } from "@/lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="flex overflow-x-scroll gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
