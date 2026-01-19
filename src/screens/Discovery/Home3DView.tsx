import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  Environment, 
  Sparkles,
  ContactShadows,
  SpotLight,
  Html 
} from '@react-three/drei'
import { Model as TaiwanModel } from '../../components/models/Taiwan-island'
import { CanvasSizeController } from '../../components/effects' // ✅ 引入

interface Home3DViewProps {
  onRegionSelect?: (regionId: 'north' | 'center' | 'south') => void;
  isLocked?: boolean;
  isShrunken?: boolean; // ✅ 新增 prop
}

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

export default function Home3DView({ onRegionSelect, isLocked = false, isShrunken = false }: Home3DViewProps) {
  return (
    <div className="w-full h-[650px] relative rounded-[2rem] overflow-hidden touch-none">
      
      <Canvas 
        camera={{ position: [0, 25, 30], fov: 50 }} 
        shadows
        // ✅ 確保 Canvas 使用完整容器尺寸
        style={{ width: '100%', height: '100%' }}
        // ✅ 重要:防止 Canvas 內部錯誤調整尺寸
        resize={{ scroll: false, debounce: 0 }}
      >        
        
        {/* ✅ 加入尺寸控制器 */}
        <CanvasSizeController isShrunken={isShrunken} />
        
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
          color="#BAE6FD" 
        />
        <pointLight position={[-10, 0, 10]} intensity={1} color="#FFD180" />
        
        <Suspense fallback={null}>
          <Float 
            speed={2} 
            rotationIntensity={0.1} 
            floatIntensity={0.5} 
            floatingRange={[-0.5, 0.5]}
          >
            <TaiwanModel 
                scale={18} 
                position={[1, 0, -2]} 
                rotation={[0.18, -6.7, 0]} 
            />

            <InteractiveRegion position={[4.5, 7, -10]} label="北部熱區" onClick={() => onRegionSelect?.('north')} />
            <InteractiveRegion position={[0, 5, .05]} label="中部熱區" onClick={() => onRegionSelect?.('center')} />
            <InteractiveRegion position={[-2, 4.5, 9]} label="南部熱區" onClick={() => onRegionSelect?.('south')} />

          </Float>
        </Suspense>

        <ContactShadows 
            position={[0, -5.5, 0]} // 從 -5 改為 -5.5，增加與島嶼底部的距離
            opacity={0.4}           // 稍微調低透明度，減少閃爍的視覺衝擊
            blur={2.5}              // 稍微增加模糊度
            scale={40} 
            far={10} 
            color="#1e293b" 
            />
        
        <Sparkles count={40} scale={20} size={4} speed={0.4} opacity={0.5} color="#FF8A65" position={[0, 0, 5]} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enabled={!isLocked}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}