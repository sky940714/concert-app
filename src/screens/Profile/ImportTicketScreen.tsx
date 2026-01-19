import { useState } from 'react';
import { ArrowLeft, Ticket, Loader2, CheckCircle2, AlertCircle, ScanLine, Globe, ShieldCheck } from 'lucide-react';

// 定義匯入流程步驟
type ImportStep = 'select-source' | 'input-code' | 'verifying' | 'success';

export const ImportTicketScreen = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<ImportStep>('select-source');
  const [ticketCode, setTicketCode] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handleStartVerify = () => {
    setStep('verifying');
    // 模擬後端校驗流程：核對身分證與票券綁定關係
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  // 1. 選擇來源平台
  if (step === 'select-source') {
    return (
      <div className="h-full bg-[#F0F9FF] flex flex-col p-8 pt-16 font-sans relative">
        <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm active:scale-95 transition-all">
          <ArrowLeft size={20} className="text-slate-600"/>
        </button>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-lg flex items-center justify-center mb-6 shrink-0">
            <Globe size={40} className="text-indigo-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">選擇票券來源</h2>
          <p className="text-slate-400 text-sm font-bold mb-8">請選擇您購買票券的平台</p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {['KKTIX', 'ibon', 'tixCraft', 'FamiTicket'].map(platform => (
              <button 
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`p-4 rounded-2xl border-2 transition-all font-black text-sm ${
                  selectedPlatform === platform 
                  ? 'border-[#FF8A65] bg-white text-[#FF8A65] shadow-md scale-105' 
                  : 'border-white bg-white/40 text-slate-400'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* 下一步按鈕：位於畫面中間偏下 */}
          <div className="mt-10 w-full max-w-xs">
            <button 
              disabled={!selectedPlatform}
              onClick={() => setStep('input-code')}
              className="w-full bg-[#FF8A65] disabled:bg-slate-300 text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              下一步：輸入序號 <ArrowLeft className="rotate-180" size={18} strokeWidth={4}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 輸入序號頁面
  if (step === 'input-code') {
    return (
      <div className="h-full bg-[#F0F9FF] flex flex-col p-8 pt-16 font-sans relative">
        <button onClick={() => setStep('select-source')} className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={20} className="text-slate-600"/>
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-lg flex items-center justify-center mb-6 shrink-0 text-[#FF8A65]">
            <Ticket size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">輸入取票序號</h2>
          <p className="text-slate-400 text-sm font-bold mb-8 px-4">
            系統將自動比對您的<span className="text-[#FF8A65]">實名制身分</span>與購票資料
          </p>

          <div className="w-full max-w-xs space-y-6">
            <input 
              type="text"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
              placeholder="請輸入 10 碼序號"
              className="w-full bg-white border-none rounded-2xl px-6 py-4 text-center text-xl font-mono font-black shadow-inner focus:ring-2 focus:ring-[#FF8A65] transition-all"
            />

            <button 
              disabled={ticketCode.length < 5}
              onClick={handleStartVerify}
              className="w-full bg-slate-800 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              確認匯入並綁定 <ScanLine size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. 模擬校驗與成功頁面
  return (
    <div className="h-full bg-[#F0F9FF] flex flex-col items-center justify-center p-8 text-center font-sans">
      {step === 'verifying' ? (
        <div className="space-y-6">
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-16 h-16 text-[#FF8A65] animate-spin" />
            <ShieldCheck className="absolute text-slate-400" size={24} />
          </div>
          <h3 className="text-xl font-black text-slate-700">身分一致性校驗中</h3>
          <p className="text-slate-400 text-sm font-bold animate-pulse">
            正在串接 {selectedPlatform} 資料庫...
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in duration-700 w-full max-w-xs">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-lg flex items-center justify-center mx-auto mb-8">
             <CheckCircle2 size={48} className="text-emerald-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">票券匯入成功</h2>
          <p className="text-emerald-600 text-xs font-black tracking-widest uppercase mb-8">Securely Bound</p>
          
          {/* 模擬票券預覽 */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 text-left mb-10">
            <div className="text-[10px] font-black text-slate-300 uppercase mb-1">Event</div>
            <div className="text-slate-700 font-black text-sm mb-3 underline decoration-[#FF8A65] decoration-2">周杰倫嘉年華演唱會 - 台北站</div>
            <div className="flex justify-between">
              <div>
                <div className="text-[10px] font-black text-slate-300 uppercase mb-1">Seat</div>
                <div className="text-slate-600 font-bold text-xs font-mono">A3 區 12 排 08 號</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-300 uppercase mb-1">Security</div>
                <div className="text-emerald-500 font-bold text-[10px]">裝置已綁定</div>
              </div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
          >
            進入票夾查看
          </button>
        </div>
      )}
    </div>
  );
};