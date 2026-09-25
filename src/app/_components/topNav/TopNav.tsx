"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { MdLocalShipping, MdPersonAddAlt1 } from "react-icons/md";
import { IoGift, IoPersonOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function TopNav() {
  const { data: session } = useSession();

  return (
    <div className="w-full border-b border-gray-200 bg-gray-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
  
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start md:gap-6">
          <div className="flex items-center gap-2">
            <MdLocalShipping className="text-lg text-indigo-600" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-2">
            <IoGift className="text-lg text-indigo-600" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

     
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end md:gap-5">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-indigo-600" />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineMail className="text-lg text-indigo-600" />
            <span>support@shopMart.com</span>
          </div>

          {!session && (
            <>
              <span className="hidden text-gray-300 sm:block">|</span>

              <Link
                href="/login"
                className="flex items-center gap-2 cursor-pointer transition hover:text-indigo-600"
              >
                <IoPersonOutline />
                <span>Sign In</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 cursor-pointer transition hover:text-indigo-600"
              >
                <MdPersonAddAlt1 />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

