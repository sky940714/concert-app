import { Suspense } from 'react';
import { Html } from '@react-three/drei';
import { motion, useTransform } from 'framer-motion';
import { TaiwanNew } from '../../components/models/Taiwan_island0121';

const InteractiveRegion = ({ position, onClick, label, scrollOpacity }: any) => {
  // ✅ 修正：使用 useTransform 處理 MotionValue。當滾動進度超過 0.8 時觸發動畫
  const opacity = useTransform(scrollOpacity, [0.8, 0.82], [0, 1]);
  const scale = useTransform(scrollOpacity, [0.8, 0.85], [0, 1]);

  return (
    <group position={position}>
     <Html position={[0, 0, 0]} center distanceFactor={35} pointerEvents="auto">
        <motion.div 
          onClick={onClick}
          style={{ opacity, scale }}
          className="group cursor-pointer flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FF8A65] shadow-[0_8px_20px_rgba(255,138,101,0.3)] group-hover:bg-[#FF8A65] transition-colors duration-300">
            <span className="text-[13px] font-black text-[#FF8A65] group-hover:text-white whitespace-nowrap tracking-wider">
              {label}
            </span>
          </div>
          <div className="w-1.5 h-3 bg-[#FF8A65] rounded-full shadow-sm" />
        </motion.div>
      </Html>
    </group>
  );
};

export default function Home3DView({ onRegionSelect, scrollOpacity }: any) {
  return (
    <Suspense fallback={null}>
      <TaiwanNew 
        scale={19} 
        position={[1, 0, -2]} 
        rotation={[0.18, -6.7, 0]} 
      />
      
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