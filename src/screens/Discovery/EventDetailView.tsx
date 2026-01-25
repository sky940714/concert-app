import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, Share2, Heart, Ticket, Info } from 'lucide-react';

// ✅ 必須使用具名匯出 (Named Export)
export const EventDetailView = ({ event, onBack, showToast }: any) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#E0F7FA] flex flex-col font-sans overflow-y-auto no-scrollbar"
    >
      {/* 頂部海報區 */}
      <div className="relative h-[45vh] shrink-0">
        <img src={event.img} className="w-full h-full object-cover" alt={event.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#E0F7FA] via-transparent to-black/30" />
        <div className="absolute top-12 left-6 right-6 flex justify-between items-center">
          <button onClick={onBack} className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* 內容區塊 */}
      <div className="px-6 -mt-12 relative z-10 pb-32">
        <div className="bg-white rounded-[3rem] p-8 shadow-xl border-2 border-white/50 space-y-6">
          <h1 className="text-3xl font-black text-slate-800 leading-tight">{event.title}</h1>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border-b-4 border-slate-200">
              <Calendar size={18} className="text-[#99E6D9]" />
              <p className="text-sm font-black text-slate-700">{event.date}</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border-b-4 border-slate-200">
              <MapPin size={18} className="text-[#FF8A65]" />
              <p className="text-sm font-black text-slate-700">{event.venue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-white/50 z-20">
        <button 
          onClick={() => showToast('即將開放購票')}
          className="w-full h-16 bg-[#99E6D9] rounded-3xl text-white font-black shadow-[0_8px_0_#76C9BA] active:shadow-none active:translate-y-[8px] transition-all"
        >
          立即購票
        </button>
      </div>
    </motion.div>
  );
};