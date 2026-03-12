import ProductItem from "./product-item";

interface ProductListProps {
  products: {
    id: string;
    imageUrl: string;
    name: string;
    price: number | string | { toString(): string };
    discountPercentage: number;
    restaurant: {
      name: string;
    };
  }[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
