"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const FeaturedServices: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Service 1: Specialized Homecare */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
              alt="Specialized homecare services"
              width={800}
              height={600}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="inline-block">
              <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MOST POPULAR
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
              Specialized Homecare
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our specialized homecare services provide comprehensive support for
              seniors with specific health conditions, ensuring they receive the
              expert care they need in the comfort of their own home.
            </p>
            <ul className="space-y-3">
              {[
                "Dementia and Alzheimer's care",
                "Post-surgery recovery support",
                "Chronic disease management",
                "Physical therapy assistance",
                "Medical equipment monitoring",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <Check className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Button variant="primary" size="lg" className="mt-4">
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </motion.div>
        </div>

        {/* Service 2: Transportation Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-1"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
              Transportation Services
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Safe and reliable transportation services to help your loved ones
              get to medical appointments, run errands, and maintain their
              social connections. Our caregivers ensure comfortable and secure
              travel.
            </p>
            <ul className="space-y-3">
              {[
                "Medical appointment transportation",
                "Pharmacy and grocery trips",
                "Social and recreational outings",
                "Wheelchair-accessible vehicles",
                "Flexible scheduling",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <Check className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Button variant="primary" size="lg" className="mt-4">
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl order-2"
          >
            <Image
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop"
              alt="Transportation services for seniors"
              width={800}
              height={600}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;

