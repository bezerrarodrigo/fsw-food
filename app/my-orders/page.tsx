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

  return (
    <>
      <Header />
      <div className="py-6 px-5">
        <h2 className="font-semibold">Meus pedidos</h2>
        <div className="mt-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
