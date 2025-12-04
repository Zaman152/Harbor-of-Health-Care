"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Check, X, ChevronDown, Search, CalendarDays } from "lucide-react";
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
  appointmentDate: z.string().min(1, "Please choose a date"),
  appointmentTime: z.string().min(1, "Please choose a time"),
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
                  : "border-gray-300 focus:ring-[#04aaa5] focus:border-[#04aaa5]"
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04aaa5] focus:border-[#04aaa5]"
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
                        w-full px-4 py-3 text-left hover:bg-[#04aaa5]/10 transition-colors
                        flex items-center space-x-3 border-b border-gray-100 last:border-b-0
                        ${value === country.code ? "bg-[#04aaa5]/10" : ""}
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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  
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
      countryCode: "CA", // Default to Canada
      appointmentDate: "",
      appointmentTime: "",
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
      countryCode: "CA",
      appointmentDate: "",
      appointmentTime: "",
    });
    // Reset validation states
    setEmailValidation({ state: "idle", message: "" });
    setPhoneValidation({ state: "idle", message: "" });
    setPostalCodeValidation({ state: "idle", message: "" });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Check if form is valid for button enable/disable
  const isStep1Valid =
    emailValidation.state === "valid" &&
    phoneValidation.state === "valid" &&
    (postalCodeValue ? postalCodeValidation.state === "valid" : true) &&
    Boolean(watch("firstName")) &&
    Boolean(watch("lastName")) &&
    Boolean(watch("dateOfBirth")) &&
    Boolean(watch("message")) &&
    watch("message").length >= 10;

  const isStep2Valid = Boolean(watch("appointmentDate")) && Boolean(watch("appointmentTime"));

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
                  We&apos;re available to discuss your or your loved one&apos;s care needs and answer any
                  questions you may have. Reach out to us through any of the
                  following methods.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#04aaa5]/10 flex items-center justify-center flex-shrink-0 border-2 border-[#04aaa5]/30">
                    <Phone className="w-6 h-6 text-[#04aaa5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a
                      href="tel:+17809060994"
                      className="text-[#04aaa5] hover:text-[#028e89] transition-colors"
                    >
                      (780) 906-0994
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#04aaa5]/10 flex items-center justify-center flex-shrink-0 border-2 border-[#04aaa5]/30">
                    <Mail className="w-6 h-6 text-[#04aaa5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a
                      href="mailto:hello@harborofhealthhomecare.com"
                      className="text-[#04aaa5] hover:text-[#028e89] transition-colors"
                    >
                      hello@harborofhealthhomecare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#04aaa5]/10 flex items-center justify-center flex-shrink-0 border-2 border-[#04aaa5]/30">
                    <MapPin className="w-6 h-6 text-[#04aaa5]" />
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
                  <div className="w-12 h-12 rounded-full bg-[#04aaa5]/10 flex items-center justify-center flex-shrink-0 border-2 border-[#04aaa5]/30">
                    <Clock className="w-6 h-6 text-[#04aaa5]" />
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
                      className="mb-6 p-4 bg-[#04aaa5]/10 border-2 border-[#04aaa5]/30 rounded-lg text-[#046c69]"
                    >
                      Thank you for reaching out! We&apos;ll contact you within 24 hours. We are Here to Serve!
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Stepper */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {["Patient Information", "Appointment Information", "Appointment Confirmation"].map((label, idx) => {
                    const step = (idx + 1) as 1 | 2 | 3;
                    const isActive = currentStep === step;
                    const isDone = currentStep > step;
                    return (
                      <div key={label} className={`flex items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${isActive ? "bg-[#04aaa5] text-white border-[#04aaa5]" : isDone ? "bg-[#04aaa5]/10 text-[#04aaa5] border-[#04aaa5]/30" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                        <span className="mr-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border" style={{borderColor: isActive? '#ffffff' : isDone ? '#04aaa5' : '#d1d5db', color: isActive? '#ffffff' : isDone ? '#04aaa5' : '#374151'}}>
                          {step}
                        </span>
                        {label}
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div key="step1" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Patient Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <EnhancedInput label="First Name" id="firstName" {...register("firstName")} error={errors.firstName?.message} required />
                          <EnhancedInput label="Last Name" id="lastName" {...register("lastName")} error={errors.lastName?.message} required />
                        </div>
                        <EnhancedInput label="Date of Birth" type="date" id="dateOfBirth" {...register("dateOfBirth")} error={errors.dateOfBirth?.message} required />
                        <EnhancedInput label="Email" type="email" id="email" {...register("email")} error={errors.email?.message} validationState={emailValidation.state} validationMessage={emailValidation.message} required />
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="block text-sm font-medium text-gray-700 md:col-span-1">Country <span className="text-red-500 ml-1">*</span></label>
                            <label className="block text-sm font-medium text-gray-700 md:col-span-2">Phone Number <span className="text-red-500 ml-1">*</span></label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                              <CountrySelector value={countryCodeValue} onChange={(code) => setValue("countryCode", code)} error={errors.countryCode?.message} showLabel={false} />
                            </div>
                            <div className="md:col-span-2">
                              <EnhancedInput label="" type="tel" id="phone" placeholder={selectedCountry.format("1234567890".slice(0, selectedCountry.maxLength)).replace(/\d/g, "X")} {...register("phone")} error={errors.phone?.message} validationState={phoneValidation.state} validationMessage={phoneValidation.message} required />
                            </div>
                          </div>
                        </div>
                        <EnhancedInput label="Postal Code (Optional)" type="text" id="postalCode" placeholder="12345" {...register("postalCode")} error={errors.postalCode?.message} validationState={postalCodeValidation.state} validationMessage={postalCodeValidation.message} maxLength={5} />
                        <EnhancedTextarea label="Message" id="message" rows={6} placeholder="Tell us about your care needs..." {...register("message")} error={errors.message?.message} required />
                        <Button type="button" variant="primary" size="lg" className="w-full rounded-full bg-[#04aaa5] hover:bg-[#028e89] disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isStep1Valid} onClick={() => setCurrentStep(2)}>
                          Next Step
                        </Button>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div key="step2" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Appointment Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <EnhancedInput label="Preferred Date" type="date" id="appointmentDate" {...register("appointmentDate")} error={errors.appointmentDate?.message} required />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                              {['09:00 AM','10:00 AM','11:00 AM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'].map((t) => (
                                <button key={t} type="button" onClick={() => setValue('appointmentTime', t, { shouldValidate: true })} className={`px-3 py-2 rounded-lg text-sm border transition-colors ${watch('appointmentTime')===t ? 'bg-[#04aaa5] text-white border-[#04aaa5]' : 'bg-white text-gray-700 border-gray-200 hover:bg-[#04aaa5]/10 hover:border-[#04aaa5]'}`}>
                                  {t}
                                </button>
                              ))}
                            </div>
                            {errors.appointmentTime?.message && <p className="mt-1 text-sm text-red-500">{errors.appointmentTime.message}</p>}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="rounded-full border-[#04aaa5] text-[#04aaa5] hover:bg-[#04aaa5] hover:text-white">Back</Button>
                          <Button type="button" variant="primary" className="rounded-full bg-[#04aaa5] hover:bg-[#028e89] disabled:opacity-50" disabled={!isStep2Valid} onClick={() => setCurrentStep(3)}>Next Step</Button>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div key="step3" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900">Review & Confirm</h4>
                        <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                            <div><span className="text-gray-500">First Name</span><div className="font-medium text-gray-900">{watch('firstName')}</div></div>
                            <div><span className="text-gray-500">Last Name</span><div className="font-medium text-gray-900">{watch('lastName')}</div></div>
                            <div><span className="text-gray-500">DOB</span><div className="font-medium text-gray-900">{watch('dateOfBirth')}</div></div>
                            <div><span className="text-gray-500">Email</span><div className="font-medium text-gray-900">{watch('email')}</div></div>
                            <div><span className="text-gray-500">Phone</span><div className="font-medium text-gray-900">{watch('phone')}</div></div>
                            <div><span className="text-gray-500">Postal Code</span><div className="font-medium text-gray-900">{watch('postalCode') || '—'}</div></div>
                            <div className="md:col-span-2"><span className="text-gray-500">Message</span><div className="font-medium text-gray-900 whitespace-pre-wrap">{watch('message')}</div></div>
                            <div><span className="text-gray-500">Date</span><div className="font-medium text-gray-900">{watch('appointmentDate')}</div></div>
                            <div><span className="text-gray-500">Time</span><div className="font-medium text-gray-900">{watch('appointmentTime')}</div></div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="rounded-full border-[#04aaa5] text-[#04aaa5] hover:bg-[#04aaa5] hover:text-white">Back</Button>
                          <Button type="submit" variant="primary" size="lg" className="rounded-full bg-[#04aaa5] hover:bg-[#028e89] disabled:opacity-50" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : (<><Send className="w-5 h-5 mr-2 inline" />Confirm & Send</>)}</Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
