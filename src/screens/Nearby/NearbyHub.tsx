import { useState } from 'react';
import { 
  Navigation2, 
  MapPin, 
  Utensils, 
  ExternalLink,
  Ticket,
  Bed,
  Compass,
  ChevronDown
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

// 1. 修改資料：將小巨蛋替換為前往購票入口
const VENUES: Venue[] = [
  { 
    id: 1, 
    name: '官方購票', 
    distance: '即刻開放', 
    category: '官方售票', 
    address: '本系統實名制歸戶',
    coords: { lat: 25.051, lng: 121.550 }, // 保留坐標供參考
    status: 'normal',
    type: 'venue'
  },
  { 
    id: 2, 
    name: '精選住宿', 
    distance: '800m', 
    category: '精選住宿', 
    address: '台北市南京東路三段沿線',
    coords: { lat: 25.052, lng: 121.544 },
    status: 'normal',
    type: 'hotel'
  },
  { 
    id: 3, 
    name: '周邊美食', 
    distance: '150m', 
    category: '人氣餐廳', 
    address: '南京東路美食商圈',
    coords: { lat: 25.051, lng: 121.547 },
    status: 'quiet',
    type: 'food'
  }
];

// 定義場館選單列表
const LOCATION_LIST = [
  { name: '臺北大巨蛋', address: '台北市信義區忠孝東路四段515號' },
  { name: '臺北小巨蛋', address: '台北市南京東路四段2號' },
  { name: '高雄巨蛋', address: '高雄市左營區博愛二路757號' }
];

export const NearbyHub = () => {
  const [filter, setFilter] = useState('全部');
  const [selectedLocation, setSelectedLocation] = useState(LOCATION_LIST[0]);

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
    }
  };

  // 3. 全域導航功能：導外至 Google Maps
  const handleGlobalNavigation = () => {
    const encodedAddress = encodeURIComponent(selectedLocation.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  };

  return (
    <div className="h-full bg-[#F0F9FF] flex flex-col font-sans overflow-hidden">
      
      {/* 頂部標題 */}
      <div className="pt-16 pb-6 px-8 bg-white/40 backdrop-blur-md shrink-0">
        <h1 className="text-2xl font-black text-slate-700 tracking-tight flex items-center gap-2">
          <Compass className="text-[#FF8A65]" /> 附近探索
        </h1>
        <p className="text-slate-400 text-xs font-bold mt-1 tracking-widest uppercase">Discovery & Service</p>
      </div>

      {/* 3. 新增選單：快速場館導航區 */}
      <div className="px-8 py-4 shrink-0">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-white/50 flex items-center gap-3">
          <div className="flex-1 relative">
            <select 
              value={selectedLocation.name}
              onChange={(e) => setSelectedLocation(LOCATION_LIST.find(l => l.name === e.target.value) || LOCATION_LIST[0])}
              className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-black text-slate-700 appearance-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            >
              {LOCATION_LIST.map(loc => <option key={loc.name} value={loc.name}>{loc.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <button 
            onClick={handleGlobalNavigation}
            className="bg-indigo-500 text-white p-3 rounded-xl shadow-lg shadow-indigo-200 active:scale-90 transition-all"
          >
            <Navigation2 size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* 分類按鈕 */}
      <div className="flex gap-3 px-8 py-2 overflow-x-auto no-scrollbar shrink-0">
        {['全部', '官方購票', '附近旅宿', '美食大全'].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${
              filter === item ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-400 border border-white shadow-sm'
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
            className="bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-6 border border-white/50 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                  venue.type === 'venue' ? 'bg-orange-50 text-[#FF8A65]' : 
                  venue.type === 'hotel' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                  {venue.type === 'venue' && <Ticket size={24} />}
                  {venue.type === 'hotel' && <Bed size={24} />}
                  {venue.type === 'food' && <Utensils size={24} />}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-700">{venue.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{venue.category}</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-tighter">{venue.distance}</span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter ${
                venue.status === 'busy' ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'
              }`}>
                {venue.status === 'busy' ? 'BUSY' : 'CLEAR'}
              </div>
            </div>

            {/* 2. 移除導航按鈕，僅保留單一功能按鈕 */}
            <div className="mt-6">
              <button 
                onClick={() => handleAction(venue)}
                className="w-full bg-slate-800 text-white font-black text-xs py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
              >
                {venue.type === 'venue' ? '進入官方購票系統' : venue.type === 'hotel' ? '查看附近旅宿推薦' : '探索周邊美食清單'}
                <ExternalLink size={14} className="opacity-50" />
              </button>
              
              <div className="mt-4 flex items-center gap-2 px-2">
                <MapPin size={10} className="text-slate-300" />
                <p className="text-[9px] text-slate-300 font-medium truncate">{venue.address}</p>
              </div>
            </div>
          </div>
        ))}
        
        <p className="text-center text-[10px] font-black text-slate-300 tracking-[0.3em] py-8 uppercase">
          End of Exploration
        </p>
      </div>
    </div>
  );
};