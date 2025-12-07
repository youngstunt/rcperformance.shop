'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoSVG } from '@/components/svg';
import { mobileMenuVariants } from '@/lib/animations';

const serviceAreas = [
  { name: 'Groton', href: '/local-service/groton' },
  { name: 'New London', href: '/local-service/new-london' },
  { name: 'Lisbon', href: '/local-service/lisbon' },
  { name: 'Mystic', href: '/local-service/mystic' },
  { name: 'Exeter', href: '/local-service/exeter' },
];

const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Knowledge Base', href: '/knowledge-base' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceAreasOpen, setIsServiceAreasOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/10'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      {/* Industrial accent line */}
      <div
        className={cn(
          'h-0.5 transition-opacity duration-300',
          isScrolled ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
        }}
      />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <LogoSVG size={40} className="transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span
              className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              RC PERFORMANCE
            </span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              ECU Tuning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-white/5"
            >
              {link.name}
            </Link>
          ))}

          {/* Service Areas Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServiceAreasOpen(!isServiceAreasOpen)}
              onBlur={() => setTimeout(() => setIsServiceAreasOpen(false), 150)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-white/5"
            >
              <MapPin size={14} className="opacity-60" />
              Service Areas
              <ChevronDown
                size={14}
                className={cn(
                  'transition-transform duration-200',
                  isServiceAreasOpen && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {isServiceAreasOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl shadow-black/20 overflow-hidden"
                >
                  <div className="py-1">
                    {serviceAreas.map((area) => (
                      <Link
                        key={area.href}
                        href={area.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => setIsServiceAreasOpen(false)}
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-border mx-2" />

          {/* Contact Links */}
          <Link
            href="tel:+18607755770"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-white/5"
          >
            <Phone size={14} className="text-primary" />
            <span className="hidden xl:inline">860-775-5770</span>
          </Link>

          <Link
            href="mailto:inquiries@rcperformance.shop"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-white/5"
          >
            <Mail size={14} className="text-primary" />
            <span className="hidden xl:inline">Email Us</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Service Areas Accordion */}
              <div>
                <button
                  onClick={() => setIsServiceAreasOpen(!isServiceAreasOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    Service Areas
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'transition-transform duration-200',
                      isServiceAreasOpen && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isServiceAreasOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 py-2 space-y-1">
                        {serviceAreas.map((area) => (
                          <Link
                            key={area.href}
                            href={area.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {area.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Section */}
              <div className="pt-4 mt-4 border-t border-border space-y-1">
                <Link
                  href="tel:+18607755770"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Phone size={18} className="text-primary" />
                  <div>
                    <div className="font-medium">Call or Text</div>
                    <div className="text-sm text-muted-foreground">860-775-5770</div>
                  </div>
                </Link>

                <Link
                  href="mailto:inquiries@rcperformance.shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Mail size={18} className="text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">inquiries@rcperformance.shop</div>
                  </div>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
