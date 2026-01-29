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
  const lightIntensity = useTransform(opacity, [0, 1], [0, 2]);

  return (
    <group>
      <ambientLight intensity={0.6} />
      <motion3d.pointLight 
        position={[15, 20, 15]} 
        intensity={lightIntensity} 
        color="#FF8A65" 
      />
      
      <Environment preset="city" />

      <motion3d.group 
        scale={scale} 
        rotation-y={rotationY}
        position-y={useTransform(opacity, [0, 1], [-8, 0])}
      >
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Home3DView 
            onRegionSelect={onVenueSelect} 
            scrollOpacity={opacity}
          />
        </Float>
      </motion3d.group>

      <ContactShadows 
        position={[0, -10, 0]} 
        opacity={useTransform(opacity, [0.5, 1], [0, 0.4])} 
        scale={50} 
        blur={3} 
        color="#0f172a" 
      />
    </group>
  );
};