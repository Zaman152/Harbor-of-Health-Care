"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Facebook, Instagram } from "lucide-react";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-sm py-3"
            : "bg-white py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src="/images/logo.png"
                  alt="Harbor of Health Home Care Services"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  Harbor of Health
                </span>
                <span className="font-heading text-xs text-gray-600 group-hover:text-blue-600 transition-colors">
                  Home Care Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors group text-sm"
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Social Media & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              
              {/* CTA Button */}
              <Button
                variant="primary"
                size="md"
                className="flex items-center space-x-2"
                onClick={() => (window.location.href = "tel:+17809060994")}
              >
                <Phone className="w-4 h-4" />
                <span>(780) 906-0994</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

export default Header;

