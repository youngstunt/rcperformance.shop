import { Variants, Transition } from 'framer-motion';

// Standard easing curves (typed as tuples for framer-motion)
export const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

// Fade in from bottom - most common reveal animation
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing.easeOut
    }
  }
};

// Fade in from top
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing.easeOut
    }
  }
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -24
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easing.easeOut
    }
  }
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 24
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easing.easeOut
    }
  }
};

// Simple fade
export const fadeIn: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing.easeOut
    }
  }
};

// Scale in - subtle zoom effect
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easing.easeOut
    }
  }
};

// Container for staggered children
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Faster stagger for lists
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 8
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easing.easeOut
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: easing.easeIn
    }
  }
};

// Header scroll animation
export const headerVariants: Variants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(255, 255, 255, 0)'
  },
  scrolled: {
    backgroundColor: 'rgba(15, 15, 20, 0.95)',
    backdropFilter: 'blur(12px)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)'
  }
};

// Card hover effect
export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: easing.easeOut
    }
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.2,
      ease: easing.easeOut
    }
  }
};

// Button press effect
export const buttonTap = {
  scale: 0.98
};

// Mobile menu slide
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: easing.easeInOut
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: easing.easeInOut
    }
  }
};

// SVG path draw animation
export const drawPath: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: easing.easeInOut
      },
      opacity: {
        duration: 0.3
      }
    }
  }
};

// Viewport settings for scroll-triggered animations
export const viewportSettings = {
  once: true,
  margin: '-100px',
  amount: 0.2
};

// Common transition configurations
export const transitions = {
  fast: { duration: 0.2, ease: easing.easeOut } as Transition,
  normal: { duration: 0.4, ease: easing.easeOut } as Transition,
  slow: { duration: 0.6, ease: easing.easeOut } as Transition,
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
};
