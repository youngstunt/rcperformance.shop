'use client';

import { cn } from '@/lib/utils';

interface IconProps {
  size?: number;
  className?: string;
}

// ECU Chip Icon - Circuit board design
export function ECUChipIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="ECU Chip"
    >
      <defs>
        <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chrome, #a1a1aa)" />
          <stop offset="100%" stopColor="var(--chrome-dark, #71717a)" />
        </linearGradient>
      </defs>

      {/* Chip body */}
      <rect
        x="10"
        y="10"
        width="28"
        height="28"
        rx="2"
        fill="var(--card, #1c1c22)"
        stroke="url(#chipGradient)"
        strokeWidth="1.5"
      />

      {/* Pins - top */}
      {[14, 20, 26, 32].map((x) => (
        <rect key={`top-${x}`} x={x} y="4" width="2" height="6" fill="url(#chipGradient)" rx="0.5" />
      ))}

      {/* Pins - bottom */}
      {[14, 20, 26, 32].map((x) => (
        <rect key={`bottom-${x}`} x={x} y="38" width="2" height="6" fill="url(#chipGradient)" rx="0.5" />
      ))}

      {/* Pins - left */}
      {[14, 20, 26, 32].map((y) => (
        <rect key={`left-${y}`} x="4" y={y} width="6" height="2" fill="url(#chipGradient)" rx="0.5" />
      ))}

      {/* Pins - right */}
      {[14, 20, 26, 32].map((y) => (
        <rect key={`right-${y}`} x="38" y={y} width="6" height="2" fill="url(#chipGradient)" rx="0.5" />
      ))}

      {/* Circuit traces */}
      <path
        d="M16 16 L20 16 L20 20 M24 16 L24 22 L28 22 M32 16 L32 20 L28 20
           M16 24 L22 24 M26 24 L32 24
           M16 28 L18 28 L18 32 M24 28 L24 32 M30 28 L30 32 L32 32"
        fill="none"
        stroke="var(--primary, #ea580c)"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Center die */}
      <rect x="20" y="20" width="8" height="8" fill="var(--primary, #ea580c)" opacity="0.3" rx="1" />
      <rect x="22" y="22" width="4" height="4" fill="var(--primary, #ea580c)" opacity="0.6" rx="0.5" />
    </svg>
  );
}

