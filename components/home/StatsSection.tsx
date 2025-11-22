"use client";

import React from "react";
import { motion } from "framer-motion";

const StatsSection: React.FC = () => {
  const stats = [
    { value: "10+", label: "Years of experience" },
    { value: "32+", label: "Skilled caregivers" },
    { value: "140+", label: "Happy families" },
    { value: "95%", label: "Client satisfaction rate" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

