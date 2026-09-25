"use client";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductFromCart } from "@/api/actions/cart";

export default function RemoveFromCart({ productId}: { productId: string}) {
  const queryClient = useQueryClient()
  
  const { mutate, isPending  } = useMutation({
    mutationFn:
      deleteProductFromCart,

    onSuccess: () => {
      toast.success("Product removed from cart");
      queryClient.invalidateQueries({queryKey :["getCart"]})
    },

    onError: () => {
      toast.error("Failed to remove product");
    },
  });

  function handleDelete() {
    mutate(productId);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center cursor-pointer gap-2 text-sm font-medium text-gray-400 transition hover:text-red-500 disabled:opacity-50"
    >
      <FiTrash2 />

      <span className="hidden sm:inline">
        {isPending ? "Removing..." : "Remove"}
      </span>
    </button>
  );
}

