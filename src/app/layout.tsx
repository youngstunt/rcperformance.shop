// Chadson v69.0.0: Root layout for RC Performance
// This file defines the main HTML structure and includes the Header and Footer.

import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "RC Performance | Connecticut's Premier ECU Tuning & Performance Shop",
  description: "Expert ECU remapping, forced induction, and performance tuning in New London, CT. We offer mobile and remote tuning services for Subaru, Mitsubishi, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: 'RC Performance LLC',
    url: 'https://rcperformance.shop',
    telephone: '+1-(860)775-5770',
    email: 'inquiries@rcperformance.shop',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New London',
      addressRegion: 'CT',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'New London'
      },
       {
        '@type': 'State',
        name: 'Connecticut'
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
