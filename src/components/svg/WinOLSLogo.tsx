'use client';

import { cn } from '@/lib/utils';

interface WinOLSLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function WinOLSLogo({ width = 100, height = 64, className }: WinOLSLogoProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      width={width}
      height={height}
      className={cn('flex-shrink-0', className)}
      aria-label="WinOLS by EVC"
    >
      <defs>
        {/* Blue gradient for WinOLS text */}
        <linearGradient id="winolsBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a90d9" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Red gradient for EVC */}
        <linearGradient id="evcRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>

        {/* Subtle shadow */}
        <filter id="winolsShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background rounded rect */}
      <rect
        x="2"
        y="2"
        width="116"
        height="76"
        rx="8"
        ry="8"
        fill="white"
        stroke="#e5e7eb"
        strokeWidth="1"
      />

      {/* WinOLS text */}
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fill="url(#winolsBlue)"
        fontSize="22"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        filter="url(#winolsShadow)"
      >
        WinOLS
      </text>

      {/* "by" text */}
      <text
        x="42"
        y="58"
        textAnchor="middle"
        fill="#6b7280"
        fontSize="12"
        fontFamily="Arial, sans-serif"
      >
        by
      </text>

      {/* EVC text */}
      <text
        x="72"
        y="58"
        textAnchor="middle"
        fill="url(#evcRed)"
        fontSize="16"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        EVC
      </text>

      {/* Small chip icon to represent ECU */}
      <g transform="translate(10, 12)">
        {/* Chip body */}
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#374151" />
        {/* Chip pins - top */}
        <rect x="3" y="-2" width="2" height="3" fill="#6b7280" />
        <rect x="7" y="-2" width="2" height="3" fill="#6b7280" />
        <rect x="11" y="-2" width="2" height="3" fill="#6b7280" />
        {/* Chip pins - bottom */}
        <rect x="3" y="15" width="2" height="3" fill="#6b7280" />
        <rect x="7" y="15" width="2" height="3" fill="#6b7280" />
        <rect x="11" y="15" width="2" height="3" fill="#6b7280" />
        {/* Chip pins - left */}
        <rect x="-2" y="3" width="3" height="2" fill="#6b7280" />
        <rect x="-2" y="7" width="3" height="2" fill="#6b7280" />
        <rect x="-2" y="11" width="3" height="2" fill="#6b7280" />
        {/* Chip pins - right */}
        <rect x="15" y="3" width="3" height="2" fill="#6b7280" />
        <rect x="15" y="7" width="3" height="2" fill="#6b7280" />
        <rect x="15" y="11" width="3" height="2" fill="#6b7280" />
        {/* Chip center dot */}
        <circle cx="8" cy="8" r="3" fill="#2563eb" />
      </g>
    </svg>
  );
}
