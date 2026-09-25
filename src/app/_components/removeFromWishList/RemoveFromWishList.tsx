"use client";
import { deleteProductFromWishList } from "@/api/actions/wishList";
import React from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RemoveFromWishList({
  productId,
}: {
  productId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProductFromWishList,

    onSuccess: () => {
      toast.success("Product removed from wishlist");

      queryClient.invalidateQueries({
        queryKey: ["getWishList"],
      });
    },

    onError: () => {
      toast.error("Failed to remove product from wishlist");
    },
  });

  function handleRemove() {
    mutate(productId);
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="rounded-full cursor-pointer bg-white p-3 text-indigo-600 shadow-md transition hover:bg-indigo-600 hover:text-white disabled:opacity-50"
    >
      <FaTrash />
    </button>
  );
}

