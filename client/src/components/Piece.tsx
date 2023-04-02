import { Text } from '@react-three/drei'
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
    : piece.side === 'L'
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
      rotation={[0, ((piece.side === 'L' ? 1 : -1) * Math.PI) / 2, 0]}
    >
      <mesh>
        <cylinderBufferGeometry attach={'geometry'} args={[0.25, 0.25, 0.5]} />
        <meshStandardMaterial attach={'material'} color={color} />
      </mesh>
      <Text
        position={[0, 0, -0.25]}
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, Math.PI, 0]}
      >
        {piece.value}
      </Text>
    </group>
  )
}
