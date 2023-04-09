import { ThreeEvent } from '@react-three/fiber'

import { useGameContext } from '@/context'
import { COLORS, CELL_HEIGHT } from '@/helpers'

export const Cell = ({
  position,
  onCellClick,
}: {
  position: {
    x: number
    y: number
  }
  onCellClick: () => void
}) => {
  const { availableMoves } = useGameContext()
  const isPosibleMove = availableMoves.find(
    (coord) => coord.x === position.x && coord.y === position.y
  )
  const color = isPosibleMove ? COLORS.GREEN : COLORS.WHITE
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (isPosibleMove) onCellClick()
  }
  return (
    <mesh
      position={[position.x, 0, -position.y]}
      scale={[0.9, CELL_HEIGHT, 0.9]}
      onClick={handleClick}
    >
      <boxGeometry />
      <meshPhongMaterial color={color} />
    </mesh>
  )
}
