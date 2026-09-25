"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  loginSchema,
  LoginFormData,
} from "@/schemas/loginSchema";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitForm(data: LoginFormData) {
   
const isLogin = await signIn('credentials' , {...data , redirect :false})
if (isLogin?.ok) {
        toast.success('Successfully Login!')
        router.push("/");
      } else {
       toast.error("Login failed")
      }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome Back
            </h1>

            <p className="mt-2 text-muted-foreground">
              Enter your details to access your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-5"
          >
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Link href='/forgotPassword'>
                <span className="my-4 text-sky-600 hover:text-sky-700 ">Forgot your password?</span>

             </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all text-base"
            >
              {isSubmitting
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?

            <Link
              href="/register"
              className="font-medium text-primary cursor-pointer transition-all hover:underline"
            >
              Create an account
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
