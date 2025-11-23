"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  index: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isPopular = false,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold border-2 border-pink-600">
            MOST POPULAR
          </span>
        </div>
      )}
      <Card
        hover={false}
        className={`h-full flex flex-col ${
          isPopular
            ? "border-2 border-pink-500 shadow-xl scale-105"
            : "border-2 border-pink-200"
        }`}
      >
        <div className="text-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <div className="mb-4">
            <span className="text-4xl font-bold text-pink-500">{price}</span>
            <span className="text-gray-600 ml-2">/hour</span>
          </div>
        </div>
        <ul className="space-y-3 flex-grow mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mr-2 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={isPopular ? "primary" : "outline"}
          size="lg"
          className="w-full"
        >
          Get Started
        </Button>
      </Card>
    </motion.div>
  );
};

export default PricingCard;

