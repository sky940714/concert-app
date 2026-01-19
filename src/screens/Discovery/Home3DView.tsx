import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  Environment, 
  Sparkles,
  ContactShadows,
  SpotLight,
  Html      // 👈 修正 1：這裡補上了逗號
} from '@react-three/drei'
import { Model as TaiwanModel } from '../../components/models/Taiwan-island'

// 定義 Props
interface Home3DViewProps {
  onRegionSelect?: (regionId: 'north' | 'center' | 'south') => void;
  isLocked?: boolean; // 👈 新增這個控制開關
}

// 互動熱點 (保留您原本的設定)
const InteractiveRegion = ({ position, onClick, label }: { position: [number, number, number], onClick: () => void, label: string }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position}>
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(); }} 
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
      >
        <sphereGeometry args={[3, 35, 32]} />
        <meshStandardMaterial 
          color="#FF8A65" 
          transparent 
          opacity={hovered ? 0.4 : 0} 
          emissive="#FF8A65"
          emissiveIntensity={2}
          wireframe={false}
        />
      </mesh>
      
      {hovered && (
        <Html position={[0, 2, 0]} center distanceFactor={15}>
          <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#FF8A65] shadow-lg whitespace-nowrap pointer-events-none">
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function Home3DView({ onRegionSelect, isLocked = false }: Home3DViewProps) {
  return (
    <div className="w-full h-[650px] relative rounded-[2rem] overflow-hidden">
      <Canvas camera={{ position: [0, 25, 30], fov: 50 }} shadows>        
        <fog attach="fog" args={['#F0F9FF', 20, 90]} />
        <Environment preset="city" blur={0.8} />
        <ambientLight intensity={0.8} />       
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={2.5} 
          color="#ffffff" 
          castShadow 
        />
        <SpotLight
          position={[-20, 10, -10]}
          angle={0.5}
          attenuation={5}
          anglePower={5}
          intensity={10} 
          color="#BAE6FD" // 冷藍光，呼應背景
        />
        <pointLight position={[-10, 0, 10]} intensity={1} color="#FFD180" />
        <Suspense fallback={null}>
          <Float 
            speed={2} 
            rotationIntensity={0.1} // 微幅旋轉，增加生動感
            floatIntensity={0.5} 
            floatingRange={[-0.5, 0.5]}
          >
            {/* 模型本體 (保留您的座標與角度) */}
            <TaiwanModel 
                scale={18} 
                position={[1, 0, -2]} 
                rotation={[0.18, -6.7, 0]} 
            />

            {/* === 3. 互動熱區 (保留您辛苦微調好的座標) === */}
            {/* 北部 */}
            <InteractiveRegion 
              position={[4.5, 7, -10]} 
              label="北部熱區"
              onClick={() => onRegionSelect?.('north')} 
            />
            
            {/* 中部 */}
            <InteractiveRegion 
              position={[0, 5, .05]} 
              label="中部熱區"
              onClick={() => onRegionSelect?.('center')} 
            />

            {/* 南部 */}
            <InteractiveRegion 
              position={[-2, 4.5, 9]} 
              label="南部熱區"
              onClick={() => onRegionSelect?.('south')} 
            />

          </Float>
        </Suspense>

        {/* === 4. 陰影與粒子優化 === */}
        {/* 加深陰影顏色，更有落地感 */}
        <ContactShadows 
          position={[0, -5, 0]} 
          opacity={0.5} 
          scale={40} 
          blur={2} 
          far={10} 
          color="#1e293b" 
        />
        
        {/* 粒子特效 */}
        <Sparkles 
          count={40} 
          scale={20} 
          size={4} 
          speed={0.4} 
          opacity={0.5} 
          color="#FF8A65" 
          position={[0, 0, 5]} 
        />
        
        {/* === 5. 控制器 (限制角度，避免穿幫) === */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} // 禁止平移，避免使用者把模型拖出畫面
          enabled={!isLocked}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.2}
          // 限制左右旋轉角度，確保永遠正面迎人
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}