"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function createOrder(data: Prisma.OrderCreateInput) {
  await prisma.order.create({
    data,
  });
}
