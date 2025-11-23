"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";

const OurStorySection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Story - Why Harbor of Health Exists"
          subtitle=""
        />

        <div className="max-w-5xl mx-auto">
          {/* Founder Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-teal-50 to-cream rounded-2xl p-8 md:p-12 relative">
              <Quote className="w-12 h-12 text-teal-500 mb-4 opacity-50" />
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium">
                  &quot;My name is Claudine. I started Harbor of Health Home Care Services because, as a nurse of 15 years, I was saddened over witnessing seemingly endless instances of the theft of patients&apos; dignity, other nurses rushing care to dash off to another client, and often not showing up at all. When did health care become merely a business where your loved one was simply a dollar sign?
                </p>
                <p className="text-lg">
                  I originally became a nurse to help people, but this industry had become unrecognizable. Everyone deserves affordable, dependable, compassionate, comprehensive health care. Since the old way of doing things was failing so many people, I created my own model where the emphasis is now back on authentic quality care.
                </p>
                <p className="text-lg font-medium italic">
                  May we talk? I would cherish the opportunity to discuss how I can be of service to you and your family. In just a few minutes on our free call, you will realize you will no longer need to accept mediocrity or worse.&quot;
                </p>
                <p className="text-right text-teal-600 font-semibold mt-6">
                  — Claudine, Founder & Registered Nurse
                </p>
              </div>
            </div>
          </motion.div>

          {/* Care Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop"
                alt="Compassionate caregiver with patient"
                width={800}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-heading text-3xl font-bold text-gray-900">
                Our Care Philosophy
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our care planning process is a proactive one and focuses on taking preventative measures toward ensuring good health and well-being for as long as possible. We believe finding the best caregiver for you or your loved one is one of the most important choices you will ever need to make.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We promise to make this process as simple as possible. We know finding the care you or your loved one needs is a process no one ever wants to go through, but sometimes life decides otherwise. Rest assured, we care and we&apos;ve got you covered through this difficult process or time.
              </p>
            </div>
          </motion.div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              "Personalized care plans tailored to you or your loved one's needs",
              "Trained professionals dedicated to you or your loved one's well-being",
              "Peace of mind knowing you or your loved one are in trusted hands",
            ].map((point, index) => (
              <div
                key={index}
                className="bg-teal-50 rounded-xl p-6 text-center"
              >
                <p className="text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Schedule Your Free Consultation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

