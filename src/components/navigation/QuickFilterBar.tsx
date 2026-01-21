// src/components/navigation/QuickFilterBar.tsx
import { MOCK_REGIONS } from '../../data';
import { MapPin } from 'lucide-react'; // ✅ 新增匯入圖示

interface QuickFilterBarProps {
  onSelectRegion: (id: string) => void;
  selectedId?: string;
}

export const QuickFilterBar = ({ onSelectRegion, selectedId }: QuickFilterBarProps) => {
  return (
    <div className="w-full flex gap-3 overflow-x-auto no-scrollbar py-2 px-1">
      {MOCK_REGIONS.map((region) => {
        const isActive = selectedId === region.id; // 定義選中狀態
        return (
          <button
            key={region.id}
            onClick={() => onSelectRegion(region.id)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all border flex items-center gap-1.5
              ${isActive 
                ? 'bg-[#FF8A65] text-white border-[#FF8A65] shadow-[0_4px_12px_rgba(255,138,101,0.4)] scale-105' 
                : 'bg-white/70 text-[#444] border-white backdrop-blur-md hover:bg-white/90'}`}
          >
            {/* ✅ 只有選中時顯示地標圖示，增加直觀感 */}
            {isActive && <MapPin size={14} fill="white" />}
            {region.name}
          </button>
        );
      })}
    </div>
  );
};