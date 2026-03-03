import { Category } from "@/generated/prisma/browser";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex gap-3 items-center bg-white shadow-sm rounded-full px-4 py-3">
      <Image
        className="w-9 h-9"
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />
      <span className="font-semibold text-sm">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
