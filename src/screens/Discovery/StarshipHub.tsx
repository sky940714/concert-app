import { motion as motion3d } from 'framer-motion-3d';
import { MotionValue, useTransform } from 'framer-motion';
import { ContactShadows, Float, Environment } from '@react-three/drei';
import Home3DView from './Home3DView';

interface StarshipHubProps {
  onVenueSelect: (venueId: string) => void;
  opacity: MotionValue<number>;   
  scale: MotionValue<number>;     
  rotationY: MotionValue<number>; 
}

export const StarshipHub = ({ opacity, scale, rotationY, onVenueSelect }: StarshipHubProps) => {
  // ✅ 優化：讓光影也隨著滾動進度變化，產生「開燈」的感覺
  const lightIntensity = useTransform(opacity, [0, 1], [0, 1.5]);

  return (
    <group>
      {/* 1. 環境光與動態光源 */}
      <ambientLight intensity={0.8} />
      <motion3d.pointLight 
        position={[10, 15, 10]} 
        intensity={lightIntensity} 
        color="#B2F2E8" // 帶有一點你的薄荷綠主色
      />
      
      {/* ✅ 優化：加入環境貼圖，增加 3D 模型的金屬感與玻璃質感 */}
      <Environment preset="city" />

      {/* 2. 核心 3D 群組：整合旋入動畫 */}
      <motion3d.group 
        scale={scale} 
        rotation-y={rotationY}
        // 額外優化：加入微小的垂直位移，讓旋入更有「從深處浮現」的感覺
        position-y={useTransform(opacity, [0, 1], [-5, 0])}
      >
        {/* 使用 Float 讓模型在地圖模式時有輕微的漂浮呼吸感 */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <Home3DView 
            onRegionSelect={onVenueSelect} 
            isLocked={false}
            isShrunken={false}
            // ✅ 預留：將 opacity 傳下去給標籤做淡入
            scrollOpacity={opacity}
          />
        </Float>
      </motion3d.group>

      {/* 3. 底部陰影：增加空間重量感 */}
      <ContactShadows 
        position={[0, -8, 0]} 
        opacity={0.4} 
        scale={40} 
        blur={2.5} 
        far={20} 
        color="#1e293b" 
      />
    </group>
  );
};