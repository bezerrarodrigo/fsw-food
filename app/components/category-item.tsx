import { Badge } from "@/components/ui/badge";
import { Category } from "@/generated/prisma/browser";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge className="shadow-sm bg-white" variant="ghost">
      <Image
        className="w-9 h-9"
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />
      <span className="font-semibold text-sm text-muted-foreground">
        {category.name}
      </span>
    </Badge>
  );
};

export default CategoryItem;
