import { Badge } from "@/components/ui/badge";
import { Product } from "@/generated/prisma/browser";
import { ArrowDown } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <Badge>
      <ArrowDown size={16} />
      <span className="text-xs font-bold">{product.discountPercentage}%</span>
    </Badge>
  );
};

export default DiscountBadge;
