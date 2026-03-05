import { ChevronRight } from "lucide-react";
import Image from "next/image";
import CategoryList from "./components/category-list";
import Header from "./components/header";
import ProductList from "./components/products-list";
import Search from "./components/search";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
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
      <main className="space-y-4">
        <div className="px-5">
          <Search />
        </div>
        <div className="px-5">
          <CategoryList />
        </div>
        <div className="px-5">
          <PromoBanner
            src="/banner-promo01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </div>
        <div className="flex items-center justify-between px-5 mb-2">
          <p className="font-semibold">Pedidos Recomendados</p>
          <Button variant="ghost" className="text-primary pr-0">
            Ver todos
            <ChevronRight size={16} />
          </Button>
        </div>
        <ProductList products={products} />
        <div className="px-5">
          <PromoBanner
            src="/banner-promo02.png"
            alt="Valores promocionais em hamburgers"
          />
        </div>
      </main>
    </>
  );
}
