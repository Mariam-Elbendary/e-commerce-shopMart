"use server";

import { getUserToken } from "@/utilites/getToken";

export async function addAddress(address: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        body: JSON.stringify(address),
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

    return payload.data;
  } catch {
    throw new Error("api error");
  }
}

export async function deleteAddress(addressId: string) {
  try {
    const token = await getUserToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
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

    return payload.data;
  } catch {
    throw new Error("api error");
  }
}