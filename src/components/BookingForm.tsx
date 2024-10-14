"use client";

import { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { createBooking } from "@/lib/actions/createBooking.action";
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
  const [serverActionResult, setServerActionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateBooking = async (formData: FormData) => {
    const result = await createBooking(formData);
    setServerActionResult(result);
    if (result.success) {
      // Show success toast
      toast.success(result.message);
      // Reset the form
      formRef?.current?.reset();
    } else {
      // Show error toast
      toast.error(result.message);
    }
  };
  return (
    <>
      <Toaster />
      <form
        ref={formRef}
        action={handleCreateBooking}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-y-6">
          {/* Render fields */}
          {Object.values(formFields).map((field) => (
            <Input key={field.name} {...field} />
          ))}
        </div>
        {/* Display Success or Error Message */}
        {serverActionResult && (
          <p
            className={`mt-4 text-sm ${
              serverActionResult.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {serverActionResult.message}
          </p>
        )}

        {/* Submit Button */}
        <div className="mt-10">
          <SubmitButton />
        </div>
      </form>
    </>
  );
};
