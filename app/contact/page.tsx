"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
    setTimeout(() => setSubmitSuccess(false), 5000);
  };


  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-teal-50 via-white to-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Connect with us"
              subtitle="Serving the Greater Edmonton Area and beyond"
            />
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We're available to discuss your or your loved one's care needs and answer any
                  questions you may have. Reach out to us through any of the
                  following methods.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 border-2 border-pink-200">
                    <Phone className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a
                      href="tel:+17809060994"
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                    >
                      (780) 906-0994
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 border-2 border-pink-200">
                    <Mail className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a
                      href="mailto:hello@harborofhealthhomecare.com"
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                    >
                      hello@harborofhealthhomecare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 border-2 border-pink-200">
                    <MapPin className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-700">
                      Serving the Greater Edmonton Area
                      <br />
                      Edmonton, Alberta, Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 border-2 border-pink-200">
                    <Clock className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h4>
                    <p className="text-gray-700">
                      Monday - Sunday: 8:00 AM - 10:00 PM
                      <br />
                      Available 7 days a week
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  Get Compassionate Services Today
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our senior care planning process is a proactive one and focuses on taking preventative measures toward ensuring good health and well-being. We believe finding the best senior caregiver for yourself or your loved one is one of the most important choices you will ever have to make.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We promise to make this process as simple as possible. We know finding the care you or your loved one needs is a process no one ever wants to go through, but sometimes life decides otherwise. Rest assured, we care and we've got you covered through this difficult process and time.
                </p>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-pink-50 border-2 border-pink-200 rounded-lg text-pink-800"
                  >
                    Thank you for reaching out! We'll contact you within 24 hours. We are Here to Serve!
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Name"
                    id="name"
                    {...register("name")}
                    error={errors.name?.message}
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    id="email"
                    {...register("email")}
                    error={errors.email?.message}
                    required
                  />

                  <Textarea
                    label="Message"
                    id="message"
                    rows={6}
                    placeholder="Tell us about your care needs..."
                    {...register("message")}
                    error={errors.message?.message}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 inline" />
                        Request Free Consultation
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

