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
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
};

function Button({
  variant = "primary",
  type,
  children,
  className,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={twMerge(
        "btn rounded-lg bg-blue-500 px-8 text-slate-50 hover:bg-blue-600",
        variant === "secondary" && "bg-gray-500 hover:bg-gray-600",
        variant === "ghost" &&
          "border-none bg-transparent text-slate-800 hover:bg-slate-100",
        variant === "danger" && "bg-red-500 hover:bg-red-600",
        variant === "success" && "bg-green-500 hover:bg-green-600",
        variant === "warning" && "bg-yellow-500 hover:bg-yellow-600",
        variant === "link" && "bg-transparent hover:bg-transparent",
        variant === "outline" &&
          "bg-slate-50 text-slate-800 hover:bg-slate-100",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
