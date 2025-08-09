// Chadson v69.0.0: Guerrilla Automotive Hero Section
// Purpose: Display the main headline and a brief description of the business.
// This component is designed to be the primary view when the page loads.
// Refactored to align with shadcn/ui design system and new tab-based layout.

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export default function Hero() {
  return (
    <Card className="w-full border-0 shadow-none bg-transparent">
        <CardHeader className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              RC Performance Automotive Services
            </h1>
            <CardDescription className="text-lg md:text-xl text-white">
              Full Service Auto Repair + Mobile & Remote Performance Tuning in Eastern Connecticut
            </CardDescription>
        </CardHeader>
    </Card>
  );
}