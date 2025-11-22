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
} from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Card from "@/components/ui/Card";

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
    <section className="py-20 bg-gradient-to-br from-teal-50 via-cream to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Team of Certified Health Care Aides"
          subtitle="Professional support for various daily living activities"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                        {service.title}:
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;

