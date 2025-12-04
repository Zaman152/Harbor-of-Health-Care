"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 text-white focus:ring-pink-500 shadow-md hover:shadow-lg hover:bg-[#04aaa5] hover:from-transparent hover:via-transparent hover:to-transparent",
      secondary:
        "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 text-white focus:ring-pink-500 shadow-md hover:shadow-lg border-2 border-transparent hover:bg-[#04aaa5] hover:from-transparent hover:via-transparent hover:to-transparent",
      outline:
        "border-2 border-pink-500 text-pink-500 focus:ring-pink-500 hover:border-[#04aaa5] hover:bg-[#04aaa5] hover:text-white",
      ghost: "text-pink-500 focus:ring-pink-500 hover:bg-[#04aaa5] hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;

