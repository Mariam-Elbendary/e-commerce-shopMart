"use client"
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "@/api/actions/cart";

export default function ClearCart() {
  
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteCart,

    onSuccess: () => {
      toast.success("Cart cleared");
     queryClient.invalidateQueries({queryKey :["getCart"]})
    },

    onError: () => {
      toast.error("Failed to clear cart");
    },
  });

  function handleClearCart() {
    mutate();
  }

  return (
    <button
      onClick={handleClearCart}
      disabled={isPending}
      className="flex items-center cursor-pointer gap-2 text-sm font-medium text-gray-400 transition hover:text-red-500 disabled:opacity-50"
    >
      <FiTrash2 />

      {isPending ? "Clearing..." : "Clear Cart"}
    </button>
  );
}

