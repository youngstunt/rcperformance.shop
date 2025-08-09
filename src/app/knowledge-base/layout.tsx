// Chadson v69.69: Knowledge Base Layout
// This layout defines the structure for the automotive knowledge base.

import React from 'react';
import Link from 'next/link';

export default function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4 flex">
      <aside className="w-1/4 p-4 border-r border-border">
        <h2 className="text-xl font-bold mb-4">Knowledge Base</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/knowledge-base/subaru-wrx" className="text-muted-foreground hover:text-primary">
            Subaru WRX
          </Link>
          <Link href="/knowledge-base/mitsubishi-lancer-evolution" className="text-muted-foreground hover:text-primary">
            Mitsubishi Lancer Evolution
          </Link>
          <Link href="/knowledge-base/ford-mustang" className="text-muted-foreground hover:text-primary">
            Ford Mustang
          </Link>
          <Link href="/knowledge-base/best-driving-roads-eastern-ct" className="text-muted-foreground hover:text-primary">
            Best Driving Roads in Eastern CT
          </Link>
          <Link href="/blog/subaru-tuning-romraider" className="text-muted-foreground hover:text-primary">
            Subaru Tuning with ROMRaider
          </Link>
          <Link href="/blog/ford-f150-tuning-hp-tuners" className="text-muted-foreground hover:text-primary">
            Ford F-150 Tuning with HP Tuners
          </Link>
          <Link href="/blog/tractor-tuning-eastern-ct" className="text-muted-foreground hover:text-primary">
            Tractor Tuning in Eastern CT
          </Link>
        </nav>
      </aside>
      <main className="w-3/4 p-4">{children}</main>
    </div>
  );
}