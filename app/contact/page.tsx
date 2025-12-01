"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Check, X, ChevronDown, Search } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";
import { sortedCountries, type Country } from "@/lib/countries";

// Use the complete country dataset from lib/countries.ts
const ALL_COUNTRIES = sortedCountries;

// Enhanced validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  patientLiaison: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Please select a country"),
  phone: z.string().min(1, "Phone number is required"),
  postalCode: z.string().optional(),
  acknowledgeContactLens: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge this field",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Email validation utility
const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email) return { isValid: false, message: "" };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const tldRegex = /\.[a-z]{2,}$/i;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Invalid email format" };
  }
  
  if (!tldRegex.test(email)) {
    return { isValid: false, message: "Invalid domain" };
  }
  
  return { isValid: true, message: "Valid email" };
};

// Phone validation utility based on selected country
const validatePhone = (
  phone: string,
  selectedCountry: Country | null
): { isValid: boolean; message: string } => {
  if (!phone) return { isValid: false, message: "" };
  if (!selectedCountry) return { isValid: false, message: "Please select a country" };
  
  const digitsOnly = phone.replace(/\D/g, "");
  
  if (digitsOnly.length < selectedCountry.minLength) {
    return {
      isValid: false,
      message: `Phone number must be at least ${selectedCountry.minLength} digits`,
    };
  }
  
  if (digitsOnly.length > selectedCountry.maxLength) {
    return {
      isValid: false,
      message: `Phone number must be at most ${selectedCountry.maxLength} digits`,
    };
  }
  
  if (!selectedCountry.pattern.test(digitsOnly)) {
    return {
      isValid: false,
      message: `Invalid phone number for ${selectedCountry.name}`,
    };
  }
  
  return { isValid: true, message: "Valid phone number" };
};

// Postal code validation utility
const validatePostalCode = (postalCode: string): { isValid: boolean; message: string } => {
  if (!postalCode) return { isValid: false, message: "" };
  
  const digitsOnly = postalCode.replace(/\D/g, "");
  
  if (digitsOnly.length === 0) return { isValid: false, message: "" };
  if (digitsOnly.length < 5) {
    return { isValid: false, message: "Postal code must be 5 digits" };
  }
  if (digitsOnly.length > 5) {
    return { isValid: false, message: "Postal code must be exactly 5 digits" };
  }
  if (/^\d{5}$/.test(digitsOnly)) {
    return { isValid: true, message: "Valid postal code" };
  }
  return { isValid: false, message: "Postal code must be numbers only" };
};

