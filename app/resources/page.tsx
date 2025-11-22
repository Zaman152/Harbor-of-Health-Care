"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";

const ResourcesPage: React.FC = () => {
  const resources = [
    "Alberta Council on Aging",
    "Assured Income for Severely Handicapped",
    "Canada Pension Plan (CPP) Disability Benefits",
    "Canadian Paraplegic Association Alberta",
    "Edmonton Senior Centre",
    "Edmonton Seniors Coordinating Council",
    "Elder Abuse and Crime Prevention",
    "Elder Care Edmonton",
    "Fetal Alcohol Spectrum Disorder (FASD)",
    "Government of Alberta Senior Benefit Program",
    "Ministry of Seniors",
    "Persons with Developmental Disabilities (PDD)",
    "Persons With Disability",
    "Program and Services for Seniors",
    "Seniors Advisory Council for Alberta",
    "Seniors Association of Greater Edmonton",
    "Seniors Association of Greater Edmonton (SAGE)",
    "Seniors Cottage Program",
    "Seniors Financial Assistance Programs -Government of Alberta",
    "Seniors Housing",
    "Seniors Lodge Program",
    "Seniors Property Tax Deferral Program",
    "Seniors Self-Contained Housing Program",
    "Seniors Services Conference",
    "Seniors Unique Homes Program",
    "Seniors' Property Tax Deferral Act",
    "Seniors' Week",
    "Settling of Estates",
    "South East Edmonton Seniors Association Activity Centre",
    "Special Needs Assistance for Seniors – Government of Alberta",
    "Special Needs Assistance for Seniors Program",
    "Stroke Services",
    "Supportive Living Accommodation Standard",
    "Supportive Living Facilities and Compliance with Provincial Accommodation Standards",
    "The Alberta Aids to Daily Living (AADL)",
    "The Assured Income for the Severely Handicapped (AISH)",
    "The Canadian Association for Disabled Skiing (CADS)",
    "The Old Age Security (OAS) Pension",
    "Veterans Affairs Canada (VAC)",
    "West End Senior Activity Centre",
  ];

  return (
    <>
      <div className="pt-24 pb-16 bg-gradient-to-br from-teal-50 via-white to-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Senior Care Links & Resources"
            subtitle="Resources for Seniors Care Links & Family CareGivers"
          />
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Senior Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Below is a comprehensive list of resources available for seniors and their families in Alberta. These links provide valuable information about programs, services, and support available in our community.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <a
                    href="#"
                    className="block bg-teal-50 hover:bg-teal-100 rounded-lg p-4 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-teal-600 transition-colors">
                        {resource}
                      </span>
                      <ExternalLink className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-teal-50 rounded-xl p-8 text-center"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Need help finding the right resource for you or your loved one?
              </p>
              <p className="text-gray-700 mb-6">
                Contact us at <a href="tel:+17809060994" className="text-teal-600 font-semibold hover:text-teal-700">(780) 906-0994</a> or{" "}
                <a href="mailto:hello@harborofhealthhomecare.com" className="text-teal-600 font-semibold hover:text-teal-700">hello@harborofhealthhomecare.com</a>
              </p>
              <p className="text-teal-600 font-semibold italic">
                We are Here to Serve!
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;

