import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ChevronRight, Users, Navigation, Music } from 'lucide-react';

interface VenueDetailViewProps {
  venueId: string; // 接收具體場館名稱，例如 "高雄流行音樂中心"
  onBack: () => void;
}

// ✅ 完整對接資料庫：確保與 VenueSelector 中的名稱完全一致，並移除金額顯示
const MOCK_VENUES_DATA: any = {
  "台北小巨蛋": { 
    name: "台北小巨蛋", 
    city: "Taipei", 
    img: "https://images.unsplash.com/photo-1574914629385-a1c905587790?w=800", 
    capacity: "15,000", 
    status: "Hot", 
    events: [{ id: 'e1', title: '2026 演唱會盛典', date: '2026-05-12', category: '音樂' }]
  },
  "台北大巨蛋": { 
    name: "台北大巨蛋", 
    city: "Taipei", 
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", 
    capacity: "40,000+", 
    status: "Hot", 
    events: [
      { id: 'e2', title: '2026 周杰倫 [ 嘉年華 ]', date: '2026-05-12', category: '音樂' },
      { id: 'e3', title: '2026 台北藝術博覽會', date: '2026-08-12', category: '活動' }
    ]
  },
  "台北流行音樂中心": {
    name: "台北流行音樂中心",
    city: "Taipei",
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    capacity: "5,000",
    status: "Active",
    events: [{ id: 'e4', title: '2026 浮現祭：春日搖滾', date: '2026-04-25', category: '音樂' }]
  },
  "洲際棒球場": { 
    name: "洲際棒球場", 
    city: "Taichung", 
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800", 
    capacity: "20,000", 
    status: "Active", 
    events: [{ id: 'e5', title: '中職明星賽 2026', date: '2026-07-15', category: '體育' }]
  },
  "台中歌劇院": {
    name: "台中歌劇院",
    city: "Taichung",
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800",
    capacity: "2,014",
    status: "Active",
    events: [{ id: 'e6', title: '年度歌劇：卡門', date: '2026-09-20', category: '藝術' }]
  },
  "高雄國家體育場": { 
    name: "高雄國家體育場", 
    city: "Kaohsiung", 
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800", 
    capacity: "55,000", 
    status: "Hot", 
    events: [{ id: 'e7', title: 'ULTRA Taiwan 2026', date: '2026-11-16', category: '電音' }]
  },
  "高雄巨蛋": { 
    name: "高雄巨蛋", 
    city: "Kaohsiung", 
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800", 
    capacity: "15,000", 
    status: "Active", 
    events: [{ id: 'e8', title: '亞洲巡迴演唱會', date: '2026-12-05', category: '音樂' }]
  },
  "高雄流行音樂中心": {
    name: "高雄流行音樂中心",
    city: "Kaohsiung",
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
    capacity: "6,000",
    status: "Active",
    events: [{ id: 'e9', title: '海風音樂節', date: '2026-10-10', category: '音樂' }]
  },
  "衛武營": {
    name: "衛武營",
    city: "Kaohsiung",
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
    capacity: "2,260",
    status: "Active",
    events: [{ id: 'e10', title: '交響樂之夜', date: '2026-11-20', category: '藝術' }]
  }
};

export const VenueDetailView = ({ venueId, onBack }: VenueDetailViewProps) => {
  // ✅ 嚴格匹配：確保點擊任何一個場館都能找到對應資料
  const venue = MOCK_VENUES_DATA[venueId] || MOCK_VENUES_DATA["台北大巨蛋"];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[150] bg-[#F0FDFB] flex flex-col h-full overflow-hidden"
    >
      {/* 頂部海報區 */}
      <div className="relative h-[35vh] w-full shrink-0">
        <img src={venue.img} className="w-full h-full object-cover" alt={venue.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0FDFB] via-transparent to-black/20" />
        
        <button 
          onClick={onBack} 
          className="absolute top-12 left-6 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl shadow-xl text-slate-700 active:scale-90 transition-transform border border-white"
        >
          <ArrowLeft size={24} strokeWidth={3} />
        </button>
      </div>
      
      {/* 核心內容區 */}
      <div className="flex-1 px-6 -mt-16 relative z-10 overflow-y-auto no-scrollbar pb-32">
        <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl space-y-8 border border-white">
          
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

          {/* 數據卡片 */}
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
            <h3 className="text-lg font-black text-slate-800 px-2">即將登場的驚喜</h3>
            
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

      {/* 底部按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
        <button className="w-full h-16 bg-[#2EB6A3] rounded-3xl text-white font-black shadow-[0_8px_0_#1E8D7D] active:shadow-none active:translate-y-[8px] transition-all flex items-center justify-center gap-2">
          <Navigation size={20} />
          前往購票
        </button>
      </div>
    </motion.div>
  );
};