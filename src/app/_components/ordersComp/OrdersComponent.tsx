"use client";
import React from "react";
import { getMyOrders } from "./ordersFn";
import Spinner from "../spinner/Spinner";

export default function OrdersComponent() {
  const { data, isLoading, isError } = getMyOrders();

  if (isLoading) {
      return <Spinner/>;
    }
  
  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-500">
            Please try again later
          </p>
        </div>
      </div>
    );
  }
  
  const orders = data || [];

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
          You don't have any orders yet.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-lg border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-5 flex flex-col justify-between gap-3 border-b pb-4 dark:border-gray-700 sm:flex-row">
                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-white">
                    Order #{order.id}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    Payment:
                    <span className="font-semibold">
                      {order.paymentMethodType}
                    </span>
                  </p>

                  <p>
                    Status:
                    <span className="font-semibold">
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b pb-4 last:border-b-0 dark:border-gray-700"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="h-20 w-20 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {item.product.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Quantity: {item.count}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price: {item.price} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-4 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>{order.shippingPrice} EGP</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>{order.taxPrice} EGP</span>
                </div>

                <div className="mt-3 flex justify-between text-lg font-bold text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span>{order.totalOrderPrice} EGP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}