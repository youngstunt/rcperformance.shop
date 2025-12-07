'use client';

import { cn } from '@/lib/utils';

interface HeroBackgroundProps {
  className?: string;
}

export default function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full', className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Blueprint grid pattern */}
        <pattern
          id="heroGrid"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="var(--border, #2a2a35)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </pattern>

        {/* Larger grid overlay */}
        <pattern
          id="heroGridLarge"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 200 0 L 0 0 0 200"
            fill="none"
            stroke="var(--border, #2a2a35)"
            strokeWidth="1"
            opacity="0.3"
          />
        </pattern>

        {/* Radial gradient for depth */}
        <radialGradient
          id="heroRadialGradient"
          cx="30%"
          cy="50%"
          r="70%"
          fx="30%"
          fy="50%"
        >
          <stop offset="0%" stopColor="var(--background, #0f0f14)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--background, #0f0f14)" stopOpacity="0.95" />
        </radialGradient>

        {/* Gradient for car silhouette */}
        <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--chrome-dark, #71717a)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="var(--chrome, #a1a1aa)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--chrome-dark, #71717a)" stopOpacity="0.1" />
        </linearGradient>

        {/* Accent glow */}
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background fill */}
      <rect width="100%" height="100%" fill="var(--background, #0f0f14)" />

      {/* Grid patterns */}
      <rect width="100%" height="100%" fill="url(#heroGrid)" />
      <rect width="100%" height="100%" fill="url(#heroGridLarge)" />

      {/* Sports car silhouette - technical diagram style */}
      <g transform="translate(55%, 45%) scale(0.6)" opacity="0.12">
        {/* Car body outline */}
        <path
          d="M0 120
             L30 120 L50 100 L80 95 L120 95
             Q140 95 160 100 L200 105
             Q230 108 260 115 L300 120
             Q340 122 380 120 L420 115
             Q450 110 470 100 L500 80
             Q510 70 520 70 L560 75
             Q590 80 600 90 L620 100
             L640 120 L700 120
             L700 140 L680 155 L660 160
             Q630 165 600 160 L580 155
             Q560 150 540 155 L200 155
             Q160 158 140 155 L100 150
             Q60 145 40 155 L20 160
             L0 150 Z"
          fill="url(#carGradient)"
          stroke="var(--chrome-dark, #71717a)"
          strokeWidth="1"
        />

        {/* Wheel arches */}
        <circle cx="140" cy="150" r="45" fill="none" stroke="var(--chrome, #a1a1aa)" strokeWidth="2" opacity="0.5" />
        <circle cx="560" cy="150" r="45" fill="none" stroke="var(--chrome, #a1a1aa)" strokeWidth="2" opacity="0.5" />

        {/* Wheels */}
        <circle cx="140" cy="150" r="35" fill="var(--card, #1c1c22)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1" />
        <circle cx="560" cy="150" r="35" fill="var(--card, #1c1c22)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1" />

        {/* Wheel spokes */}
        {[0, 72, 144, 216, 288].map((angle) => (
          <line
            key={`front-${angle}`}
            x1="140"
            y1="150"
            x2={140 + 30 * Math.cos((angle * Math.PI) / 180)}
            y2={150 + 30 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--chrome-dark, #71717a)"
            strokeWidth="2"
          />
        ))}
        {[0, 72, 144, 216, 288].map((angle) => (
          <line
            key={`rear-${angle}`}
            x1="560"
            y1="150"
            x2={560 + 30 * Math.cos((angle * Math.PI) / 180)}
            y2={150 + 30 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--chrome-dark, #71717a)"
            strokeWidth="2"
          />
        ))}

        {/* Windows */}
        <path
          d="M200 100 L240 70 Q280 55 340 55 L420 60 Q460 65 490 80 L500 90 L480 95 L200 95 Z"
          fill="var(--accent, #3b82f6)"
          opacity="0.1"
          stroke="var(--chrome, #a1a1aa)"
          strokeWidth="0.5"
        />

        {/* Door line */}
        <line x1="350" y1="95" x2="350" y2="150" stroke="var(--chrome-dark, #71717a)" strokeWidth="1" opacity="0.5" />

        {/* Technical measurement lines */}
        <line x1="0" y1="180" x2="700" y2="180" stroke="var(--chrome-dark, #71717a)" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3" />
        <line x1="350" y1="30" x2="350" y2="180" stroke="var(--chrome-dark, #71717a)" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3" />
      </g>

      {/* Accent circles */}
      <circle cx="75%" cy="30%" r="150" fill="var(--primary, #ea580c)" opacity="0.03" filter="url(#heroGlow)" />
      <circle cx="85%" cy="60%" r="100" fill="var(--accent, #3b82f6)" opacity="0.02" filter="url(#heroGlow)" />

      {/* Technical lines */}
      <g opacity="0.1">
        <line x1="0" y1="25%" x2="40%" y2="25%" stroke="var(--chrome, #a1a1aa)" strokeWidth="0.5" />
        <line x1="0" y1="75%" x2="30%" y2="75%" stroke="var(--chrome, #a1a1aa)" strokeWidth="0.5" />
        <line x1="60%" y1="20%" x2="100%" y2="20%" stroke="var(--chrome, #a1a1aa)" strokeWidth="0.5" />
      </g>

      {/* Gradient overlay for text readability */}
      <rect width="100%" height="100%" fill="url(#heroRadialGradient)" />
    </svg>
  );
}

// Simpler version for smaller sections
export function GridBackground({ className }: { className?: string }) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full', className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="simpleGrid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--border, #2a2a35)"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#simpleGrid)" />
    </svg>
  );
}
