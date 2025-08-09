// Chadson v69.69: Knowledge Base Main Page
// This page serves as the entry point to the automotive knowledge base.

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function KnowledgeBasePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Automotive Knowledge Base</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome to our comprehensive automotive knowledge base. Here you will find a wealth of information on various car models, maintenance, and performance tuning.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/knowledge-base/subaru-wrx">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Subaru WRX</CardTitle>
              <CardDescription>A comprehensive guide to the legendary all-wheel-drive sport compact.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/knowledge-base/mitsubishi-lancer-evolution">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Mitsubishi Lancer Evolution</CardTitle>
              <CardDescription>A deep dive into the rally-bred icon, from Evo I to Evo X.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/knowledge-base/ford-mustang">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Ford Mustang</CardTitle>
              <CardDescription>An exploration of America's favorite pony car, from its inception to the present day.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/knowledge-base/best-driving-roads-eastern-ct">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>Best Driving Roads in Eastern CT</CardTitle>
              <CardDescription>Discover the most scenic and challenging roads in our own backyard.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}