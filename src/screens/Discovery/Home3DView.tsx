import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  Sparkles,
  ContactShadows,
  SpotLight,
  Html 
} from '@react-three/drei'
import { Model as TaiwanModel } from '../../components/models/Taiwan-island'
import { CanvasSizeController } from '../../components/effects'

interface Home3DViewProps {
  onRegionSelect?: (regionId: 'north' | 'center' | 'south') => void;
  isLocked?: boolean;
  isShrunken?: boolean;
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
    <div 
      className="w-full h-[650px] relative rounded-[2rem] overflow-hidden touch-none"
      style={{
        backgroundColor: 'transparent',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        isolation: 'isolate',
      }}
    >
      <Canvas 
        camera={{ position: [0, 25, 30], fov: 50 }} 
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
        style={{ 
          width: '100%', 
          height: '100%',
        }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <CanvasSizeController isShrunken={isShrunken} />
        
        <ambientLight intensity={1.2} />
        
        <hemisphereLight 
          intensity={0.6} 
          color="#ffffff"
          groundColor="#E0F7FA" 
        />
        
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={2.0} 
          color="#ffffff" 
          castShadow 
          shadow-bias={-0.0005}
        />

        <SpotLight
          position={[-20, 10, -10]}
          angle={0.5}
          attenuation={5}
          anglePower={5}
          intensity={8} 
          color="#BAE6FD" 
        />
        
        <pointLight position={[-10, 0, 10]} intensity={0.8} color="#FFD180" />
        
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
          </Float>
          
          {/* ❌ InteractiveRegion 還不要加 */}
          {/* <InteractiveRegion position={[4.5, 7, -10]} label="北部熱區" onClick={() => onRegionSelect?.('north')} />
          <InteractiveRegion position={[0, 5, .05]} label="中部熱區" onClick={() => onRegionSelect?.('center')} />
          <InteractiveRegion position={[-2, 4.5, 9]} label="南部熱區" onClick={() => onRegionSelect?.('south')} /> */}
        </Suspense>

        <ContactShadows 
          position={[0, -6.5, 0]}
          opacity={0.3}
          blur={3.5}
          scale={45} 
          far={20} 
          color="#1e293b" 
        />
        
        {/* ✅ 測試 8：加回 Sparkles */}
        <Sparkles count={40} scale={20} size={4} speed={0.4} opacity={0.5} color="#FF8A65" position={[0, 0, 5]} />
        
        {/* ❌ OrbitControls 還不要加 */}
        {/* <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enabled={!isLocked}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        /> */}
      </Canvas>
    </div>
  )
}