"use server";

import { OrderFormData } from "@/schemas/orderSchema";
import { getUserToken } from "@/utilites/getToken";

export async function payOnline(
  cartId: string,
  shippingAddress: OrderFormData
) {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
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