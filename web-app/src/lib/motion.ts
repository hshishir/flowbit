import { Variants } from "framer-motion";

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.4, 0.55, 1.0],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Reduced motion page variants
export const reducedPageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Stagger item
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.4, 0.55, 1.0],
    },
  },
};

// Fade in
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

// Slide in from right (for panels)
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.4, 0.55, 1.0],
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// Slide in from left (for sidebars)
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.4, 0.55, 1.0],
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

// Scale up (for modals/dialogs)
export const scaleUp: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.4, 0.55, 1.0],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.15,
    },
  },
};

// Card hover
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    y: -2,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Blueprint task item (for animated reassignment)
export const blueprintTaskItem: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Count up animation helper
export const countUpTransition = {
  duration: 1.2,
  ease: [0.25, 0.4, 0.55, 1.0],
};

// Workflow node selection
export const nodeSelection: Variants = {
  unselected: {
    scale: 1,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  },
  selected: {
    scale: 1.02,
    boxShadow: "0 0 0 2px var(--ring), 0 4px 6px -1px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.15,
    },
  },
};

// Log entry stagger (for workflow test runner)
export const logEntryVariants: Variants = {
  initial: {
    opacity: 0,
    x: -10,
    height: 0,
  },
  enter: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.55, 1.0],
    },
  },
};

// Tab indicator
export const tabIndicator: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};
