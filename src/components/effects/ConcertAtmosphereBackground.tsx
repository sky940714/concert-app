// ConcertAtmosphereBackground.tsx - 極簡測試版
import React from 'react';

export const ConcertAtmosphereBackground = React.memo(() => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'linear-gradient(to bottom, #F8FDFF, #E0F7FA, #E6FFFA)',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* 只有純色漸層,沒有任何 blur 或動畫 */}
    </div>
  );
});

ConcertAtmosphereBackground.displayName = 'ConcertAtmosphereBackground';