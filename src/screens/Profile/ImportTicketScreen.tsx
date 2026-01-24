import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Smartphone, UserCheck, ShieldCheck, Loader2, CheckCircle, Info } from 'lucide-react';

export const ImportTicketScreen = ({ onClose, onImport }: { onClose: () => void, onImport: (ticket: any) => void }) => {
  const [step, setStep] = useState<'ocr' | 'twid' | 'liveness' | 'success'>('ocr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // 模擬設備 UUID
  const deviceUUID = "DVC-8824-X99-LIT";

  // 管理相機開啟與關閉
  useEffect(() => {
    async function enableCamera() {
      if (step === 'ocr' || step === 'liveness') {
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: step === 'ocr' ? 'environment' : 'user' } 
          });
          setStream(newStream);
          if (videoRef.current) videoRef.current.srcObject = newStream;
        } catch (err) {
          console.error("無法開啟相機:", err);
        }
      } else {
        stopCamera();
      }
    }
    enableCamera();
    return () => stopCamera();
  }, [step]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startNextProcess = (current: typeof step) => {
    setIsProcessing(true);
    stopCamera(); // 處理中暫時關閉相機以節省資源
    
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
          isLinked: true
        });
      }
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-2xl flex flex-col font-sans text-white overflow-hidden">
      {/* 頂部標題 */}
      <div className="p-6 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-black tracking-tight">實名匯入系統</h2>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 w-6 rounded-full ${
                (step === 'ocr' && i === 1) || 
                (step === 'twid' && i === 2) || 
                (step === 'liveness' && i === 3) || 
                (step === 'success') ? 'bg-cyan-400' : 'bg-white/20'
              }`} />
            ))}
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center active:scale-90 transition-transform"><X size={20}/></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
        {isProcessing ? (
          <div className="space-y-6">
            <div className="relative">
              <Loader2 className="animate-spin text-cyan-400 mx-auto" size={64} strokeWidth={3} />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
            </div>
            <div className="space-y-2">
              <p className="text-cyan-400 font-black text-xl tracking-widest">安全層級核對中</p>
              <p className="text-white/40 text-xs font-mono">Verifying Protocol 7.4.2...</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-500">
            
            {/* 步驟 1: OCR 實境相機 */}
            {step === 'ocr' && (
              <>
                <div className="relative w-full aspect-[3/4] bg-black rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border-[2px] border-cyan-400/50 m-12 rounded-xl">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400"></div>
                  </div>
                  <div className="absolute bottom-6 left-0 right-0 text-[10px] font-bold text-cyan-400 animate-pulse">對準身分證正面</div>
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2">1. 證件 OCR 辨識</h3>
                  <p className="text-slate-400 text-sm">請將身分證置於框內，系統將自動擷取資訊</p>
                </div>
                <button onClick={() => startNextProcess('ocr')} className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black shadow-xl active:scale-95 transition-all">掃描證件</button>
              </>
            )}

            {/* 步驟 2: 手機門號與設備綁定 */}
            {step === 'twid' && (
              <>
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-2">
                  <Smartphone size={40} className="text-blue-400" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black">2. 手機門號實名連動</h3>
                  <div className="relative">
                    <input 
                      type="tel" 
                      placeholder="請輸入手機號碼 (09xxxxxxxx)"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-xl font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                    />
                    {phoneNumber.length === 10 && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={24} />}
                  </div>
                  
                  {/* 設備綁定字樣 */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3 text-left">
                    <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-emerald-500 text-xs font-black">已與該設備完成安全性綁定</p>
                      <p className="text-emerald-500/50 text-[10px] font-mono mt-1">ID: {deviceUUID}</p>
                    </div>
                  </div>
                </div>
                <button 
                  disabled={phoneNumber.length < 10}
                  onClick={() => startNextProcess('twid')} 
                  className={`w-full py-5 rounded-2xl font-black shadow-xl transition-all ${
                    phoneNumber.length >= 10 ? 'bg-blue-600 text-white active:scale-95' : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  進行電信商核對
                </button>
              </>
            )}

            {/* 步驟 3: 活體辨識 */}
            {step === 'liveness' && (
              <>
                <div className="relative w-64 h-64 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
                  <div className="absolute inset-4 rounded-full overflow-hidden bg-slate-800">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 text-purple-400">3. 活體人證比對</h3>
                  <p className="text-slate-400 text-sm">請確保面部光線充足<br/>並緩慢「眨眼」以完成辨識</p>
                </div>
                <button onClick={() => startNextProcess('liveness')} className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black shadow-xl active:scale-95 transition-all">開始動作識別</button>
              </>
            )}

            {/* 步驟 4: 成功 */}
            {step === 'success' && (
              <>
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                  <ShieldCheck size={48} className="text-green-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black">驗證成功並匯入</h3>
                  <p className="text-slate-400 text-sm">此票券已與您的實名帳戶鎖定<br/>裝置綁定狀態：<span className="text-emerald-400 font-bold">已啟用</span></p>
                  <div className="bg-white/5 p-3 rounded-xl inline-block">
                    <p className="text-[10px] font-mono text-white/40">憑證雜湊: SHA256-TKT-992...{Date.now().toString().slice(-4)}</p>
                  </div>
                </div>
                <button onClick={onClose} className="w-full py-5 bg-green-600 text-white rounded-2xl font-black shadow-xl active:scale-95 transition-all">進入票夾</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};