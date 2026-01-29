import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ChevronRight, Users, Activity, Navigation, Music } from 'lucide-react';

interface VenueDetailViewProps {
  venueId: string;
  onBack: () => void;
}

// ✅ 修正：對應 3D 標籤傳出的 'north', 'center', 'south'
const MOCK_VENUES_DATA: any = {
  "north": { 
    name: "臺北大巨蛋", 
    city: "Taipei", 
    img: "https://images.unsplash.com/photo-1574914629385-a1c905587790?w=800", 
    capacity: "40,000+", 
    status: "Hot", 
    theme: "#FF8A65",
    events: [
      { id: 'e1', title: '2026 周杰倫 [ 嘉年華 ]', date: '2026-05-12', price: '$1,880 - $6,880', category: '音樂' },
      { id: 'e2', title: '2026 台北藝術博覽會', date: '2026-08-12', price: '展覽門票', category: '活動' }
    ]
  },
  "center": { 
    name: "臺中圓滿戶外劇場", 
    city: "Taichung", 
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800", 
    capacity: "15,000", 
    status: "Active", 
    theme: "#99E6D9",
    events: [
      { id: 'e3', title: '浮現祭：春日搖滾', date: '2026-04-25', price: '$2,200', category: '音樂祭' }
    ]
  },
  "south": { 
    name: "高雄國家體育場", 
    city: "Kaohsiung", 
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800", 
    capacity: "55,000", 
    status: "Hot", 
    theme: "#FF8A65",
    events: [
      { id: 'e4', title: 'ULTRA Taiwan 2026', date: '2026-11-16', price: '$3,600', category: '電音' }
    ]
  }
};

export const VenueDetailView = ({ venueId, onBack }: VenueDetailViewProps) => {
  // 優先抓取對應區域，抓不到則抓北部場館
  const venue = MOCK_VENUES_DATA[venueId] || MOCK_VENUES_DATA["north"];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[150] bg-[#F0FDFB] flex flex-col h-full font-sans overflow-hidden"
    >
      {/* 頂部海報區 */}
      <div className="relative h-[35vh] w-full shrink-0">
        <img src={venue.img} className="w-full h-full object-cover" alt={venue.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0FDFB] via-transparent to-black/20" />
        
        {/* 返回按鈕 */}
        <button 
          onClick={onBack} 
          className="absolute top-12 left-6 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl shadow-xl text-slate-700 active:scale-90 transition-transform border border-white"
        >
          <ArrowLeft size={24} strokeWidth={3} />
        </button>
      </div>
      
      {/* 核心內容區 (負 Margin 上移產生層次感) */}
      <div className="flex-1 px-6 -mt-16 relative z-10 overflow-y-auto no-scrollbar pb-32">
        <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl shadow-teal-900/5 space-y-8 border border-white">
          
          {/* 場館標題 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#99E6D9]/20 text-[#2EB6A3] text-[10px] font-black px-3 py-1 rounded-full border border-[#99E6D9]/30 uppercase tracking-widest">
                Official Venue
              </div>
              <div className={`text-[10px] font-black px-3 py-1 rounded-full ${venue.status === 'Hot' ? 'bg-orange-100 text-[#FF8A65]' : 'bg-teal-50 text-teal-600'}`}>
                {venue.status === 'Hot' ? '🔥 演出熱區' : '● 場館營運中'}
              </div>
            </div>
            <h1 className="text-3xl font-black text-slate-800 leading-tight">{venue.name}</h1>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
              <MapPin size={16} className="text-[#99E6D9]" />
              <span>{venue.city}, Taiwan</span>
            </div>
          </div>

          {/* 數據卡片區 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8FAFC] p-6 rounded-[2.5rem] border-b-4 border-slate-200">
              <Users size={20} className="text-[#99E6D9] mb-3" />
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">場館容量</div>
              <div className="text-xl font-black text-slate-700 mt-1">{venue.capacity}</div>
            </div>
            
            <div className="bg-[#F8FAFC] p-6 rounded-[2.5rem] border-b-4 border-slate-200">
              <Music size={20} className="text-[#FF8A65] mb-3" />
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">本月場次</div>
              <div className="text-xl font-black text-slate-700 mt-1">{venue.events.length} 場活動</div>
            </div>
          </div>

          {/* 活動列表 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-slate-800">即將登場的驚喜</h3>
              <span className="text-xs font-black text-[#99E6D9]">查看場館行程</span>
            </div>
            
            <div className="space-y-4">
              {venue.events.map((event: any) => (
                <div key={event.id} className="bg-white rounded-[2rem] p-5 flex gap-5 items-center border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-14 h-14 bg-[#99E6D9]/10 rounded-2xl flex flex-col items-center justify-center text-[#2EB6A3] font-black">
                    <span className="text-[9px] uppercase">{event.date.split('-')[1]}月</span>
                    <span className="text-lg leading-none">{event.date.split('-')[2]}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-slate-300 uppercase mb-1">{event.category}</div>
                    <h4 className="font-black text-slate-700 text-sm leading-tight">{event.title}</h4>
                    <div className="text-xs font-bold text-[#FF8A65] mt-1">{event.price}</div>
                  </div>
                  
                  <div className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-300">
                    <ChevronRight size={18} strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部功能按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50 flex gap-4">
        <button className="flex-1 h-16 bg-[#2EB6A3] rounded-3xl text-white font-black shadow-[0_8px_0_#1E8D7D] active:shadow-none active:translate-y-[8px] transition-all flex items-center justify-center gap-2">
          <Navigation size={20} />
          立即導航
        </button>
      </div>
    </motion.div>
  );
};