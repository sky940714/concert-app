import React from 'react';

export const ConcertAtmosphereBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020617]">
      <div 
        className="absolute inset-[-10%] bg-cover bg-center opacity-60 will-change-transform"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop')`, 
          filter: 'contrast(1.2) brightness(0.6)',
          animation: 'slow-pan 60s ease-in-out infinite'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-black/80 to-black" />
      <div className="absolute inset-0 opacity-50">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[100px] h-[120%] bg-gradient-to-t from-cyan-500/60 via-blue-500/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[1px] h-[150%] bg-cyan-400/50 origin-bottom animate-laser-1" />
        <div className="absolute bottom-0 right-1/4 w-[1px] h-[150%] bg-cyan-400/50 origin-bottom animate-laser-2" />
      </div>
    </div>
  );
});

ConcertAtmosphereBackground.displayName = 'ConcertAtmosphereBackground';