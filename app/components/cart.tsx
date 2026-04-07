import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";

const Cart = () => {
  //contexts
  const { products, subtotalPrice, totalPrice, totalDiscount, deliveryFee } =
    useContext(CartContext);

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>
      <div className="p-5 ">
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
            <Button className="w-full">Finalizar pedido</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
