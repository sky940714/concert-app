import { Ticket, Hotel, Utensils, Map, MapPin, ExternalLink, Grid } from 'lucide-react';
import { GlassCard } from '../../components/common';

interface NearbyHubProps {
  showToast: (msg: string) => void;
}

export const NearbyHub = ({ showToast }: NearbyHubProps) => {
  const navItems = [
    { icon: <Ticket size={32} />, label: "官方購票", desc: "前往售票系統", color: "from-blue-500 to-cyan-500" },
    { icon: <Hotel size={32} />, label: "星際旅宿", desc: "預訂周邊住宿", color: "from-purple-500 to-pink-500" },
    { icon: <Utensils size={32} />, label: "能量補給", desc: "探索在地美食", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="pb-24 px-6 pt-10 bg-black h-[100dvh] text-white font-sans">
      <h1 className="text-3xl font-bold mb-2 tracking-tight flex items-center gap-3">
        <Map className="text-cyan-500" /> 附近導航
      </h1>
      <p className="text-gray-500 mb-8 text-sm">探索場館周邊的星際服務據點</p>
      
      <div className="grid gap-6">
        {navItems.map((item, idx) => (
          <GlassCard 
            key={idx} 
            onClick={() => showToast(`正在導航至${item.label}...`)} 
            className="p-6 relative overflow-hidden group cursor-pointer hover:border-white/30 transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.label}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
              <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                <ExternalLink size={20} className="text-white/70" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div 
        onClick={() => showToast("載入詳細星圖...")} 
        className="mt-10 h-48 rounded-3xl overflow-hidden relative opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer group border border-white/10 hover:border-cyan-500/50 bg-slate-900 flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <Grid size={48} className="text-slate-700 animate-pulse" />
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
          <MapPin size={12} /> 查看詳細星圖
        </div>
      </div>
    </div>
  );
};