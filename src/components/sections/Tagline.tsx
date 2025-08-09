// Chadson v69.69: Tagline Component
// This component displays the company's tagline and a brief description of services.

import React from 'react';

export default function Tagline() {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-8 text-center">
      <h2 className="text-3xl font-bold text-primary">
        Premiere ECU Tuning & Mechanical Shop in Eastern CT
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        With our mobile mechanic services, we come to you to get the job done right.
      </p>
    </div>
  );
}