import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
          <span className="text-3xl font-bold text-indigo-600">404</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          Sorry, we couldn't find the page you're looking for
        </p>

        <Link
          href="/"
          className="mt-7 inline-block cursor-pointer rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

