'use client';

import { cn } from '@/lib/utils';

interface DecorativeProps {
  className?: string;
}

// Gradient mesh background for sections
export function GradientMesh({ className }: DecorativeProps) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="meshGrad1" cx="20%" cy="30%" r="50%">
          <stop offset="0%" stopColor="var(--primary, #ea580c)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="meshGrad2" cx="80%" cy="70%" r="50%">
          <stop offset="0%" stopColor="var(--accent, #3b82f6)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="meshGrad3" cx="60%" cy="20%" r="40%">
          <stop offset="0%" stopColor="var(--chrome, #a1a1aa)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#meshGrad1)" />
      <rect width="100%" height="100%" fill="url(#meshGrad2)" />
      <rect width="100%" height="100%" fill="url(#meshGrad3)" />
    </svg>
  );
}

// Racing stripe pattern
export function RacingStripes({ className }: DecorativeProps) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary, #ea580c)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--primary, #ea580c)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--primary, #ea580c)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Diagonal stripes */}
      <path
        d="M0 100% L30% 0 L35% 0 L5% 100% Z"
        fill="url(#stripeGrad)"
      />
      <path
        d="M10% 100% L40% 0 L45% 0 L15% 100% Z"
        fill="url(#stripeGrad)"
        opacity="0.5"
      />
    </svg>
  );
}

// Technical blueprint lines
export function TechLines({ className }: DecorativeProps) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--chrome, #a1a1aa)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--chrome, #a1a1aa)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--chrome, #a1a1aa)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Horizontal lines */}
      <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" />

      {/* Corner accents */}
      <path
        d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z"
        fill="none"
        stroke="var(--chrome-dark, #71717a)"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M100% 100% L60% 100% L60% 95% L95% 95% L95% 60% L100% 60% Z"
        fill="none"
        stroke="var(--chrome-dark, #71717a)"
        strokeWidth="1"
        opacity="0.3"
        transform="translate(-40, -40)"
      />
    </svg>
  );
}

// Accent line - horizontal
export function AccentLine({ className, variant = 'primary' }: DecorativeProps & { variant?: 'primary' | 'chrome' }) {
  const colors = {
    primary: 'var(--primary, #ea580c)',
    chrome: 'var(--chrome, #a1a1aa)',
  };

  return (
    <div className={cn('relative', className)}>
      <svg
        className="w-full h-1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`accentGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors[variant]} stopOpacity="0" />
            <stop offset="20%" stopColor={colors[variant]} stopOpacity="1" />
            <stop offset="80%" stopColor={colors[variant]} stopOpacity="1" />
            <stop offset="100%" stopColor={colors[variant]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#accentGrad-${variant})`} />
      </svg>
    </div>
  );
}

// Corner bracket decoration
export function CornerBracket({
  className,
  position = 'top-left'
}: DecorativeProps & { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const transforms = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  };

  return (
    <svg
      className={cn('w-8 h-8', className)}
      viewBox="0 0 32 32"
      style={{ transform: transforms[position] }}
      aria-hidden="true"
    >
      <path
        d="M0 32 L0 8 Q0 0 8 0 L32 0"
        fill="none"
        stroke="var(--chrome-dark, #71717a)"
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M0 24 L0 8 Q0 4 4 4 L24 4"
        fill="none"
        stroke="var(--primary, #ea580c)"
        strokeWidth="1"
        opacity="0.8"
      />
    </svg>
  );
}

// Decorative dots pattern
export function DotPattern({ className }: DecorativeProps) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dotPattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="var(--chrome-dark, #71717a)" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  );
}

// Section divider with industrial feel
export function SectionDivider({ className }: DecorativeProps) {
  return (
    <div className={cn('relative w-full h-px', className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--border, #2a2a35)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--border, #2a2a35)" stopOpacity="1" />
            <stop offset="50%" stopColor="var(--chrome, #a1a1aa)" stopOpacity="0.5" />
            <stop offset="80%" stopColor="var(--border, #2a2a35)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--border, #2a2a35)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dividerGrad)" />
      </svg>

      {/* Center accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-50" />
    </div>
  );
}

// Animated pulse ring (for CTAs or highlights)
export function PulseRing({ className, color = 'primary' }: DecorativeProps & { color?: 'primary' | 'accent' }) {
  const colorValue = color === 'primary' ? 'var(--primary, #ea580c)' : 'var(--accent, #3b82f6)';

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={colorValue}
        strokeWidth="1"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          from="30"
          to="48"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.5"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
