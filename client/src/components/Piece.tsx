import { Vector3 } from 'three'
import { ThreeEvent } from '@react-three/fiber'
import { Center, Gltf, Text3D } from '@react-three/drei'
import { Piece as PieceModel } from 'shared'
import { COLORS } from '@/helpers'
import { useGameContext } from '@/context'

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
  const { side } = useGameContext()

  const color =
    selected && piece.side === 'L'
      ? COLORS.DARK_RED
      : selected && piece.side === 'R'
      ? COLORS.LIGHT_BLUE
      : piece.side === 'L'
      ? COLORS.RED
      : COLORS.BLUE

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
