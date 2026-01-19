import { useState } from 'react';
import { 
  Shield, 
  CreditCard, 
  Settings, 
  ChevronRight, 
  LogOut, 
  CheckCircle2, 
  Smartphone, 
  Activity, 
  Lock, 
  Eye, 
  Moon, 
  Languages 
} from 'lucide-react';
import { MOCK_USER } from '../../data/mockUser';
import { KYCScreen } from './KYCScreen';
import { ImportTicketScreen } from './ImportTicketScreen';

type KYCStatus = 'unverified' | 'verified';

interface ProfileHubProps {
  showToast: (msg: string) => void;
}

export const ProfileHub = ({ showToast }: ProfileHubProps) => {
  const [kycStatus, setKycStatus] = useState<KYCStatus>('unverified');
  const [activeScreen, setActiveScreen] = useState<'hub' | 'kyc' | 'import'>('hub');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleKYCComplete = (success: boolean) => {
    if (success) {
      setKycStatus('verified');
      showToast('身分驗證成功');
    }
    setActiveScreen('hub');
  };

  if (activeScreen === 'kyc') {
    return <KYCScreen onComplete={handleKYCComplete} onBack={() => setActiveScreen('hub')} />;
  }
  
  if (activeScreen === 'import') {
     return <ImportTicketScreen onBack={() => setActiveScreen('hub')} />;
  }

  return (
    <div className={`h-full flex flex-col font-sans overflow-y-auto pb-40 no-scrollbar transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-[#F0F9FF] text-slate-700'}`}>
      
      {/* 頂部個人資訊區 */}
      <div className="pt-16 pb-10 px-8 text-center shrink-0">
        <div className="relative inline-block">
          <div className={`w-24 h-24 rounded-[2rem] shadow-lg p-1.5 mb-4 mx-auto ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" 
              alt="Avatar" 
              className="w-full h-full rounded-[1.8rem] object-cover"
            />
          </div>
          {kycStatus === 'verified' && (
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-4 border-[#F0F9FF]">
              <CheckCircle2 size={16} strokeWidth={3} />
            </div>
          )}
        </div>
        <h1 className="text-2xl font-black tracking-tight">{MOCK_USER.name}</h1>
        <p className="text-slate-400 text-xs font-bold tracking-widest mt-1 uppercase">Premium Member</p>
      </div>

      <div className="px-6 space-y-8">
        
        {/* 1. 系統診斷中心 (System Diagnostics) */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-3 flex items-center gap-2">
            <Activity size={12} /> 系統診斷中心
          </h3>
          <div className={`${isDarkMode ? 'bg-slate-800/50' : 'bg-white/60'} backdrop-blur-md rounded-[2rem] p-5 border border-white/20 shadow-sm space-y-4`}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold opacity-70">螢幕亮度檢測</span>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">最佳辨識亮度</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold border-t border-slate-200/20 pt-3">
              <span className="opacity-70">網路延遲 (Ping)</span>
              <span className="font-mono text-emerald-500">24ms</span>
            </div>
          </div>
        </section>

        {/* 2. 帳戶與安全 (含進階安全設定) */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-3 flex items-center gap-2">
            <Lock size={12} /> 安全與驗證
          </h3>
          
          <button 
            onClick={() => setActiveScreen('kyc')}
            className={`w-full p-4 rounded-[1.5rem] border border-white/40 flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kycStatus === 'verified' ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-[#FF8A65]'}`}>
                <Shield size={22} strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <div className="font-black text-sm">實名認證狀態</div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${kycStatus === 'verified' ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {kycStatus === 'verified' ? '已通過核實' : '尚未認證'}
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <div className={`p-4 rounded-[1.5rem] border border-white/40 space-y-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Smartphone size={18} />
                   </div>
                   <div className="text-left">
                      <div className="font-black text-xs">裝置鎖定</div>
                      <div className="text-[9px] text-slate-400 font-bold">iPhone 15 Pro (本人限定)</div>
                   </div>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 shadow-inner">
                   <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
                </div>
             </div>

             <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Eye size={18} />
                   </div>
                   <div className="text-left">
                      <div className="font-black text-xs">動態防偽浮水印</div>
                      <div className="text-[9px] text-slate-400 font-bold">開啟以防止截圖盜用</div>
                   </div>
                </div>
                <div className="w-10 h-5 bg-slate-200 rounded-full relative p-1 transition-colors">
                   <div className="w-3 h-3 bg-white rounded-full absolute left-1" />
                </div>
             </div>
          </div>
        </section>

        {/* 3. 個人化與偏好 (Preferences) */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-3 flex items-center gap-2">
            <Settings size={12} /> 個人化與偏好
          </h3>

          <div className={`p-4 rounded-[1.5rem] border border-white/40 space-y-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
             {/* 暗黑模式切換 */}
             <button 
               onClick={() => setIsDarkMode(!isDarkMode)}
               className="w-full flex items-center justify-between group"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Moon size={18} />
                   </div>
                   <div className="text-left font-black text-xs">深色模式 (現場專用)</div>
                </div>
                <div className={`text-[10px] font-black tracking-widest px-2 py-1 rounded-lg ${isDarkMode ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 bg-slate-100'}`}>
                   {isDarkMode ? 'ON' : 'OFF'}
                </div>
             </button>

             {/* 語言切換 */}
             <button className="w-full flex items-center justify-between group border-t border-slate-100 pt-4">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <Languages size={18} />
                   </div>
                   <div className="text-left font-black text-xs">顯示語言</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                   繁體中文 <ChevronRight size={14} />
                </div>
             </button>
          </div>
        </section>

        {/* 票券匯入入口 */}
        <button 
          onClick={() => setActiveScreen('import')}
          className="w-full bg-slate-900 text-white p-4 rounded-[1.5rem] flex items-center justify-between shadow-xl active:scale-95 transition-all mb-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div className="text-left">
              <div className="font-black text-sm">匯入外部票券</div>
              <div className="text-[9px] text-white/50 font-bold uppercase tracking-widest">External Import</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/30" />
        </button>

        {/* 登出按鈕 */}
        <button className="w-full py-6 text-rose-500 font-black text-xs tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity">
          Sign Out Account
        </button>
      </div>
    </div>
  );
};