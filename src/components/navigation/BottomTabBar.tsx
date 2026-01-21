import { Ticket, MapPin, User, MessageCircle, EarthIcon } from 'lucide-react';

export type TabId = 'discovery' | 'tickets' | 'nearby' | 'profile' | 'support';

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; icon: React.ReactNode; label: string }[] = [
  // 修改 1: 將 Icon 的 size 從 22 放大到 26，strokeWidth 保持 2.5 維持厚實感
  { id: 'discovery', icon: <EarthIcon size={26} strokeWidth={2.5} />, label: '首頁' },
  { id: 'tickets', icon: <Ticket size={26} strokeWidth={2.5} />, label: '票夾' },
  { id: 'nearby', icon: <MapPin size={26} strokeWidth={2.5} />, label: '附近' },
  { id: 'profile', icon: <User size={26} strokeWidth={2.5} />, label: '身分' },
  { id: 'support', icon: <MessageCircle size={26} strokeWidth={2.5} />, label: '通訊' },
];

export const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
  
  // 容器基礎風格：
  // 修改 2: 將圓角增加到 rounded-[36px] 以配合變大的尺寸
  const containerClayStyle = `
    bg-white/80 backdrop-blur-xl 
    rounded-[36px] 
    border border-white/40
    shadow-[0_12px_24px_rgba(0,0,0,0.06),inset_0px_2px_4px_rgba(255,255,255,0.8),inset_0px_-2px_4px_rgba(0,0,0,0.05)]
  `;

  const activeItemClayStyle = `
    bg-[#FF8A65] text-white
    shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(255,138,101,0.3)]
    transform scale-105
  `;

  const inactiveItemClayStyle = `
    bg-white/50 text-gray-400
    shadow-[2px_2px_5px_rgba(0,0,0,0.03),inset_-1px_-1px_2px_rgba(0,0,0,0.02),inset_1px_1px_2px_rgba(255,255,255,0.7)]
    hover:bg-white/80 hover:text-gray-500
  `;

  return (
    // 外層容器
    // 修改 3: 稍微調整 padding (p-3.5) 讓整體更寬鬆舒適
    <div className={`fixed bottom-6 left-4 right-4 z-40 ${containerClayStyle} transition-all duration-300 safe-area-bottom-margin`}>
      <div className="flex justify-around items-center p-3.5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id} 
              onClick={() => onTabChange(tab.id)} 
              // 修改 4: 按鈕尺寸從 w-14 h-14 改為 w-16 h-16 (64px)
              // 同時圓角改為 rounded-[1.2rem] (約 20px) 讓形狀更圓潤
              className={`
                flex flex-col items-center justify-center
                w-16 h-16 rounded-[1.2rem]
                transition-all duration-300 ease-out
                active:scale-90
                ${isActive ? activeItemClayStyle : inactiveItemClayStyle}
              `}
            >
              {/* 圖標容器：微調位移，讓圖標和文字的佈局更平衡 */}
              <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                {tab.icon}
              </div>
              
              {/* 文字標籤 */}
              {/* 修改 5: 字體大小從 text-[9px] 改為 text-[11px]，並加粗字重 */}
               <span className={`text-[11px] mt-0.5 font-black tracking-widest transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};