import React from "react";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  options: RadioOption[];
  error?: string;
  register?: any;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  error,
  register,
  required,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const inputProps = register
            ? { ...register(name, { required }) }
            : { name, required };
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                "flex items-center p-3 border rounded-lg cursor-pointer transition-all",
                "has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50",
                "border-gray-300 hover:border-teal-300"
              )}
            >
              <input
                type="radio"
                id={inputId}
                value={option.value}
                {...inputProps}
                {...props}
                className="w-4 h-4 text-teal-500 focus:ring-teal-500 focus:ring-2"
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;

