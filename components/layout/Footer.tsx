"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Companionship Care", href: "/services#companionship" },
    { name: "Dementia/Alzheimer's Care", href: "/services#dementia" },
    { name: "Palliative Care", href: "/services#palliative" },
    { name: "Respite Care", href: "/services#respite" },
    { name: "Senior Home Care", href: "/services#senior" },
    { name: "Post-Surgery Care", href: "/services#post-surgery" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
      {/* Decorative wave at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-pink-500 to-cyan-400" />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-teal-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Harbor of Health Home Care Services"
                  width={140}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold text-white group-hover:text-teal-500 transition-colors leading-tight">
                  Harbor of Health
                </span>
                <span className="font-heading text-xs text-gray-400 group-hover:text-teal-400 transition-colors">
                  Home Care Services
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed italic mb-2 text-teal-400">
              &quot;We are Here to Serve!&quot;
            </p>
            <p className="text-sm leading-relaxed">
              Our professional fun loving uplifting senior caregivers are ready to serve you with daily wholehearted home senior care today!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition-colors border-2 border-transparent hover:border-pink-600"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm hover:text-pink-500 transition-colors inline-block group"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-heading font-semibold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={service.href}
                    className="text-sm hover:text-pink-500 transition-colors inline-block group"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">
                      {service.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-heading font-semibold text-lg mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+17809060994"
                  className="text-sm hover:text-pink-500 transition-colors"
                >
                  (780) 906-0994
                </a>
              </motion.li>
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@harborofhealthhomecare.com"
                  className="text-sm hover:text-pink-500 transition-colors"
                >
                  hello@harborofhealthhomecare.com
                </a>
              </motion.li>
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Serving the Greater Edmonton Area<br />
                  and Beyond
                </span>
              </motion.li>
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Mon-Sun: 8:00 AM - 10:00 PM<br />
                  Available 7 days a week
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <p className="text-sm text-gray-400">
                © {currentYear} Harbor of Health Home Care Services. All rights reserved.
              </p>
              <p className="text-sm text-teal-400 italic font-semibold">
                &quot;We are Here to Serve!&quot;
              </p>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

