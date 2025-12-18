"use client";

import React from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-medium text-[#5b4c6d]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className={cn(
          `
          w-full rounded-lg border border-[#e5d9f0]
          bg-white px-3 py-2 text-sm
          text-[#1f102c]
          placeholder:text-[#b7a7c8]
          outline-none
          focus:border-[#522463]
          focus:ring-1 focus:ring-[#522463]
          transition
          `,
          className
        )}
      />
    </div>
  );
}
