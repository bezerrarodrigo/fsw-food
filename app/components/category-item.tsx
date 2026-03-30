import { Badge } from "@/components/ui/badge";
import { Category } from "@/generated/prisma/browser";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`}>
      <Badge className="shadow-sm bg-white min-w-35" variant="ghost">
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
    </Link>
  );
};

export default CategoryItem;
