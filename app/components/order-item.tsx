import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@/generated/prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProducts: {
        include: {
          product: true;
        };
      };
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
        <Badge
          className={`w-fit ${order.status !== "DELIVERED" ? "bg-green-500" : "bg-muted text-muted-foreground"}`}
        >
          {getOrderStatusLabel(order.status)}
        </Badge>
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

          <Button variant="link" size="icon" asChild>
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </Button>
        </div>
        <Separator className="my-3" />
        <div className="space-y-1.5">
          {order.orderProducts.map((orderProduct) => (
            <div
              key={`${orderProduct.id}-${orderProduct.productId}`}
              className="space-x-2 flex gap-2 items-center"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-400">
                <span className="text-xs block text-white">
                  {orderProduct.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <p className="text-sm">Total: R$ {order.totalPrice.toFixed(2)}</p>
          {order.status === "DELIVERED" && (
            <Button className="text-primary text-xs" variant="ghost" size="sm">
              Refazer pedido
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
