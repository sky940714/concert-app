import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { StarshipHub } from './StarshipHub'; 
import { EventCard } from '../../components/common/EventCard'; 
import { Bell, LayoutGrid, Music, Film, Ticket, Sparkles } from 'lucide-react';

// ✅ 補足詳情頁所需的資料欄位
const HERO_POSTERS = [
  { 
    id: 1, 
    title: "Oh Cool 音樂祭", 
    date: "2026.06.13", 
    venue: "臺北流行音樂中心", 
    img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
    category: "音樂",
    priceRange: "1,200 - 3,600"
  },
  { 
    id: 2, 
    title: "潮牌聯名：Glock.45", 
    date: "2026.05.20", 
    venue: "華山文創園區", 
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    category: "活動",
    priceRange: "500 - 1,200"
  }
];

const CATEGORIES = [
  { id: 'flagship', label: '旗艦館', icon: <LayoutGrid size={24} /> },
  { id: 'music', label: '音樂', icon: <Music size={24} /> },
  { id: 'movie', label: '電影', icon: <Film size={24} /> },
  { id: 'event', label: '活動', icon: <Sparkles size={24} /> },
];

// ✅ 修正 Props 介面定義
interface DiscoveryProps {
  onVenueSelect: (id: string | null) => void;
  onSelectEvent: (event: any) => void;
}

const Discovery = ({ onVenueSelect, onSelectEvent }: DiscoveryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const opacity3D = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const maskOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);
  const uiOpacity = useTransform(smoothProgress, [0.3, 0.45], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#E0F7FA]">
      
      {/* 底部 3D 場景 */}
      <div className="fixed inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 20, 35], fov: 45 }}>
          <StarshipHub 
            opacity={opacity3D} 
            scale={useTransform(smoothProgress, [0.1, 0.5], [0.2, 0.7])} 
            rotationY={useTransform(smoothProgress, [0.3, 0.7], [-Math.PI / 2, 0])} 
            onVenueSelect={onVenueSelect} 
          />
        </Canvas>
      </div>

      <motion.div style={{ opacity: maskOpacity }} className="fixed inset-0 z-10 bg-[#E0F7FA] pointer-events-none" />

      <div className="relative z-20 w-full">
        <motion.section style={{ opacity: uiOpacity }} className="pb-40">
          
          {/* 1. 頂部狀態列 */}
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

          {/* 2. 大型海報滑軌 */}
          <div className="px-6 mb-8">
            <div className="relative w-full h-[350px] overflow-x-auto no-scrollbar flex snap-x gap-4">
              {HERO_POSTERS.map((poster) => (
                <motion.div 
                  key={poster.id} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectEvent(poster)} // ✅ 點擊觸發
                  className="min-w-[90%] h-full relative snap-center rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl cursor-pointer"
                >
                  <img src={poster.img} className="w-full h-full object-cover" alt={poster.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end text-white">
                    <span className="bg-[#99E6D9] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-3 shadow-md">HOT EVENT</span>
                    <h3 className="text-3xl font-black mb-1">{poster.title}</h3>
                    <p className="text-sm opacity-80 font-bold">{poster.date} • {poster.venue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3. 分類功能網格 */}
          <div className="grid grid-cols-4 gap-4 px-6 mb-10">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center gap-3">
                <motion.div 
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ y: -2 }}
                  className="w-16 h-16 bg-[#99E6D9] rounded-[1.5rem] flex items-center justify-center text-white border-2 border-white/40 shadow-[0_8px_16px_rgba(153,230,217,0.5),inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                >
                   <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                     {cat.icon}
                   </div>
                </motion.div>
                <span className="text-xs font-black text-slate-500 tracking-wider">{cat.label}</span>
              </div>
            ))}
          </div>

          {/* 4. 本週發燒 */}
          <div className="px-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#475569] tracking-tight">本週發燒</h2>
                <div className="h-1.5 w-12 bg-[#FF8A65] rounded-full mt-1 shadow-sm" />
              </div>
              <p className="text-sm font-black text-[#99E6D9] cursor-pointer">查看全部</p>
            </div>
            
            <div className="flex flex-col gap-6">
               <EventCard 
                 title="落日飛車 台北專場" 
                 date="2026.06.01" 
                 venue="Zepp New Taipei" 
                 category="音樂" 
                 imageUrl="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500" 
                 priceRange="2200-3200"
                 onPress={() => onSelectEvent({
                   title: "落日飛車 台北專場",
                   date: "2026.06.01",
                   venue: "Zepp New Taipei",
                   img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
                   category: "音樂",
                   priceRange: "2,200 - 3,200"
                 })} 
               />
               <EventCard 
                 title="2026 周杰倫 [ 嘉年華 ]" 
                 date="2026.05.12" 
                 venue="臺北大巨蛋" 
                 category="音樂" 
                 imageUrl="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500" 
                 priceRange="1880-6880" 
                 onPress={() => onSelectEvent({
                   title: "2026 周杰倫 [ 嘉年華 ]",
                   date: "2026.05.12",
                   venue: "臺北大巨蛋",
                   img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
                   category: "音樂",
                   priceRange: "1,880 - 6,880"
                 })} 
               />
            </div>
          </div>
        </motion.section>

        {/* 3D 場景區 */}
        <section className="h-[250vh] pointer-events-none flex flex-col items-center justify-center">
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="bg-white/90 p-4 rounded-full shadow-lg border-2 border-[#99E6D9]"
             >
                <div className="w-1 h-8 bg-[#99E6D9] rounded-full mx-auto" />
             </motion.div>
             <p className="mt-4 text-xs font-black text-[#99E6D9] tracking-[0.3em]">EXPLORE 3D MAP</p>
        </section>
      </div>
    </div>
  );
};

export default Discovery;