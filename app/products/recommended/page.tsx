import Header from "@/app/components/header";
import ProductItem from "@/app/components/product-item";
import { prisma } from "@/lib/prisma";

const RecommendedProducts = async () => {
  const products = await prisma.product.findMany({
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Produtos Recomendados</h2>
        <div className="grid grid-cols-2 justify-items-center">
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default RecommendedProducts;
