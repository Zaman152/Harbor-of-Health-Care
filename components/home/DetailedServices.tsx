"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  UtensilsCrossed,
  Pill,
  Stethoscope,
  Activity,
  Shirt,
  Sparkles,
  Droplet,
  Ear,
  Move,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

const DetailedServices: React.FC = () => {
  const services = [
    {
      icon: UserCircle,
      title: "Personal Care",
      description:
        "Assisting with bathing, grooming, dressing, and toileting using safe techniques and equipment.",
    },
    {
      icon: UtensilsCrossed,
      title: "Healthy Meal Preparation",
      description:
        "Creating nutritious meals tailored to individual dietary needs and preferences.",
    },
    {
      icon: Pill,
      title: "Medication Management",
      description:
        "Providing assistance with medication administration or reminders, ensuring medications are accessible.",
    },
    {
      icon: Stethoscope,
      title: "Medical Appointment Accompaniment & Reporting",
      description:
        "Transporting clients to appointments, taking notes, and communicating findings to family members.",
    },
    {
      icon: Activity,
      title: "Physical Health & Wellness",
      description:
        "Encouraging clients to engage in regular body movements and prescribed exercise programs.",
    },
    {
      icon: Shirt,
      title: "Dressing Assistance",
      description:
        "Helping with putting on compression stockings and selecting weather-appropriate clothing.",
    },
    {
      icon: Sparkles,
      title: "Personal Hygiene Care",
      description:
        "Assisting with grooming, makeup application, hair care, nail maintenance, oral hygiene, and skincare.",
    },
    {
      icon: Droplet,
      title: "Incontinence Care",
      description:
        "Supporting with incontinence management, monitoring bowel regularity, and managing urinary devices or colostomy care.",
    },
    {
      icon: Ear,
      title: "Assisting with Prosthetics",
      description:
        "Aiding in the application, removal, and cleaning of hearing aids and prosthetic limbs.",
    },
    {
      icon: Move,
      title: "Safely Transferring/Positioning",
      description:
        "Assisting with transferring between surfaces and positioning for comfort using appropriate aids like cradles, rolls, and pillows.",
    },
    {
      icon: MoreHorizontal,
      title: "Other services",
      description: "Please contact us for additional services...",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Team of Certified Health Care Aides
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional support for various daily living activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            // Highlight the first card with light blue gradient
            const isHighlighted = index === 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className={`h-full p-6 rounded-2xl shadow-md transition-all duration-300 ${
                  isHighlighted 
                    ? "bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200" 
                    : "bg-white hover:shadow-lg"
                }`}>
                  <div className="flex flex-col h-full">
                    {/* Icon top-left */}
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isHighlighted 
                          ? "bg-pink-100" 
                          : "bg-pink-50"
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isHighlighted 
                            ? "text-pink-500" 
                            : "text-pink-400"
                        }`} />
                      </div>
                    </div>
                    
                    {/* Title and Description */}
                    <div className="flex-grow mb-4">
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Arrow button bottom-right */}
                    <div className="flex justify-end mt-auto">
                      <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isHighlighted
                          ? "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 hover:from-pink-600 hover:via-pink-500 hover:to-pink-400 text-white"
                          : "bg-pink-50 hover:bg-pink-100 text-pink-500"
                      }`}>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;