// Turbo Icon - Cross-section view
export function TurboIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="Turbocharger"
    >
      <defs>
        <linearGradient id="turboGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chrome-highlight, #d4d4d8)" />
          <stop offset="50%" stopColor="var(--chrome, #a1a1aa)" />
          <stop offset="100%" stopColor="var(--chrome-dark, #71717a)" />
        </linearGradient>
      </defs>

      {/* Compressor housing (left) */}
      <ellipse cx="16" cy="24" rx="12" ry="14" fill="none" stroke="url(#turboGradient)" strokeWidth="2" />

      {/* Turbine housing (right) */}
      <ellipse cx="32" cy="24" rx="12" ry="14" fill="none" stroke="url(#turboGradient)" strokeWidth="2" />

      {/* Center bearing housing */}
      <rect x="18" y="18" width="12" height="12" fill="var(--card, #1c1c22)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1" rx="2" />

      {/* Compressor wheel */}
      <g>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={`comp-${angle}`}
            x1="16"
            y1="24"
            x2={16 + 8 * Math.cos((angle * Math.PI) / 180)}
            y2={24 + 8 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--chrome, #a1a1aa)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <circle cx="16" cy="24" r="3" fill="var(--primary, #ea580c)" />
      </g>

      {/* Turbine wheel */}
      <g>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={`turb-${angle}`}
            x1="32"
            y1="24"
            x2={32 + 8 * Math.cos((angle * Math.PI) / 180)}
            y2={24 + 8 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--primary, #ea580c)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        ))}
        <circle cx="32" cy="24" r="3" fill="var(--primary, #ea580c)" />
      </g>

      {/* Shaft */}
      <line x1="19" y1="24" x2="29" y2="24" stroke="var(--chrome, #a1a1aa)" strokeWidth="2" />

      {/* Intake arrow */}
      <path d="M4 24 L8 24 M6 22 L8 24 L6 26" stroke="var(--accent, #3b82f6)" strokeWidth="1.5" fill="none" />

      {/* Exhaust arrow */}
      <path d="M40 24 L44 24 M42 22 L44 24 L42 26" stroke="var(--primary, #ea580c)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Dyno Graph Icon - HP/TQ curves
export function DynoIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="Dyno Graph"
    >
      {/* Graph background */}
      <rect x="8" y="6" width="36" height="32" fill="var(--card, #1c1c22)" rx="2" />

      {/* Grid lines */}
      {[14, 22, 30].map((y) => (
        <line key={`h-${y}`} x1="10" y1={y} x2="42" y2={y} stroke="var(--border, #2a2a35)" strokeWidth="0.5" />
      ))}
      {[18, 28, 38].map((x) => (
        <line key={`v-${x}`} x1={x} y1="8" x2={x} y2="36" stroke="var(--border, #2a2a35)" strokeWidth="0.5" />
      ))}

      {/* Axes */}
      <line x1="10" y1="36" x2="42" y2="36" stroke="var(--chrome, #a1a1aa)" strokeWidth="1" />
      <line x1="10" y1="8" x2="10" y2="36" stroke="var(--chrome, #a1a1aa)" strokeWidth="1" />

      {/* HP curve (red/orange) */}
      <path
        d="M12 32 Q18 30 24 24 Q30 16 36 12 L40 10"
        fill="none"
        stroke="var(--primary, #ea580c)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* TQ curve (blue) */}
      <path
        d="M12 28 Q18 22 24 18 Q30 16 36 18 L40 20"
        fill="none"
        stroke="var(--accent, #3b82f6)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Legend dots */}
      <circle cx="16" cy="42" r="2" fill="var(--primary, #ea580c)" />
      <circle cx="32" cy="42" r="2" fill="var(--accent, #3b82f6)" />

      {/* Labels */}
      <text x="20" y="44" fontSize="4" fill="var(--muted-foreground, #71717a)">HP</text>
      <text x="36" y="44" fontSize="4" fill="var(--muted-foreground, #71717a)">TQ</text>
    </svg>
  );
}

// Wrench Icon - Performance tools
export function WrenchIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="Performance Tools"
    >
      <defs>
        <linearGradient id="wrenchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--chrome-highlight, #d4d4d8)" />
          <stop offset="100%" stopColor="var(--chrome-dark, #71717a)" />
        </linearGradient>
      </defs>

      {/* Wrench body */}
      <path
        d="M12 8 L8 12 L8 16 L14 22 L22 14 L16 8 L12 8 Z"
        fill="url(#wrenchGradient)"
        stroke="var(--chrome, #a1a1aa)"
        strokeWidth="1"
      />

      {/* Wrench handle */}
      <rect
        x="20"
        y="20"
        width="20"
        height="6"
        fill="url(#wrenchGradient)"
        stroke="var(--chrome, #a1a1aa)"
        strokeWidth="1"
        rx="1"
        transform="rotate(45 24 24)"
      />

      {/* Gear accent */}
      <g transform="translate(34, 34)">
        <circle cx="0" cy="0" r="8" fill="none" stroke="var(--primary, #ea580c)" strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="-2"
            y="-10"
            width="4"
            height="4"
            fill="var(--primary, #ea580c)"
            transform={`rotate(${angle})`}
            rx="0.5"
          />
        ))}
        <circle cx="0" cy="0" r="3" fill="var(--card, #1c1c22)" stroke="var(--primary, #ea580c)" strokeWidth="1" />
      </g>
    </svg>
  );
}

