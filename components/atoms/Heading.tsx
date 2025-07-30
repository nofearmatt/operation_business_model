import { ReactNode } from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  color?: 'default' | 'accent' | 'muted';
}

export default function Heading({ 
  level, 
  children, 
  className = '',
  color = 'default' 
}: HeadingProps) {
  const Tag = `h${level}` as const;
  
  const colors = {
    default: 'text-graphite',
    accent: 'text-electric-coral',
    muted: 'text-steel'
  };
  
  const levelClasses = {
    1: 'text-4xl lg:text-5xl font-extrabold',
    2: 'text-3xl lg:text-4xl font-bold',
    3: 'text-2xl lg:text-3xl font-bold',
    4: 'text-xl lg:text-2xl font-semibold'
  };
  
  return (
    <Tag className={`${levelClasses[level]} ${colors[color]} ${className}`}>
      {children}
    </Tag>
  );
} 