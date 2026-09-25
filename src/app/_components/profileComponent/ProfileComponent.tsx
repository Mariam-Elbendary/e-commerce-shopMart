"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IoPersonOutline } from "react-icons/io5";
import { MdLocationOn, MdLockOutline } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FiMail, FiShield } from "react-icons/fi";
import Spinner from "../spinner/Spinner";

export default function ProfileComponent() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Spinner/>
  }

  if (status !== "authenticated") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <IoPersonOutline className="text-3xl" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Please Sign In
          </h1>

          <p className="mb-6 text-gray-500">
            You need to sign in to view your profile
          </p>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const user = data.user;

  function handleLogOut() {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and personal information
          </p>
        </div>
      
        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="h-28 bg-gradient-to-r from-indigo-600 to-indigo-500 md:h-36"></div>

          <div className="px-5 pb-7 md:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            
                <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <IoPersonOutline className="text-5xl" />
                  </div>
                </div>

                <div className="pb-1 pt-2">
                  <h2 className="text-xl  font-bold text-gray-800">
                    {user?.name || "User"}
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-gray-500">
                    <FiMail />

                    <span className="break-all text-sm">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
         
              <div className="flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-600">
                <FiShield />

                <span className="text-sm font-medium">
                  User
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
   
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7 lg:col-span-2">

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <IoPersonOutline className="text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Account Information
                </h2>

                <p className="text-sm text-gray-500">
                  Your personal account details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-sm text-gray-400">
                  Full Name
                </p>

                <p className="font-semibold text-gray-800">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-sm text-gray-400">
                  Email Address
                </p>

                <p className="break-all font-semibold text-gray-800">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-sm text-gray-400">
                  Account Type
                </p>

                <p className="font-semibold capitalize text-gray-800">
                  User
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 text-sm text-gray-400">
                  Account Status
                </p>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600"></span>

                  <p className="font-semibold text-indigo-600">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">

            <h2 className="mb-1 text-xl font-bold text-gray-800">
              Quick Actions
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Manage your account
            </p>

            <div className="space-y-3">

              <Link
                href="/allorders"
                className="group flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <FaShoppingBag />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    My Orders
                  </h3>

                  <p className="text-sm text-gray-500">
                    View your orders
                  </p>
                </div>
              </Link>

              <Link
                href="/address"
                className="group flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <MdLocationOn className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    My Addresses
                  </h3>

                  <p className="text-sm text-gray-500">
                    Manage your addresses
                  </p>
                </div>
              </Link>

              <Link
                href="/changePassword"
                className="group flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <MdLockOutline className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Change Password
                  </h3>

                  <p className="text-sm text-gray-500">
                    Update your password
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </div>
    
        <div className="mt-6 rounded-2xl border border-red-100 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-bold text-gray-800">
                Sign out of your account
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                You can sign back in anytime
              </p>
            </div>

            <button
              onClick={handleLogOut}
              className="flex items-center cursor-pointer justify-center gap-2 rounded-full border border-red-200 px-6 py-3 font-medium text-red-500 transition hover:bg-red-50"
            >
              <CiLogout className="text-xl" />
              Logout
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}

