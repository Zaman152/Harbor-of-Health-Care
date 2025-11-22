"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Heart, Hand } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import FeatureCard from "@/components/shared/FeatureCard";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Thoroughly Vetted Caregivers",
      description:
        "Educated, bonded, and certified caregivers dedicated to exceptional care",
    },
    {
      icon: FileText,
      title: "Personalized Care Plans",
      description:
        "Customized care tailored to meet your or your loved one's unique needs",
    },
    {
      icon: Heart,
      title: "Genuine Compassion",
      description:
        "Founded by a nurse with 15 years experience who put dignity back into care",
    },
    {
      icon: Hand,
      title: "We Are Here to Serve",
      description:
        "Making the care process as simple as possible during difficult times",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-cream to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle
            title="Why Choose Harbor of Health Home Care Services?"
            subtitle="We are dedicated to providing exceptional care and services delivered with genuine compassion!"
          />
        </motion.div>

        {/* Key Messages */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Private home health care aides offers assistance with daily tasks.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              We cater to individuals of all ages and abilities in Edmonton, Alberta. Harbor of Health Home Care Services provides personalized home care services tailored to the specific needs of each client, regardless of their age, disability, or other challenges they may face. Whether someone is dealing with a short-term disability, chronic illness, Alzheimer's disease, or recovering from surgery, Harbor of Health Home Care Services offers versatile support to meet their needs. <span className="font-semibold italic gradient-text">We are Here to Serve!</span>
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              "Personalized care plans tailored to you or your loved one's needs.",
              "Trained professionals dedicated to you or your loved one's well-being.",
              "Peace of mind knowing you or your loved one are in trusted hands.",
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 text-center"
              >
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

