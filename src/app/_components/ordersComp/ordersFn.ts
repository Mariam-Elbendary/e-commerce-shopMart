
import { Daum } from "@/interfaces/orderType";
import { useQuery } from "@tanstack/react-query";

export function getMyOrders() {
  const { data, isLoading, isError } = useQuery<Daum[]>({
    queryKey: ["getOrders"],
    queryFn: async () => {
      const response = await fetch("/api/orders");

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const result = await response.json();

      console.log("ORDERS RESPONSE:", result);
      console.log("ORDERS DATA:", result.data);

      return result;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}

