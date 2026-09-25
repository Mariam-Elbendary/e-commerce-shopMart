'use server'

import { getUserToken } from "@/utilites/getToken";

export async function addProductToWishList(productId: string, ) {
  try {
     const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method: "POST",
      body: JSON.stringify({ productId }),
 headers: { "Content-Type": "application/json", token: token  },   });
    if (!response.ok) throw new Error("api error");
    const payload = await response.json();
    return payload.data;
  } catch {
    throw new Error("api error");
  }
}

export async function deleteProductFromWishList(productId: string, ) {
  try {
     const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: "DELETE",
 headers: { "Content-Type": "application/json", token: token  },    });
    if (!response.ok) throw new Error("api error");
    const payload = await response.json();
    return payload.data;
  } catch {
    throw new Error("api error");
  }
}
