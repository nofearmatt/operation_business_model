'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { findGlossaryTerm } from '@/lib/glossary';

interface TooltipProps {
  text?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  term?: string; // Автоматический поиск в glossary
  delay?: number;
  className?: string;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  text, 
  children, 
  position = 'top',
  term,
  delay = 0,
  className = '',
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Получение текста tooltip (из props или glossary)
  const tooltipText = React.useMemo(() => {
    if (text) return text;
    if (term) {
      const glossaryTerm = findGlossaryTerm(term);
      return glossaryTerm?.definition || '';
    }
    return '';
  }, [text, term]);

  const handleShowTooltip = () => {
    if (disabled || !tooltipText) return;
    
    if (delay > 0) {
      setTimeout(() => setIsVisible(true), delay);
    } else {
      setIsVisible(true);
    }
  };

  const handleHideTooltip = () => {
    setIsVisible(false);
  };

  // Touch события для мобильных устройств
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile && !disabled && tooltipText) {
      e.preventDefault();
      setIsVisible(!isVisible);
    }
  };

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 px-3 py-2 bg-graphite text-cloud text-sm rounded-lg shadow-lg max-w-xs';
    
    switch (position) {
      case 'top':
        return `${baseClasses} -top-2 -translate-y-full left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${baseClasses} -bottom-2 translate-y-full left-1/2 -translate-x-1/2`;
      case 'left':
        return `${baseClasses} left-0 -translate-x-full top-1/2 -translate-y-1/2 -ml-2`;
      case 'right':
        return `${baseClasses} right-0 translate-x-full top-1/2 -translate-y-1/2 -mr-2`;
      default:
        return `${baseClasses} -top-2 -translate-y-full left-1/2 -translate-x-1/2`;
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

  // Уникальный ID для ARIA
  const tooltipId = `tooltip-${React.useMemo(() => Math.random().toString(36).substr(2, 9), [])}`;

  if (disabled || !tooltipText) {
    return <span className={className}>{children}</span>;
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={!isMobile ? handleShowTooltip : undefined}
      onMouseLeave={!isMobile ? handleHideTooltip : undefined}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      aria-describedby={isVisible ? tooltipId : undefined}
      role="button"
      tabIndex={0}
      onFocus={handleShowTooltip}
      onBlur={handleHideTooltip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsVisible(!isVisible);
        }
        if (e.key === 'Escape') {
          setIsVisible(false);
        }
      }}
    >
      <span 
        className={`border-b border-dashed border-technical-blue cursor-help hover:border-electric-coral transition-colors ${
          isMobile ? 'border-solid' : ''
        }`}
        aria-label={isMobile ? 'Нажмите для показа определения' : undefined}
      >
        {children}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 10 : -10 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className={`${getPositionClasses()} ${isMobile ? 'text-xs' : 'text-sm'}`}
            style={{ pointerEvents: 'none' }}
          >
            <div className="text-center leading-relaxed">
              {tooltipText}
            </div>
            <div className={getArrowClasses()} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Мобильный overlay для закрытия по клику */}
      {isMobile && isVisible && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleHideTooltip}
          onTouchStart={handleHideTooltip}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Tooltip; 