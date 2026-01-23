import React, { useState } from 'react';
import { X, Camera, Smartphone, UserCheck, ShieldCheck, Loader2 } from 'lucide-react';

export const ImportTicketScreen = ({ onClose, onImport }: { onClose: () => void, onImport: (ticket: any) => void }) => {
  const [step, setStep] = useState<'ocr' | 'twid' | 'liveness' | 'success'>('ocr');
  const [isProcessing, setIsProcessing] = useState(false);

  const startNextProcess = (current: typeof step) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (current === 'ocr') setStep('twid');
      else if (current === 'twid') setStep('liveness');
      else if (current === 'liveness') {
        setStep('success');
        onImport({
          id: `T-${Date.now()}`,
          event: "周杰倫 [嘉年華] 2025",
          date: "2025-12-05",
          time: "19:00",
          venue: "臺北大巨蛋",
          seat: "特區 B 10排 01號",
          status: "active",
          gate: "Gate B",
          color: "from-blue-900 to-indigo-900",
          img: "🎹",
          isLinked: true // ✅ 匯入時同步完成歸戶
        });
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-2xl flex flex-col font-sans text-white">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-black tracking-tight">實名匯入系統</h2>
        <button onClick={onClose} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><X size={20}/></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        {isProcessing ? (
          <div className="space-y-4 animate-pulse">
            <Loader2 className="animate-spin text-cyan-400 mx-auto" size={56} strokeWidth={3} />
            <p className="text-cyan-400 font-black text-lg">安全層級核對中...</p>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-500">
            {step === 'ocr' && (
              <>
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto border-2 border-white/10 shadow-2xl">
                  <Camera size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3">1. 證件 OCR 辨識</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">請拍攝身分證正反面<br/>系統將自動讀取姓名與證件字號</p>
                </div>
                <button onClick={() => startNextProcess('ocr')} className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black shadow-xl active:scale-95 transition-all">開始拍攝證件</button>
              </>
            )}

            {step === 'twid' && (
              <>
                <Smartphone size={64} className="text-blue-400 mx-auto" />
                <div>
                  <h3 className="text-2xl font-black mb-3">2. 手機門號實名連動</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">正在透過電信商確認門號持有者<br/>是否與該證件字號綁定</p>
                </div>
                <button onClick={() => startNextProcess('twid')} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl active:scale-95 transition-all">進行門號核對</button>
              </>
            )}

            {step === 'liveness' && (
              <>
                <UserCheck size={64} className="text-purple-400 mx-auto" />
                <div>
                  <h3 className="text-2xl font-black mb-3">3. 活體檢測與人證比對</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">請對著鏡頭完成指定動作<br/>確保為真人操作且與證件相符</p>
                </div>
                <button onClick={() => startNextProcess('liveness')} className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black shadow-xl active:scale-95 transition-all">開始動作辨識</button>
              </>
            )}

            {step === 'success' && (
              <>
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500/50">
                  <ShieldCheck size={48} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3">驗證成功並匯入</h3>
                  <p className="text-slate-400 text-sm">此票券已完成實名鎖定<br/>您可直接前往票夾出示通行碼</p>
                </div>
                <button onClick={onClose} className="w-full py-5 bg-green-600 text-white rounded-2xl font-black shadow-xl active:scale-95 transition-all">完成匯入</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};