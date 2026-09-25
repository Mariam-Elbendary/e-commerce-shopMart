import { AddressType } from "@/interfaces/addressType";
import { CartType } from "@/interfaces/cartType";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { createCashOrder } from "@/api/actions/order";
import { OrderFormData } from '@/schemas/orderSchema';
import { payOnline } from "@/api/actions/payOnline";

export function getMyCart() {
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

  return { data, isLoading, isError };
}

export function getMyAddresses() {
  const {
    data: addressData,
    isLoading: isLoadingAddress,
    isError: isErrorAddress,
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

  return {
    addressData,
    isLoadingAddress,
    isErrorAddress,
  };
}

export function useCreateCashOrder() {
  return useMutation({
    mutationFn: ({cartId, shippingAddress}: {cartId: string; shippingAddress: OrderFormData}) => createCashOrder(cartId, shippingAddress)
  });
}

export function usePayOnline() {
  return useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
    }: {
      cartId: string;
      shippingAddress: OrderFormData;
    }) => payOnline(cartId, shippingAddress),
  });
}