"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  services: string[];
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  services,
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
        className="glass-card h-full flex flex-col p-6 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center text-center mb-4">
          <motion.div
            className="relative mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-br from-teal-500 to-cyan-400 p-4 rounded-2xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h3 className="font-heading text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex-grow mb-4">
          {services.map((service, idx) => (
            <p key={idx} className="text-gray-700 text-sm leading-relaxed">
              {service}
            </p>
          ))}
        </div>
        <motion.a
          href="/services"
          className="inline-flex items-center text-teal-500 font-semibold hover:text-teal-600 transition-colors mt-auto group/link"
          whileHover={{ x: 5 }}
        >
          Read More
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;

