import React from 'react';

interface LaunchEffectProps {
  isLaunching: boolean;
}

export const LaunchEffect = React.memo(({ isLaunching }: LaunchEffectProps) => {
  if (!isLaunching) return null;
  
  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-end">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-white/40 animate-warp-speed" />
    </div>
  );
});

LaunchEffect.displayName = 'LaunchEffect';