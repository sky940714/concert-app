import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Award, Star, Music } from 'lucide-react';
import { ConcertAtmosphereBackground } from '../../components/effects/ConcertAtmosphereBackground';
import { GlassCard } from '../../components/common/GlassCard';
import type { Ticket } from '../../types';

interface MiniConcertViewProps {
  ticket: Ticket;
  onClose: () => void;
}

export const MiniConcertView = ({ ticket, onClose }: MiniConcertViewProps) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden">
      {/* 1. 舞台氛圍背景：加入更強烈的粒子與光影 */}
      <div className="absolute inset-0 bg-black">
        <ConcertAtmosphereBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black" />
      </div>

      {/* 關閉按鈕 */}
      <button 
        onClick={onClose}
        className="absolute top-12 right-8 z-[130] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform"
      >
        <X size={24} />
      </button>

      {/* 2. 核心內容：許願動畫主體 */}
      <div className="relative z-10 w-full max-w-sm px-6">
        
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, rotateX: 45 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.2 }}
            className="perspective-1000"
          >
            {/* 紀念票根主卡片 */}
            <div className="relative group">
              {/* 卡片背後的發光暈影 (許願感) */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity animate-pulse" />
              
              <GlassCard className="relative overflow-hidden !rounded-[2rem] border-white/30 shadow-2xl">
                {/* 虹彩流光層 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 animate-[shine_4s_infinite] pointer-events-none" />

                <div className="p-8">
                  {/* 頂部：紀念章 */}
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Award className="text-white" size={32} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Official Memory</div>
                      <div className="text-xs font-bold text-orange-400">#LIVE_CERTIFIED</div>
                    </div>
                  </div>

                  {/* 標題與藝人 */}
                  <div className="mb-8">
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-3xl font-black text-white leading-tight mb-2"
                    >
                      {ticket.event}
                    </motion.h2>
                    <div className="flex items-center gap-2 text-white/60">
                      <Music size={14} />
                      <span className="text-sm font-bold tracking-wide">Live at {ticket.venue}</span>
                    </div>
                  </div>

                  {/* 數據統計：全息感設計 */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/40 mb-1">
                        <Star size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Energy</span>
                      </div>
                      <div className="text-xl font-black text-white">98<span className="text-xs ml-0.5">%</span></div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/40 mb-1">
                        <Share2 size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Vibe</span>
                      </div>
                      <div className="text-xl font-black text-white">MAX</div>
                    </div>
                  </div>

                  {/* 底部日期與裝飾條 */}
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <div className="font-mono text-white/40 text-sm">{ticket.date}</div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. 底部文字提示：許願感 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 font-medium italic mb-6">「這份感動，已永久鎖定在你的實名票夾中」</p>
          <button 
            onClick={onClose}
            className="px-10 py-4 rounded-full bg-white text-black font-black text-sm active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            回憶保存
          </button>
        </motion.div>
      </div>

      {/* 4. 裝飾性光束：模擬舞台聚光燈 */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 left-1/4 w-[2px] h-[500px] bg-blue-500/20 rotate-[15deg] blur-sm animate-pulse" />
        <div className="absolute -bottom-20 right-1/4 w-[2px] h-[500px] bg-purple-500/20 -rotate-[15deg] blur-sm animate-pulse" />
      </div>
    </div>
  );
};