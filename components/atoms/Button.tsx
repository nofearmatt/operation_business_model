'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  style,
  ...props 
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-coral
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-manipulation select-none
    min-h-[44px]
  `;

  const variants = {
    primary: `
      bg-electric-coral text-cloud 
      hover:bg-electric-coral/90 active:bg-electric-coral/80
      focus:ring-electric-coral/50
      shadow-sm hover:shadow-md active:shadow-sm
    `,
    secondary: `
      bg-technical-blue text-cloud 
      hover:bg-technical-blue/90 active:bg-technical-blue/80
      focus:ring-technical-blue/50
      shadow-sm hover:shadow-md active:shadow-sm
    `,
    ghost: `
      border-2 border-steel text-steel bg-transparent
      hover:border-graphite hover:text-graphite hover:bg-steel/5
      active:bg-steel/10
      focus:ring-steel/50
    `
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[40px] min-w-[88px]',
    md: 'px-4 py-2.5 text-base min-h-[44px] min-w-[120px]',
    lg: 'px-6 py-3 text-lg min-h-[48px] min-w-[140px]'
  };

  const mobileOptimizedStyle: React.CSSProperties = {
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none' as const,
    WebkitUserSelect: 'none' as const,
    ...style
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      style={mobileOptimizedStyle}
      {...props}
    >
      {children}
    </button>
  );
} 