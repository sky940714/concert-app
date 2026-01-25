import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Share2, Star, Volume2, Play, SkipForward, SkipBack } from 'lucide-react';
import { ConcertAtmosphereBackground } from '../../components/effects/ConcertAtmosphereBackground';
import { GlassCard } from '../../components/common/GlassCard';
import type { Ticket } from '../../types';

export const MiniConcertView = ({ ticket, onClose }: { ticket: Ticket; onClose: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [energyScore, setEnergyScore] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // 1. 物理擺弄邏輯 (3D Parallax)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);

  // 2. 動態跑分邏輯 (讀取 ticket.energyValue)
  useEffect(() => {
    const end = ticket.energyValue || 95;
    const timer = setTimeout(() => {
      let start = 0;
      const handle = setInterval(() => {
        start += 2;
        if (start >= end) { setEnergyScore(end); clearInterval(handle); }
        else { setEnergyScore(start); }
      }, 25);
    }, 1000);
    return () => clearTimeout(timer);
  }, [ticket.energyValue]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current || isClosing) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    x.set((clientX - rect.left) / rect.width - 0.5);
    y.set((clientY - rect.top) / rect.height - 0.5);
  };

  const handleSave = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 600);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
      >
        {/* 背景層：讀取動態漸層 */}
        <div className="absolute inset-0 z-0">
          <ConcertAtmosphereBackground />
          <motion.div 
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`absolute inset-0 bg-gradient-to-b ${ticket.bgGradient} via-transparent to-black`} 
          />
        </div>

        <button onClick={onClose} className="absolute top-12 right-8 z-[130] text-white/50 hover:text-white transition-colors">
          <X size={28} />
        </button>

        {/* 縮放容器 (已設定為縮小 25% 且具備回彈動畫) */}
        <motion.div 
          className="relative z-10 w-full max-w-sm px-8 perspective-2000"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isClosing 
            ? { scale: [0.75, 0.85, 0], opacity: [1, 1, 0] } 
            : { opacity: 1, scale: 0.75 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            onTouchMove={handleMove}
            onTouchEnd={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* 動態投影 */}
            <motion.div style={{ x: shadowX, y: shadowY }} className="absolute inset-4 bg-black/60 rounded-[2.5rem] -z-10" />

            <GlassCard className="relative overflow-hidden !rounded-[2.5rem] border-white/20 h-[580px] !p-0 shadow-none">
              
              {/* 底層海報 */}
              <div className="absolute inset-0 z-0 scale-105">
                <img src={ticket.img} className="w-full h-full object-cover opacity-60" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              </div>

              {/* 金光掃描特效 */}
              <motion.div 
                initial={{ x: "-150%", skewX: -25 }}
                animate={{ x: "150%" }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
                className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-[15] pointer-events-none"
              />

              {/* 3D 內容層 */}
              <div className="relative z-10 h-full flex flex-col p-8 justify-between" style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}>
                
                {/* 頂部：動態勳章與主題色 */}
                <div className="flex justify-between items-start" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/40 shadow-lg"
                      style={{ background: `linear-gradient(135deg, white, ${ticket.themeColor}, #000)` }}
                    >
                      <span className="text-black font-black text-xl italic">{ticket.badgeChar}</span>
                    </div>
                    <div className="text-[9px] font-black text-white/80 tracking-[0.2em] uppercase">Memory Certified</div>
                  </div>
                  <Share2 size={18} className="text-white/40" />
                </div>

                {/* 音樂播放器：動態資訊與主題色 */}
                <div className="py-6 px-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10" style={{ transform: "translateZ(50px)" }}>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-bold text-sm">{ticket.trackName}</div>
                        <div className="text-white/40 text-[9px] uppercase tracking-tighter italic">{ticket.artistName}</div>
                      </div>
                      <Volume2 size={14} style={{ color: ticket.themeColor }} className="animate-pulse" />
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }} 
                        animate={{ width: "65%" }} 
                        transition={{ duration: 3, delay: 1 }} 
                        style={{ backgroundColor: ticket.themeColor }}
                        className="h-full" 
                      />
                    </div>
                    <div className="flex justify-center items-center gap-6 mt-1 text-white/80">
                      <SkipBack size={16} fill="currentColor" />
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                        <Play size={14} fill="black" />
                      </div>
                      <SkipForward size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* 數據區塊：動態色調 */}
                <div className="grid grid-cols-2 gap-4" style={{ transform: "translateZ(30px)" }}>
                  <div className="bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 text-center">
                    <div className="text-[9px] text-white/40 uppercase mb-1 font-black tracking-widest">Energy</div>
                    <div className="text-xl font-black text-white italic">{energyScore}%</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-lg p-4 rounded-2xl border border-white/10 text-center">
                    <div className="text-[9px] text-white/40 uppercase mb-1 font-black tracking-widest">Vibe</div>
                    <div className="text-xl font-black italic" style={{ color: ticket.themeColor }}>MAX</div>
                  </div>
                </div>

                <div className="text-center" style={{ transform: "translateZ(20px)" }}>
                  <div className="text-white/70 font-mono text-xs tracking-[0.4em] mb-4">{ticket.date}</div>
                  <button 
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase active:scale-95 transition-all shadow-2xl"
                  >
                    回憶保存至個人票夾
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};