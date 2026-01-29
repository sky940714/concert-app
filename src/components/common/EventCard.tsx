import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

// ✅ 修正介面定義：移除 priceRange，保留 onPress
interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  category: string;
  imageUrl: string;
  onPress?: () => void; // 接收來自 Discovery 的跳轉指令
}

export const EventCard = ({ 
  title, 
  date, 
  venue, 
  category, 
  imageUrl, 
  onPress 
}: EventCardProps) => {
  return (
    <motion.div 
      // ✅ 綁定點擊事件
      onClick={onPress}
      whileTap={{ scale: 0.96 }}
      className="w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-sm border border-white/50 active:bg-slate-50 transition-all cursor-pointer group"
    >
      {/* 上半部：海報視覺 */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          alt={title} 
        />
        <div className="absolute top-5 left-5 bg-[#99E6D9] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white/30">
          {category}
        </div>
      </div>

      {/* 下半部：詳細資訊 */}
      <div className="p-7 space-y-4">
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-xl font-black text-slate-800 leading-tight flex-1">
            {title}
          </h3>
          {/* ✅ 優化：加入「前往購票」按鈕並移除金額顯示 */}
          <div className="clay-btn-orange px-5 py-2 text-[11px] whitespace-nowrap shadow-md">
            前往購票
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-slate-400 text-xs font-bold">
            <div className="w-6 h-6 rounded-lg bg-cyan-50 flex items-center justify-center">
              <Calendar size={14} className="text-[#99E6D9]" />
            </div>
            {date}
          </div>
          <div className="flex items-center gap-2.5 text-slate-400 text-xs font-bold">
            <div className="w-6 h-6 rounded-lg bg-cyan-50 flex items-center justify-center">
              <MapPin size={14} className="text-[#99E6D9]" />
            </div>
            {venue}
          </div>
        </div>
      </div>
    </motion.div>
  );
};