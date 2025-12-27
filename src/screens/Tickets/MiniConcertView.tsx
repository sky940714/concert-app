import { X, Disc, Sparkles } from 'lucide-react';
import type { Ticket } from '../../types';

interface MiniConcertViewProps {
  ticket: Ticket;
  onClose: () => void;
}

export const MiniConcertView = ({ ticket, onClose }: MiniConcertViewProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col h-full overflow-hidden animate-in zoom-in duration-500 font-sans">
      {/* 背景特效 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${ticket.color} opacity-30 mix-blend-screen animate-pulse`} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl animate-[spin_10s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Disc size={300} className="text-white/20 animate-[spin_5s_linear_infinite] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-pan" />
      </div>

      {/* 頂部導航 */}
      <div className="flex justify-between items-center p-4 z-10 relative">
        <button onClick={onClose} className="text-white/80 bg-white/10 p-2 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors">
          <X size={24} />
        </button>
        <div className="text-white font-bold tracking-widest text-sm uppercase border-b border-white/30 pb-1">珍藏回憶</div>
        <div className="w-10" />
      </div>

      {/* 內容 */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 relative z-10 text-center">
        <div className="text-6xl mb-6 animate-bounce drop-shadow-lg">{ticket.img}</div>
        <h2 className="text-3xl font-black text-white mb-2 drop-shadow-md leading-tight">{ticket.event}</h2>
        <div className="text-white/70 font-medium text-lg mb-8">{ticket.date} • {ticket.venue}</div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl max-w-xs">
          <p className="text-white/80 text-sm leading-relaxed font-mono">
            感謝您參與這場音樂盛會。這段記憶已永久封存於您的演藝日誌中。期待下次啟航！
          </p>
        </div>
        <div className="mt-10 flex gap-2">
          <Sparkles className="text-yellow-300 animate-pulse" />
          <Sparkles className="text-cyan-300 animate-pulse delay-100" />
          <Sparkles className="text-rose-300 animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};