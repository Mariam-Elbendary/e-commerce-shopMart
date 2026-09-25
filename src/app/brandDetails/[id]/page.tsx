
import { getProductsByBrand, getSpecificBrand } from "@/api/brands";
import FeaturedProducts from "@/app/_components/featuredProducts/FeaturedProducts";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getSpecificBrand(id);
  const products = await getProductsByBrand(id);

  return (
    <div className="my-8 px-5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-8 text-center shadow-sm">
        <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-100 bg-white shadow-md">
          <Image
            src={data?.image || ""}
            alt={data?.name || "Brand"}
            width={200}
            height={200}
            className="h-full w-full object-contain p-4"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {data?.name}
          </h1>

          <p className="mt-2 text-sm text-indigo-600">
            {data?.slug}
          </p>
        </div>
      </div>
      {products && products.length > 0 ? (
        <FeaturedProducts data={products} />
      ) : (
        <div className="my-12 flex min-h-[250px] items-center justify-center rounded-2xl  bg-white px-5 ">
          <div className="text-center">
            
            <h2 className="mt-5 text-xl font-bold text-gray-800">
              No Products Available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are no products available for this brand right now
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