// Exhaust Icon - Performance exhaust
export function ExhaustIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="Performance Exhaust"
    >
      <defs>
        <linearGradient id="exhaustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--chrome-dark, #71717a)" />
          <stop offset="50%" stopColor="var(--chrome, #a1a1aa)" />
          <stop offset="100%" stopColor="var(--chrome-dark, #71717a)" />
        </linearGradient>
      </defs>

      {/* Exhaust pipe */}
      <path
        d="M4 24 L16 24 Q20 24 22 20 L26 12 Q28 8 32 8 L44 8"
        fill="none"
        stroke="url(#exhaustGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Exhaust tip */}
      <ellipse cx="44" cy="8" rx="2" ry="4" fill="var(--chrome, #a1a1aa)" />

      {/* Smoke/heat waves */}
      <path d="M38 4 Q40 2 42 4" fill="none" stroke="var(--muted-foreground, #71717a)" strokeWidth="1" opacity="0.5" />
      <path d="M40 2 Q42 0 44 2" fill="none" stroke="var(--muted-foreground, #71717a)" strokeWidth="1" opacity="0.3" />

      {/* Muffler */}
      <rect x="6" y="28" width="16" height="12" rx="2" fill="var(--card, #1c1c22)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1.5" />

      {/* Muffler details */}
      <line x1="10" y1="30" x2="10" y2="38" stroke="var(--chrome-dark, #71717a)" strokeWidth="1" />
      <line x1="14" y1="30" x2="14" y2="38" stroke="var(--chrome-dark, #71717a)" strokeWidth="1" />
      <line x1="18" y1="30" x2="18" y2="38" stroke="var(--chrome-dark, #71717a)" strokeWidth="1" />

      {/* Connection pipe */}
      <rect x="22" y="32" width="8" height="4" fill="url(#exhaustGradient)" rx="1" />
    </svg>
  );
}

// Suspension Icon
export function SuspensionIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="Suspension"
    >
      {/* Shock body */}
      <rect x="20" y="8" width="8" height="20" rx="2" fill="var(--card, #1c1c22)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1.5" />

      {/* Shock shaft */}
      <rect x="22" y="26" width="4" height="10" fill="var(--chrome, #a1a1aa)" />

      {/* Spring coils */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx="24"
          cy={14 + i * 4}
          rx="10"
          ry="2"
          fill="none"
          stroke="var(--primary, #ea580c)"
          strokeWidth="2"
        />
      ))}

      {/* Top mount */}
      <rect x="18" y="4" width="12" height="4" rx="1" fill="var(--chrome-dark, #71717a)" />

      {/* Bottom mount */}
      <circle cx="24" cy="40" r="4" fill="var(--chrome-dark, #71717a)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1" />
      <circle cx="24" cy="40" r="1.5" fill="var(--card, #1c1c22)" />
    </svg>
  );
}

// Data Logging Icon
export function DataLogIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn('flex-shrink-0', className)}
      aria-label="Data Logging"
    >
      {/* Screen */}
      <rect x="6" y="8" width="36" height="26" rx="2" fill="var(--card, #1c1c22)" stroke="var(--chrome, #a1a1aa)" strokeWidth="1.5" />

      {/* Screen content - waveform */}
      <path
        d="M10 24 L14 20 L18 26 L22 18 L26 24 L30 16 L34 22 L38 20"
        fill="none"
        stroke="var(--primary, #ea580c)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {[[14, 20], [22, 18], [30, 16], [38, 20]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="var(--primary, #ea580c)" />
      ))}

      {/* Stand */}
      <rect x="20" y="34" width="8" height="4" fill="var(--chrome-dark, #71717a)" />
      <rect x="16" y="38" width="16" height="3" rx="1" fill="var(--chrome, #a1a1aa)" />

      {/* Status LEDs */}
      <circle cx="10" cy="12" r="1.5" fill="#22c55e" />
      <circle cx="14" cy="12" r="1.5" fill="var(--primary, #ea580c)" />
    </svg>
  );
}
