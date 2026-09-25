import { getAllBrands } from "@/api/brands";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  const data = await getAllBrands();

  return (
    <>
      <div className="grid m-2 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
        {data?.map((brand) => (
          <Link href={`/brandDetails/${brand._id}`} key={brand._id}>
           <div
            className="border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-3"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={120}
              height={120}
              className="object-contain"
            />

            <h2 className="text-xl font-bold text-gray-800">
              {brand.name}
            </h2>

            <p className="text-sm text-gray-500">
              {brand.slug}
            </p>
          </div>
            
          </Link>
         
        ))}
      </div>
    </>
  );
}

