import { Rocket, Ticket, MapPin, User, MessageCircle, Earth, Home, EarthIcon } from 'lucide-react';

export type TabId = 'discovery' | 'tickets' | 'nearby' | 'profile' | 'support';

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; icon: React.ReactNode; label: string }[] = [
  // 增加 strokeWidth 讓圖標線條變粗，更符合黏土的厚實感
  { id: 'discovery', icon: <EarthIcon size={22} strokeWidth={2.5} />, label: '首頁' },
  { id: 'tickets', icon: <Ticket size={22} strokeWidth={2.5} />, label: '票夾' },
  { id: 'nearby', icon: <MapPin size={22} strokeWidth={2.5} />, label: '附近' },
  { id: 'profile', icon: <User size={22} strokeWidth={2.5} />, label: '身分' },
  { id: 'support', icon: <MessageCircle size={22} strokeWidth={2.5} />, label: '通訊' },
];

export const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
  
  // 定義黏土風格的陰影與材質
  
  // 容器基礎風格：漂浮、極圓、半透明白底、柔和外陰影 + 強調邊緣厚度的內陰影
  const containerClayStyle = `
    bg-white/80 backdrop-blur-xl 
    rounded-[32px] 
    border border-white/40
    shadow-[0_12px_24px_rgba(0,0,0,0.06),inset_0px_2px_4px_rgba(255,255,255,0.8),inset_0px_-2px_4px_rgba(0,0,0,0.05)]
  `;

  // 選中項目的風格 (珊瑚橘)：深色內陰影製造「壓入」感，鮮豔色彩
  const activeItemClayStyle = `
    bg-[#FF8A65] text-white
    shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(255,138,101,0.3)]
    transform scale-105
  `;

  // 未選中項目的風格 (淺白)：淺淺的浮起感
  const inactiveItemClayStyle = `
    bg-white/50 text-gray-400
    shadow-[2px_2px_5px_rgba(0,0,0,0.03),inset_-1px_-1px_2px_rgba(0,0,0,0.02),inset_1px_1px_2px_rgba(255,255,255,0.7)]
    hover:bg-white/80 hover:text-gray-500
  `;

  return (
    // 外層容器：負責定位與漂浮感 (bottom-6 left-4 right-4 讓它浮起來)
    <div className={`fixed bottom-6 left-4 right-4 z-40 ${containerClayStyle} transition-all duration-300 safe-area-bottom-margin`}>
      <div className="flex justify-around items-center p-2.5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id} 
              onClick={() => onTabChange(tab.id)} 
              // 應用動態樣式，並加入 active:scale-90 創造點擊時的 Q 彈感
              className={`
                flex flex-col items-center justify-center
                w-14 h-14 rounded-2xl
                transition-all duration-300 ease-out
                active:scale-90
                ${isActive ? activeItemClayStyle : inactiveItemClayStyle}
              `}
            >
              {/* 圖標容器 */}
              <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-0.5' : ''}`}>
                {tab.icon}
              </div>
              
              {/* 文字標籤：選中時顯示，未選中時隱藏以保持簡潔 (可選) */}
               <span className={`text-[9px] mt-0.5 font-bold tracking-widest transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};