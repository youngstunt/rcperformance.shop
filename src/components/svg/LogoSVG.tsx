'use client';

import { cn } from '@/lib/utils';

interface LogoSVGProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function LogoSVG({ size = 48, className, animate = false }: LogoSVGProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="RC Performance Logo"
    >
      <defs>
        {/* Metallic gradient for outer ring */}
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chrome-highlight, #d4d4d8)" />
          <stop offset="30%" stopColor="var(--chrome, #a1a1aa)" />
          <stop offset="50%" stopColor="var(--chrome-dark, #71717a)" />
          <stop offset="70%" stopColor="var(--chrome, #a1a1aa)" />
          <stop offset="100%" stopColor="var(--chrome-highlight, #d4d4d8)" />
        </linearGradient>

        {/* Primary color gradient */}
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary, #ea580c)" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>

        {/* Inner shadow */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>

        {/* Glow effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring - turbo housing */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="url(#metalGradient)"
        strokeWidth="4"
      />

      {/* Inner housing ring */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="var(--card, #1c1c22)"
        stroke="var(--chrome-dark, #71717a)"
        strokeWidth="1"
      />

      {/* Compressor wheel blades */}
      <g className={animate ? 'animate-spin-slow origin-center' : ''} style={{ transformOrigin: '50px 50px' }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M50 50 L50 18 Q55 22 58 28 L50 50"
            fill="url(#metalGradient)"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.9"
          />
        ))}
      </g>

      {/* Center hub */}
      <circle
        cx="50"
        cy="50"
        r="18"
        fill="url(#primaryGradient)"
        filter="url(#glow)"
      />

      {/* Center hub inner ring */}
      <circle
        cx="50"
        cy="50"
        r="15"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />

      {/* RC Text */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="var(--font-heading, 'Oswald', sans-serif)"
        style={{ letterSpacing: '1px' }}
      >
        RC
      </text>
    </svg>
  );
}

// Compact version for small spaces
export function LogoCompact({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="RC Performance"
    >
      <defs>
        <linearGradient id="compactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary, #ea580c)" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="45" fill="url(#compactGradient)" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="white"
        fontSize="28"
        fontWeight="bold"
        fontFamily="var(--font-heading, 'Oswald', sans-serif)"
      >
        RC
      </text>
    </svg>
  );
}
