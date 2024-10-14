"use client";

import { SubmitButton } from "./SubmitButton";
import { Input, InputProps } from "./Input";
import { CreateBookingFormDto } from "@/lib/types/booking.type";

const formFields: Record<keyof CreateBookingFormDto, InputProps> = {
  firstName: {
    label: "First Name",
    name: "firstName",
    autoComplete: "given-name",
    required: true,
    id: "firstName",
  },
  lastName: {
    label: "Last Name",
    name: "lastName",
    autoComplete: "family-name",
    required: true,
    id: "lastName",
  },
  email: {
    label: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true,
    id: "email",
  },
  phone: {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    autoComplete: "tel",
    required: true,
    id: "phone",
  },
  street: {
    label: "Street Address",
    name: "street",
    autoComplete: "street-address",
    required: true,
    id: "street",
    placeholder: "123 Main St",
  },
  city: {
    label: "City",
    name: "city",
    autoComplete: "address-level2",
    required: true,
    id: "city",
  },
  state: {
    label: "State",
    name: "state",
    autoComplete: "address-level1",
    required: true,
    id: "state",
  },
  zip: {
    label: "ZIP Code",
    name: "zip",
    autoComplete: "postal-code",
    required: true,
    id: "zip",
  },
};

export const BookingForm = () => {
  return (
    <>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6">
          {/* Render fields */}
          {Object.values(formFields).map((field) => (
            <Input key={field.name} {...field} />
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <SubmitButton />
        </div>
      </form>
    </>
  );
};
