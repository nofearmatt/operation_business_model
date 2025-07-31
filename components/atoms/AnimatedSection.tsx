'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const [ref, inView] = useInView({ 
    threshold: 0.1, 
    rootMargin: '-100px 0px' 
  });

  const slideVariants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0
    }
  };

  const transition = {
    duration: 0.6,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as const
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideVariants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 