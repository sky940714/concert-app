import { Ticket, Hotel, Utensils, Map, MapPin, ExternalLink, Grid, Navigation } from 'lucide-react';
// 移除舊的 GlassCard，我們現在直接寫 div className
// import { GlassCard } from '../../components/common'; 

interface NearbyHubProps {
  showToast: (msg: string) => void;
}

export const NearbyHub = ({ showToast }: NearbyHubProps) => {
  const navItems = [
    { 
      icon: <Ticket size={28} strokeWidth={3} className="text-white" />, 
      label: "官方購票", 
      desc: "前往售票系統", 
      // 這裡改用我們定義好的 CSS class，不再用 gradient
      iconBg: "clay-card-mint" 
    },
    { 
      icon: <Hotel size={28} strokeWidth={3} className="text-white" />, 
      label: "附近旅宿", 
      desc: "預訂周邊住宿", 
      iconBg: "bg-[#FFAB91] shadow-[4px_4px_8px_rgba(255,171,145,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]" 
    },
    { 
      icon: <Utensils size={28} strokeWidth={3} className="text-white" />, 
      label: "美食大全", 
      desc: "探索在地美食", 
      iconBg: "bg-[#FFCC80] shadow-[4px_4px_8px_rgba(255,204,128,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]" 
    }
  ];

  return (
    <div className="pb-32 px-6 pt-12 bg-[#E0F7FA] h-[100dvh] overflow-y-auto no-scrollbar font-sans">
      
      {/* 標題區：深灰色圓體字 + 珊瑚橘裝飾 */}
      <div className="mb-8 pl-2">
        <h1 className="text-3xl font-black mb-2 tracking-tight flex items-center gap-3 text-slate-700 clay-text-title">
          <div className="bg-white p-2.5 rounded-2xl shadow-sm">
            <Navigation className="text-[#FF8A65] animate-bounce-slow" size={28} strokeWidth={3} /> 
          </div>
          附近導航
        </h1>
        <p className="text-slate-400 text-sm font-bold tracking-wide ml-1">
          探索場館周邊的服務據點
        </p>
      </div>
      
      {/* 導航卡片列表 */}
      <div className="grid gap-5 mb-10">
        {navItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => showToast(`正在導航至${item.label}...`)} 
            className="clay-card-white p-2 cursor-pointer group active:scale-[0.98] transition-all duration-200"
          >
            {/* 卡片內容 */}
            <div className="bg-white rounded-[1.8rem] p-4 flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-5 relative z-10">
                {/* 圖標容器：各色黏土塊 */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.iconBg}`}>
                  {item.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-slate-700">{item.label}</h3>
                  <p className="text-slate-400 text-sm font-bold mt-1">{item.desc}</p>
                </div>
              </div>

              {/* 右側按鈕：Q彈小圓 */}
              <div className="w-10 h-10 rounded-full bg-[#E0F7FA] flex items-center justify-center text-[#FF8A65] shadow-inner group-hover:bg-[#FF8A65] group-hover:text-white transition-colors duration-300">
                <ExternalLink size={20} strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 地圖區域：壓入式凹槽 (Inset) */}
      <div className="px-1">
        <h2 className="text-sm font-black text-slate-400 mb-4 tracking-widest uppercase flex items-center gap-2">
          <Map size={14} strokeWidth={3} /> 詳細地圖
        </h2>

        <div 
          onClick={() => showToast("載入詳細地圖...")} 
          className="clay-inset h-56 w-full relative overflow-hidden cursor-pointer group flex items-center justify-center transition-all hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,1)]"
        >
          {/* 網格背景：改為深灰線條，模擬製圖紙質感 */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'linear-gradient(#94A3B8 2px, transparent 2px), linear-gradient(90deg, #94A3B8 2px, transparent 2px)', 
              backgroundSize: '30px 30px' 
            }}
          />
          
          {/* 地圖中心圖標 */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="bg-white p-4 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-300">
              <Grid size={32} className="text-[#99E6D9]" strokeWidth={2.5} />
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black text-slate-600 shadow-sm flex items-center gap-2 group-hover:text-[#FF8A65] transition-colors">
              <MapPin size={14} strokeWidth={3} /> 點擊展開全螢幕
            </div>
          </div>

          {/* 裝飾性光暈 */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#99E6D9]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF8A65]/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};