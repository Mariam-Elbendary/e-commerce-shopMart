import {
  getProductsBySubCategory,
  getSpecificSubCategory,
} from "@/api/products";
import FeaturedProducts from "@/app/_components/featuredProducts/FeaturedProducts";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getSpecificSubCategory(id);
  const products = await getProductsBySubCategory(id);

  return (
    <div className="my-5 ">
      <h2 className="my-3 border-l-4 ml-5  border-indigo-600 pl-3 text-2xl font-black text-black">
        {data?.name}
      </h2>

      <p className="mb-5 pl-8 text-gray-500">
        Explore products in this subcategory
      </p>

      {products && products.length > 0 ? (
        <FeaturedProducts data={products} />
      ) : (
        <div className="my-10 rounded-xl bg-gray-50 p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            No products found
          </h3>

          <p className="mt-2 text-gray-500">
            There are no products available in this subcategory yet.
          </p>
        </div>
      )}
    </div>
  );
}

