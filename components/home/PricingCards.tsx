"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import PricingCard from "@/components/shared/PricingCard";

const PricingCards: React.FC = () => {
  const packages = [
    {
      title: "Basic Care",
      price: "$35",
      features: [
        "Personal care assistance",
        "Companionship services",
        "Light housekeeping",
        "Meal preparation",
        "Basic medication reminders",
      ],
      isPopular: false,
    },
    {
      title: "Advanced Care",
      price: "$45",
      features: [
        "Everything in Basic Care",
        "Medication management",
        "Meal planning & preparation",
        "Specialized care support",
        "Transportation assistance",
        "Regular health monitoring",
      ],
      isPopular: true,
    },
    {
      title: "Premium Care",
      price: "$55",
      features: [
        "Everything in Advanced Care",
        "24/7 availability",
        "Dedicated caregiver",
        "Priority scheduling",
        "Comprehensive care coordination",
        "Family communication portal",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-cream to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Care Service Packages"
          subtitle="Flexible packages designed to suit different care requirements and budgets"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <PricingCard
              key={pkg.title}
              title={pkg.title}
              price={pkg.price}
              features={pkg.features}
              isPopular={pkg.isPopular}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;

