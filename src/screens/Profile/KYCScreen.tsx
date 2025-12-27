import { useState } from 'react';
import { ArrowLeft, Fingerprint, Camera, Upload, ScanLine } from 'lucide-react';
import { GlassCard, ButtonPrimary } from '../../components/common';
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
    <div className="bg-black h-[100dvh] pb-20 px-6 pt-6 animate-in slide-in-from-right text-white font-sans">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-cyan-500 hover:text-cyan-300 transition-colors">
        <ArrowLeft size={20} /> 取消
      </button>
      
      <h2 className="text-2xl font-bold mb-2 text-white">身分驗證協定</h2>
      
      <div className="space-y-6 relative">
        <GlassCard className="p-6 bg-black/50 border-cyan-500/30 relative overflow-hidden">
          {isScanning && (
            <div className="absolute inset-0 bg-cyan-500/20 z-10 animate-pulse">
              <ScanLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-bounce" size={40} />
            </div>
          )}
          <label className="block text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-2">
            <Fingerprint size={10} className="inline mr-1"/>真實姓名
          </label>
          <input 
            type="text" 
            defaultValue={MOCK_USER.name} 
            className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded p-3 text-white focus:border-cyan-400 outline-none" 
          />
          <label className="block text-[10px] font-bold text-cyan-600 uppercase tracking-widest mt-5 mb-2">
            身分證字號
          </label>
          <input 
            type="text" 
            placeholder="A123456789" 
            className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded p-3 text-white focus:border-cyan-400 outline-none" 
          />
        </GlassCard>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => showToast("模擬：生物特徵掃描中...")} 
            className="border-2 border-dashed border-cyan-500/30 rounded-xl p-4 flex flex-col items-center justify-center text-cyan-600 hover:border-cyan-400 hover:text-cyan-400 transition-colors h-32 relative overflow-hidden group"
          >
            <Camera size={24} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">掃描生物特徵</span>
          </button>
          <button 
            onClick={() => showToast("模擬：上傳加密檔案...")} 
            className="border-2 border-dashed border-cyan-500/30 rounded-xl p-4 flex flex-col items-center justify-center text-cyan-600 hover:border-cyan-400 hover:text-cyan-400 transition-colors h-32 relative overflow-hidden group"
          >
            <Upload size={24} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">上傳加密檔案</span>
          </button>
        </div>

        <ButtonPrimary loading={isScanning} onClick={startScan}>
          啟動驗證程序
        </ButtonPrimary>
      </div>
    </div>
  );
};