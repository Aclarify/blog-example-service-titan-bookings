"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
    >
      Create Booking
    </button>
  );
};
