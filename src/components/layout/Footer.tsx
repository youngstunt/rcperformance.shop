// Chadson v69.0.0: Guerrilla Automotive Footer Component
// This component will display copyright information and other relevant links.

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <p>
        &copy; {new Date().getFullYear()} RC Performance LLC. All Rights Reserved.
      </p>
    </footer>
  );
}