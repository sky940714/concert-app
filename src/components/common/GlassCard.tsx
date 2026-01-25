import React, { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = React.memo(({ children, className = "", onClick }: GlassCardProps) => (
  <div 
    onClick={onClick} 
    className={`relative bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2.5rem] ${className}`}
    style={{
      // 使用 radial-gradient 在兩側挖出票根缺口
      maskImage: 'radial-gradient(circle at 0 75%, transparent 15px, black 16px), radial-gradient(circle at 100% 75%, transparent 15px, black 16px)',
      WebkitMaskImage: 'radial-gradient(circle at 0 75%, transparent 15px, black 16px), radial-gradient(circle at 100% 75%, transparent 15px, black 16px)',
      maskComposite: 'intersect',
      WebkitMaskComposite: 'source-in',
    }}
  >
    {/* 票根虛線裝飾層 */}
    <div className="absolute bottom-[25%] left-6 right-6 border-t border-dashed border-white/20 pointer-events-none z-20" />
    
    {/* 內容層 */}
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
));

GlassCard.displayName = 'GlassCard';