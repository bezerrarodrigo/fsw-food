import Header from "@/app/components/header";
import ProductItem from "@/app/components/product-item";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          restaurant: { select: { name: true } },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 space-y-4">
        <h2 className="font-semibold">Os {category?.name} mais pedidos.</h2>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {category?.products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
