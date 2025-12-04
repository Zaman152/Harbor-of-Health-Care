"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Facebook, Instagram, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [openServices, setOpenServices] = useState(false);

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
            ? "bg-white shadow-sm py-1.5"
            : "bg-white py-2"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src="https://i0.wp.com/harborofhealthhomecare.com/wp-content/uploads/2024/04/Color-logo-no-background.png?fit=3172%2C1583&ssl=1"
                  alt="Harbor of Health Home Care Services"
                  width={200}
                  height={100}
                  className="h-auto max-h-[84px] w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => {
                if (link.name === "Services") {
                  const isActive = pathname.startsWith("/services");
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseLeave={() => setOpenServices(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenServices((o) => !o)}
                        className={`relative inline-flex items-center gap-2 text-gray-700 font-semibold transition-colors text-sm hover:text-[#04aaa5] ${
                          isActive || openServices ? "text-[#04aaa5]" : ""
                        }`}
                        aria-haspopup="menu"
                        aria-expanded={openServices}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openServices ? "rotate-180" : ""}`}
                        />
                        <span className="sr-only">Toggle services menu</span>
                        <motion.span
                          className="absolute -bottom-1 left-0 h-0.5 bg-[#04aaa5]"
                          initial={{ width: 0 }}
                          animate={{ width: isActive || openServices ? "100%" : 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>

                      <AnimatePresence>
                        {openServices && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 mt-3 w-64 rounded-md border border-gray-200 bg-white shadow-lg py-2 z-50"
                            role="menu"
                          >
                            {[
                              "Funding Information",
                              "Companionship Care",
                              "Palliative Care",
                              "Dementia/Alzheimer’s Care",
                              "Respite Care",
                              "Senior home care",
                              "Homemaking",
                              "Post-Surgery Care",
                              "In-Facility care",
                            ].map((label) => (
                              <Link
                                key={label}
                                href="/services"
                                className="block px-4 py-3 text-sm text-gray-700 hover:text-[#04aaa5] transition-colors"
                                role="menuitem"
                                onClick={() => setOpenServices(false)}
                              >
                                {label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-gray-700 font-semibold hover:text-[#04aaa5] transition-colors group text-sm ${
                      pathname === link.href ? "text-[#04aaa5]" : ""
                    }`}
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-[#04aaa5]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Social Media & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gradient-to-br hover:from-pink-100 hover:via-pink-50 hover:to-pink-100 text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-pink-400 hover:to-pink-300 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gradient-to-br hover:from-pink-100 hover:via-pink-50 hover:to-pink-100 text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-pink-400 hover:to-pink-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              
              {/* CTA Button */}
              <Button
                variant="ghost"
                size="md"
                className="flex items-center space-x-2 bg-[#ffa5d0] hover:bg-[#04aaa5] text-white rounded-full"
                onClick={() => (window.location.href = "tel:+17809060994")}
              >
                <Phone className="w-4 h-4" />
                <span>(780) 906-0994</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#04aaa5] hover:text-[#04aaa5] transition-colors"
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

