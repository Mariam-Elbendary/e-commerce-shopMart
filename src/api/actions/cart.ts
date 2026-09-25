'use server'

import { getUserToken } from "@/utilites/getToken";

export async function addProductToCart(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch( "https://ecommerce.routemisr.com/api/v2/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
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


export async function updateCart(productId: string, count: number,) {
  try {
     const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ count }),
 headers: { "Content-Type": "application/json", token: token  },    });
    if (!response.ok) throw new Error("api error");
    const payload = await response.json();
    return payload.data;
  } catch {
    throw new Error("api error");
  }
}

export async function applyCouponToCart(couponName: string) {
  try {
     const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/applyCoupon`, {
      method: "PUT",
      body: JSON.stringify({ couponName }),
 headers: { "Content-Type": "application/json", token: token  },    });
    if (!response.ok) throw new Error("api error");
    const payload = await response.json();
    return payload.data;
  } catch {
    throw new Error("api error");
  }
}

export async function deleteProductFromCart(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "DELETE",
 headers: { "Content-Type": "application/json", token: token },    });
    if (!response.ok) throw new Error("api error");
    const payload = await response.json();
    return payload.data;
  } catch {
    throw new Error("api error");
  }
}

export async function deleteCart() {
  try {

     const token = await getUserToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "DELETE",
 headers: { "Content-Type": "application/json", token: token },   });
    if (!response.ok) throw new Error("api error");
    const payload = await response.json();
    return payload.data;
  } catch {
    throw new Error("api error");
  }
}
