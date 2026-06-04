import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Header from "../components/header";
import OrderItem from "../components/order-item";

const MyOrders = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  //db
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  const serializedOrders = orders.map((order) => ({
    ...order,
    deliveryFee: Number(order.deliveryFee),
    subtotalPrice: Number(order.subtotalPrice),
    totalPrice: Number(order.totalPrice),
    totalDiscounts: Number(order.totalDiscounts),
    orderProducts: order.orderProducts.map((orderProduct) => ({
      ...orderProduct,
      product: {
        ...orderProduct.product,
        price: Number(orderProduct.product.price),
      },
    })),
    restaurant: {
      ...order.restaurant,
      deliveryFee: Number(order.restaurant.deliveryFee),
    },
  }));

  return (
    <>
      <Header />
      <div className="py-6 px-5">
        <h2 className="font-semibold">Meus pedidos</h2>
        <div className="mt-4">
          {serializedOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
