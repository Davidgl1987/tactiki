import { RoundedBox, Text, Text3D } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { Piece as PieceModel } from 'shared'
import { Vector3 } from 'three'

export const COLORS = {
  SELECTED: 'green',
  PLAYER: 'blue',
  RIVAL: 'red',
}

type Props = {
  piece: PieceModel
  position: Vector3
  selected: boolean
  onPieceClick: any
}

export const Piece: React.FC<Props> = ({
  piece,
  position,
  selected,
  onPieceClick,
}) => {
  const color = selected
    ? COLORS.SELECTED
    : piece.side
    ? COLORS.PLAYER
    : COLORS.RIVAL

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onPieceClick()
  }
  return (
    <group
      onClick={handleClick}
      position={[position.x, position.z, position.y]}
      rotation={[0, ((piece.side ? 1 : -1) * Math.PI) / 2, 0]}
    >
      {/* 
      <mesh>
        <cylinderBufferGeometry attach={'geometry'} args={[0.25, 0.25, 0.5]} />
        <meshStandardMaterial attach={'material'} color={color} />
      </mesh> 
      */}
      <RoundedBox
        args={[0.64, 0.64, 0.64]}
        radius={0.1}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
      </RoundedBox>
      <Text>{piece.value}</Text>
    </group>
  )
}
