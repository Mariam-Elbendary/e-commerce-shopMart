import { getProductDetails } from "@/api/products";
import AddBtn from "./../../_components/addCartBtn/AddBtn";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getProductDetails(id);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid items-start gap-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
         
          <div className="relative overflow-hidden rounded-3xl bg-indigo-50">
            <Image
              src={data?.imageCover || ""}
              alt={data?.title || "Product image"}
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-112.5 w-full object-cover transition duration-500 hover:scale-105"
            />

            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-indigo-600 shadow-md">
              {data?.brand?.name}
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {data?.category?.name}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {data?.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="rounded-full flex items-center gap-2 bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                  <FaRegStar />
                 {data?.ratingsAverage}
              </div>

              <span className="text-sm text-gray-500">
                {data?.ratingsQuantity} reviews
              </span>
            </div>

            <p className="leading-7 text-gray-600">
              {data?.description}
            </p>


            <div className="flex items-center gap-4 border-y border-indigo-100 py-5">
              {data?.priceAfterDiscount ? (
                <>
                  <span className="text-3xl font-bold text-indigo-600">
                    ${data?.priceAfterDiscount}
                  </span>

                  <span className="text-lg text-gray-400 line-through">
                    ${data?.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-indigo-600">
                  ${data?.price}
                </span>
              )}
            </div>


            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">
                Available:
              </span>

              <span className="rounded-lg bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                {data?.quantity} items
              </span>
            </div>

            
            <div className="flex gap-2 text-sm text-gray-500">
              <span>{data?.sold}</span>
            </div>

            
            <AddBtn
              cls="mt-2 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
              child={"Add to Cart"}
              productId={id}
            />
          </div>
        </div>
      </div>
    </>
  );
}

