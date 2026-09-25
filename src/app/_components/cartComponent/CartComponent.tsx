"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";
import CartQuantity from "../cartQuantity/CartQuantity";
import ClearCart from "../clearCart/ClearCart";
import RemoveFromCart from "../RemoveFromCart/RemoveFromCart";
import { CartType } from "@/interfaces/cartType";
import Spinner from "../spinner/Spinner";
export default function CartComponent() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<CartType>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      return response.json();
    },
  });

  const products = data?.data?.products || [];
  const total = data?.data?.totalCartPrice || 0;

  const itemsCount = products.reduce(
    (total, item) => total + item.count,
    0
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Something went wrong
          </h2>

          <p className="mt-2 text-gray-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
            <FiShoppingBag className="text-3xl text-indigo-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-500">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <button
            onClick={() => router.push("/shop")}
            className="mt-7 cursor-pointer rounded-full bg-indigo-600 px-8 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <section className="w-full bg-white px-4 py-9 md:px-8">
      <h1 className="text-center text-3xl font-semibold leading-[38px] text-gray-900">
        My Shopping Cart
      </h1>

      <p className="mt-2 text-center text-sm text-gray-500">
        {itemsCount} {itemsCount === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_424px]">
 
        <div className="w-full overflow-hidden rounded-xl bg-white p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] bg-white">
              <thead>
                <tr className="border-b border-gray-300 text-center text-sm font-medium uppercase tracking-wide text-gray-500">
                  <th className="px-2 py-3 text-left">Product</th>
                  <th className="px-2 py-3">Price</th>
                  <th className="px-2 py-3">Quantity</th>
                  <th className="px-2 py-3">Subtotal</th>
                  <th className="w-10 px-2 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.product._id}
                    className="border-b border-gray-100 text-center"
                  >
              
                    <td className="px-2 py-4 text-left align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                        </div>

                        <span className="max-w-55 text-sm font-medium text-gray-800">
                          {item.product.title}
                        </span>
                      </div>
                    </td>

        
                    <td className="px-2 py-4 text-sm font-medium text-gray-700">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex justify-center">
                        <CartQuantity
                          productId={item.product._id}
                          count={item.count}
                        />
                      </div>
                    </td>

                 
                    <td className="px-2 py-4 text-sm font-semibold text-gray-800">
                      ${(item.price * item.count).toFixed(2)}
                    </td>

                 
                    <td className="px-2 py-4">
                      <RemoveFromCart productId={item.product._id} />
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td className="px-2 pt-5" colSpan={3}>
                    <button
                      onClick={() => router.push("/shop")}
                      className="cursor-pointer rounded-full bg-gray-100 px-8 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                      Return to shop
                    </button>
                  </td>

                  <td className="px-2 pt-5 text-right" colSpan={2}>
                    <ClearCart />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

   
        <div className="w-full rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-medium text-gray-900">
            Cart Total
          </h2>

          <div className="flex items-center justify-between border-b border-gray-100 py-3">
            <span className="text-base text-gray-600">
              Total:
            </span>

            <span className="text-base font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-3">
            <span className="text-sm text-gray-600">
              Shipping:
            </span>

            <span className="text-sm font-medium text-gray-900">
              Free
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-3">
            <span className="text-sm text-gray-600">
              Subtotal:
            </span>

            <span className="text-sm font-medium text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-5 w-full cursor-pointer rounded-full bg-indigo-600 px-10 py-4 text-base font-semibold text-white transition hover:bg-indigo-700"
          >
            Proceed to checkout
          </button>
        </div>
      </div>

     
      <div className="mt-6 w-full rounded-lg border border-gray-200 bg-white p-5 lg:max-w-[800px]">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <h3 className="w-full text-xl font-medium text-gray-900 md:w-1/4">
            Coupon Code
          </h3>

          <div className="flex w-full overflow-hidden rounded-full border border-gray-200">
            <input
              placeholder="Enter code"
              type="text"
              className="w-full px-6 py-3.5 text-sm text-gray-700 outline-none"
            />

            <button
              type="button"
              className="shrink-0 cursor-pointer rounded-full bg-gray-800 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-900"
            >
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

