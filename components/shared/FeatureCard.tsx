"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <motion.div
        className="glass-card text-center h-full p-6 group cursor-pointer"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="relative mb-4"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-br from-teal-500 to-cyan-400 p-4 rounded-2xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;

