"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { createOrder } from "../actions/order";
import { CartContext } from "../contexts/cart";
import CartItem from "./cart-item";

const Cart = () => {
  //state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  //contexts
  const {
    products,
    subtotalPrice,
    totalPrice,
    totalDiscount,
    deliveryFee,
    clearCart,
  } = useContext(CartContext);

  const { data } = useSession();

  //functions
  async function handleFinishOrderClick() {
    if (!data?.user) return;

    const restaurant = products[0]?.restaurant;
    if (!restaurant || products.length === 0) return;

    try {
      setIsSubmitting(true);
      await createOrder({
        subtotalPrice,
        totalPrice,
        totalDiscounts: totalDiscount,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTime,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: "CONFIRMED",
        user: {
          connect: { id: data.user.id },
        },
        orderProducts: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between">
        <div>
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>
        <div className="p-5 mt-auto">
          <Card>
            <CardContent>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs text-muted-foreground">Subtotal:</span>
                <span className="text-xs">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(subtotalPrice)}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-2 mt-2">
                <span className="text-xs text-muted-foreground">Entrega:</span>
                <span
                  className={`text-xs ${deliveryFee === 0 ? "text-red-500" : ""}`}
                >
                  {deliveryFee === 0
                    ? "Grátis"
                    : Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2 border-b pb-2">
                <span className="text-xs text-muted-foreground">Desconto:</span>
                <span className="text-xs text-red-500">
                  -
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalDiscount)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 font-bold text-lg">
                <span className="text-xs text-muted-foreground">Total:</span>
                <span className="text-xs">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalPrice)}
                </span>
              </div>
            </CardContent>
            <div className="px-4">
              <Button
                disabled={isSubmitting}
                className="w-full"
                onClick={() => setShowDialog(true)}
              >
                {isSubmitting && <Loader2 className="animate-spin" />} Finalizar
                pedido
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente finalizar o pedido?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá finalizar seu pedido
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
