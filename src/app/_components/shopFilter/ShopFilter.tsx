"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ShopFilter({
  categories,
}: {
  categories: { _id: string; name: string }[] | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const category = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.delete("page");

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="my-6 flex w-full px-5">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <label
          htmlFor="category"
          className="whitespace-nowrap text-sm font-semibold text-gray-700"
        >
          Category:
        </label>

        <select
          id="category"
          onChange={handleCategoryChange}
          defaultValue={searchParams.get("category") || ""}
          className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Categories</option>

          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}