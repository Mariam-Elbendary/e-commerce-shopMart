"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState(
    searchParams.get("price") || ""
  );

  function handleFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (price) {
      params.set("price", price);
    } else {
      params.delete("price");
    }

    params.delete("page");

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="my-6 flex w-full px-5">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <label
          htmlFor="price"
          className="whitespace-nowrap text-sm font-semibold text-gray-700"
        >
          Max Price:
        </label>

        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />

        <button
          onClick={handleFilter}
          className="rounded-xl bg-indigo-600 cursor-pointer px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
        >
          Filter
        </button>
      </div>
    </div>
  );
}

