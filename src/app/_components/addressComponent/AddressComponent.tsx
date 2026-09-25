"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AddressType } from "@/interfaces/addressType";
import AddressForm from "../addressForm/AddressForm";
import DeleteAddress from "../deleteAddress/DeleteAddress";
import Spinner from "../spinner/Spinner";

export default function AddressComponent() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<AddressType>({
    queryKey: ["getAllAddresses"],
    queryFn: async () => {
      const response = await fetch("/api/addresses");

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      return response.json();
    },
  });

  const addresses = data?.data || [];

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

  return (
    <div className="mx-auto max-w-4xl p-6">
      <AddressForm />

      <h1 className="my-6  border-l-4 border-indigo-600 pl-3 text-2xl font-bold text-gray-900">
        My Addresses
      </h1>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            You don&apos;t have any addresses yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="mb-2 font-semibold text-gray-900">
                  {address.name}
                </h2>

                <p className="text-gray-600">
                  {address.details}
                </p>

                <p className="mt-1 text-gray-600">
                  {address.city}
                </p>

                <p className="mt-1 text-gray-600">
                  {address.phone}
                </p>
              </div>

              <DeleteAddress addressId={address._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

