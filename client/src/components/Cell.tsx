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
  return (
    <mesh position={[position.x, 0, position.y]} scale={[0.9, 0.1, 0.9]}>
      <boxGeometry />
      <meshPhongMaterial color={COLORS.WHITE} />
    </mesh>
  )
}
