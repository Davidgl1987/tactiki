import { Vector3 } from 'three'
import { Piece as PieceModel, Side } from 'shared'
import { Piece } from '@/components'
import { useGameContext } from '@/context'

const deadPositions = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 1, y: 4 },
]

export const DeadPieces = ({
  deadPieces,
  side,
}: {
  deadPieces: PieceModel[]
  side: Side
}) => {
  const { game } = useGameContext()
  if (!game) return null
  const { board } = game

  const getPosition = (p: number) => {
    if (side === 'L')
      return new Vector3(-1 - deadPositions[p].x, -deadPositions[p].y, 0)
    else return new Vector3(board[0].length + (p % 2), -p % board[0].length, 0)
  }

  return (
    <group>
      {deadPieces.map((piece, p) => (
        <Piece
          key={piece.id}
          piece={piece}
          position={getPosition(p)}
          selected={false}
          onPieceClick={() => console.log('click')}
        />
      ))}
    </group>
  )
}
