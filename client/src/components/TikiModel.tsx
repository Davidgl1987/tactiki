import * as THREE from 'three'
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Piece: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export default function TikiModel({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null)
  const { nodes } = useGLTF('/src/assets/tiki_model.gltf') as GLTFResult

  return (
    <group scale={[0.03, 0.015, 0.03]} ref={group} dispose={null}>
      <mesh geometry={nodes.Piece.geometry} castShadow receiveShadow>
        <meshPhongMaterial color={color} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/src/assets/tiki_model.gltf')
