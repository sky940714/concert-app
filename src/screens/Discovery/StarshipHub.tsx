import { useState } from 'react';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { ConcertAtmosphereBackground } from '../../components/effects';
import { MOCK_REGIONS, MOCK_VENUES_DATA } from '../../data';
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
      className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center select-none overscroll-none"
      style={{ touchAction: 'none' }} 
    >      
      
      <ConcertAtmosphereBackground />

      <div className={`absolute top-6 left-6 right-6 z-20 flex gap-3 transition-all duration-500 ${selectedRegion ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <div className="flex-1 bg-white/90 backdrop-blur-lg rounded-full px-6 py-4 flex items-center shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-white">
          <Search size={20} className="text-[#99E6D9] mr-3" />
          <input type="text" placeholder="想去哪裡玩?" className="bg-transparent text-[#444] text-base w-full outline-none placeholder:text-gray-300" />
        </div>
        <button className="bg-white/90 p-4 rounded-full border border-white text-[#FF8A65] shadow-lg active:scale-90 transition-transform">
          <Filter size={22} />
        </button>
      </div>

      {/* ✅ 傳入 isShrunken prop */}
      <div 
        className={`relative w-full max-w-md px-4 transition-transform duration-700 ${selectedRegion ? 'scale-75 -translate-y-20 pointer-events-none' : 'scale-100'}`}
        style={{ touchAction: 'none' }}
      >
        <Home3DView 
          onRegionSelect={(id) => handleRegionSelect(id)} 
          isLocked={!!selectedRegion}
          isShrunken={!!selectedRegion} // ✅ 新增
        />
      </div>

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
            
            <div 
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar overscroll-x-contain"
              style={{ touchAction: 'pan-x' }} 
              onWheel={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()} 
              onTouchStart={(e) => e.stopPropagation()}
            >
              {selectedRegion.venues.map(vid => {
                const venue = MOCK_VENUES_DATA[vid];
                if (!venue) return null; 
                return (
                  <div key={venue.id} className="min-w-[260px] bg-[#F5FDFF] rounded-[2.5rem] p-6 border-2 border-white shadow-sm hover:shadow-md transition-all group">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{venue.img}</div>
                    <h4 className="text-xl font-bold text-[#444] mb-1">{venue.name}</h4>
                    <p className="text-[#99E6D9] font-bold text-sm mb-6">{venue.city}</p>
                    <button onClick={() => onVenueSelect(venue.id)} className="w-full py-4 bg-[#FF8A65] text-white rounded-full font-black text-sm tracking-wider shadow-[0_8px_15px_rgba(255,138,101,0.3)] active:scale-95 transition-all">
                      立即查看
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