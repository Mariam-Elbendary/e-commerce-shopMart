import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import AddToWishList from "../addToWishList/AddToWishList";
import AddBtn from "../addCartBtn/AddBtn";
import { FaCartShopping } from "react-icons/fa6";
import { productType } from "@/interfaces/productType";

export default function FeaturedProducts({
  data,
}: {
  data: productType[];
}) {
  return (
    <div className="px-5 py-8">
      <h2 className="mb-7 border-l-4 border-indigo-600 pl-3 text-2xl font-bold text-gray-800">
        Featured Products
      </h2>

      <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((product) => {
          return (
            <Link
              href={`/productDetails/${product._id}`}
              key={product._id}
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-72 overflow-hidden bg-gray-50">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-md">
                    {product.brand?.name}
                  </span>

                  <div className="absolute right-4 top-4 z-20 flex flex-col gap-3">
                    <div className="cursor-pointer rounded-full bg-white shadow-md transition duration-300 hover:bg-indigo-600 hover:text-white">
                      <AddToWishList productId={product._id} />
                    </div>

                    <AddBtn
                      cls="rounded-full cursor-pointer bg-white p-3 text-indigo-600 shadow-md transition duration-300 hover:bg-indigo-600 hover:text-white"
                      child={<FaCartShopping />}
                      productId={product._id}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <h2 className="line-clamp-2 min-h-14 text-lg font-bold text-gray-800 transition group-hover:text-indigo-600">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starNumber = i + 1;

                      const fullStars = product.ratingsAverage
                        ? Math.floor(product.ratingsAverage)
                        : 0;

                      const hasHalfStar = product.ratingsAverage
                        ? product.ratingsAverage % 1 >= 0.5
                        : false;

                      if (starNumber <= fullStars) {
                        return <FaStar key={i} />;
                      } else if (
                        starNumber === fullStars + 1 &&
                        hasHalfStar
                      ) {
                        return <FaStarHalf key={i} />;
                      } else {
                        return <FaRegStar key={i} />;
                      }
                    })}

                    <span className="ml-2 text-xs text-gray-400">
                      ({product.ratingsAverage || 0})
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-base font-medium text-gray-500">
                      Price
                    </span>

                    <span className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-600">
                      {product.price} EGP
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

