"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Separate component for stat card to fix hooks rule
const StatCard: React.FC<{
  stat: { number: number; suffix: string; label: string; isText?: boolean };
  index: number;
}> = ({ stat, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      key={stat.label}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow"
    >
      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
        {stat.isText ? (
          stat.label
        ) : (
          <>
            <CountUp
              start={0}
              end={stat.number}
              duration={2}
              decimals={0}
            />
            {stat.suffix}
          </>
        )}
      </div>
      <div className="text-gray-600 font-medium">{stat.label}</div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const features = [
    "Thoroughly Vetted & Certified Caregivers",
    "Genuine Compassion & Dignity",
    "Personalized Care Plans",
    "Free Consultation Available",
  ];

  const stats = [
    { number: 15, suffix: "+", label: "Years Nursing Experience" },
    { number: 24, suffix: "/7", label: "Care Available" },
    { number: 1, suffix: "", label: "Edmonton", isText: true },
  ];

  // Floating shapes animation variants
  const floatingShapes = [
    { size: 200, x: "10%", y: "20%", duration: 6 },
    { size: 150, x: "80%", y: "10%", duration: 8 },
    { size: 100, x: "70%", y: "60%", duration: 7 },
    { size: 120, x: "15%", y: "70%", duration: 9 },
    { size: 180, x: "85%", y: "80%", duration: 6.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Light-blue wave shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z" fill="rgba(219, 234, 254, 0.4)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,120 Q400,80 800,120 T1200,120 L1200,200 L0,200 Z" fill="rgba(191, 219, 254, 0.3)" />
        </svg>
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute blob-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: `linear-gradient(135deg, rgba(219, 234, 254, 0.3), rgba(191, 219, 254, 0.2))`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                We connect seniors with their{" "}
                <span className="text-blue-600">ideal caregivers</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed"
              >
                We provide personalized care, designed to meet your or your loved one&apos;s unique care needs. Our extensive network consists of thoroughly vetted, educated, bonded, and certified caregivers who are dedicated to providing exceptional care delivered with genuine compassion for you or your loved one.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Book a Free Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => (window.location.href = "tel:+17809060994")}
                >
                  Call (780) 906-0994
                </Button>
              </motion.div>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-2 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-sm">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image with Soft Blue Gradient Shape */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y, opacity }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Soft blue gradient background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 rounded-3xl -z-10 transform scale-105" />
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/first image.jpg"
                  alt="Professional caregiver assisting elderly patient"
                  width={800}
                  height={1000}
                  className="w-full h-[500px] md:h-[600px] object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats Cards with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-blue-600"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

