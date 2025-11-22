"use client";

import React from "react";
import { motion } from "framer-motion";
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Our family was nervous about transitioning our mother to home care. The warm onboarding and attentive caregivers have made it feel like a second home for her.",
      author: "Sarah W.",
      role: "Trauma patient",
    },
    {
      quote:
        "The same two team members visit my father weekly. It's the friendly faces, the memory games, stories, and their broad smiles that keep him joyful.",
      author: "Janet Brown",
      role: "Adult daughter",
    },
    {
      quote:
        "The team here is incredible. They're professional, genuinely care, and keep us updated after every visit.",
      author: "Larry Lawson",
      role: "Exceptional care",
    },
    {
      quote:
        "Knowing that her father was in such capable hands gave me immediate peace. We trust the entire team and how involved and proactive they are.",
      author: "Carolyn Ortiz",
      role: "Family caregiver",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-navy-700 text-white p-10 md:p-14">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-wide text-sky-200 mb-3">Testimonials</p>
            <h2 className="font-heading text-4xl md:text-5xl">Real stories, real care</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-navy-600 rounded-2xl p-6 border border-white/5"
              >
                <div className="flex space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <span key={star} className="text-accent-400 text-lg leading-none">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sky-100 mb-4 text-sm leading-relaxed">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sky-200 text-xs">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

