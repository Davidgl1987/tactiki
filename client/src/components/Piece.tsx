import { Center, Text, Text3D } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { Piece as PieceModel } from 'shared'
import { Vector3 } from 'three'
import { TikiModel } from '@/components'

// https://coolors.co/f4f1de-e07a5f-3d405b-81b29a-f2cc8f
export const COLORS = {
  SELECTED: '#81b29a',
  PLAYER: '#e07a5f',
  RIVAL: '#3d405b',
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
      <TikiModel color={color} />
      <Center position={[0, 0.35, -0.35]}>
        <Text3D
          font={'/src/assets/fonts/Nanum.json'}
          scale={[0.32, 0.32, 0.32]}
          rotation={[-0.16, Math.PI, 0]}
        >
          {piece.value}
          <meshStandardMaterial color="#f2cc8f" />
        </Text3D>
      </Center>
    </group>
  )
}
