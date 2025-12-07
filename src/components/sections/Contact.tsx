'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '860-775-5770',
    href: 'tel:+18607755770',
    description: 'Call or text anytime',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'inquiries@rcperformance.shop',
    href: 'mailto:inquiries@rcperformance.shop',
    description: 'Usually respond within 24h',
  },
  {
    icon: MapPin,
    title: 'Service Area',
    value: 'Eastern Connecticut',
    href: '#',
    description: 'Mobile service available',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const ServiceAreaMap = useMemo(
    () =>
      dynamic(() => import('@/components/map/ServiceAreaMap'), {
        ssr: false,
        loading: () => (
          <div className="h-full w-full bg-card rounded-lg flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading Map...</div>
          </div>
        ),
      }),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage('Message sent successfully! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setFeedbackMessage(data.message || 'An unexpected error occurred. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Failed to send message. Please check your connection and try again.');
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GET IN TOUCH
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Ready to unlock your vehicle's potential? Get a free quote today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <motion.div variants={fadeInUp}>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Send a Message
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={fadeInUp}>
                  <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or ask a question..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Button
                    type="submit"
                    className="w-full group"
                    size="lg"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Feedback messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 px-4 py-3 rounded-lg"
                  >
                    <CheckCircle size={18} />
                    {feedbackMessage}
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg"
                  >
                    <AlertCircle size={18} />
                    {feedbackMessage}
                  </motion.div>
                )}
              </form>

              {/* Contact info cards */}
              <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-border/50">
                <div className="grid sm:grid-cols-3 gap-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <info.icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{info.title}</div>
                        <div className="text-sm font-medium truncate">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[400px] lg:h-[600px] w-full rounded-xl overflow-hidden border border-border/50 shadow-xl shadow-black/10"
          >
            <ServiceAreaMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
