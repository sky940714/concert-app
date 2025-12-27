import React, { type ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const ButtonPrimary = React.memo(({ 
  children, 
  onClick, 
  className = "", 
  disabled, 
  loading 
}: ButtonPrimaryProps) => (
  <button 
    onClick={onClick}
    disabled={disabled || loading}
    className={`w-full py-3 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden
    bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg border border-cyan-400/30 ${className}`}
  >
    {loading && (
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    )}
    <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
  </button>
));

ButtonPrimary.displayName = 'ButtonPrimary';