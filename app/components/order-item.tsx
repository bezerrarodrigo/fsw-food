"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, Prisma } from "@/generated/prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  order: Omit<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: true;
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>,
    | "deliveryFee"
    | "subtotalPrice"
    | "totalPrice"
    | "totalDiscounts"
    | "restaurant"
    | "orderProducts"
  > & {
    deliveryFee: number;
    subtotalPrice: number;
    totalPrice: number;
    totalDiscounts: number;
    restaurant: Omit<
      Prisma.OrderGetPayload<{
        include: {
          restaurant: true;
          orderProducts: {
            include: {
              product: true;
            };
          };
        };
      }>["restaurant"],
      "deliveryFee"
    > & { deliveryFee: number };
    orderProducts: Array<
      Omit<
        Prisma.OrderGetPayload<{
          include: {
            restaurant: true;
            orderProducts: {
              include: {
                product: true;
              };
            };
          };
        }>["orderProducts"][number],
        "product"
      > & {
        product: Omit<
          Prisma.OrderGetPayload<{
            include: {
              restaurant: true;
              orderProducts: {
                include: {
                  product: true;
                };
              };
            };
          }>["orderProducts"][number]["product"],
          "price"
        > & { price: number };
      }
    >;
  };
}

const OrderItem = ({ order }: OrderItemProps) => {
  //context
  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();

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

  function handleRedoOrderClick() {
    for (const orderProduct of order.orderProducts) {
      addProductToCart(
        {
          ...orderProduct.product,
          price: Number(orderProduct.product.price),
          restaurant: {
            id: order.restaurant.id,
            deliveryFee: Number(order.restaurant.deliveryFee),
            deliveryTime: order.restaurant.deliveryTimeMinutes,
          },
        },
        orderProduct.quantity,
      );
    }
    router.push("/cart");
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
            <Button
              className="text-primary text-xs"
              variant="ghost"
              size="sm"
              onClick={handleRedoOrderClick}
            >
              Refazer pedido
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
