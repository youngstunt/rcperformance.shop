'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { LogoSVG } from '@/components/svg';
import { SectionDivider } from '@/components/svg';

const services = [
  { name: 'ECU Remapping', href: '/#services' },
  { name: 'Forced Induction', href: '/#services' },
  { name: 'Performance Exhaust', href: '/#services' },
  { name: 'Suspension Tuning', href: '/#services' },
  { name: 'Dyno Tuning', href: '/#services' },
];

const serviceAreas = [
  { name: 'Groton', href: '/local-service/groton' },
  { name: 'New London', href: '/local-service/new-london' },
  { name: 'Lisbon', href: '/local-service/lisbon' },
  { name: 'Mystic', href: '/local-service/mystic' },
  { name: 'Exeter', href: '/local-service/exeter' },
];

const quickLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Knowledge Base', href: '/knowledge-base' },
  { name: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Top accent stripe */}
      <div
        className="h-1"
        style={{
          background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary))',
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo & About */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <LogoSVG size={36} />
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                RC PERFORMANCE
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Eastern Connecticut's premier ECU tuning and performance shop. Expert modifications,
              mobile service available.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href="tel:+18607755770"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={14} className="text-primary" />
                860-775-5770
              </a>
              <a
                href="mailto:inquiries@rcperformance.shop"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={14} className="text-primary" />
                inquiries@rcperformance.shop
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                Eastern Connecticut
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Service Areas
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area.name}>
                  <Link
                    href={area.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <h5 className="text-xs font-semibold text-foreground mb-2">Hours</h5>
              <p className="text-sm text-muted-foreground">Mon-Fri: 9AM - 6PM</p>
              <p className="text-sm text-muted-foreground">Sat: By Appointment</p>
              <p className="text-sm text-muted-foreground">Sun: Closed</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <SectionDivider className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RC Performance LLC. All Rights Reserved.
          </p>

          {/* Optional: Social links or additional info */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/60">
              Built for performance enthusiasts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
