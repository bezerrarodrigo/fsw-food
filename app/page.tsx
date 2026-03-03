import Image from "next/image";
import CategoryList from "./components/category-list";
import Header from "./components/header";
import Search from "./components/search";
import ProductList from "./components/products-list";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          className="w-full h-auto object-contain"
          src="/banner-promo01.png"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className="px-5 pt-6">
        <ProductList />
      </div>
    </>
  );
}
