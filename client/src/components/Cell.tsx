import { useGameContext } from '@/context'
import { COLORS, CELL_HEIGHT } from '@/helpers'

export const Cell = ({
  position,
}: {
  position: {
    x: number
    y: number
  }
}) => {
  const { availableMoves } = useGameContext()
  const color = availableMoves.find(
    (coord) => coord.x === position.x && coord.y === position.y
  )
    ? COLORS.GREEN
    : COLORS.WHITE
  return (
    <mesh
      position={[position.x, 0, -position.y]}
      scale={[0.9, CELL_HEIGHT, 0.9]}
    >
      <boxGeometry />
      <meshPhongMaterial color={color} />
    </mesh>
  )
}
