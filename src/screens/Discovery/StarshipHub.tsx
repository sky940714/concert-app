import { useState } from 'react';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { ConcertAtmosphereBackground } from '../../components/effects';
import { MOCK_REGIONS, MOCK_VENUES_DATA } from '../../data';
import { QuickFilterBar } from '../../components/navigation/QuickFilterBar'; // ✅ 新增匯入
import type { Region } from '../../types';

import Home3DView from './Home3DView';

interface TicketHubProps {
  onVenueSelect: (venueId: string) => void;
}

export const StarshipHub = ({ onVenueSelect }: TicketHubProps) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const handleRegionSelect = (regionId: string) => {
    const region = MOCK_REGIONS.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
    }
  };

  const resetMap = () => {
    setSelectedRegion(null);
  };

  return (
    <div 
      className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center select-none overscroll-none"
      style={{ touchAction: 'none' }} 
    >      
      <ConcertAtmosphereBackground />

      {/* ✅ 修改：頂部導覽區塊 (搜尋列 + 快速篩選) */}
      <div className="absolute top-6 left-6 right-6 z-50 flex flex-col gap-4 transition-all duration-500">
        {/* 第一排：搜尋框與過濾按鈕 */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/90 backdrop-blur-lg rounded-full px-6 py-4 flex items-center shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-white">
            <Search size={20} className="text-[#99E6D9] mr-3" />
            <input 
              type="text" 
              placeholder="搜尋你想去的場館即可查看票卷" 
              className="bg-transparent text-[#444] text-base w-full outline-none placeholder:text-gray-300" 
            />
          </div>
          <button className="bg-white/90 p-4 rounded-full border border-white text-[#FF8A65] shadow-lg active:scale-90 transition-transform">
            <Filter size={22} />
          </button>
        </div>

        {/* 第二排：快速地區篩選 (老闆要求的直觀列表) */}
        <div className={`transition-all duration-500 ${selectedRegion ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <QuickFilterBar 
            onSelectRegion={handleRegionSelect} 
            selectedId={selectedRegion?.id} 
          />
        </div>
      </div>

      {/* ✅ 3D 畫布容器：調整位置避免被頂部 UI 遮擋 */}
      <div 
        className={`relative w-full max-w-md px-4 transition-all duration-700 flex items-center justify-center h-full ${selectedRegion ? 'scale-75 -translate-y-24 pointer-events-none' : 'scale-100 translate-y-4'}`}
        style={{ touchAction: 'none' }}
      >
        <Home3DView 
          onRegionSelect={(id) => handleRegionSelect(id)} 
          isLocked={!!selectedRegion}
          isShrunken={!!selectedRegion}
        />
      </div>

      {/* 底部場館列表：已修改為懸浮樣式，避開導覽列 */}
<div 
  className={`absolute bottom-[130px] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 transition-all duration-500 ease-out z-30 ${
    selectedRegion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
  }`}
>
  {selectedRegion && (
    <div className="p-6 pb-8">
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-2xl font-black text-[#FF8A65] flex items-center gap-2">
          <MapPin size={24} /> {selectedRegion.name}
        </h3>
        <button 
          onClick={resetMap} 
          className="bg-gray-100 p-2 rounded-full text-gray-400 hover:text-[#FF8A65] transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* 保持原有的水平捲動列表邏輯 */}
      <div 
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar overscroll-x-contain"
        style={{ touchAction: 'pan-x' }} 
        onWheel={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()} 
        onTouchStart={(e) => e.stopPropagation()}
      >
        {selectedRegion.venues.map(vid => {
          const venue = MOCK_VENUES_DATA[vid];
          if (!venue) return null; 
          return (
            <div key={venue.id} className="min-w-[200px] bg-[#F5FDFF] rounded-[2rem] p-5 border-2 border-white shadow-sm hover:shadow-md transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{venue.img}</div>
              <h4 className="text-lg font-bold text-[#444] mb-1 leading-tight">{venue.name}</h4>
              <p className="text-[#99E6D9] font-bold text-xs mb-4">{venue.city} • {venue.capacity} 席</p>
              <button 
                onClick={() => onVenueSelect(venue.id)} 
                className="w-full py-3 bg-[#FF8A65] text-white rounded-full font-black text-xs tracking-wider shadow-[0_6px_12px_rgba(255,138,101,0.2)] active:scale-95 transition-all"
              >
                查看場次
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