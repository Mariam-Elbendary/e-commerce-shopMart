"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  numberOfPages,
}: {
  numberOfPages: number;
}) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex justify-center items-center gap-2 my-8">

      {Array.from({ length: numberOfPages }).map((_, index) => {

        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              currentPage === page
                ? "bg-indigo-500 text-white "
                : "bg-white text-gray-700 hover:bg-indigo-500  hover:text-white"
            }`}
          >
            {page}
          </button>
        );

      })}

    </div>
  );
}