"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
}) => {
  const baseStyles =
    "bg-white rounded-xl shadow-md p-6 transition-all duration-300";

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, shadow: "lg" }}
        className={cn(baseStyles, "hover:shadow-xl", className)}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cn(baseStyles, className)}>{children}</div>;
};

export default Card;

