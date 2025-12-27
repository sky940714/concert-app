import { ArrowLeft, ScanLine, QrCode } from 'lucide-react';

interface ImportTicketScreenProps {
  onBack: () => void;
}

export const ImportTicketScreen = ({ onBack }: ImportTicketScreenProps) => {
  return (
    <div className="bg-[#E0F7FA] h-[100dvh] pb-20 px-6 pt-12 animate-in slide-in-from-right font-sans text-slate-600 flex flex-col">
      
      {/* 頂部導航 */}
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#FF8A65] active:scale-90 transition-all"
        >
          <ArrowLeft size={20} strokeWidth={3} />
        </button>
        <h2 className="text-2xl font-black text-slate-700 clay-text-title tracking-tight">匯入實體票</h2>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        {/* 掃描區：壓入式深凹槽 */}
        <div className="w-full max-w-[320px] aspect-[3/4] clay-inset rounded-[2.5rem] relative overflow-hidden flex flex-col items-center justify-center group border-4 border-white/50">
          
          {/* 掃描線動畫：柔和的薄荷綠光條 */}
          <div 
            className="absolute top-0 left-0 w-full h-1.5 bg-[#99E6D9] shadow-[0_0_20px_#99E6D9] z-10 opacity-80" 
            style={{ animation: 'scan 3s ease-in-out infinite' }}
          />
          
          <div className="p-8 bg-white/40 rounded-3xl backdrop-blur-sm shadow-inner mb-6">
            <QrCode size={120} className="text-slate-700/50" strokeWidth={1.5} />
          </div>
          
          <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-[#FF8A65] animate-pulse">
            <ScanLine size={18} strokeWidth={3} />
            <span className="text-xs font-black tracking-widest">正在搜尋 QR Code</span>
          </div>
        </div>
        
        {/* 說明文字 */}
        <p className="text-slate-400 text-sm font-bold text-center mt-8 px-10 leading-relaxed">
          將實體票券置於框線內<br/>
          系統將自動捕捉並轉換為<span className="text-[#FF8A65]"> 3D 數位票卡</span>
        </p>
      </div>
    </div>
  );
};