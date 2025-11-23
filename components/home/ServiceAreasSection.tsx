"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";

const ServiceAreasSection: React.FC = () => {
  const areas = [
    "Edmonton",
    "St. Albert",
    "Sherwood Park",
    "Spruce Grove",
    "Leduc",
    "Beaumont",
    "Fort Saskatchewan",
    "And surrounding areas",
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-transparent opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Serving Edmonton and Beyond!"
          subtitle="From the vibrant heart of the city to the charming suburbs, Harbor of Health Home Care Services proudly offers its services to Home Care clients in Edmonton and the surrounding areas."
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our devoted team is dedicated to delivering exceptional care services delivered with genuine compassion throughout the city and beyond.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Should you wish to inquire if we cover your locality, or for any additional information, do not hesitate to contact us. Get in touch with us today to gain more insight into our service territory and how we can fulfill your or your loved one&apos;s care requirements. <span className="font-semibold italic text-teal-600">We are Here to Serve!</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-teal-50 to-cream rounded-2xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-12 h-12 text-teal-500" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-gray-900 text-center mb-6">
              Areas We Serve
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {areas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-gray-700 font-medium">{area}</span>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = "tel:+17809060994")}
                className="flex items-center space-x-2 mx-auto"
              >
                <Phone className="w-5 h-5" />
                <span>Check Service Availability</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;