// Enhanced Input component with real-time validation feedback
interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  validationState?: "idle" | "valid" | "invalid";
  validationMessage?: string;
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ label, error, validationState = "idle", validationMessage, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white
              ${
                validationState === "valid"
                  ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                  : validationState === "invalid"
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-pink-500 focus:border-pink-300"
              }
              ${className || ""}
            `}
            {...props}
          />
          {validationState === "valid" && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
          {validationState === "invalid" && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <X className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        <AnimatePresence>
          {validationMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`mt-1 text-sm ${
                validationState === "valid" ? "text-green-600" : "text-red-500"
              }`}
              role="alert"
            >
              {validationMessage}
            </motion.p>
          )}
        </AnimatePresence>
        {error && !validationMessage && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

// Enhanced Textarea component
interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none bg-white
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-pink-500 focus:border-pink-300"
            }
            ${className || ""}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea";

// Country Selector Component with Search
interface CountrySelectorProps {
  value: string;
  onChange: (countryCode: string) => void;
  error?: string;
  showLabel?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, error, showLabel = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedCountry = sortedCountries.find((c) => c.code === value) || sortedCountries[0];

  // Filter countries based on search query
  const filteredCountries = sortedCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white
            flex items-center justify-between
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-pink-500 focus:border-pink-300"
            }
          `}
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-gray-700">{selectedCountry.dialCode}</span>
            <span className="text-gray-500">({selectedCountry.name})</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-300"
                  />
                </div>
              </div>

              {/* Country List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No countries found</div>
                ) : (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        onChange(country.code);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`
                        w-full px-4 py-3 text-left hover:bg-pink-50 transition-colors
                        flex items-center space-x-3 border-b border-gray-100 last:border-b-0
                        ${value === country.code ? "bg-pink-50" : ""}
                      `}
                    >
                      <span className="text-xl flex-shrink-0">{country.flag}</span>
                      <span className="flex-1 text-gray-700 font-medium">{country.name}</span>
                      <span className="text-gray-500 text-sm">{country.dialCode}</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Real-time validation states
  const [emailValidation, setEmailValidation] = useState<{
    state: "idle" | "valid" | "invalid";
    message: string;
  }>({ state: "idle", message: "" });
  
  const [phoneValidation, setPhoneValidation] = useState<{
    state: "idle" | "valid" | "invalid";
    message: string;
  }>({ state: "idle", message: "" });
  
  const [postalCodeValidation, setPostalCodeValidation] = useState<{
    state: "idle" | "valid" | "invalid";
    message: string;
  }>({ state: "idle", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      acknowledgeContactLens: false,
      countryCode: "CA", // Default to Canada
    },
  });

  // Watch form values for real-time validation
  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const postalCodeValue = watch("postalCode");
  const countryCodeValue = watch("countryCode");
  const selectedCountry = sortedCountries.find((c) => c.code === countryCodeValue) || sortedCountries[0];

  // Real-time email validation
  useEffect(() => {
    if (!emailValue) {
      setEmailValidation({ state: "idle", message: "" });
      return;
    }
    
    const validation = validateEmail(emailValue);
    setEmailValidation({
      state: validation.isValid ? "valid" : "invalid",
      message: validation.message,
    });
  }, [emailValue]);

  // Real-time phone validation and formatting based on country
  useEffect(() => {
    if (!phoneValue) {
      setPhoneValidation({ state: "idle", message: "" });
      return;
    }
    
    // Format phone number based on selected country
    const digitsOnly = phoneValue.replace(/\D/g, "");
    const formatted = selectedCountry.format(digitsOnly);
    
    if (formatted !== phoneValue) {
      setValue("phone", formatted, { shouldValidate: false });
    }
    
    const validation = validatePhone(formatted, selectedCountry);
    setPhoneValidation({
      state: validation.isValid ? "valid" : "invalid",
      message: validation.message,
    });
  }, [phoneValue, selectedCountry, setValue]);

  // Reset phone when country changes
  useEffect(() => {
    setValue("phone", "", { shouldValidate: false });
    setPhoneValidation({ state: "idle", message: "" });
  }, [countryCodeValue, setValue]);

  // Real-time postal code validation
  useEffect(() => {
    if (!postalCodeValue) {
      setPostalCodeValidation({ state: "idle", message: "" });
      return;
    }
    
    const digitsOnly = postalCodeValue.replace(/\D/g, "");
    if (digitsOnly !== postalCodeValue && digitsOnly.length <= 5) {
      setValue("postalCode", digitsOnly, { shouldValidate: false });
    }
    
    const validation = validatePostalCode(digitsOnly || postalCodeValue);
    setPostalCodeValidation({
      state: validation.isValid ? "valid" : "invalid",
      message: validation.message,
    });
  }, [postalCodeValue, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset({
      acknowledgeContactLens: false,
      countryCode: "CA",
    });
    // Reset validation states
    setEmailValidation({ state: "idle", message: "" });
    setPhoneValidation({ state: "idle", message: "" });
    setPostalCodeValidation({ state: "idle", message: "" });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Check if form is valid for button enable/disable
  const isFormValid = 
    emailValidation.state === "valid" &&
    phoneValidation.state === "valid" &&
    (postalCodeValue ? postalCodeValidation.state === "valid" : true) &&
    watch("firstName") &&
    watch("lastName") &&
    watch("dateOfBirth") &&
    watch("acknowledgeContactLens") &&
    watch("message") &&
    watch("message").length >= 10;

  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-pink-50 via-white to-pink-50">
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
                  We&apos;re available to discuss your or your loved one&apos;s care needs and answer any
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

            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  Request Free Consultation
                </h3>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Our senior care planning process is a proactive one and focuses on taking preventative measures toward ensuring good health and well-being. We believe finding the best senior caregiver for yourself or your loved one is one of the most important choices you will ever have to make.
                </p>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-pink-50 border-2 border-pink-200 rounded-lg text-pink-800"
                    >
                      Thank you for reaching out! We&apos;ll contact you within 24 hours. We are Here to Serve!
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Patient Details Section */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Patient Details</h4>
                  
                  {/* First Name and Last Name - Side by side on desktop, stacked on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EnhancedInput
                      label="First Name"
                      id="firstName"
                      {...register("firstName")}
                      error={errors.firstName?.message}
                      required
                    />
                    <EnhancedInput
                      label="Last Name"
                      id="lastName"
                      {...register("lastName")}
                      error={errors.lastName?.message}
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <EnhancedInput
                    label="Date of Birth"
                    type="date"
                    id="dateOfBirth"
                    {...register("dateOfBirth")}
                    error={errors.dateOfBirth?.message}
                    required
                  />

                  {/* Patient Liaison */}
                  <EnhancedInput
                    label="Patient Liaison"
                    type="text"
                    id="patientLiaison"
                    {...register("patientLiaison")}
                    error={errors.patientLiaison?.message}
                    placeholder="Enter patient liaison name"
                  />

                  {/* Email with real-time validation */}
                  <EnhancedInput
                    label="Email"
                    type="email"
                    id="email"
                    {...register("email")}
                    error={errors.email?.message}
                    validationState={emailValidation.state}
                    validationMessage={emailValidation.message}
                    required
                  />

                  {/* Phone Section with Country Code Dropdown */}
                  <div className="space-y-4">
                    {/* Labels row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="block text-sm font-medium text-gray-700 md:col-span-1">
                        Country <span className="text-red-500 ml-1">*</span>
                      </label>
                      <label className="block text-sm font-medium text-gray-700 md:col-span-2">
                        Phone Number <span className="text-red-500 ml-1">*</span>
                      </label>
                    </div>
                    {/* Inputs row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Country Code Selector */}
                      <div className="md:col-span-1">
                        <CountrySelector
                          value={countryCodeValue}
                          onChange={(code) => setValue("countryCode", code)}
                          error={errors.countryCode?.message}
                          showLabel={false}
                        />
                      </div>
                      {/* Phone Number Input */}
                      <div className="md:col-span-2">
                        <EnhancedInput
                          label=""
                          type="tel"
                          id="phone"
                          placeholder={selectedCountry.format("1234567890".slice(0, selectedCountry.maxLength)).replace(/\d/g, "X")}
                          {...register("phone")}
                          error={errors.phone?.message}
                          validationState={phoneValidation.state}
                          validationMessage={phoneValidation.message}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Postal Code (Optional) */}
                  <EnhancedInput
                    label="Postal Code (Optional)"
                    type="text"
                    id="postalCode"
                    placeholder="12345"
                    {...register("postalCode")}
                    error={errors.postalCode?.message}
                    validationState={postalCodeValidation.state}
                    validationMessage={postalCodeValidation.message}
                    maxLength={5}
                  />

                  {/* Message Field */}
                  <EnhancedTextarea
                    label="Message"
                    id="message"
                    rows={6}
                    placeholder="Tell us about your care needs..."
                    {...register("message")}
                    error={errors.message?.message}
                    required
                  />

                  {/* Checkbox for Contact Lens Acknowledgment */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="acknowledgeContactLens"
                        type="checkbox"
                        {...register("acknowledgeContactLens")}
                        className={`
                          w-4 h-4 rounded border-gray-300 focus:ring-pink-500 text-pink-500
                          ${errors.acknowledgeContactLens ? "border-red-500" : ""}
                        `}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="acknowledgeContactLens"
                        className="font-medium text-gray-700"
                      >
                        I understand that if I wear hard or gas permeable contact lenses, I must remove them 7 days before my consultation.
                        {errors.acknowledgeContactLens && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {errors.acknowledgeContactLens && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.acknowledgeContactLens.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button - Disabled until all validations pass */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 hover:from-pink-600 hover:via-pink-500 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                    disabled={isSubmitting || !isFormValid}
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
