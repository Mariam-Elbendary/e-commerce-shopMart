import { z } from "zod";

export const orderSchema = z.object({
  details: z.string().min(5, "Details must be at least 5 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
});

export type OrderFormData = z.infer<typeof orderSchema>;