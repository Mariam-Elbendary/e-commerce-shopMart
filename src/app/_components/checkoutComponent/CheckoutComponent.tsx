"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import {
  useMyAddresses,
  useMyCart,
  useCreateCashOrder,
  usePayOnline,
} from "./checkoutFn";
import Spinner from "../spinner/Spinner";

export default function CheckoutComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { data, isLoading, isError } = useMyCart();

  const {
    addressData
  } = useMyAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState("");

  const { mutate, isPending } = useCreateCashOrder();
  const { mutate: payOnlineOrder, isPending: isOnlinePending } = usePayOnline();
  
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
            Please try again later.
          </p>
        </div>
      </div>
    );
  }
  

  const cartId = data?.cartId;
  const total = data?.data?.totalCartPrice || 0;
  const addresses = addressData?.data || [];

function handlePlaceOrder() {
  if (!selectedAddressId) {
    toast.error("Please select an address");
    return;
  }

  if (!cartId) {
    toast.error("Cart not found");
    return;
  }

  const selectedAddress = addresses.find(
    (address) => address._id === selectedAddressId
  );

  if (!selectedAddress) {
    toast.error("Please select an address");
    return;
  }

  const shippingAddress = {
    details: selectedAddress.details,
    phone: selectedAddress.phone,
    city: selectedAddress.city,
  };

  if (paymentMethod === "cash") {
    mutate(
      {
        cartId,
        shippingAddress,
      },
      {
        onSuccess: () => {
          toast.success("Order created successfully");

          queryClient.invalidateQueries({
            queryKey: ["getCart"],
          });

          router.push("/allorders");
        },

        onError: () => {
          toast.error("Failed to create order");
        },
      }
    );
  } else {
    payOnlineOrder(
      {
        cartId,
        shippingAddress,
      },
      {
        onSuccess: (data) => {
          window.location.href = data.session.url;
        },

        onError: () => {
          toast.error("Failed to start online payment");
        },
      }
    );
  }
}
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-3xl p-8">
        <div className="rounded-lg border bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
            Checkout
          </h1>
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-white">
              Shipping Address
            </h2>

            {addresses.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                You don&apos;t have any addresses yet.
              </p>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    onClick={() => setSelectedAddressId(address._id)}
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      selectedAddressId === address._id
                        ? "border-teal-500 bg-teal-50 dark:border-teal-500 dark:bg-gray-700"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === address._id}
                        onChange={() =>
                          setSelectedAddressId(address._id)
                        }
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {address.name}
                        </h3>

                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {address.details}
                        </p>

                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {address.city}
                        </p>

                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {address.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-white">
              Payment Information
            </h2>

            <div className="space-y-4">
  <label className="flex cursor-pointer items-center gap-3">
    <input
      type="radio"
      name="payment"
      value="cash"
      checked={paymentMethod === "cash"}
      onChange={() => setPaymentMethod("cash")}
    />

    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">
        Cash on Delivery
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Pay when your order is delivered.
      </p>
    </div>
  </label>

  <label className="flex cursor-pointer items-center gap-3">
    <input
      type="radio"
      name="payment"
      value="online"
      checked={paymentMethod === "online"}
      onChange={() => setPaymentMethod("online")}
    />

    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">
        Online Payment
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Pay securely with Stripe.
      </p>
    </div>
  </label>
</div>
          </div>
          <div className="mt-6 border-t pt-6 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700 dark:text-white">
                Total
              </span>

              <span className="text-xl font-bold text-gray-800 dark:text-white">
                {total} EGP
              </span>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
          <button
  onClick={handlePlaceOrder}
  disabled={isPending || isOnlinePending || !selectedAddressId}
  className="rounded-lg bg-indigo-600 cursor-pointer px-6 py-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 "
>
  {isPending || isOnlinePending ? "Placing Order..." : "Place Order"}
</button>
          </div>
        </div>
      </div>
    </div>
  );
}