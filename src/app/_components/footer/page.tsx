import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-200 text-gray-900">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-600 transition hover:text-indigo-600"
            >
              Shop<span className="text-indigo-600">Mart</span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
              Your one-stop destination for the latest products in fashion,
              electronics, lifestyle, and more. Shop with confidence and enjoy
              a simple and comfortable shopping experience.
            </p>

            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p>123 Shop Street, October City, Egypt</p>
              <p>(+20) 01093333333</p>
              <p>support@shopmart.com</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-indigo-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-indigo-600 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-indigo-600 hover:text-white"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-indigo-600 hover:text-white"
              >
                <FaGithub />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-600">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block text-sm transition hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="block text-sm transition hover:text-indigo-600"
              >
                Shop
              </Link>

              <Link
                href="/categories"
                className="block text-sm transition hover:text-indigo-600"
              >
                Categories
              </Link>

              <Link
                href="/brands"
                className="block text-sm transition hover:text-indigo-600"
              >
                Brands
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-600">
              Shop
            </h3>

            <div className="space-y-3">
              <Link
                href="/shop"
                className="block text-sm transition hover:text-indigo-600"
              >
                All Products
              </Link>

              <Link
                href="/categories"
                className="block text-sm transition hover:text-indigo-600"
              >
                Categories
              </Link>

              <Link
                href="/brands"
                className="block text-sm transition hover:text-indigo-600"
              >
                Brands
              </Link>

              <Link
                href="/wishList"
                className="block text-sm transition hover:text-indigo-600"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="block text-sm transition hover:text-indigo-600"
              >
                Cart
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-600">
              Customer
            </h3>

            <div className="space-y-3">
              <Link
                href="/profile"
                className="block text-sm transition hover:text-indigo-600"
              >
                My Profile
              </Link>

              <Link
                href="/allorders"
                className="block text-sm transition hover:text-indigo-600"
              >
                My Orders
              </Link>

              <Link
                href="/cart"
                className="block text-sm transition hover:text-indigo-600"
              >
                Checkout
              </Link>

              <Link
                href="/changePassword"
                className="block text-sm transition hover:text-indigo-600"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ShopMart. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500">
              <Link
                href="/privacy"
                className="transition hover:text-indigo-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/shipping"
                className="transition hover:text-indigo-600"
              >
                Shipping Policy
              </Link>

              <Link
                href="/refund"
                className="transition hover:text-indigo-600"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

