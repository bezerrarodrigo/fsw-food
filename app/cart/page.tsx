import Cart from "../components/cart";
import Header from "../components/header";

const CartPage = () => {
  return (
    <>
      <Header />
      <div className="px-5 pb-6">
        <h2 className="font-semibold mb-4">Meu carrinho</h2>
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
