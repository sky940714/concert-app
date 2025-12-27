import { useState } from 'react';
import { ChevronRight, Fingerprint, ScanLine, CreditCard, AlertCircle, ShieldCheck, Settings } from 'lucide-react';
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

  // 子頁面渲染邏輯保持不變
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

  // 選單設定資料
  const menuItems = [
    {
      icon: <Fingerprint size={24} className="text-white" strokeWidth={3} />,
      label: "實名認證",
      desc: "臉部辨識 / 指紋設定",
      bg: "bg-[#99E6D9]", // 薄荷綠
      shadow: "shadow-[4px_4px_8px_rgba(153,230,217,0.4)]",
      action: () => setSubPage('kyc')
    },
    {
      icon: <ScanLine size={24} className="text-white" strokeWidth={3} />,
      label: "匯入票券",
      desc: "掃描實體 QR Code/輸入票卷編號",
      bg: "bg-[#FFAB91]", // 柔和珊瑚
      shadow: "shadow-[4px_4px_8px_rgba(255,171,145,0.4)]",
      action: () => setSubPage('import')
    },
    {
      icon: <CreditCard size={24} className="text-white" strokeWidth={3} />,
      label: "我的錢包",
      desc: "管理付款方式與點數",
      bg: "bg-[#FFCC80]", // 柔和橘黃
      shadow: "shadow-[4px_4px_8px_rgba(255,204,128,0.4)]",
      action: () => showToast("錢包系統連線中...")
    }
  ];

  return (
    <div className="pb-32 px-6 pt-12 bg-[#E0F7FA] h-[100dvh] overflow-y-auto no-scrollbar font-sans text-slate-600">
      
      {/* 頂部標題區 */}
      <div className="mb-8 pl-2 flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-slate-700 clay-text-title">個人檔案</h1>
        {/* 設定按鈕 */}
        <button 
          onClick={() => showToast("設定功能開發中")}
          className="bg-white p-2.5 rounded-full shadow-sm text-slate-400 hover:text-[#FF8A65] transition-colors active:scale-90"
        >
            <Settings size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* 核心身分卡 (大型白色黏土卡片) */}
      <div className="clay-card-white p-6 relative overflow-hidden mb-10 flex flex-col items-center">
        {/* 背景裝飾：頂部淡淡的漸層，讓卡片不單調 */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#E0F7FA] to-transparent opacity-50 pointer-events-none" />
        
        {/* 頭像區域 */}
        <div className="relative mb-4 mt-2">
            <div className="w-28 h-28 rounded-full border-[6px] border-white shadow-md overflow-hidden relative z-10 bg-slate-200">
                <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {/* 等級標籤：Q彈小氣泡 */}
            <div className="absolute -bottom-2 -right-2 bg-[#FF8A65] text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-20 border-2 border-white transform rotate-6">
                LV.5
            </div>
        </div>

        {/* 用戶資訊 */}
        <h2 className="text-2xl font-black text-slate-700 mb-1 tracking-tight">{MOCK_USER.name}</h2>
        <div className="text-xs font-bold text-slate-400 font-mono tracking-wider mb-6">ID: {MOCK_USER.id}</div>

        {/* 驗證狀態 (切換顯示不同顏色的黏土標籤) */}
        {isVerified ? (
            <div className="clay-card-mint px-5 py-2.5 rounded-full flex items-center gap-2 text-teal-800 animate-in zoom-in">
                <ShieldCheck size={18} strokeWidth={3} />
                <span className="text-xs font-black tracking-wide">生物特徵已驗證</span>
            </div>
        ) : (
            <button 
                onClick={() => setSubPage('kyc')} 
                className="bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full flex items-center gap-2 text-slate-500 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-slate-200 transition-colors"
            >
                <AlertCircle size={18} strokeWidth={3} className="text-[#FF8A65]" />
                <span className="text-xs font-black tracking-wide">尚未驗證身分</span>
            </button>
        )}
      </div>

      {/* 功能選單標題 */}
      <h3 className="text-sm font-black text-slate-400 mb-4 px-2 tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        帳戶設定
      </h3>

      {/* 選單列表 (浮島樣式) */}
      <div className="space-y-4">
        {menuItems.map((item, idx) => (
            <div 
                key={idx} 
                onClick={item.action}
                className="clay-card-white p-3 flex items-center justify-between cursor-pointer group active:scale-[0.98] transition-all duration-200"
            >
                <div className="flex items-center gap-4">
                    {/* 彩色圖標容器 */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        {item.icon}
                    </div>
                    <div>
                        <div className="font-bold text-slate-700 text-base">{item.label}</div>
                        <div className="text-xs font-bold text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                </div>
                {/* 右側箭頭 */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-[#E0F7FA] group-hover:text-[#FF8A65] transition-colors">
                    <ChevronRight size={20} strokeWidth={3} />
                </div>
            </div>
        ))}
      </div>

    </div>
  );
};