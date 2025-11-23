"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  children: React.ReactNode;
  variant?: "default" | "nav";
  className?: string;
}

const GlassyButton: React.FC<GlassyButtonProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-6 py-3 rounded-[40px] font-medium transition-all duration-300 overflow-hidden group",
        "bg-gradient-to-b from-white via-gray-50 to-gray-100",
        "shadow-[0_0.067px_1.008px_0_rgba(0,0,0,0),0_0.159px_2.389px_0_rgba(0,0,0,0),0_0.29px_4.357px_0_rgba(0,0,0,0.01),0_0.483px_7.244px_0_rgba(0,0,0,0.01),0_0.78px_11.698px_0_rgba(0,0,0,0.02),0_1.277px_19.148px_0_rgba(0,0,0,0.03),0_2.198px_32.971px_0_rgba(0,0,0,0.05),0_4px_60px_0_rgba(0,0,0,0.1)]",
        "hover:shadow-[0_0.067px_1.008px_0_rgba(0,0,0,0),0_0.159px_2.389px_0_rgba(0,0,0,0),0_0.29px_4.357px_0_rgba(0,0,0,0.01),0_0.483px_7.244px_0_rgba(0,0,0,0.01),0_0.78px_11.698px_0_rgba(0,0,0,0.01),0_1.277px_19.148px_0_rgba(0,0,0,0.02),0_2.198px_32.971px_0_rgba(0,0,0,0.04),0_4px_60px_0_rgba(0,0,0,0.07)]",
        "text-gray-900 group-hover:text-teal-500 transition-colors duration-300",
        variant === "nav" && "px-4 py-2 text-sm",
        className
      )}
      {...props}
    >
      {/* Inner glassy layer matching Framer design */}
      <motion.div
        className="absolute inset-[3px] rounded-[37px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:via-gray-50 group-hover:to-gray-200 transition-all duration-300"
        style={{
          boxShadow: "inset 2px 4px 5px 0px rgba(0, 0, 0, 0), inset 0px 0px 1px 1px rgba(0, 0, 0, 0)",
        }}
      />
      
      {/* Light blue glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-300/0 via-teal-200/0 to-teal-300/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
        initial={false}
      />
      
      {/* Glossy light blue overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-200/0 via-teal-100/0 to-teal-200/0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
        initial={false}
      />
      
      {/* Content with glossy text effect */}
      <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(110,198,255,0.5)]">
        {children}
      </span>
    </motion.button>
  );
};

export default GlassyButton;

