import { useContext } from "react";
import { CartContext } from "../contexts/cart";

const Cart = () => {
  //contexts
  const { products } = useContext(CartContext);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default Cart;
