import { X, Disc, Star, Sparkles, Quote } from 'lucide-react';
import type { Ticket } from '../../types';

interface MiniConcertViewProps {
  ticket: Ticket;
  onClose: () => void;
}

export const MiniConcertView = ({ ticket, onClose }: MiniConcertViewProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#E0F7FA]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300 font-sans text-slate-600">
      
      {/* 關閉按鈕：漂浮在右上角的白色圓鈕 */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-[#FF8A65] active:scale-90 transition-all z-50"
      >
        <X size={24} strokeWidth={3} />
      </button>

      {/* 主體：精裝紀念相框 (白色黏土卡) */}
      <div className="clay-card-white w-full max-w-md p-3 relative overflow-hidden flex flex-col items-center">
        
        {/* 頂部裝飾：票券打孔效果 */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#E0F7FA] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]" />

        {/* 內部相片區 */}
        <div className="w-full bg-slate-50 rounded-[1.5rem] p-8 pb-10 flex flex-col items-center relative overflow-hidden border border-slate-100">
          
          {/* 背景裝飾 */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#E0F7FA] to-transparent opacity-60" />
          
          {/* 3D 圖標展示區 */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-[#99E6D9] blur-xl opacity-40 animate-pulse rounded-full" />
            <div className="clay-card-mint w-32 h-32 rounded-full flex items-center justify-center shadow-xl z-10 relative group-hover:scale-105 transition-transform duration-500">
              <div className="text-4xl animate-bounce-slow drop-shadow-sm">
                {ticket.img}
              </div>
            </div>
            {/* 裝飾星星 */}
            <Star className="absolute -top-2 -right-2 text-[#FFCC80] fill-[#FFCC80] animate-spin-slow" size={24} />
            <Sparkles className="absolute -bottom-2 -left-2 text-[#FF8A65] animate-pulse" size={20} />
          </div>

          <h2 className="text-2xl font-black text-slate-700 text-center mb-2 tracking-tight">
            {ticket.event}
          </h2>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
            {ticket.date} • {ticket.venue}
          </div>

          {/* 感言區域：壓入式凹槽 */}
          <div className="clay-inset w-full p-6 relative rounded-2xl bg-[#DAF0F5]">
            <Quote size={24} className="absolute top-4 left-4 text-[#99E6D9] opacity-50" />
            <p className="text-slate-500 text-sm font-bold leading-relaxed text-center relative z-10 px-2 pt-2">
              這是一段值得珍藏的旅程。<br/>
              感謝您的參與，這份回憶已永久封存於您的個人檔案中。
            </p>
          </div>
        </div>

        {/* 底部標籤 */}
        <div className="py-4 flex items-center justify-center gap-2">
           <Disc size={16} className="text-[#FF8A65] animate-spin-slow" />
           <span className="text-xs font-black text-slate-400 tracking-[0.2em] uppercase">Memory Archived</span>
        </div>
      </div>
    </div>
  );
};