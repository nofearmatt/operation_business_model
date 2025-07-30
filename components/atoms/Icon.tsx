import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'accent' | 'muted' | 'white';
  className?: string;
}

export default function Icon({ 
  icon: IconComponent, 
  size = 'md', 
  color = 'default',
  className = '' 
}: IconProps) {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };
  
  const colors = {
    default: 'text-graphite',
    accent: 'text-electric-coral',
    muted: 'text-steel',
    white: 'text-cloud'
  };
  
  return (
    <IconComponent 
      size={sizes[size]} 
      className={`${colors[color]} ${className}`} 
    />
  );
} 