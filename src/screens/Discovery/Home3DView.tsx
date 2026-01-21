import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  ContactShadows,
  SpotLight,
  Html 
} from '@react-three/drei'
import { TaiwanNew } from '../../components/models/Taiwan_island0121'
import { CanvasSizeController } from '../../components/effects'

interface Home3DViewProps {
  onRegionSelect?: (regionId: 'north' | 'center' | 'south') => void;
  isLocked?: boolean;
  isShrunken?: boolean;
}

// 升級後的互動區域組件：標籤常駐顯示
const InteractiveRegion = ({ 
  position, 
  onClick, 
  label 
}: { 
  position: [number, number, number], 
  onClick: () => void, 
  label: string 
}) => {
  return (
    <group position={position}>
      {/* 隱形但較大的點擊感應球體 */}
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(); }} 
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      
      {/* 常駐標籤：強化視覺引導 */}
      <Html position={[0, 0, 0]} center distanceFactor={35}>
        <div 
          onClick={onClick}
          className="group cursor-pointer flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          {/* 標籤主體 */}
          <div className="bg-white/85 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#FF8A65] shadow-[0_8px_20px_rgba(255,138,101,0.3)] group-hover:bg-[#FF8A65] transition-colors duration-300">
            <span className="text-[13px] font-black text-[#FF8A65] group-hover:text-white whitespace-nowrap tracking-wider">
              {label}
            </span>
          </div>
          {/* 引導點與呼吸動畫 */}
          <div className="relative flex items-center justify-center">
            <div className="w-1.5 h-4 bg-[#FF8A65] rounded-full shadow-sm" />
            <div className="absolute w-4 h-4 bg-[#FF8A65]/30 rounded-full animate-ping" />
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function Home3DView({ onRegionSelect, isLocked = false, isShrunken = false }: Home3DViewProps) {
  return (
    <div 
      className="w-full h-[650px] relative rounded-[2.5rem] overflow-hidden touch-none"
      style={{
        backgroundColor: 'transparent',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        isolation: 'isolate',
      }}
    >
      <Canvas 
        camera={{ position: [0, 25, 30], fov: 45 }} // 稍微縮小視野讓模型更集中
        shadows
        dpr={[1, 2]}
        frameloop="always"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
        style={{ width: '100%', height: '100%' }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <CanvasSizeController isShrunken={isShrunken} />
        
        {/* 光影增強 */}
        <ambientLight intensity={1.5} />
        <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#E0F7FA" />
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#ffffff" castShadow shadow-bias={-0.0005} />
        <SpotLight position={[-20, 15, -10]} angle={0.4} attenuation={5} anglePower={5} intensity={10} color="#BAE6FD" />
        <pointLight position={[-10, 5, 15]} intensity={1.2} color="#FFD180" />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8} floatingRange={[-0.4, 0.4]}>
            {/* 3D 台灣模型 */}
            <TaiwanNew 
              scale={19} // 稍微放大讓細節更清楚
              position={[1, 0, -2]} 
              rotation={[0.18, -6.7, 0]} 
            />
            
            {/* 常駐熱區標籤：根據老闆要求直接標示位置 */}
            <InteractiveRegion position={[4.5, 7.5, -10]} label="北部場館" onClick={() => onRegionSelect?.('north')} />
            <InteractiveRegion position={[0, 5.5, 0.05]} label="中部場館" onClick={() => onRegionSelect?.('center')} />
            <InteractiveRegion position={[-2, 5, 9.5]} label="南部場館" onClick={() => onRegionSelect?.('south')} />
          </Float>
        </Suspense>

        <ContactShadows position={[0, -7.5, 0]} opacity={0.4} blur={3} scale={50} far={20} color="#1e293b" />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enabled={!isLocked}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.1} // 限制視角不低於地平線
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}