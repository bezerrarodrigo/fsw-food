import { Category } from "@/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div className="flex gap-3 overflow-x-scroll py-3">
      {categories.map((category: Category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default CategoryList;
