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
            // All cards share the same styling (no default pink highlight)
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className={`group relative overflow-hidden h-full p-6 rounded-2xl shadow-md transition-all duration-300 bg-white hover:shadow-lg`}>
                  {/* Hover fill overlay */}
                  <div className="absolute inset-0 w-0 group-hover:w-full bg-[#04aaa5] transition-all duration-500 ease-in-out" />
                  <div className="relative z-10 flex flex-col h-full group">
                    {/* Icon top-left */}
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-[#04aaa5]/10`}>
                        <Icon className={`w-8 h-8 transition-colors text-[#04aaa5] group-hover:text-white`} />
                      </div>
                    </div>
                    
                    {/* Title and Description */}
                    <div className="flex-grow mb-4">
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-3 transition-colors group-hover:text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed transition-colors group-hover:text-white/90">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Arrow button bottom-right */}
                    <div className="flex justify-end mt-auto">
                      <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-[#04aaa5]/10 group-hover:bg-white/20 text-[#04aaa5] group-hover:text-white`}>
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

