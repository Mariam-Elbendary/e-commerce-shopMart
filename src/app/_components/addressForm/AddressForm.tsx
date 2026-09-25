"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addAddress } from "@/api/actions/address";
import {
  addressSchema,
  AddressFormData,
} from "@/schemas/addressSchema";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddressForm() {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (address: AddressFormData) => addAddress(address),

    onSuccess: () => {
      toast.success("Address added successfully");
      reset();
      queryClient.invalidateQueries({queryKey :["getAllAddresses"]})
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function onSubmit(values: AddressFormData) {
    mutate(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        Add New Address
      </h2>

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Address Name</FieldLabel>

            <Input
              {...field}
              placeholder="Home"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="details"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Address Details</FieldLabel>

            <Input
              {...field}
              placeholder="Street, building, apartment..."
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Phone</FieldLabel>

            <Input
              {...field}
              type="tel"
              placeholder="01xxxxxxxxx"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>City</FieldLabel>

            <Input
              {...field}
              placeholder="Cairo"
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
        disabled={isPending}
        className="w-full bg-indigo-500  transition-all duration-300 cursor-pointer hover:bg-indigo-600"
      >
        {isPending ? "Adding..." : "Add Address"}
      </Button>
    </form>
  );
}