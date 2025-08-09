// Chadson v69.69: Logo Component
// This component renders the RC Performance text-based logo.

import React from 'react';

export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-extrabold tracking-tighter text-white" style={{ fontFamily: "'Metal Mania', cursive" }}>
        <span className="text-primary">R</span>C
      </div>
      <div className="text-sm font-semibold tracking-widest text-muted-foreground">
        PERFORMANCE
      </div>
    </div>
  );
}