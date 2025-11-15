import { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function Card({ children, className, hover = false, onClick, style }: CardProps) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      onClick={onClick}
      style={style}
      className={clsx(
        'bg-abyss-light border-2 border-blood/30 rounded-lg p-6',
        'shadow-xl shadow-blood/10',
        hover && 'cursor-pointer transition-all duration-300',
        onClick && 'text-left w-full',
        className
      )}
    >
      {children}
    </Component>
  );
}
