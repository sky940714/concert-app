import { useState } from 'react';
import { ChevronRight, Fingerprint, ScanLine, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_USER } from '../../data';
import { KYCScreen } from './KYCScreen';
import { ImportTicketScreen } from './ImportTicketScreen';

interface ProfileHubProps {
  showToast: (msg: string) => void;
}

export const ProfileHub = ({ showToast }: ProfileHubProps) => {
  const [subPage, setSubPage] = useState<'main' | 'kyc' | 'import'>('main');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifySuccess = () => {
    setIsVerified(true);
    showToast("身分驗證成功！");
    setSubPage('main');
  };

  if (subPage === 'kyc') {
    return (
      <KYCScreen 
        onBack={() => setSubPage('main')} 
        onSuccess={handleVerifySuccess}
        showToast={showToast}
      />
    );
  }

  if (subPage === 'import') {
    return <ImportTicketScreen onBack={() => setSubPage('main')} />;
  }

  return (
    <div className="pb-24 px-6 pt-10 bg-black h-[100dvh] text-white">
      <div className="relative z-10">
        {/* 頭像區 */}
        <div className="flex items-center gap-5 mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur opacity-40" />
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] relative z-10" />
            <div className="absolute -bottom-2 -right-2 bg-black border border-cyan-500 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold z-20">LV.5</div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white font-sans tracking-tight">{MOCK_USER.name}</h2>
            <div className="text-xs text-cyan-500 font-mono mb-3">ID: {MOCK_USER.id}</div>
            <div className="flex items-center gap-2">
              {isVerified ? (
                <span className="flex items-center gap-1.5 text-[10px] bg-emerald-900/30 text-emerald-400 px-3 py-1.5 rounded border border-emerald-500/30 font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={12} /> 生物特徵已鎖定
                </span>
              ) : (
                <button 
                  onClick={() => setSubPage('kyc')} 
                  className="flex items-center gap-1.5 text-[10px] bg-red-900/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded font-mono uppercase tracking-wider hover:bg-red-900/40 animate-pulse"
                >
                  <AlertCircle size={12} /> 未建立檔案
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 設定選單 */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">系統設定</h3>
          
          {[
            { icon: <Fingerprint size={20} />, label: "生物特徵管理", desc: "臉部辨識 / 指紋設定", color: "text-cyan-400", action: () => setSubPage('kyc') },
            { icon: <ScanLine size={20} />, label: "匯入實體票券", desc: "掃描紙本 QR Code", color: "text-fuchsia-400", action: () => setSubPage('import') },
            { icon: <CreditCard size={20} />, label: "信用點數錢包", desc: "管理付款方式", color: "text-amber-400", action: () => showToast("模擬：錢包系統連線中...") }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={item.action} 
              className="bg-zinc-900/40 border border-white/5 p-4 flex items-center justify-between cursor-pointer rounded-2xl hover:bg-white/5 hover:border-cyan-500/30 transition-all group backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.color} p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform shadow-inner`}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-white font-sans text-sm group-hover:text-cyan-300 transition-colors">{item.label}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5 font-mono uppercase tracking-wide">{item.desc}</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-zinc-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};