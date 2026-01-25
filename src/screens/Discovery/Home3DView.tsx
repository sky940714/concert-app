import { Suspense } from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion'; // ✅ 用於 HTML 標籤動畫
import { TaiwanNew } from '../../components/models/Taiwan_island0121';

// ✅ 優化：互動區域標籤加入「彈出場景」動畫
const InteractiveRegion = ({ position, onClick, label, scrollOpacity }: any) => {
  return (
    <group position={position}>
      <Html position={[0, 0, 0]} center distanceFactor={35}>
        <motion.div 
          onClick={onClick}
          // 當 scrollOpacity (滾動進度) 超過 0.8 時才顯示，避免旋轉時露餡
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: scrollOpacity > 0.8 ? 1 : 0, 
            opacity: scrollOpacity > 0.8 ? 1 : 0 
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group cursor-pointer flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          {/* 黏土感標籤本體 */}
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FF8A65] shadow-[0_8px_20px_rgba(255,138,101,0.3)] group-hover:bg-[#FF8A65] transition-colors duration-300">
            <span className="text-[13px] font-black text-[#FF8A65] group-hover:text-white whitespace-nowrap tracking-wider">
              {label}
            </span>
          </div>
          
          {/* 下方的引導小點 */}
          <div className="w-1.5 h-3 bg-[#FF8A65] rounded-full shadow-sm" />
        </motion.div>
      </Html>
    </group>
  );
};

export default function Home3DView({ onRegionSelect, scrollOpacity }: any) {
  return (
    <Suspense fallback={null}>
      {/* 核心台灣模型：這裡保持純粹，動畫由外部 StarshipHub 的 motion3d.group 控制 */}
      <TaiwanNew 
        scale={19} 
        position={[1, 0, -2]} 
        rotation={[0.18, -6.7, 0]} 
      />
      
      {/* ✅ 地點標籤：傳入 scrollOpacity 實現受控顯示 */}
      <InteractiveRegion 
        position={[4.5, 7.5, -10]} 
        label="北部場館" 
        onClick={() => onRegionSelect?.('north')} 
        scrollOpacity={scrollOpacity}
      />
      <InteractiveRegion 
        position={[0, 5.5, 0.05]} 
        label="中部場館" 
        onClick={() => onRegionSelect?.('center')} 
        scrollOpacity={scrollOpacity}
      />
      <InteractiveRegion 
        position={[-2, 5, 9.5]} 
        label="南部場館" 
        onClick={() => onRegionSelect?.('south')} 
        scrollOpacity={scrollOpacity}
      />
    </Suspense>
  );
}