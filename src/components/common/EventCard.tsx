import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

// ✅ 修正介面定義：加入 onPress 屬性
interface EventCardProps {
  title: string;
  date: string;
  venue: string;
  category: string;
  imageUrl: string;
  priceRange: string;
  onPress?: () => void; // 接收來自 Discovery 的跳轉指令
}

export const EventCard = ({ 
  title, 
  date, 
  venue, 
  category, 
  imageUrl, 
  priceRange, 
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
        <img src={imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={title} />
        <div className="absolute top-5 left-5 bg-[#99E6D9] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white/30">
          {category}
        </div>
      </div>

      {/* 下半部：詳細資訊 */}
      <div className="p-7 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-black text-slate-800 leading-tight flex-1">
            {title}
          </h3>
          <div className="text-[#FF8A65] font-black text-base whitespace-nowrap">
            ${priceRange}
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

        <div className="pt-2 flex justify-end">
          <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[#99E6D9] group-hover:text-white group-hover:shadow-lg transition-all duration-300">
            <ChevronRight size={20} strokeWidth={3} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};