"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { FaRegHeart, FaCartShopping, FaHeadset } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Navbar() {
  const { status } = useSession();
  const router = useRouter();
  const path = usePathname();

  const [search, setSearch] = useState("");

  function handleLogOut() {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }

  function handleSearch() {
    const value = search.trim();

    if (value) {
      router.push(`/shop?keyword=${encodeURIComponent(value)}`);
    } else {
      router.push("/shop");
    }
  }

  const links = [
    { path: "/", link: "Home" },
    { path: "/shop", link: "Shop" },
    { path: "/categories", link: "Categories" },
    { path: "/brands", link: "Brands" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex min-w-fit items-center gap-2">
            <div className="text-3xl text-indigo-600">
              <BsCart4 />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">ShopMart</h2>
          </div>

          <div className="flex w-full items-center overflow-hidden rounded-full border border-gray-300 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 lg:flex-1">
            <input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                if (value.trim() === "") {
                  router.push("/shop");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="min-w-0 flex-1 px-5 py-3 text-sm text-gray-700 outline-none"
              type="search"
              placeholder="Search for products, brands and more..."
            />

            <button
              onClick={handleSearch}
              className="mr-1 rounded-full bg-indigo-600 p-2 cursor-pointer text-white transition hover:bg-indigo-700"
            >
              <MdOutlineSearch className="text-lg" />
            </button>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-gray-700 lg:justify-start">
            {links.map((link) => (
              <li
                key={link.path}
                className={`transition ${
                  path === link.path
                    ? "font-semibold text-indigo-600"
                    : "hover:text-indigo-600"
                }`}
              >
                <Link href={link.path}>{link.link}</Link>
              </li>
            ))}
          </ul>

          <div className="flex min-w-fit items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                <FaHeadset />
              </div>

              <div className="hidden flex-col items-start sm:flex">
                <h4 className="text-sm font-medium text-gray-700">Support</h4>

                <h4 className="text-xs text-gray-400">24/7 Help</h4>
              </div>
            </div>

            <span className="text-gray-300">|</span>

            <div className="flex items-center gap-4">
              {status === "authenticated" ? (
                <>
                  <Link href="/profile">
                    <IoPersonOutline className="cursor-pointer text-xl text-gray-600 transition hover:text-indigo-600" />
                  </Link>

                  <Link href="/wishList">
                    <FaRegHeart className="cursor-pointer text-xl text-gray-600 transition hover:text-indigo-600" />
                  </Link>

                  <Link href="/cart">
                    <FaCartShopping className="cursor-pointer text-xl text-gray-600 transition hover:text-indigo-600" />
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="flex items-center cursor-pointer gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-white transition hover:bg-indigo-700"
                  >
                    <CiLogout className="text-lg" />
                    <span className="hidden font-medium sm:block">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center cursor-pointer gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-white transition hover:bg-indigo-700"
                >
                  <IoPersonOutline className="text-lg" />
                  <span className="font-medium">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
