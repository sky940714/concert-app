import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, Users, Info, ExternalLink } from 'lucide-react';
import { ConcertAtmosphereBackground } from '../../components/effects';

interface EventDetailViewProps {
  event: {
    title: string;
    date: string;
    venue: string;
    img: string;
    lineup?: { name: string; avatar: string }[];
    description?: string;
    kktixUrl?: string;
  };
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const EventDetailView = ({ event, onBack, showToast }: EventDetailViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 監聽容器內部的滾動
  const { scrollY } = useScroll({
    container: containerRef,
  });

  // 1. 視差效果：海報隨滾動縮放與淡出
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);

  // 2. 導覽列：滾動超過海報後顯示標題
  const navBgOpacity = useTransform(scrollY, [200, 300], [0, 1]);
  const navTitleY = useTransform(scrollY, [250, 350], [20, 0]);
  const navTitleOpacity = useTransform(scrollY, [250, 350], [0, 1]);

  // 模擬演出陣容數據 (若 props 沒傳則顯示預設)
  const defaultLineup = [
    { name: '主唱', avatar: 'https://i.pravatar.cc/150?u=1' },
    { name: '吉他手', avatar: 'https://i.pravatar.cc/150?u=2' },
    { name: '貝斯手', avatar: 'https://i.pravatar.cc/150?u=3' },
    { name: '鼓手', avatar: 'https://i.pravatar.cc/150?u=4' },
  ];

  const handleKKTIXRedirect = () => {
    if (event.kktixUrl) {
      window.open(event.kktixUrl, '_blank');
    } else {
      showToast('即將前往 KKTIX 外部售票頁面');
      // 模擬跳轉
      setTimeout(() => window.open('https://kktix.com', '_blank'), 1000);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#E0F7FA] flex flex-col font-sans"
    >
      {/* 動態導覽列 (玻璃擬態) */}
      <motion.div 
        style={{ opacity: navBgOpacity }}
        className="absolute top-0 left-0 right-0 h-28 bg-white/70 backdrop-blur-xl z-[110] border-b border-white/20 flex items-end px-6 pb-4"
      >
        <motion.div style={{ y: navTitleY, opacity: navTitleOpacity }} className="w-full text-center">
          <span className="text-slate-800 font-black text-lg truncate block px-12">
            {event.title}
          </span>
        </motion.div>
      </motion.div>

      {/* 返回按鈕 (最高層級) */}
      <button 
        onClick={onBack} 
        className="absolute top-12 left-6 z-[120] w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border-2 border-white active:scale-90 transition-transform"
      >
        <ChevronLeft size={24} strokeWidth={3} className="text-slate-700" />
      </button>

      {/* 可滾動內容區 */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto no-scrollbar relative"
      >
        {/* 背景氣氛粒子 */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <ConcertAtmosphereBackground />
        </div>

        {/* 頂部海報區 (帶視差) */}
        <div className="relative h-[55vh] w-full overflow-hidden shrink-0">
          <motion.img 
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            src={event.img} 
            className="w-full h-full object-cover" 
            alt={event.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E0F7FA] via-transparent to-transparent" />
        </div>

        {/* 內容卡片 */}
        <div className="px-6 -mt-20 relative z-10 pb-40">
          <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl border-2 border-white/50 space-y-8">
            
            {/* 標題與標籤 */}
            <div className="space-y-4">
              <span className="bg-[#99E6D9]/20 text-[#47C2B0] text-[10px] font-black px-4 py-1.5 rounded-full border border-[#99E6D9]/30">
                OFFICIAL EVENT
              </span>
              <h1 className="text-3xl font-black text-slate-800 leading-tight">{event.title}</h1>
            </div>

            {/* 基本資訊組件 */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-4 p-5 bg-[#F8FAFC] rounded-[2rem] border-b-4 border-slate-200">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Calendar size={20} className="text-[#99E6D9]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                  <p className="text-sm font-black text-slate-700">{event.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-5 bg-[#F8FAFC] rounded-[2rem] border-b-4 border-slate-200">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin size={20} className="text-[#FF8A65]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue Location</p>
                  <p className="text-sm font-black text-slate-700">{event.venue}</p>
                </div>
              </div>
            </div>

            {/* 演出陣容 (新增模組) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-slate-400" />
                <h2 className="text-lg font-black text-slate-800">演出</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                {(event.lineup || defaultLineup).map((artist, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                    <div className="w-16 h-16 rounded-full border-4 border-[#F0F9FF] shadow-md overflow-hidden">
                      <img src={artist.avatar} className="w-full h-full object-cover" alt={artist.name} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{artist.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 活動簡介 (新增模組) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info size={18} className="text-slate-400" />
                <h2 className="text-lg font-black text-slate-800">活動介紹</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {event.description || "這是一場專為音樂愛好者打造的視聽盛宴。現場將結合最先進的燈光音響技術，為您呈現難忘的精彩演出。請準時入場，感受現場震撼魅力。"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部導購按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/60 backdrop-blur-xl border-t border-white/30 z-[115]">
        <button 
          onClick={handleKKTIXRedirect}
          className="group w-full h-20 bg-[#2EB6A3] rounded-[2.5rem] flex items-center justify-center gap-3 text-white font-black shadow-[0_10px_0_#1E8D7D] active:shadow-none active:translate-y-[10px] transition-all"
        >
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] opacity-80 mb-1">GO TO KKTIX</span>
            <span className="text-lg">前往官方售票購票</span>
          </div>
          <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};