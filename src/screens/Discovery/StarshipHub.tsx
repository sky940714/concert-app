import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, Filter, Ticket, MapPin, Sparkles, X } from 'lucide-react';
// 注意：這裡假設你之後會修改這些 Effect 組件以匹配新風格
import { ConcertAtmosphereBackground, LaunchEffect } from '../../components/effects';
import { MOCK_REGIONS, MOCK_VENUES_DATA } from '../../data';
import type { Region } from '../../types';
import { lerp } from '../../utils/math';

interface TicketHubProps {
  onVenueSelect: (venueId: string) => void;
}

export const StarshipHub = ({ onVenueSelect }: TicketHubProps) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  
  const ticketRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef({ x: 15, y: 0 }); // 初始角度調平緩一點
  const currentRotation = useRef({ x: 15, y: 0 });
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const loop = () => {
      if (ticketRef.current) {
        currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.1);
        currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.1);
        if (!isZooming && !isLaunching) {
          ticketRef.current.style.transform = `rotateX(${currentRotation.current.x}deg) rotateY(${currentRotation.current.y}deg)`;
        }
      }
      animationFrameId.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isZooming, isLaunching]);

  const handleRegionClick = (region: Region) => {
    setIsZooming(true);
    if (ticketRef.current) {
      targetRotation.current = { x: 0, y: 0 };
      let translateY = 0;
      if (region.id === 'north') translateY = 180;
      if (region.id === 'center') translateY = 20;
      if (region.id === 'south') translateY = -150;
      ticketRef.current.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'; // 增加彈跳感
      ticketRef.current.style.transform = `scale(1.8) translateY(${translateY}px) rotateX(0deg) rotateY(0deg)`;
    }
    setTimeout(() => {
      setSelectedRegion(region);
      setIsZooming(false);
    }, 800);
  };

  const resetMap = () => {
    setSelectedRegion(null);
    if (ticketRef.current) {
      ticketRef.current.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      targetRotation.current = { x: 15, y: 0 };
      setTimeout(() => {
        if (ticketRef.current) ticketRef.current.style.transition = 'none';
      }, 800);
    }
  };

  // 3D 票券層疊邏輯 (模擬黏土厚度)
  const ticketLayers = useMemo(() => {
    const layers = 16; 
    return [...Array(layers)].map((_, i) => {
      const zIndex = i * 2.5; 
      const isTop = i === layers - 1;
      // 顏色：底部深薄荷綠 -> 頂部亮薄荷綠
      const fill = isTop ? "#99E6D9" : "#76C4B7"; 
      
      return (
        <div 
          key={i} 
          className="absolute top-0 left-0 w-full h-full pointer-events-none" 
          style={{ transform: `translateZ(${zIndex}px)`, willChange: 'transform' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 300 500" className="overflow-visible filter drop-shadow-sm">
            {/* 票券造型路徑 */}
            <path 
              d="M50,150 A25,25 0 0,1 75,125 L225,125 A25,25 0 0,1 250,150 L250,230 A18,18 0 0,0 250,270 L250,350 A25,25 0 0,1 225,375 L75,375 A25,25 0 0,1 50,350 L50,270 A18,18 0 0,0 50,230 Z" 
              fill={fill}
              stroke={isTop ? "#FF8A65" : "none"}
              strokeWidth={isTop ? "6" : "0"}
            />
            {isTop && (
              <text x="150" y="265" textAnchor="middle" fill="#FF8A65" className="font-black" style={{ fontSize: '38px', fontFamily: 'system-ui, sans-serif' }}>
                oh cool
              </text>
            )}
          </svg>
        </div>
      );
    });
  }, []);

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden bg-[#E0F7FA] flex flex-col items-center justify-center select-none"
      ref={containerRef}
    >
      {/* 這裡是原本的特效，建議之後把背景改為柔和的圓圈或泡泡 */}
      <ConcertAtmosphereBackground />

      {/* 搜尋列 - 黏土態按鈕風格 */}
      <div className={`absolute top-6 left-6 right-6 z-20 flex gap-3 transition-all duration-500 ${selectedRegion ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <div className="flex-1 bg-white/90 backdrop-blur-lg rounded-full px-6 py-4 flex items-center shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-white">
          <Search size={20} className="text-[#99E6D9] mr-3" />
          <input type="text" placeholder="想去哪裡玩？" className="bg-transparent text-[#444] text-base w-full outline-none placeholder:text-gray-300" />
        </div>
        <button className="bg-white/90 p-4 rounded-full border border-white text-[#FF8A65] shadow-lg active:scale-90 transition-transform">
          <Filter size={22} />
        </button>
      </div>

      {/* 3D 票券本體 */}
      <div className="w-full h-full flex items-center justify-center perspective-[1500px]">
        <div 
          ref={ticketRef} 
          className={`relative w-[300px] h-[500px] transition-transform duration-300`} 
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 票券下方的柔和投影 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-60 bg-black/5 blur-[40px] rounded-full" style={{ transform: 'translateZ(-40px)' }} />
          
          {ticketLayers}
          
          {/* 熱點：改為珊瑚橘的小圓點 */}
          {MOCK_REGIONS.map(region => (
            <div 
              key={region.id} 
              onClick={() => handleRegionClick(region)} 
              className="absolute w-12 h-12 flex items-center justify-center cursor-pointer group" 
              style={{ left: '50%', top: '50%', marginTop: `${region.y}px`, marginLeft: '-24px', transform: `translateZ(50px)` }}
            >
              <div className="w-6 h-6 bg-[#FF8A65] rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform animate-pulse" />
              <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded-full text-[12px] text-[#FF8A65] font-bold shadow-md whitespace-nowrap transition-all">
                {region.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部區域面板 - 圓潤白色設計 */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-transform duration-700 ease-out z-30 ${selectedRegion ? 'translate-y-0' : 'translate-y-full'}`}>
        {selectedRegion && (
          <div className="p-10 pb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black text-[#FF8A65] flex items-center gap-3">
                <MapPin /> {selectedRegion.name}
              </h3>
              <button onClick={resetMap} className="bg-gray-100 p-3 rounded-full text-gray-400 hover:text-[#FF8A65] transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
              {selectedRegion.venues.map(vid => {
                const venue = MOCK_VENUES_DATA[vid];
                return (
                  <div key={venue.id} className="min-w-[260px] bg-[#F5FDFF] rounded-[2.5rem] p-6 border-2 border-white shadow-sm hover:shadow-md transition-all group">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{venue.img}</div>
                    <h4 className="text-xl font-bold text-[#444] mb-1">{venue.name}</h4>
                    <p className="text-[#99E6D9] font-bold text-sm mb-6">{venue.city}</p>
                    <button onClick={() => onVenueSelect(venue.id)} className="w-full py-4 bg-[#FF8A65] text-white rounded-full font-black text-sm tracking-wider shadow-[0_8px_15px_rgba(255,138,101,0.3)] active:scale-95 transition-all">
                      立即預訂
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};