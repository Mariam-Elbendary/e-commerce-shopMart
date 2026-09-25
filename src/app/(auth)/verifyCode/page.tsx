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
import { VerifyCodeFormData, verifyCodeSchema } from "@/schemas/changePasswordSchema";
import { verifyCode } from "@/api/actions/auth.action";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),

    defaultValues: {
      resetCode: "",
    },

  });

  async function submitForm(data: VerifyCodeFormData) {
    try {
      const response = await verifyCode(data);
      if (response.success) {
  toast.success("Code verified successfully!");

  router.push(
    `/resetPassword?email=${encodeURIComponent(email || "")}`
  );
} else {
  toast.error(response.data.message );
}
    } catch {
      toast.error("Failed to verify the code");
    }
  }

  return ( 
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Verify Code 
            </h1>

            <p className="mt-2 text-muted-foreground">
              Enter the verification code sent to your email
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-5"
          >
            <Controller
              name="resetCode"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="resetCode">
                    Verification Code
                  </FieldLabel>

                  <Input
                    {...field}
                    id="resetCode"
                    type="text"
                    placeholder="Enter your 6-digit code"
                    maxLength={6}
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
                ? "Verifying Code..."
                : "Verify Code"}
            </Button>
          </form>
        </div>
      </div>
    </main>

  );
}
