import { useGameContext } from '@/context'
import { COLORS } from '@/helpers'
import { Piece } from 'shared'
export const Cell = ({
  position,
  cell,
}: {
  position: {
    x: number
    y: number
  }
  cell: Piece[]
}) => {
  const { availableMoves } = useGameContext()
  const color = availableMoves.find(
    (coord) => coord.x === position.x && coord.y === position.y
  )
    ? COLORS.GREEN
    : COLORS.WHITE
  return (
    <mesh position={[position.x, 0, -position.y]} scale={[0.9, 0.1, 0.9]}>
      <boxGeometry />
      <meshPhongMaterial color={color} />
    </mesh>
  )
}
