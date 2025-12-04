"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Users, Heart, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Card from "@/components/ui/Card";

const GetStartedSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: Phone,
      title: "Contact Us",
      description: "Reach out to discuss your care needs and schedule a consultation with our team",
      details: [
        "Call: (780) 906-0994",
        "Email: hello@harborofhealthhomecare.com",
      ],
    },
    {
      number: "02",
      icon: Users,
      title: "Personal Consultation",
      description: "Meet with our team to discuss your unique care requirements and tailor a customized care plan",
    },
    {
      number: "03",
      icon: Heart,
      title: "Start Enjoying",
      description: "Experience peace of mind with exceptional care delivered with Compassion",
    },
  ];

  return (
    <section className="py-20 bg-[#04aaa5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="GET STARTED IN 3 EASY STEPS"
          subtitle="Your Trusted Home Care Solution"
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-teal-200 -z-0" />
            <div className="hidden md:block absolute top-24 left-2/3 right-0 h-0.5 bg-teal-200 -z-0" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative z-10"
                >
                  <Card hover className="text-center h-full group">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-[#04aaa5] text-white flex items-center justify-center font-bold text-lg shadow-lg border-2 border-[#039992] transition-colors group-hover:bg-[#028e89]">
                        {step.number}
                      </div>
                    </div>
                    <div className="mt-8 mb-6">
                      <div className="w-16 h-16 rounded-full bg-[#04aaa5]/10 flex items-center justify-center mx-auto mb-4 border-2 border-[#04aaa5]/30 transition-colors group-hover:bg-[#04aaa5]/20">
                        <Icon className="w-8 h-8 text-[#04aaa5] transition-colors group-hover:text-[#04aaa5]" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      {step.details && (
                        <ul className="text-sm text-gray-600 space-y-2 text-left">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <ArrowRight className="w-4 h-4 text-[#04aaa5] mr-2 flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;

