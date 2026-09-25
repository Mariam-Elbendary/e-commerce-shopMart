import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/api/products";

export default async function ShopCategory() {
  const data = await getCategories();

  return (
    <div className="px-5 py-8">
      <h2 className="mb-7 border-l-4 border-indigo-600 pl-3 text-2xl font-bold text-gray-800">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="group"
          >
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">

              <div className="overflow-hidden rounded-full border-4 border-indigo-50 transition duration-300 group-hover:border-indigo-100">
                <Image
                  className="h-24 w-24 object-cover transition duration-500 group-hover:scale-110"
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                />
              </div>

              <h3 className="mt-4 text-center text-sm font-semibold text-gray-700 transition group-hover:text-indigo-600">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

