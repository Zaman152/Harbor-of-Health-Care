"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute blob-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background: `linear-gradient(135deg, rgba(31, 162, 174, 0.1), rgba(45, 212, 191, 0.05))`,
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                We connect seniors with their{" "}
                <span className="gradient-text">ideal caregivers</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl"
              >
                We provide personalized care, designed to meet your or your loved one's unique care needs. Our extensive network consists of thoroughly vetted, educated, bonded, and certified caregivers who are dedicated to providing exceptional care delivered with genuine compassion for you or your loved one.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 py-4 gradient-btn"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Book a Free Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-teal-500 hover:bg-teal-500 hover:text-white transition-all"
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
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700 group-hover:text-teal-600 transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y, opacity }}
            className="lg:col-span-2 relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-cyan-500/20 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
              <Image
                src="/images/img-96as.webp"
                alt="Professional caregiver assisting elderly patient"
                width={800}
                height={1000}
                className="w-full h-[500px] md:h-[600px] object-cover"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-transparent to-cyan-400/20 z-10 pointer-events-none" />
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
          {stats.map((stat, index) => {
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
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
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
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
          className="flex flex-col items-center space-y-2 text-teal-500"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

