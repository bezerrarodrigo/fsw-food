import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import CartItem from "./cart-item";

const Cart = () => {
  //contexts
  const { products } = useContext(CartContext);

  return (
    <div>
      {products.map((product) => (
        <CartItem key={product.id} cartProduct={product} />
      ))}
    </div>
  );
};

export default Cart;
