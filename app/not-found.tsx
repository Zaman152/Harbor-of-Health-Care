import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cream px-4">
      <div className="text-center max-w-2xl">
        <h1 className="font-heading text-9xl font-bold text-teal-500 mb-4">
          404
        </h1>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s
          get you back home.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg" className="inline-flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

