import { FC, InputHTMLAttributes, ReactNode } from "react";

export type InputProps = {
  label: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({
  label,
  className,
  name,
  id,
  type = "text",
  ...props
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2.5">
      <input
        type={type}
        name={name}
        id={id}
        className={`${className} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        {...props}
      />
    </div>
  </div>
);
