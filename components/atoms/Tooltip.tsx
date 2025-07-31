'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ 
  text, 
  children, 
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return '-top-2 -translate-y-full left-1/2 -translate-x-1/2';
      case 'bottom':
        return '-bottom-2 translate-y-full left-1/2 -translate-x-1/2';
      case 'left':
        return 'left-0 -translate-x-full top-1/2 -translate-y-1/2 -ml-2';
      case 'right':
        return 'right-0 translate-x-full top-1/2 -translate-y-1/2 -mr-2';
      default:
        return '-top-2 -translate-y-full left-1/2 -translate-x-1/2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-graphite';
      case 'bottom':
        return 'absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-graphite';
      case 'left':
        return 'absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-graphite';
      case 'right':
        return 'absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-graphite';
      default:
        return 'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-graphite';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-technical-blue cursor-help hover:border-electric-coral transition-colors">
        {children}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 px-3 py-2 bg-graphite text-cloud text-sm rounded-lg shadow-lg max-w-xs text-center ${getPositionClasses()}`}
            style={{ pointerEvents: 'none' }}
          >
            {text}
            <div className={getArrowClasses()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip; 