
"use client";

import React from "react";
import { PropagateLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-white px-8 py-12 shadow-sm">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-md">
          <span className="text-2xl font-bold text-white">
            S
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          ShopMart
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Getting everything ready for you...
        </p>

        <div className="mt-10">
          <PropagateLoader
            color="#432DD7"
            size={12}
            speedMultiplier={0.8}
          />
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-widest text-gray-400">
          Loading
        </p>
      </div>
    </div>
  );
}

