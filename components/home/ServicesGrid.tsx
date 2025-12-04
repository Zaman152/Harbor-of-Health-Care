"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  RefreshCw,
  Sparkles,
  Stethoscope,
  Building2,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import ServiceCard from "@/components/shared/ServiceCard";

const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: Users,
      title: "Companionship Care",
      description: "Providing daily social interaction, caregiving, and emotional support, engaging in activities tailored to their interests.",
    },
    {
      icon: Heart,
      title: "Palliative Care",
      description: "Home-based palliative care eases patients' pain, symptoms and emotional strain while providing compassionate and supportive assistance.",
    },
    {
      icon: RefreshCw,
      title: "Respite Care",
      description: "Offering primary caregivers much-needed relief, experienced caregivers step in to support while you recharge or attend to other responsibilities.",
    },
    {
      icon: Sparkles,
      title: "Homemaking Services",
      description: "Homemaking aid helps seniors stay at home longer by alleviating the challenges of managing household tasks due to aging-related factors.",
    },
    {
      icon: Stethoscope,
      title: "Post-Surgery Care",
      description: "Ensure a smoother recovery and better outcomes with Personalized post-surgical care, medication management and rehab support.",
    },
    {
      icon: Building2,
      title: "In-Facility care",
      description: "From daily check-ins to comprehensive 24-hour care, it allows families to recharge while ensuring their loved one's well-being.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-teal-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
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
            title="OUR SERVICES"
            subtitle="Discover the Care You Deserve with Harbor of Health Home Care Services!"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Your Trusted Partner in Quality Care. Whether you&apos;re seeking personalized assistance with daily tasks, Therapeutic companionship, or specialized care, our dedicated team is here to provide compassionate support tailored to your needs. Experience peace of mind knowing that exceptional care awaits you at Harbor of Health Home Care Services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              services={[service.description]}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/services"
            className="inline-flex items-center text-gray-700 font-semibold text-lg hover:text-[#04aaa5] transition-colors group border-b-2 border-transparent hover:border-[#04aaa5]"
            whileHover={{ x: 5 }}
          >
            Explore our additional services
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;

