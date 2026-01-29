import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { StarshipHub } from './StarshipHub'; 
import { EventCard } from '../../components/common/EventCard'; 
import { Bell, LayoutGrid, Music, Film, Ticket, Sparkles } from 'lucide-react';
import { VenueSelector } from './VenueSelector';

// 1. ✅ 頂部大型滑軌資料
const HERO_POSTERS = [
  { 
    id: 1, 
    title: "2026 浮現祭：春日搖滾", 
    date: "2026.04.25 - 04.26", 
    venue: "臺北流行音樂中心", 
    // 修改處：指向本地 assets
    img: "/src/assets/emerge_fest.jpg", 
    category: "音樂",
    description: "2026 春季最強音樂盛事！",
    kktixUrl: "https://kktix.com",
    lineup: [{ name: '告五人', avatar: 'https://i.pravatar.cc/150?u=1' }]
  },
  { 
    id: 2, 
    title: "ULTRA Taiwan 2026", 
    date: "2026.11.16", 
    venue: "大佳河濱公園", 
    // 修改處：指向本地 assets
    img: "/src/assets/ULTRA_Taiwan.jpg", 
    category: "活動",
    description: "全球頂尖 DJ 陣容降臨台北！",
    kktixUrl: "https://kktix.com",
    lineup: [{ name: 'Martin Garrix', avatar: 'https://i.pravatar.cc/150?u=b' }]
  },
  { 
    id: 3, 
    title: "2026 台北藝術博覽會", 
    date: "2026.08.12", 
    venue: "世貿一館", 
    // 修改處：指向本地 assets
    img: "/src/assets/taipei_art.jpg", 
    category: "活動",
    description: "年度規模最大的當代藝術盛會。",
    kktixUrl: "https://kktix.com",
    lineup: [{ name: '奈良美智', avatar: 'https://i.pravatar.cc/150?u=c' }]
  }
];

// 2. ✅ 下方發燒列表 - 修改圖片路徑
const WEEKLY_TRENDING = [
  {
    title: "2026 周杰倫 [ 嘉年華 ]",
    date: "2026.05.12",
    venue: "臺北大巨蛋",
    category: "音樂",
    // 修改處：指向本地 assets
    img: "/src/assets/jay-carnival.jpg", 
  },
  {
    title: "落日飛車 台北專場",
    date: "2026.06.01",
    venue: "Zepp New Taipei",
    category: "音樂",
    // 修改處：指向本地 assets
    img: "/src/assets/fly_car.jpg", 
  },
  {
    title: "數位沉浸式特展：光影畫境",
    date: "2026.07.15",
    venue: "松山文創園區",
    category: "活動",
    // 修改處：指向本地 assets
    img: "/src/assets/shadow.jpg", 
  }
];

// 3. ✅ 分類資料
const CATEGORIES = [
  { id: 'flagship', label: '主要場館', icon: <LayoutGrid size={24} />, color: '#99E6D9' },
  { id: 'music', label: '音樂', icon: <Music size={24} />, color: '#A5B4FC' },
  { id: 'movie', label: '電影', icon: <Film size={24} />, color: '#FCA5A5' },
  { id: 'event', label: '活動', icon: <Sparkles size={24} />, color: '#FFB347' },
];

interface DiscoveryProps {
  onVenueSelect: (id: string | null) => void;
  onSelectEvent: (event: any) => void;
}

