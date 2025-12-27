import React from 'react';
import { ArrowLeft, MapPin, ChevronRight, Users, Activity } from 'lucide-react';

interface VenueDetailViewProps {
  venueId: string;
  onBack: () => void;
}

// 模擬數據 (延用原本邏輯但對應新風格)
const MOCK_VENUES_DATA: any = {
  "1": { name: "陽光小巨蛋", city: "Taipei", img: "🏟️", capacity: "15,000", status: "Hot", events: [
    { id: 'e1', title: 'Oh Cool 音樂祭', date: '2025-12-25', price: '$1,200' },
    { id: 'e2', title: '黏土手作工作坊', date: '2026-01-05', price: '$500' }
  ]}
};

export const VenueDetailView = ({ venueId, onBack }: VenueDetailViewProps) => {
  const venue = MOCK_VENUES_DATA[venueId] || MOCK_VENUES_DATA["1"];

  return (
    <div className="fixed inset-0 z-40 bg-[#E0F7FA] flex flex-col h-full font-rounded">
      {/* 頂部導航 */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <button 
          onClick={onBack} 
          className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg shadow-blue-200/50 text-[#FF8A65] active:scale-90 transition-transform"
          style={{ boxShadow: '10px 10px 20px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(0,0,0,0.05), inset 4px 4px 8px #fff' }}
        >
          <ArrowLeft size={24} strokeWidth={3} />
        </button>
      </div>
      
      {/* 頂部場館展示區 (蓬鬆大容器) */}
      <div className="pt-20 px-6 pb-6">
        <div className="clay-card w-full h-64 relative flex flex-col items-center justify-center text-center overflow-hidden">
          {/* 背景裝飾圓圈 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
          
          <div className="text-8xl mb-4 drop-shadow-xl animate-bounce-slow">
            {venue.img}
          </div>
          
          <div className="bg-white/40 backdrop-blur-sm px-4 py-1 rounded-full mb-2 inline-flex items-center gap-1">
            <MapPin size={14} className="text-[#FF8A65]" />
            <span className="text-xs font-bold text-gray-600 tracking-wider">
              {venue.city.toUpperCase()} AREA
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-sm">
            {venue.name}
          </h1>
        </div>
      </div>

      {/* 內容區 */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-6">
          {/* 數據卡片 */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-[30px] flex flex-col items-center justify-center shadow-xl shadow-blue-100" 
                 style={{ boxShadow: '15px 15px 30px rgba(0,0,0,0.03), inset -6px -6px 12px rgba(0,0,0,0.05), inset 6px 6px 12px #fff' }}>
              <div className="w-10 h-10 bg-[#99E6D9]/30 rounded-full flex items-center justify-center mb-2">
                <Users size={20} className="text-[#4DB6AC]" />
              </div>
              <div className="text-gray-400 text-[11px] font-bold uppercase">最大容納</div>
              <div className="text-xl font-black text-gray-700">{venue.capacity}</div>
            </div>
            
            <div className="bg-white p-5 rounded-[30px] flex flex-col items-center justify-center shadow-xl shadow-blue-100"
                 style={{ boxShadow: '15px 15px 30px rgba(0,0,0,0.03), inset -6px -6px 12px rgba(0,0,0,0.05), inset 6px 6px 12px #fff' }}>
              <div className="w-10 h-10 bg-[#FF8A65]/20 rounded-full flex items-center justify-center mb-2">
                <Activity size={20} className="text-[#FF8A65]" />
              </div>
              <div className="text-gray-400 text-[11px] font-bold uppercase">當前狀態</div>
              <div className={`text-sm font-black px-3 py-1 rounded-full mt-1 ${venue.status === 'Hot' ? 'bg-[#FF8A65] text-white' : 'bg-[#99E6D9] text-white'}`}>
                {venue.status === 'Hot' ? '🔥 超熱門' : '開放中'}
              </div>
            </div>
          </div>

          {/* 活動列表 */}
          <div>
            <h3 className="text-lg font-black text-gray-700 mb-4 px-2">即將到來的驚喜</h3>
            <div className="space-y-4">
              {venue.events.map((event: any) => (
                <div key={event.id} 
                     className="bg-white rounded-[25px] p-4 flex gap-4 items-center shadow-lg shadow-blue-100/50 hover:scale-[1.02] transition-transform cursor-pointer group">
                  <div className="w-16 h-16 bg-[#99E6D9] rounded-[20px] flex flex-col items-center justify-center text-white font-bold shadow-inner">
                    <span className="text-[10px] opacity-80">{event.date.split('-')[1]}月</span>
                    <span className="text-xl">{event.date.split('-')[2]}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-700 text-base">{event.title}</h4>
                    <div className="text-sm font-bold text-[#FF8A65] mt-0.5">{event.price}</div>
                  </div>
                  
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F0FDFA] rounded-full text-[#99E6D9]">
                    <ChevronRight size={20} strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部浮動 CTA 導航列 */}
      <div className="fixed bottom-8 left-6 right-6 h-20 bg-white/70 backdrop-blur-lg rounded-[35px] shadow-2xl flex items-center justify-around px-4 border border-white/50">
        <button className="clay-button-orange flex-1 h-14 mx-4 text-white font-black text-lg tracking-wide">
          立即預訂場館
        </button>
      </div>
    </div>
  );
};