"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { deleteAddress } from "@/api/actions/address";

export default function DeleteAddress({ addressId, }: { addressId: string }) {
  
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAddress,

    onSuccess: () => {
      toast.success("Address deleted successfully");
       queryClient.invalidateQueries({queryKey :["getAllAddresses"]})
    },

    onError: () => {
      toast.error("Failed to delete address");
    },
  });

  function handleDelete() {
    mutate(addressId);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-full cursor-pointer bg-red-50 p-3 text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
    >
      <FaTrash />
    </button>
  );
}