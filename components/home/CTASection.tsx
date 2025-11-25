"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Doctor Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/second image.webp"
                alt="Professional caregiver"
                width={600}
                height={700}
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column - Rounded White Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                Get Exceptional Care delivered with{" "}
                <span className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 bg-clip-text text-transparent">genuine compassion</span> Today!
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our care planning process is a proactive one and focuses on taking preventative measures toward ensuring good health and well-being for as long as possible. We believe finding the best caregiver for you or your loved one is one of the most important choices you will ever need to make.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We promise to make this process as simple as possible. We know finding the care you or your loved one needs is a process no one ever wants to go through, but sometimes life decides otherwise. Rest assured, we care and we&apos;ve got you covered through this difficult process or time. <span className="font-semibold italic bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 bg-clip-text text-transparent">We are here to Serve!</span>
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 hover:from-pink-600 hover:via-pink-500 hover:to-pink-400 text-white shadow-lg rounded-full px-8 py-4"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Schedule Free Consultation
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-br hover:from-pink-50 hover:via-pink-100 hover:to-pink-50 rounded-full px-8 py-4"
                    onClick={() => (window.location.href = "tel:+17809060994")}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call (780) 906-0994
                  </Button>
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm text-gray-500 mt-6"
              >
                Available Mon-Sun 8:00 AM - 10:00 PM
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

