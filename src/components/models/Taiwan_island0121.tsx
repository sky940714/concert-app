import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    model: THREE.Mesh
  }
  materials: {
    model: THREE.MeshStandardMaterial
  }
}

// 建議將元件名稱改為 TaiwanNew 以便區分
export function TaiwanNew(props: React.JSX.IntrinsicElements['group']) {
  // 確保路徑與 public 資料夾中的位置一致，通常建議放在 /models/ 下
  const { nodes, materials } = useGLTF('/models/taiwan_island0121.glb') as unknown as GLTFResult
  
  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.model.geometry} 
        material={materials.model} 
        onUpdate={(self) => {
          // 繼承您之前的修正：防止模型表面與其他元素產生 z-fighting
          if (self.material && !Array.isArray(self.material)) {
            const mat = self.material as THREE.MeshStandardMaterial;
            mat.polygonOffset = true;
            mat.polygonOffsetFactor = 1;
            mat.polygonOffsetUnits = 1;
          }
        }}
      />
    </group>
  )
}

useGLTF.preload('/models/taiwan_island0121.glb')