
import { Daum } from "@/interfaces/orderType";
import { useQuery } from "@tanstack/react-query";

export function getMyOrders() {
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isError } = useQuery<Daum[]>({
    queryKey: ["getOrders"],
    queryFn: async () => {
      const response = await fetch("/api/orders");

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const result = await response.json();
      return result;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}

