import { z } from "zod";

export const verifyCodeSchema = z.object({
resetCode: z
.string()
.min(1, "Reset code is required")
.length(6, "Reset code must be 6 characters"),
});

export type VerifyCodeFormData = z.infer<
typeof verifyCodeSchema> ;

export const changePasswordSchema = z
.object({
password: z
.string()
.min(1, "Password is required")
.min(6, "Password must be at least 6 characters"),

confirmPassword: z
  .string()
  .min(1, "Confirm password is required"),

})
.refine((data) => data.password === data.confirmPassword, {
message: "Passwords do not match",
path: ["confirmPassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema> ;


export const changeMyPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangeMyPasswordFormData = z.infer<
  typeof changeMyPasswordSchema
>;