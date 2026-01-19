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

export function Model(props: React.JSX.IntrinsicElements['group']) {
  // 1. 讀取模型
  const { nodes, materials } = useGLTF('/models/taiwan-island.glb') as unknown as GLTFResult
  
  return (
    <group {...props} dispose={null}>
      {/* 2. 關鍵修正：直接使用原本的 material={materials.model} 
         不再手動添加 <meshStandardMaterial> 去覆蓋它
      */}
      <mesh 
  geometry={nodes.model.geometry} 
  material={materials.model} 
  onUpdate={(self) => {
    // 1. 檢查材質是否存在且不是陣列
    if (self.material && !Array.isArray(self.material)) {
      // 2. 使用型別斷言將其視為 MeshStandardMaterial 以符合屬性要求
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

useGLTF.preload('/models/taiwan-island.glb')