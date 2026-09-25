"use client"
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
  loginSchemaEmailOnly,
  loginFormDataEmailOnly,
} from "@/schemas/loginSchema";
import { forgotPassword } from "@/api/actions/auth.action";

export default function Page() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<loginFormDataEmailOnly>({
    resolver: zodResolver(loginSchemaEmailOnly),

    defaultValues: {
      email: "",

    },
  });

  async function submitForm(data: loginFormDataEmailOnly) {
    try {
      const response = await forgotPassword(data);
     if (response.success) {
  toast.success("Code was sent successfully!");
  router.push(`/verifyCode?email=${encodeURIComponent(data.email)}`);
} else {
  toast.error(response.data.message || "Failed to send code");
}
    } catch {
      toast.error("Failed to send code");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Forgot Password
            </h1>

            <p className="mt-2 text-muted-foreground">
              Enter your email to receive a verification code
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-all text-base"
            >
              {isSubmitting
                ? "Sending verification-code..."
                : "Send Verification Code"}
            </Button>

          </form>

        </div>
      </div>
    </main>

  );


}
