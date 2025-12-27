import { useState } from 'react';
import { ArrowLeft, Fingerprint, Camera, Upload, ScanLine, CheckCircle2 } from 'lucide-react';
// 我們直接使用新的 CSS class，不再依賴舊的 GlassCard
import { MOCK_USER } from '../../data';

interface KYCScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  showToast: (msg: string) => void;
}

export const KYCScreen = ({ onBack, onSuccess, showToast }: KYCScreenProps) => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onSuccess();
    }, 3500);
  };

  return (
    <div className="pb-20 px-6 pt-12 bg-[#E0F7FA] h-[100dvh] overflow-y-auto font-sans text-slate-600 animate-in slide-in-from-right">
      
      {/* 頂部導航 */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#FF8A65] active:scale-90 transition-all"
        >
          <ArrowLeft size={20} strokeWidth={3} />
        </button>
        <h2 className="text-2xl font-black text-slate-700 clay-text-title tracking-tight">身分驗證</h2>
      </div>
      
      <div className="space-y-6 relative">
        {/* 表單主卡片 */}
        <div className="clay-card-white p-6 pb-8">
          {isScanning && (
            <div className="absolute inset-0 bg-white/80 z-20 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center animate-in fade-in">
              <div className="w-20 h-20 bg-[#E0F7FA] rounded-full flex items-center justify-center mb-4 relative overflow-hidden clay-inset">
                <ScanLine className="text-[#FF8A65] animate-bounce" size={32} strokeWidth={3} />
                <div className="absolute top-0 w-full h-1 bg-[#FF8A65]/50 animate-[scan_2s_linear_infinite]" />
              </div>
              <p className="font-black text-slate-600 animate-pulse">生物特徵比對中...</p>
            </div>
          )}

          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">
            <Fingerprint size={14} className="inline mr-1 -mt-0.5 text-[#99E6D9]" strokeWidth={3}/>
            真實姓名
          </label>
          <input 
            type="text" 
            defaultValue={MOCK_USER.name} 
            className="clay-inset w-full p-4 text-slate-700 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#99E6D9]/50 mb-6" 
          />
          
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">
            身分證字號
          </label>
          <input 
            type="text" 
            placeholder="A123456789" 
            className="clay-inset w-full p-4 text-slate-700 font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#99E6D9]/50" 
          />
        </div>

        {/* 上傳按鈕區：改為浮島按鈕 */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => showToast("模擬：啟動相機模組...")} 
            className="bg-[#B2F2E8] p-5 rounded-3xl shadow-[4px_4px_10px_rgba(178,242,232,0.6)] flex flex-col items-center justify-center gap-2 group active:scale-95 transition-all h-36"
          >
            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera size={24} className="text-teal-700" strokeWidth={3} />
            </div>
            <span className="text-xs font-black text-teal-800">拍攝證件</span>
          </button>
          
          <button 
            onClick={() => showToast("模擬：開啟檔案總管...")} 
            className="bg-[#FFCC80] p-5 rounded-3xl shadow-[4px_4px_10px_rgba(255,204,128,0.6)] flex flex-col items-center justify-center gap-2 group active:scale-95 transition-all h-36"
          >
            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload size={24} className="text-orange-800" strokeWidth={3} />
            </div>
            <span className="text-xs font-black text-orange-800">上傳檔案</span>
          </button>
        </div>

        {/* 提交按鈕：Q彈糖果 */}
        <button 
          onClick={startScan}
          disabled={isScanning}
          className="clay-btn-orange w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl mt-4 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all"
        >
          {isScanning ? '處理中...' : '啟動驗證程序'}
          {!isScanning && <CheckCircle2 size={18} strokeWidth={3} />}
        </button>
      </div>
    </div>
  );
};