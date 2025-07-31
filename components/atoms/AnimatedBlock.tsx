'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedBlockProps {
  children: React.ReactNode;
  
  // Animation types
  type?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'blur';
  
  // Timing
  delay?: number;
  duration?: number;
  stagger?: number; // For staggered children animations
  
  // Trigger settings
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  
  // Visual effects
  visualAnchor?: boolean; // Show visual anchor point
  showProgress?: boolean; // Show scroll progress indicator
  
  // Performance
  reduce?: boolean; // Reduce motion for performance/accessibility
  
  // Styling
  className?: string;
  
  // Stagger children
  staggerChildren?: boolean; // Enable stagger for direct children
  
  // Custom variants (advanced usage)
  customVariants?: Variants;
}

export default function AnimatedBlock({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  threshold = 0.1,
  rootMargin = '-50px 0px',
  triggerOnce = true,
  visualAnchor = false,
  showProgress = false,
  reduce = false,
  className = '',
  staggerChildren = false,
  customVariants
}: AnimatedBlockProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once: triggerOnce 
  });
  
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches || reduce);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches || reduce);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reduce]);

  // Calculate scroll progress for progress indicator
  useEffect(() => {
    if (!showProgress) return;
    
    const calculateProgress = () => {
      const element = ref.current as HTMLElement | null;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      // Calculate progress based on element visibility
      if (elementTop > windowHeight) {
        setScrollProgress(0);
      } else if (elementTop + elementHeight < 0) {
        setScrollProgress(100);
      } else {
        const visibleHeight = Math.min(windowHeight - elementTop, elementHeight);
        const progress = (visibleHeight / elementHeight) * 100;
        setScrollProgress(Math.max(0, Math.min(100, progress)));
      }
    };
    
    const handleScroll = () => requestAnimationFrame(calculateProgress);
    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProgress]);

  // Animation variants based on type
  const getAnimationVariants = (): Variants => {
    if (customVariants) return customVariants;
    
    const baseTransition = {
      duration: isReducedMotion ? 0.1 : duration,
      delay: isReducedMotion ? 0 : delay,
      ease: [0.25, 0.1, 0.25, 1] as const
    };

    switch (type) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: baseTransition
          }
        };
        
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: isReducedMotion ? 0 : 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: baseTransition
          }
        };
        
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: isReducedMotion ? 0 : -50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: baseTransition
          }
        };
        
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: isReducedMotion ? 0 : 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: baseTransition
          }
        };
        
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: isReducedMotion ? 0 : -50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: baseTransition
          }
        };
        
      case 'scale':
        return {
          hidden: { 
            opacity: 0, 
            scale: isReducedMotion ? 1 : 0.8 
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: baseTransition
          }
        };
        
      case 'rotate':
        return {
          hidden: { 
            opacity: 0, 
            rotate: isReducedMotion ? 0 : -5,
            scale: isReducedMotion ? 1 : 0.95
          },
          visible: { 
            opacity: 1, 
            rotate: 0,
            scale: 1,
            transition: baseTransition
          }
        };
        
      case 'blur':
        return {
          hidden: { 
            opacity: 0,
            filter: isReducedMotion ? 'blur(0px)' : 'blur(10px)'
          },
          visible: { 
            opacity: 1,
            filter: 'blur(0px)',
            transition: baseTransition
          }
        };
        
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: baseTransition
          }
        };
    }
  };

  // Stagger container variants
  const staggerContainer: Variants = {
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0 : stagger,
        delayChildren: isReducedMotion ? 0 : delay
      }
    }
  };

  const variants = getAnimationVariants();

  return (
    <div className={`relative ${className}`}>
      {/* Visual Anchor */}
      {visualAnchor && (
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-electric-coral/20 via-electric-coral/60 to-electric-coral/20 rounded-full opacity-0 animate-pulse">
          <motion.div
            className="w-1 bg-electric-coral rounded-full transition-all duration-300"
            style={{ 
              height: `${scrollProgress}%`,
              boxShadow: isInView ? '0 0 10px rgba(255, 90, 90, 0.5)' : 'none'
            }}
          />
        </div>
      )}

      {/* Progress Indicator */}
      {showProgress && (
        <div className="absolute -top-2 left-0 w-full h-0.5 bg-steel/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-electric-coral to-technical-blue rounded-full"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Animated Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerChildren ? staggerContainer : variants}
      >
        {staggerChildren ? (
          // Wrap each child in motion.div for stagger effect
          React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={variants}
              className="w-full"
            >
              {child}
            </motion.div>
          ))
        ) : (
          children
        )}
      </motion.div>

      {/* Performance indicator (dev only) */}
      {process.env.NODE_ENV === 'development' && isInView && (
        <div className="absolute -bottom-6 right-0 text-xs text-technical-blue/60 bg-white/80 px-2 py-1 rounded">
          🎬 Animated ({type})
        </div>
      )}
    </div>
  );
} 