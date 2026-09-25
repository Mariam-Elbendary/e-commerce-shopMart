"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "@/api/actions/auth.action";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {

  registerSchema,
  RegisterFormData,
} from "@/schemas/registerSchema";

export default function Register() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
   
    },
  });

  async function submitForm(data: RegisterFormData) {
    try {
      const isRegister = await userRegister(data);

      console.log(isRegister);

      if (isRegister) {
        toast.success('Successfully Register!')
        router.push("/login");
      } else {
           toast.error("Registration failed")
      }
    } catch {
     toast.error("Registration failed")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an Account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Create your account and get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-5"
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Name
                  </FieldLabel>

                  <Input
                    {...field}
                    id="name"
                    placeholder="Enter your name"
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
                    autoComplete="new-password"
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
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rePassword">
                    Confirm Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="rePassword"
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all text-base"
            >
              {isSubmitting
                ? "Creating account..."
                : "Create Account"}
            </Button>

          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-medium cursor-pointer text-primary hover:underline"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
