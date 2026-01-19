import { useState } from 'react';
import { 
  Navigation2, 
  MapPin, 
  Utensils, 
  Train, 
  ExternalLink,
  Ticket,
  Bed,
  Compass
} from 'lucide-react';

interface Venue {
  id: number;
  name: string;
  distance: string;
  category: string;
  address: string;
  coords: { lat: number; lng: number };
  status: 'busy' | 'normal' | 'quiet';
  type: 'venue' | 'hotel' | 'food';
}

const VENUES: Venue[] = [
  { 
    id: 1, 
    name: '臺北小巨蛋', 
    distance: '250m', 
    category: '熱門場館', 
    address: '台北市南京東路四段2號',
    coords: { lat: 25.051, lng: 121.550 },
    status: 'busy',
    type: 'venue'
  },
  { 
    id: 2, 
    name: '南京復興附近旅宿', 
    distance: '800m', 
    category: '精選住宿', 
    address: '台北市南京東路三段沿線',
    coords: { lat: 25.052, lng: 121.544 },
    status: 'normal',
    type: 'hotel'
  },
  { 
    id: 3, 
    name: '場館周邊美食', 
    distance: '150m', 
    category: '人氣餐廳', 
    address: '南京東路美食商圈',
    coords: { lat: 25.051, lng: 121.547 },
    status: 'quiet',
    type: 'food'
  }
];

export const NearbyHub = () => {
  const [filter, setFilter] = useState('全部');

  // 統一外部跳轉邏輯
  const handleAction = (venue: Venue) => {
    switch (venue.type) {
      case 'venue':
        window.open('https://kktix.com/', '_blank');
        break;
      case 'hotel':
        window.open('https://www.trip.com/', '_blank');
        break;
      case 'food':
        window.open('https://www.ubereats.com/tw', '_blank');
        break;
      default:
        break;
    }
  };

  const openGoogleMaps = (venue: Venue) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.coords.lat},${venue.coords.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="h-full bg-[#F0F9FF] flex flex-col font-sans overflow-hidden">
      {/* 頂部標題 */}
      <div className="pt-16 pb-6 px-8 bg-white/40 backdrop-blur-md shrink-0">
        <h1 className="text-2xl font-black text-slate-700 tracking-tight flex items-center gap-2">
          <Compass className="text-[#FF8A65]" /> 附近導航
        </h1>
        <p className="text-slate-400 text-xs font-bold mt-1">探索演唱會場館周邊</p>
      </div>

      {/* 橫向滑動分類按鈕 */}
      <div className="flex gap-3 px-8 py-4 overflow-x-auto no-scrollbar shrink-0">
        {['全部', '官方購票', '附近旅宿', '美食大全'].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${
              filter === item 
              ? 'bg-slate-800 text-white shadow-lg' 
              : 'bg-white text-slate-400 border border-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 場館列表區 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar pb-40">
        {VENUES.map((venue) => (
          <div 
            key={venue.id}
            className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 border border-white/50 shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  venue.type === 'venue' ? 'bg-orange-50 text-[#FF8A65]' : 
                  venue.type === 'hotel' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                  {venue.type === 'venue' && <Ticket size={20} />}
                  {venue.type === 'hotel' && <Bed size={20} />}
                  {venue.type === 'food' && <Utensils size={20} />}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-700">{venue.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold">{venue.category} · {venue.distance}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter ${
                venue.status === 'busy' ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'
              }`}>
                {venue.status === 'busy' ? '擁擠' : '快適'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {/* 導航按鈕：開啟 Google Maps */}
              <button 
                onClick={() => openGoogleMaps(venue)}
                className="bg-white text-slate-700 border border-slate-100 font-black text-[10px] py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm active:bg-slate-50 transition-colors"
              >
                <Navigation2 size={14} className="text-indigo-500" /> 導航前往
              </button>

              {/* 外部連結按鈕：根據類型跳轉 */}
              <button 
                onClick={() => handleAction(venue)}
                className="bg-slate-800 text-white font-black text-[10px] py-4 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                {venue.type === 'venue' ? '官方購票' : venue.type === 'hotel' ? '即刻預訂' : '叫外送'}
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
        
        <p className="text-center text-[10px] font-black text-slate-300 tracking-[0.2em] py-4">
          END OF LIST
        </p>
      </div>
    </div>
  );
};