const Discovery = ({ onVenueSelect, onSelectEvent }: DiscoveryProps) => {
  // ✅ 修正：State 必須放在元件內部
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);
  const [showVenueList, setShowVenueList] = React.useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const venueSectionRef = useRef<HTMLDivElement>(null); 
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const opacity3D = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const maskOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);
  const uiOpacity = useTransform(smoothProgress, [0.3, 0.45], [1, 0]);

  const scrollToVenue = () => {
    venueSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#E0F7FA] overflow-x-hidden">
      
      <div className="fixed inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 20, 35], fov: 45 }}>
          <StarshipHub 
            opacity={opacity3D} 
            scale={useTransform(smoothProgress, [0.1, 0.5], [0.2, 0.7])} 
            rotationY={useTransform(smoothProgress, [0.3, 0.7], [-Math.PI / 2, 0])} 
            // ✅ 修改：點擊地圖標籤後開啟選單而非直接導覽
            onVenueSelect={(regionId) => {
              setSelectedRegion(regionId);
              setShowVenueList(true);
            }} 
          />
        </Canvas>
      </div>

      <motion.div style={{ opacity: maskOpacity }} className="fixed inset-0 z-10 bg-[#E0F7FA] pointer-events-none" />

      <div className="relative z-20 w-full pointer-events-none">
        <motion.section style={{ opacity: uiOpacity }} className="pb-40 pointer-events-auto">
          
          <div className="flex justify-between items-center p-6 sticky top-0 z-50">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 bg-[#99E6D9] rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                 <Ticket className="text-white" size={20} />
               </div>
               <div className="text-2xl font-black tracking-tighter text-[#475569]">oh cool</div>
            </div>
            <div className="flex gap-3">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border-2 border-white text-[#FF8A65]">
                 <Bell size={22} />
               </div>
            </div>
          </div>

          <div className="px-6 mb-8">
            <div className="relative w-full h-[350px] overflow-x-auto no-scrollbar flex snap-x gap-4 px-2">
              {HERO_POSTERS.map((poster) => (
                <motion.div 
                  key={poster.id} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectEvent(poster)}
                  className="min-w-[90%] h-full relative snap-center rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl cursor-pointer"
                >
                  <img src={poster.img} className="w-full h-full object-cover" alt={poster.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-8 flex flex-col justify-end text-white">
                    <span className="bg-[#99E6D9] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-3 shadow-md uppercase">
                      {poster.category} • HOT
                    </span>
                    <h3 className="text-3xl font-black mb-1">{poster.title}</h3>
                    <p className="text-sm opacity-80 font-bold">{poster.date} • {poster.venue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 px-6 mb-10">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center gap-3">
                <motion.div 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => { if (cat.id === 'flagship') scrollToVenue(); }}
                  style={{ backgroundColor: cat.color }}
                  className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white border-2 border-white/40 shadow-lg cursor-pointer"
                >
                   {cat.icon}
                </motion.div>
                <span className="text-xs font-black text-slate-500 tracking-wider">{cat.label}</span>
              </div>
            ))}
          </div>

          <div className="px-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#475569] tracking-tight">本週發燒</h2>
                <div className="h-1.5 w-12 bg-[#FF8A65] rounded-full mt-1 shadow-sm" />
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {WEEKLY_TRENDING.map((eventData, index) => (
                <EventCard 
                  key={index}
                  title={eventData.title}
                  date={eventData.date}
                  venue={eventData.venue}
                  category={eventData.category}
                  imageUrl={eventData.img}
                  onPress={() => onSelectEvent(eventData)}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <section ref={venueSectionRef} className="h-[250vh] pointer-events-none flex flex-col items-center justify-center">
             <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-white/90 p-4 rounded-full shadow-lg border-2 border-[#99E6D9]">
                <div className="w-1 h-8 bg-[#99E6D9] rounded-full mx-auto" />
             </motion.div>
             <p className="mt-4 text-xs font-black text-[#99E6D9] tracking-[0.3em]">EXPLORE 3D MAP</p>
        </section>

        {/* ✅ 新增：放置選單組件 */}
        <VenueSelector 
          region={selectedRegion}
          isOpen={showVenueList}
          onClose={() => setShowVenueList(false)}
          onSelect={(venueName) => {
            setShowVenueList(false);
            onVenueSelect(venueName); 
          }}
        />
      </div>
    </div>
  );
};

export default Discovery;