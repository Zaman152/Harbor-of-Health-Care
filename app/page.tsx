import React from "react";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DetailedServices from "@/components/home/DetailedServices";
import ServicesGrid from "@/components/home/ServicesGrid";
import ServiceAreasSection from "@/components/home/ServiceAreasSection";
import GetStartedSection from "@/components/home/GetStartedSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DetailedServices />
      <ServicesGrid />
      <ServiceAreasSection />
      <GetStartedSection />
      <CTASection />
    </>
  );
}

