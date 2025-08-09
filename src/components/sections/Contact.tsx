// Chadson v69.0.0: RC Performance Contact Section
// Purpose: Display contact information and a simple contact form.
// Refactored to integrate with the tab-based layout and shadcn/ui design system.
// V2: Added form state, submission logic, and user feedback.
// V3: Integrated dynamic ServiceAreaMap component.

"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Dynamically import the map component to ensure it's client-side only.
  // useMemo is used to prevent re-importing on every render.
  const ServiceAreaMap = useMemo(() => dynamic(() => import('@/components/map/ServiceAreaMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-card rounded-lg flex items-center justify-center"><p>Loading Map...</p></div>,
  }), []);


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
    } catch (error) {
      setStatus('error');
      setFeedbackMessage('Failed to send message. Please check your connection and try again.');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">Get in Touch</h3>
          <p className="text-muted-foreground">
            Have a question or want a quote? Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." value={formData.message} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full hover:bg-primary/90 transition-colors" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </Button>
          {status === 'success' && <p className="text-green-500 text-sm mt-2">{feedbackMessage}</p>}
          {status === 'error' && <p className="text-red-500 text-sm mt-2">{feedbackMessage}</p>}
        </form>
        <div className="space-y-2 pt-4">
          <div>
            <p className="font-bold">Phone:</p>
            <a href="tel:+18607755770" className="hover:underline ">+1-860-775-5770</a>
          </div>
          <div>
            <p className="font-bold">Email:</p>
            <a href="mailto:inquiries@rcperformance.shop" className="hover:underline text-white">inquiries@rcperformance.shop</a>
          </div>
        </div>
      </div>
      <div className="h-[400px] md:h-full w-full rounded-lg overflow-hidden">
        <ServiceAreaMap />
      </div>
    </div>
  );
}