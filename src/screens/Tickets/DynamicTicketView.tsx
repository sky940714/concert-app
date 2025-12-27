import { useState, useEffect } from 'react';
import { X, Calendar, Clock, QrCode, Ticket as TicketIcon, ScanLine } from 'lucide-react';
import type { Ticket } from '../../types';

interface DynamicTicketViewProps {
  ticket: Ticket;
  onClose: () => void;
}

export const DynamicTicketView = ({ ticket, onClose }: DynamicTicketViewProps) => {
  const [qrCode, setQrCode] = useState("A1B2-C3D4");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrCode(Math.random().toString(36).substring(7).toUpperCase());
      setProgress(100);
    }, 5000);
    const progressTimer = setInterval(() => setProgress((prev) => Math.max(0, prev - 2)), 100);
    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#E0F7FA]/95 backdrop-blur-md flex flex-col h-full overflow-hidden animate-in fade-in duration-300 font-sans text-slate-600">
      
      {/* 頂部導航 */}
      <div className="flex justify-between items-center p-6 z-10">
        <button 
          onClick={onClose} 
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-[#FF8A65] active:scale-90 transition-all"
        >
          <X size={24} strokeWidth={3} />
        </button>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-white/50">
          <div className="text-[#FF8A65] font-black tracking-widest text-xs uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#99E6D9] animate-pulse" />
            Live Access
          </div>
        </div>
        <div className="w-12" /> {/* 佔位符保持平衡 */}
      </div>

      {/* 票券本體：3D 全息實體票卡 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* 卡片容器：厚實的白色黏土板 */}
        <div className="clay-card-white w-full max-w-sm rounded-[2.5rem] overflow-hidden relative group">
          
          {/* 頂部彩色印刷頭 (珊瑚橘) */}
          <div className="bg-[#FF8A65] p-8 pb-10 text-white relative overflow-hidden">
            {/* 裝飾紋理 */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black leading-tight mb-2 drop-shadow-sm">{ticket.event}</h2>
                <div className="flex items-center gap-3 text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg inline-flex border border-white/30">
                  <span className="flex items-center gap-1"><Calendar size={12} strokeWidth={3}/> {ticket.date}</span>
                  <span className="w-px h-3 bg-white/40" />
                  <span className="flex items-center gap-1"><Clock size={12} strokeWidth={3}/> {ticket.time}</span>
                </div>
              </div>
              <TicketIcon size={32} className="text-white/80 rotate-12" strokeWidth={2.5} />
            </div>
          </div>

          {/* 下半部資訊區 (白色) */}
          <div className="p-8 pt-6 bg-white relative">
            {/* 連接處的波浪裝飾 (模擬撕票線) */}
            <div className="absolute top-0 left-0 w-full -mt-3 h-6 bg-white rounded-[50%] scale-x-150" />

            {/* 座位資訊 */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="text-center w-1/2 border-r-2 border-slate-100">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Gate</div>
                <div className="text-3xl font-black text-slate-700">{ticket.gate}</div>
              </div>
              <div className="text-center w-1/2">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Seat</div>
                <div className="text-xl font-black text-slate-700">{ticket.seat}</div>
              </div>
            </div>

            {/* QR Code 區域：深凹槽 */}
            <div className="flex flex-col items-center space-y-6">
              <div className="clay-inset p-5 rounded-3xl bg-[#DAF0F5] border-4 border-white relative overflow-hidden">
                 {/* 掃描光條 */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#FF8A65]/30 z-10 animate-[scan_2s_linear_infinite]" />
                 <QrCode size={140} className="text-slate-700" />
                 <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-sm">
                   <ScanLine size={12} className="text-[#FF8A65]" />
                 </div>
              </div>

              {/* 動態條碼：液體管狀 */}
              <div className="w-full space-y-2">
                <div className="text-2xl font-black text-slate-700 tracking-[0.2em] text-center font-mono">
                  {qrCode}
                </div>
                {/* 進度條槽 */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  {/* 液體填充 */}
                  <div 
                    className="h-full bg-[#99E6D9] rounded-full shadow-[0_0_10px_#99E6D9] transition-all duration-100 ease-linear" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <p className="text-[10px] text-center text-slate-400 font-bold mt-2">
                  每 5 秒自動更新安全碼
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};