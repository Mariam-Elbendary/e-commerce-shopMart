"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToWishList } from "@/api/actions/wishList";

export default function AddToWishList({ productId,}: { productId: string}) {

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addProductToWishList,

    onSuccess: () => {
      toast.success("Product added to wishlist");
     queryClient.invalidateQueries({queryKey :["getWishList"]})

    },

     onError : ()=>{
      toast.error("Failed , please signin first!");
     },
  });

  function handleAddToWishList() {
    mutate(productId);
  }

  return (
    <button
      onClick={handleAddToWishList}
      disabled={isPending}
      className="rounded-full cursor-pointer bg-white p-3 text-pink-500 shadow-md transition hover:bg-pink-500 hover:text-white disabled:opacity-50"
    >
      <FaHeart />
    </button>
  );
}