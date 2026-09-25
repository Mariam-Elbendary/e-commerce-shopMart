"use server";

import { OrderFormData } from "@/schemas/orderSchema";
import { getUserToken } from "@/utilites/getToken";

export async function createCashOrder(cartId: string, shippingAddress: OrderFormData) {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress,
        }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("api error");
    }

    const payload = await response.json();

    return payload;
  } catch {
    throw new Error("api error");
  }
}



export async function getUserOrders(userId: string) {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const payload = await response.json();

    return payload;
  } catch {
    throw new Error("Failed to fetch orders");
  }
}