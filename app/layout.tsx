import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ChatWidget from "@/components/shared/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harbor of Health Home Care Services | Edmonton Home Care | We are Here to Serve",
  description:
    "Exceptional home care services delivered with genuine compassion in Edmonton & surrounding areas. Founded by a nurse with 15 years experience. Companionship, palliative care, dementia care & more. Call (780) 906-0994",
  keywords: [
    "home care Edmonton",
    "senior care Edmonton Alberta",
    "palliative care",
    "dementia care",
    "respite care",
    "CDHCI funding",
    "compassionate care givers",
    "Edmonton home care services",
    "Alberta home care",
  ],
  authors: [{ name: "Harbor of Health Home Care Services" }],
  openGraph: {
    title: "Harbor of Health Home Care Services | Edmonton Home Care",
    description:
      "Exceptional care delivered with genuine compassion. We are Here to Serve! Serving Edmonton and surrounding areas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeHealthAgency",
              name: "Harbor of Health Home Care Services",
              description:
                "We provide personalized care delivered with genuine compassion",
              founder: {
                "@type": "Person",
                name: "Claudine",
                jobTitle: "Registered Nurse",
                yearsOfExperience: "15",
              },
              areaServed: {
                "@type": "City",
                name: "Edmonton",
                state: "Alberta",
                country: "Canada",
              },
              telephone: "+1-780-906-0994",
              email: "hello@harborofhealthhomecare.com",
              slogan: "We are Here to Serve!",
              openingHours: "Mo-Su 08:00-22:00",
              priceRange: "$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Edmonton",
                addressRegion: "Alberta",
                addressCountry: "CA",
              },
            }),
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

