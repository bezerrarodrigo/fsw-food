import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Header from "../components/header";

const MyOrders = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  //db
  const orders = await prisma.order.findMany({});

  return (
    <>
      <Header />
      <div className="py-6 px-5">
        <h2 className="font-semibold">Meus pedidos</h2>
        <div>
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md mt-4">
              <p>
                <strong>ID do Pedido:</strong> {order.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
