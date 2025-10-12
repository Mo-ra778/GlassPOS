import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Fix: To resolve a type error with the `children` prop, we now omit it from
// `HTMLMotionProps<'button'>` and redefine it strictly as `React.ReactNode`.
// The original type from framer-motion included `MotionValue`, which is not compatible
// with the expected `React.ReactNode` in this JSX context.
interface NeuButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

// Fix: Removed React.FC to resolve a type conflict with framer-motion's `children` prop.
// `HTMLMotionProps` allows `children` to be a `MotionValue`, which is not compatible with `React.FC`'s stricter `React.ReactNode` type for children.
const NeuButton = ({ children, className = '', icon, ...props }: NeuButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`flex items-center justify-center gap-2 px-6 py-3 font-bold text-brand-dark bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-neumorphic-light active:shadow-neumorphic-inset-light transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
};

export default NeuButton;