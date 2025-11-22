"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import Accordion from "@/components/ui/Accordion";

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "How do you select and train your caregivers?",
      answer:
        "All our caregivers undergo a rigorous selection process including background checks, reference verification, and comprehensive interviews. They must be certified and registered, then complete our extensive training program covering care techniques, safety protocols, and compassionate communication. We also provide ongoing education and support to ensure they stay current with best practices.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve the greater metropolitan area and surrounding communities. Our service area includes [Your City] and extends to nearby suburbs. Please contact us to confirm if we provide services in your specific location, as we're continuously expanding our coverage area.",
    },
    {
      question: "Can I change my care plan if needed?",
      answer:
        "Absolutely! We understand that care needs can change over time. You can modify your care plan at any time by speaking with your care coordinator. We'll work with you to adjust services, schedules, or caregiver assignments to best meet your evolving needs. Changes can typically be implemented within 24-48 hours.",
    },
    {
      question: "Do you offer short-term or temporary care?",
      answer:
        "Yes, we offer flexible care options including short-term care for post-surgery recovery, respite care for family caregivers, and temporary care during transitions. Whether you need care for a few days, weeks, or months, we can accommodate your timeline.",
    },
    {
      question: "What if I need care outside regular hours?",
      answer:
        "We provide 24/7 emergency support and can arrange care outside regular business hours. Our Premium Care package includes round-the-clock availability, and we have caregivers available for evening, overnight, and weekend shifts. Emergency support is always available for all our clients.",
    },
    {
      question: "How do I get started with your services?",
      answer:
        "Getting started is easy! Simply contact us through our website, call us directly, or book a free consultation. During the consultation, we'll discuss your needs, answer any questions, and create a personalized care plan. Once approved, we'll match you with a qualified caregiver and begin services within 48-72 hours.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, caregivers, and process"
        />

        <Accordion items={faqItems} />
      </div>
    </section>
  );
};

export default FAQ;

