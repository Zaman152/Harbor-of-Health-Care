"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Award, Users, Clock, Quote, Check } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every interaction with genuine care and empathy, treating your loved ones as if they were our own family.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We maintain the highest standards in care delivery, continuously improving our services and caregiver training.",
    },
    {
      icon: Users,
      title: "Respect",
      description:
        "We honor the dignity and independence of every individual, respecting their preferences and choices.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description:
        "You can count on us to be there when you need us, providing consistent and dependable care services.",
    },
  ];

  return (
    <>
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#04aaa5] text-white px-6 py-10 md:py-14 shadow-sm">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-sm font-semibold tracking-wider opacity-90 mb-2">ABOUT US</div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Here to Serve</h1>
              <p className="text-xl opacity-95">
                Harbor of Health Home Care Services is driven by our love for exceptional care delivered with genuine Compassion. Discover our commitment to the top quality of care that you or your loved one deserve. Serving you brings us joy!
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/Boutique HomeCare IMage.jpeg"
                alt="Caregiver with elderly patient"
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
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  WHO WE ARE
                </h2>
                <h3 className="font-heading text-2xl font-bold text-[#04aaa5] mb-4">
                  Boutique Homecare
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Looking for something better than publicly funded care providers? We offer compassionate home care with passion and reliability. Started by a nurse with a dream to exceed the expectations of the clients and the families that trust us to care for them and their loved ones. Here is what you can expect:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#04aaa5] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Personalized care plans tailored to your or your loved one&apos;s unique needs.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#04aaa5] mr-2 mt-0.5 flex-shrink-0" />
                    <span>A team of dedicated professionals devoted to your or your loved one&apos;s well-being.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#04aaa5] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Peace of mind knowing you or your loved ones are cared for by experts with genuine compassion.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 bg-gradient-to-br from-teal-50 to-cream rounded-2xl p-8 md:p-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
              Where Care Meets Genuine Hearts
            </h2>
            <p className="text-2xl text-[#04aaa5] font-semibold italic text-center mb-8">
              We are Here to Serve!
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  Our mission:
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To serve our clients with genuine, top-notch, professional, and compassionate care that enhances lives and brings balance, joy and peace of mind to all.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  Our Commitment:
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Supporting individuals to live securely and comfortably within the familiarity of their own homes, prioritizing their physical, emotional, mental, and spiritual well-being.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Healthcare Network Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 rounded-2xl bg-[#04aaa5] text-white p-8 md:p-12 transition-all"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8">
              A NETWORK OF HEALTHCARE CONNECTIONS IN EDMONTON:
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed mb-6">
                Here in Edmonton, Harbor of Health Home Care Services serves as the crucial link to a comprehensive healthcare experience. Apart from our devoted team of caregivers, we&apos;ve established an extensive network of healthcare professionals to ensure you receive specialized care whenever necessary. This includes:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Collaborating with Occupational Therapists to tackle daily living obstacles,</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Linking you with Physical Therapists to enhance mobility, and</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Arranging vital tests through in-house labs.</span>
                </li>
              </ul>
              <p className="text-lg leading-relaxed">
                Our dedication lies in your overall wellness. With Harbor of Health Home Care Services, you&apos;re not simply acquiring a caregiver; you&apos;re gaining a reliable ally with broad healthcare connections, guaranteeing an unparalleled care journey.
              </p>
            </div>
          </motion.div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              What Sets Our Process Apart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "📋",
                  title: "Complimentary care needs assessments.",
                  description: "A qualified nurse will assess your needs and determine the care required. There is no charge for this consultation—it serves as the initial step towards ensuring you find the right home care provider in Edmonton, offering you the reassurance you deserve.",
                },
                {
                  icon: "🏠",
                  title: "Tailored home care solutions.",
                  description: "Harbor of Health Home Care Services does not offer standardized packages. Our experienced nurses develop personalized plans for each client, ranging from basic household chores to comprehensive 24/7 assistance. We collaborate closely with your other healthcare providers to ensure comprehensive care coordination and communication.",
                },
                {
                  icon: "💚",
                  title: "Ongoing assistance and enhancement.",
                  description: "Your care journey with Harbor of Health Home Care Services is a dynamic process. Beyond the initial assessment, we continuously monitor caregiver reports, conduct regular check-ins, adapt to evolving needs, and actively involve you in your care. Your feedback guides our commitment to constant refinement, guaranteeing that your changing requirements are met with consistent support and dedication.",
                },
                {
                  icon: "🤝",
                  title: "Consistency in care.",
                  description: "Recognizing the discomfort that can accompany unfamiliar faces in your home, we prioritize cultivating trust through the presence of familiar caregivers. We aim for you to encounter these friendly, familiar faces consistently, promoting a sense of ease and security. Your comfort and peace of mind are central to our approach at Harbor of Health Home Care Services.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md h-full"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Care Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-12 text-center text-white bg-[#04aaa5] hover:bg-[#028e89] transition-colors"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              PREMIUM CARE AWAITS
            </h2>
            <h3 className="font-heading text-2xl font-semibold mb-6">
              Elevate Your Care Services
            </h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
              Enhance Your Home Care Experience with Harbor of Health Home Care Services! Are you ready to receive or provide your loved ones with the highest quality care possible? Harbor of Health offers comprehensive home care services customized to your unique needs. Whether you require assistance with daily tasks, companionship, or specialized care, we&apos;re here to support you every step of the way. Contact us today to arrange a consultation and elevate your care services to the next level.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-[#04aaa5] hover:bg-white/90"
              onClick={() => (window.location.href = "/contact")}
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

