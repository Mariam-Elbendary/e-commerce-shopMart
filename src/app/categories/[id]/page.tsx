import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllSubCategoriesOnCategory,
  getSpecificCategory,
} from "@/api/products";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, subCategories] = await Promise.all([
    getSpecificCategory(id),
    getAllSubCategoriesOnCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <Link href="/categories" className="text-sm font-medium text-indigo-600 transition-all ">
        All categories
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">{category.name}</h1>
      <p className="mt-2 text-gray-500">Explore the available subcategories.</p>

      {subCategories?.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subCategories.map((subCategory) => (
            <Link
              key={subCategory._id}
              href={`/subCategory/${subCategory._id}`}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900">{subCategory.name}</h2>
              <p className="mt-2 text-sm text-gray-500">View this subcategory</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl bg-gray-50 p-5 text-gray-500">
          No subcategories are available for this category yet.
        </p>
      )}
    </main>
  );
}
