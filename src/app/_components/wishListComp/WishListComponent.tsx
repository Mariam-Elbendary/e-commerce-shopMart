"use client";
import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { WishListType } from "@/interfaces/wishListType";
import RemoveFromWishList from "../removeFromWishList/RemoveFromWishList";
import AddBtn from "../addCartBtn/AddBtn";
import Spinner from "../spinner/Spinner";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";

export default function WishListComponent() {
  const {
    data: wishlist,
    isLoading,
    isError,
  } = useQuery<WishListType>({
    queryKey: ["getWishList"],

    queryFn: async () => {
      const response = await fetch("/api/wishlist");

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      return response.json();
    },
  });

  const products = wishlist?.data || [];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
            <FiHeart className="text-3xl text-indigo-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Your wishlist is empty
          </h1>

          <p className="mt-2 text-gray-500">
            You did not add any products to your wishlist yet.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-block rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Your Favorites
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"} in your wishlist
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <Link href={`/productDetails/${product._id}`}>
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-md">
                    {product.brand?.name}
                  </span>
                <div className="absolute  right-3 top-3 z-10">
                  <RemoveFromWishList productId={product._id} />
                </div>
              </div>

              <div className="p-4">
                <Link href={`/productDetails/${product._id}`}>
                  <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 hover:text-indigo-600">
                    {product.title}
                  </h2>
                </Link>
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
                <p className="mt-3 text-lg font-bold text-indigo-600">
                  ${product.price}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <AddBtn
                    cls="mt-2 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
                    child={"Add to Cart"}
                    productId={product._id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

