"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  changeMyPasswordSchema,
  ChangeMyPasswordFormData,
} from "@/schemas/changePasswordSchema";

import { changeMyPassword } from "@/api/actions/auth.action";

export default function Page() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangeMyPasswordFormData>({
    resolver: zodResolver(changeMyPasswordSchema),

    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function submitForm(data: ChangeMyPasswordFormData) {
    try {
      const response = await changeMyPassword(data);

      if (response.success) {
        toast.success("Password changed successfully!");
        router.push("/login");
      } else {
        toast.error(
          response.data.message || "Failed to change password"
        );
      }
    } catch {
      toast.error("Failed to change password");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Change Password
            </h1>

            <p className="mt-2 text-gray-500">
              Enter your current and new password
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-5"
          >

            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="currentPassword"
                    className="text-gray-700"
                  >
                    Current Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="currentPassword"
                    type="password"
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="password"
                    className="text-gray-700"
                  >
                    New Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-gray-700"
                  >
                    Confirm Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full cursor-pointer bg-indigo-600 text-base text-white hover:bg-indigo-700"
            >
              {isSubmitting
                ? "Changing Password..."
                : "Change Password"}
            </Button>

          </form>
        </div>
      </div>
    </main>
  );
}

