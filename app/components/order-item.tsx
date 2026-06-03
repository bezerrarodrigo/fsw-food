import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@/generated/prisma/client";
import { ChevronRight } from "lucide-react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: true;
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  //functions
  function getOrderStatusLabel(order: OrderStatus) {
    switch (order) {
      case "CONFIRMED":
        return "Confirmado";
      case "PREPARING":
        return "Em preparo";
      case "OUT_FOR_DELIVERY":
        return "Saiu para entrega";
      case "CANCELLED":
        return "Cancelado";
      case "DELIVERED":
        return "Entregue";
      default:
        return "";
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="space-y-3">
        <Badge>{getOrderStatusLabel(order.status)}</Badge>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={order.restaurant.imageUrl || undefined}
                alt={order.restaurant.name}
              />
            </Avatar>
            <p>{order.restaurant.name}</p>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <Separator className="my-3" />
      </CardContent>
    </Card>
  );
};

export default OrderItem;
