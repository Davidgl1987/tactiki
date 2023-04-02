import * as THREE from 'three'
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Vector3 } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Piece: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export default function TikiModel({
  color,
  position,
}: {
  position: Vector3 | undefined
  color: string
}) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF(
    '/src/assets/tiki_model.gltf'
  ) as GLTFResult
  return (
    <group
      scale={[0.04, 0.02, 0.04]}
      ref={group}
      position={position}
      dispose={null}
    >
      {/* <mesh geometry={nodes.Piece.geometry} material={materials.Material} /> */}
      <mesh geometry={nodes.Piece.geometry} castShadow>
        <meshPhongMaterial color={color} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/src/assets/tiki_model.gltf')
