import React from 'react';

// 在組件內部定義 CSS 動畫，確保隨插即用，不用改 tailwind.config
const styles = `
  @keyframes float-slow {
    0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
    33% { transform: translate3d(30px, -50px, 0) rotate(5deg); }
    66% { transform: translate3d(-20px, 20px, 0) rotate(-5deg); }
    .filter.blur-\[100px\] { filter: blur(60px); }
    .filter.blur-\[110px\] { filter: blur(60px); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-40px, 30px, 0) scale(1.1); }
  }
  @keyframes drift-right-slow {
    0% { transform: translateX(-100%); opacity: 0; }
    10% { opacity: 0.4; }
    90% { opacity: 0.4; }
    100% { transform: translateX(100vw); opacity: 0; }
  }
  @keyframes drift-right-medium {
    0% { transform: translateX(-120%); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateX(100vw); opacity: 0; }
  }
  .animate-float-slow { 
  animation: float-slow 20s ease-in-out infinite;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  will-change: transform;
  -webkit-backface-visibility: hidden; // 強制 iOS 鎖定圖層
  backface-visibility: hidden;
}
  .animate-float-medium { 
    animation: float-medium 15s ease-in-out infinite;
    /* iOS 專用優化 */
    -webkit-transform: translate3d(0, 0, 0);
    will-change: transform;
  }
  .animate-drift-slow { 
    animation: drift-right-slow 60s linear infinite;
    /* iOS 專用優化 */
    -webkit-transform: translateZ(0);
    will-change: transform;
  }
  .animate-drift-medium { 
    animation: drift-right-medium 40s linear infinite;
    /* iOS 專用優化 */
    -webkit-transform: translateZ(0);
    will-change: transform;
  }
  
  /* 用於雲朵的基礎樣式 */
  .cloud-shape {
    @apply absolute rounded-full bg-white blur-3xl mix-blend-soft-light pointer-events-none;
    /* iOS 專用優化 */
    -webkit-transform: translateZ(0);
    will-change: transform;
  }
`;

export const ConcertAtmosphereBackground = React.memo(() => {
  return (
    <>
      <style>{styles}</style>
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#F0F9FF]"
        style={{
          // ✅ iOS 關鍵修復:強制創建獨立的 GPU 合成圖層
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          // ✅ 防止 iOS 在 Canvas 渲染時隱藏背景
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          // ✅ 強制硬體加速
          WebkitPerspective: 1000,
          perspective: 1000,
        }}
      >
        
        {/* === 1. 基礎底色與紋理 === */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#F8FDFF] via-[#E0F7FA] to-[#E6FFFA]"
          style={{
            // ✅ iOS 優化:確保底色圖層穩定
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            // ✅ iOS 優化
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }} 
        />

        {/* === 2. 深層背景光暈 (漂移較慢) === */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            // ✅ iOS 優化:為光暈層創建獨立圖層
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          {/* 左上:珊瑚粉 */}
          <div 
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#FF8A65] filter blur-[100px] animate-float-slow mix-blend-multiply"
            style={{ 
              animationDelay: '0s',
              // ✅ iOS 優化:每個動畫元素都需要獨立圖層
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          />
          {/* 右下:薄荷綠 */}
          <div 
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#99E6D9] filter blur-[110px] animate-float-slow mix-blend-multiply"
            style={{ 
              animationDelay: '-10s',
              // ✅ iOS 優化
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }} 
          />
        </div>

        {/* === 3. 中層亮光 (增加通透感) === */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            // ✅ iOS 優化
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        >
          {/* 中間:淺藍亮光 */}
          <div 
            className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-[#BAE6FD] filter blur-[90px] animate-float-medium mix-blend-screen"
            style={{
              // ✅ iOS 優化
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          />
        </div>

        {/* === 4. 漂浮雲朵層 === */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            // ✅ iOS 優化:雲朵層獨立圖層
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        >
          {/* 雲朵 1 (遠景,大而慢) */}
          <div 
            className="cloud-shape top-[15%] h-32 w-[40vw] opacity-30 animate-drift-slow"
            style={{ 
              animationDelay: '0s',
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
            }}
          />
          {/* 雲朵 2 (遠景,較低) */}
          <div 
            className="cloud-shape top-[60%] h-40 w-[50vw] opacity-20 animate-drift-slow"
            style={{ 
              animationDelay: '-30s',
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
            }}
          />
          
          {/* 雲朵 3 (近景,小而快) */}
          <div 
            className="cloud-shape top-[30%] h-24 w-[25vw] opacity-50 animate-drift-medium"
            style={{ 
              animationDelay: '-15s',
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
            }}
          />
          {/* 雲朵 4 (近景,底部) */}
          <div 
            className="cloud-shape bottom-[10%] h-28 w-[35vw] opacity-40 animate-drift-medium"
            style={{ 
              animationDelay: '-5s',
              WebkitTransform: 'translate3d(0, 0, 0)',
              transform: 'translate3d(0, 0, 0)',
            }}
          />
        </div>

        {/* === 5. 頂層漸層覆蓋 (確保上方UI文字清晰) === */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/60 z-20"
          style={{
            // ✅ iOS 優化
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </>
  );
});

ConcertAtmosphereBackground.displayName = 'ConcertAtmosphereBackground';