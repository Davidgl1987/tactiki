import { ThreeEvent } from '@react-three/fiber'
import { Center, Gltf, Text3D } from '@react-three/drei'

import { Piece as PieceModel } from 'shared'
import { COLORS, CELL_HEIGHT } from '@/helpers'
import { useGameContext } from '@/context'

type Props = {
  piece: PieceModel
  position: { x: number; y: number; z: number }
  selected: boolean
  onPieceClick: () => void
}

export const Piece: React.FC<Props> = ({
  piece,
  position,
  selected,
  onPieceClick,
}) => {
  const { side, game } = useGameContext()

  if (!game) return null

  const color =
    selected && piece.side === 'L'
      ? COLORS.DARK_RED
      : selected && piece.side === 'R'
      ? COLORS.BLUE
      : piece.side === 'L'
      ? COLORS.RED
      : COLORS.LIGHT_BLUE

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onPieceClick()
  }

  const z =
    game.deadPiecesL.find((p) => p?.id === piece.id) ||
    game.deadPiecesR.find((p) => p?.id === piece.id)
      ? -CELL_HEIGHT / 2
      : CELL_HEIGHT / 2

  return (
    <group
      onClick={handleClick}
      position={[position.x, position.z * 0.65 + z, -position.y]}
      rotation={[0, ((piece.side === 'L' ? 1 : -1) * Math.PI) / 2, 0]}
    >
      <Gltf
        src="/src/assets/tiki_model.gltf"
        receiveShadow
        castShadow
        scale={[0.03, 0.015, 0.03]}
        inject={<meshPhongMaterial color={color} />}
      />
      {piece.side === side && (
        <Center position={[0, 0.35, -0.35]}>
          <Text3D
            font={'/src/assets/fonts/Nanum.json'}
            scale={[0.32, 0.32, 0.32]}
            rotation={[-0.16, Math.PI, 0]}
          >
            {piece.value}
            <meshPhongMaterial color={COLORS.YELLOW} />
          </Text3D>
        </Center>
      )}
    </group>
  )
}
