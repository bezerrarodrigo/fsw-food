import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

const CategoryList = async () => {
  const categories = await prisma.category.findMany();

  return (
    <div className="flex gap-2">
      {categories.map((category) => (
        <Badge className="px-2 py-1" variant="secondary" key={category.id}>
          <Image
            className="w-9 h-9"
            src={category.imageUrl}
            alt={category.name}
            width={50}
            height={50}
          />
          <span>{category.name}</span>
        </Badge>
      ))}
    </div>
  );
};

export default CategoryList;
