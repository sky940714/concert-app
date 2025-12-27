import { ArrowLeft, ScanLine } from 'lucide-react';

interface ImportTicketScreenProps {
  onBack: () => void;
}

export const ImportTicketScreen = ({ onBack }: ImportTicketScreenProps) => {
  return (
    <div className="bg-black h-[100dvh] pb-20 px-6 pt-6 animate-in slide-in-from-right text-white font-sans">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-cyan-500 hover:text-cyan-300 transition-colors">
        <ArrowLeft size={20} /> 返回
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-white">匯入實體票券</h2>
      
      <div className="aspect-square bg-black/50 border-2 border-dashed border-cyan-500/50 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center group">
        <ScanLine size={60} className="text-cyan-400 animate-pulse" />
        <p className="text-cyan-500/70 text-sm mt-4 font-mono tracking-wider">ALIGN QR CODE</p>
        <div 
          className="absolute top-0 left-0 w-full h-2 bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.8)]" 
          style={{ animation: 'scan 2s linear infinite' }}
        />
      </div>
      
      <p className="text-zinc-500 text-xs text-center mt-6 px-10">
        請將實體票券上的二維碼置於掃描框內。系統將自動解析並存入您的數位票夾。
      </p>
    </div>
  );
};