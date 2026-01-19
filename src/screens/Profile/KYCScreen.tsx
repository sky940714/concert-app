import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ScanFace, 
  FileCheck, 
  Smile, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Camera 
} from 'lucide-react';

type Step = 
  | 'intro'           
  | 'scan-front'      
  | 'scan-back'       
  | 'liveness-intro'  
  | 'liveness-action' 
  | 'submitting'      
  | 'pending';        

interface KYCScreenProps {
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

export function KYCScreen({ onComplete, onBack }: KYCScreenProps) {
  const [step, setStep] = useState<Step>('intro');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [captured, setCaptured] = useState(false);
  const [livenessDone, setLivenessDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [livenessAction, setLivenessAction] = useState('準備開始辨識');

  // 定義演示用的變數
  const isLiveness = step === 'liveness-intro' || step === 'liveness-action';
  // 增加底部邊距，確保高於導覽列 (BottomTabBar 在 bottom-6 左右)
  const safeBottomClass = "pb-32"; 

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: step === 'liveness-action' ? 'user' : 'environment' }
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.warn("相機啟動失敗，切換至演示模式背景", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (['scan-front', 'scan-back', 'liveness-action'].includes(step)) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);

  // 模擬自動掃描流程 (演示用)
  const handleFakeScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setCaptured(true);
          return 100;
        }
        return prev + 2; // 稍微調慢讓演示更有感
      });
    }, 40);
  };

  const handleSubmit = () => {
    setStep('submitting');
    setTimeout(() => setStep('pending'), 2000);
  };

  // 1. 服務條款頁面 (Intro)
  if (step === 'intro') {
    return (
      <div className="h-full bg-[#F0F9FF] flex flex-col p-8 pt-16 font-sans relative">
        <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={20} className="text-slate-600"/>
        </button>
        <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
          <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-lg flex items-center justify-center mb-8 animate-pulse shrink-0">
             <ShieldCheck size={40} className="text-indigo-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-700 mb-6 tracking-tighter">實名認證</h2>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[2rem] border border-white/50 text-left space-y-4 shadow-sm w-full max-w-xs">
             <div className="flex gap-4 items-center">
                <FileCheck size={20} className="text-indigo-600 shrink-0"/>
                <p className="text-sm text-slate-500 font-bold">準備身分證正反面照片</p>
             </div>
             <div className="flex gap-4 items-center">
                <Smile size={20} className="text-indigo-600 shrink-0"/>
                <p className="text-sm text-slate-500 font-bold">需進行本人臉部活體辨識</p>
             </div>
          </div>

          {/* 下一步按鈕：放在內容中間，且位置絕對高於導覽列 */}
          <div className="mt-10 w-full max-w-xs">
            <button 
              onClick={() => setStep('scan-front')}
              className="w-full bg-[#FF8A65] text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              下一步：開始掃描 <ArrowLeft className="rotate-180" size={18} strokeWidth={4}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. 提交與結果頁面
  if (step === 'submitting' || step === 'pending') {
    return (
      <div className="h-full bg-[#F0F9FF] flex flex-col items-center justify-center p-8 text-center">
        {step === 'submitting' ? (
          <>
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-4" />
            <h3 className="text-xl font-black text-slate-700">正在安全上傳資料...</h3>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in">
            <CheckCircle2 size={60} className="text-emerald-500 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-slate-700 mb-4">申請已提交</h2>
            <p className="text-slate-500 font-bold mb-12">審核預計需 1-3 個工作天</p>
            <button onClick={onBack} className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all">
              回到個人首頁
            </button>
          </div>
        )}
      </div>
    );
  }

  // 2-4 相機與辨識流程
  return (
    <div className="h-full bg-slate-900 relative flex flex-col overflow-hidden font-sans">
      {/* 假裝有相機畫面：即使啟動失敗也會有漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-black">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-60" />
      </div>
      
      <button onClick={onBack} className="absolute top-10 left-6 z-30 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
        <ArrowLeft size={20}/>
      </button>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between py-24 pointer-events-none">
         <div className="text-center bg-black/60 backdrop-blur-xl px-8 py-2 rounded-full border border-white/20">
            <h3 className="text-white font-black text-xs tracking-widest uppercase">
              {step === 'scan-front' ? "ID FRONT SCAN" : step === 'scan-back' ? "ID BACK SCAN" : "FACIAL VERIFY"}
            </h3>
         </div>
         
         {/* 掃描框 */}
         <div className={`relative border-2 border-white/40 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] transition-all duration-700 ${isLiveness ? 'w-64 h-64 rounded-full' : 'w-80 h-52 rounded-[2rem]'}`}>
            {(isScanning || step === 'liveness-action') && (
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] animate-scanner" />
            )}
            {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2rem]">
                   <span className="text-cyan-400 font-mono font-black text-3xl">{scanProgress}%</span>
                </div>
            )}
            {livenessDone && (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 rounded-full">
                <CheckCircle2 size={48} className="text-emerald-400 animate-in zoom-in" />
              </div>
            )}
         </div>

         <div className="px-10 text-center">
            <p className="text-white font-bold text-sm bg-black/30 backdrop-blur-md px-6 py-2 rounded-full">
                {isLiveness ? livenessAction : "請將證件置於框內"}
            </p>
         </div>
      </div>

      {/* 底部按鈕控制區：使用 pb-40 確保完全避開導覽列 */}
      <div className="absolute bottom-0 w-full px-10 z-20 flex justify-center pb-32 bg-gradient-to-t from-black to-transparent">
         {captured && !isScanning ? (
           <button 
             onClick={() => { 
                setCaptured(false); 
                if (step === 'scan-front') setStep('scan-back'); 
                else setStep('liveness-intro'); 
             }}
             className="w-full bg-[#FF8A65] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 animate-in slide-in-from-bottom-4"
           >
             確認並繼續 <ArrowLeft className="rotate-180" size={18} strokeWidth={4}/>
           </button>
         ) : step === 'liveness-intro' ? (
            <button 
              onClick={() => { 
                setStep('liveness-action'); 
                setLivenessAction('請眨眨眼...');
                setTimeout(() => {
                  setLivenessAction('請緩慢向左轉頭...');
                  setTimeout(() => {
                    setLivenessAction('驗證完成');
                    setLivenessDone(true);
                  }, 2000);
                }, 2000);
              }}
              className="w-full bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/40"
            >
              開始本人驗證
            </button>
         ) : livenessDone ? (
            <button 
              onClick={handleSubmit}
              className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl animate-pulse"
            >
              提交資料審核
            </button>
         ) : !isScanning && (
            <button 
              onClick={handleFakeScan} 
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-all shadow-2xl"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Camera size={26} className="text-slate-900" />
              </div>
            </button>
         )}
      </div>

      <style>{`
        @keyframes scanner {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanner { animation: scanner 2.5s linear infinite; }
      `}</style>
    </div>
  );
}