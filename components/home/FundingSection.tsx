"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, DollarSign } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const FundingSection: React.FC = () => {
  return (
    <section id="funding" className="py-20 bg-gradient-to-br from-cream via-teal-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Funding Information / CDHCI"
          subtitle="Harbor of Health Home Care Services is committed to learning and educating ourselves on the different opportunities for funding and coverage of our services. We hope to make our services accessible to ALL."
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card hover={false} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-200">
                  <DollarSign className="w-10 h-10 text-pink-500" />
                </div>
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Making Care Accessible
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We understand that accessing quality home care services can be a concern. That&apos;s why we&apos;re committed to helping you navigate funding options available in Alberta, including:
              </p>
              <ul className="text-left space-y-3 mb-8 max-w-2xl mx-auto">
                <li className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Client Directed Home Care Invoicing (CDHCI)</strong>
                    <p className="text-gray-700 text-sm">A program that allows you to direct your home care funding to the provider of your choice</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Alberta Funding Programs</strong>
                    <p className="text-gray-700 text-sm">Various provincial programs designed to support home care services</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Financial Support Guidance</strong>
                    <p className="text-gray-700 text-sm">Our team can help you understand and access available funding options</p>
                  </div>
                </li>
              </ul>
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = "/contact")}
              >
                Learn About Funding Options
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FundingSection;

