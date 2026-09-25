import Link from "next/link";
 
export default function Home() {

  return (
    <>
 

<div className="my-20 flex flex-col items-center justify-center px-4 text-center">
  <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
    Welcome to <span className="text-indigo-600">ShopMart</span>
  </h1>

  <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
    Discover the latest technology, fashion, and lifestyle products.
    Quality guaranteed with fast shipping and excellent customer service.
  </p>

  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
    <Link href="/shop">
      <button className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700">
        Shop Now
      </button>
    </Link>

    <Link href="/categories">
      <button className="cursor-pointer rounded-full border border-indigo-600 bg-white px-6 py-2.5 font-medium text-indigo-600 transition hover:bg-indigo-50">
        Browse Categories
      </button>
    </Link>
  </div>
</div>  
    </>
  );
}
