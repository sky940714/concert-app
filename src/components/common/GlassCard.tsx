import React, { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = React.memo(({ children, className = "", onClick }: GlassCardProps) => (
  <div 
    onClick={onClick} 
    className={`bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl ${className}`}
  >
    {children}
  </div>
));

GlassCard.displayName = 'GlassCard';