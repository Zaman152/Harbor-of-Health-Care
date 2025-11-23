"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 via-pink-500 to-cyan-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
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
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Get Exceptional Care delivered with{" "}
            <span className="text-pink-200">genuine compassion</span> Today!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 mb-8"
          >
            <p className="text-lg text-teal-50 leading-relaxed">
              Our care planning process is a proactive one and focuses on taking preventative measures toward ensuring good health and well-being for as long as possible. We believe finding the best caregiver for you or your loved one is one of the most important choices you will ever need to make.
            </p>
            <p className="text-lg text-teal-50 leading-relaxed">
              We promise to make this process as simple as possible. We know finding the care you or your loved one needs is a process no one ever wants to go through, but sometimes life decides otherwise. Rest assured, we care and we've got you covered through this difficult process or time. <span className="font-semibold italic text-cyan-200">We are here to Serve!</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-pink-500 hover:bg-pink-50 shadow-xl border-2 border-pink-500"
                onClick={() => (window.location.href = "/contact")}
              >
                Schedule Free Consultation
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-pink-300 text-white hover:bg-pink-500/30 backdrop-blur-sm hover:border-pink-400"
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
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm text-teal-100 mt-6"
          >
            Available Mon-Sun 8:00 AM - 10:00 PM
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

