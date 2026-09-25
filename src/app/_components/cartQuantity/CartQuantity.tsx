"use client";
import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart, deleteProductFromCart } from "@/api/actions/cart";

export default function CartQuantity({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(count);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuantity(count);
  }, [count]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newCount: number) => {
      if (newCount === 0) {
        return deleteProductFromCart(productId);
      }

      return updateCart(productId, newCount);
    },

    onSuccess: (_, newCount) => {
      if (newCount === 0) {
        toast.success("Product removed from cart");
      }

      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      });
    },

    onError: () => {
      setQuantity(count);
      toast.error("Failed to update quantity");
    },
  });

  function handleIncrease() {
    const newCount = quantity + 1;

    setQuantity(newCount);
    mutate(newCount);
  }

  function handleDecrease() {
    const newCount = quantity - 1;

    setQuantity(newCount);
    mutate(newCount);
  }

  return (
    <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
      <button
        onClick={handleDecrease}
        disabled={isPending}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-xl text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-50"
      >
        <FiMinus />
      </button>

      <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-200 bg-white px-3 font-semibold text-gray-900">
        {quantity}
      </span>

      <button
        onClick={handleIncrease}
        disabled={isPending}
        className="flex h-10 cursor-pointer w-10 items-center justify-center rounded-r-xl text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-50"
      >
        <FiPlus />
      </button>
    </div>
  );
}

