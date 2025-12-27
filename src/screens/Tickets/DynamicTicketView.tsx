import { useState, useEffect } from 'react';
import { X, Calendar, Clock, QrCode, Cpu } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black flex flex-col h-full overflow-hidden animate-in fade-in duration-300 font-mono">
      <div className="flex justify-between items-center p-4 z-10">
        <button onClick={onClose} className="text-cyan-400 bg-cyan-900/20 p-2 rounded-full backdrop-blur-md hover:bg-cyan-900/40 border border-cyan-500/30 transition-colors">
          <X size={24} />
        </button>
        <div className="text-cyan-400 font-bold tracking-widest text-sm uppercase border-b border-cyan-500/30 pb-1">存取授權已確認</div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 blur-[100px] animate-pulse" />
        
        <div className="w-full max-w-sm bg-black/80 border border-cyan-500/50 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)] relative z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="bg-gradient-to-b from-cyan-900/80 to-black p-6 pb-8 text-white relative border-b border-cyan-500/30">
            <div className="absolute top-4 right-4 opacity-50">
              <Cpu size={48} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold leading-tight mb-4 relative z-10 text-cyan-50 drop-shadow-md font-sans">{ticket.event}</h2>
            <div className="flex items-center gap-4 text-xs text-cyan-300/80 font-bold tracking-wider relative z-10">
              <span className="flex items-center gap-1"><Calendar size={12}/> {ticket.date}</span>
              <span className="flex items-center gap-1"><Clock size={12}/> {ticket.time}</span>
            </div>
          </div>

          <div className="p-6 pt-8 relative">
            <div className="flex justify-between items-center mb-8">
              <div className="text-center w-1/2 border-r border-cyan-500/30">
                <div className="text-cyan-500 text-[10px] uppercase tracking-widest mb-1">登艦閘口</div>
                <div className="text-3xl font-black text-white font-sans">{ticket.gate}</div>
              </div>
              <div className="text-center w-1/2">
                <div className="text-cyan-500 text-[10px] uppercase tracking-widest mb-1">座位單元</div>
                <div className="text-xl font-bold text-white font-sans">{ticket.seat}</div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="p-2 rounded-xl bg-white/10 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <QrCode size={160} className="text-cyan-400" />
              </div>
              <div className="w-full space-y-2">
                <div className="font-mono text-2xl font-bold text-cyan-400 tracking-[0.3em] text-center animate-pulse">{qrCode}</div>
                <div className="w-full h-1 bg-cyan-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-100 linear" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};