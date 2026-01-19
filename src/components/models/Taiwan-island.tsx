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
      />
    </group>
  )
}

useGLTF.preload('/models/taiwan-island.glb')