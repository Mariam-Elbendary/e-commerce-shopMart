import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/api/products";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Shop by Category</h1>
        <p className="mt-2 text-gray-500">Browse products by the category that suits you.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Image
             
              src={category.image}
              alt={category.name}
              width={240}
              height={160}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="h-40 w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">{category.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
