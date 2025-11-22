"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  RefreshCw,
  Sparkles,
  Stethoscope,
  Building2,
  ArrowRight,
  Check,
} from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: "companionship",
      icon: Users,
      title: "Companionship Care",
      order: 6,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      description:
        "Providing daily social interaction, caregiving, and emotional support, engaging in activities tailored to their interests.",
      features: [
        "Daily social interaction and conversation",
        "Engaging in activities tailored to interests",
        "Emotional support and companionship",
        "Hobby assistance and entertainment",
      ],
    },
    {
      id: "palliative",
      icon: Heart,
      title: "Palliative Care",
      order: 5,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      description:
        "Home-based palliative care eases patients' pain, symptoms and emotional strain while providing compassionate and supportive assistance.",
      features: [
        "Pain and symptom management",
        "Emotional and spiritual support",
        "Compassionate end-of-life care",
        "Family support and guidance",
      ],
    },
    {
      id: "respite",
      icon: RefreshCw,
      title: "Respite Care",
      order: 4,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
      description:
        "Offering primary caregivers much-needed relief, experienced caregivers step in to support while you recharge or attend to other responsibilities.",
      features: [
        "Temporary care coverage",
        "Flexible scheduling",
        "Short-term or long-term relief",
        "Experienced caregiver support",
      ],
    },
    {
      id: "homemaking",
      icon: Sparkles,
      title: "Homemaking Services",
      order: 3,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop",
      description:
        "Homemaking aid helps seniors stay at home longer by alleviating the challenges of managing household tasks due to aging-related factors.",
      features: [
        "Light housekeeping and cleaning",
        "Laundry and linen care",
        "Meal preparation assistance",
        "Organization and decluttering",
      ],
    },
    {
      id: "post-surgery",
      icon: Stethoscope,
      title: "Post-Surgery Care",
      order: 2,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
      description:
        "Ensure a smoother recovery and better outcomes with Personalized post-surgical care, medication management and rehab support.",
      features: [
        "Post-surgical recovery support",
        "Medication management",
        "Wound care and monitoring",
        "Rehabilitation assistance",
      ],
    },
    {
      id: "in-facility",
      icon: Building2,
      title: "In-Facility care",
      order: 1,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      description:
        "From daily check-ins to comprehensive 24-hour care, it allows families to recharge while ensuring their loved one's well-being.",
      features: [
        "Facility-based care services",
        "Daily check-ins available",
        "Comprehensive 24-hour care",
        "Family support and peace of mind",
      ],
    },
  ];

  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-teal-50 via-white to-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive in-home care services designed to meet the diverse needs of individuals of all ages and abilities"
        />
        
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            It starts with genuine compassion. Truly caring. Each of our caregivers is hand-selected for their proven dedication to exceptional home care experience.
          </p>
        </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.sort((a, b) => (a.order || 0) - (b.order || 0)).map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      !isEven ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                        !isEven ? "lg:col-start-2" : ""
                      }`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={600}
                        className="w-full h-[400px] md:h-[500px] object-cover"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`space-y-6 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-teal-500" />
                        </div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <Check className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;

