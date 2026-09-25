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
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/schemas/changePasswordSchema";
import { changePass } from "@/api/actions/auth.action";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const router = useRouter();
const searchParams = useSearchParams();
const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function submitForm(data: ChangePasswordFormData) {
  try {
    if (!email) {
      toast.error("Email is missing");
      return;
    }
    const response = await changePass({
      email: email,
      newPassword: data.password,
    });

    if (response.success) {
      toast.success("Password changed successfully!");
      router.push("/login");
    } else {
      toast.error(response.data.message || "Failed to save password");
    }
  } catch {
    toast.error("Failed to save password");
  }
}

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Reset Password
            </h1>
            <p className="mt-2 text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-5"
          >
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    New Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
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
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
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
              className="w-full h-11 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all text-base"
            >
              {isSubmitting
                ? "Saving Password..."
                : "Save Password"}
            </Button>
          </form>
        </div>
      </div>
    </main>

  );
}

