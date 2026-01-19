import React from 'react';

export const ConcertAtmosphereBackground = React.memo(() => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#F0F9FF]"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* 基礎漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FDFF] via-[#E0F7FA] to-[#E6FFFA]" />
      
      {/* 靜態光暈 - 沒有動畫 */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#FF8A65] filter blur-[80px] mix-blend-multiply"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#99E6D9] filter blur-[80px] mix-blend-multiply"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>
    </div>
  );
});

ConcertAtmosphereBackground.displayName = 'ConcertAtmosphereBackground';