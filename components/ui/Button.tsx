import React from "react";
import { twMerge } from "tailwind-merge";
type ButtonProps = {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "success"
    | "warning"
    | "link"
    | "outline";
  children: React.ReactNode;
};

function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "btn rounded-lg bg-blue-500 px-8 text-zinc-50 hover:bg-blue-600",
        variant === "secondary" && "bg-gray-500 hover:bg-gray-600",
        variant === "ghost" &&
          "border-none bg-transparent text-zinc-800 hover:bg-zinc-100",
        variant === "danger" && "bg-red-500 hover:bg-red-600",
        variant === "success" && "bg-green-500 hover:bg-green-600",
        variant === "warning" && "bg-yellow-500 hover:bg-yellow-600",
        variant === "link" && "bg-transparent hover:bg-transparent",
        variant === "outline" &&
          "border-none bg-zinc-50 text-zinc-800 hover:border-none hover:bg-zinc-100",
      )}
    >
      {children}
    </button>
  );
}

export default Button;
