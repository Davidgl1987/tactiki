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
  position,
  deadPieces,
  handleClickPiece,
}: {
  position: Vector3
  deadPieces: PieceModel[]
  side: Side
  handleClickPiece: (piece: PieceModel) => void
}) => {
  const { game, selectedPiece } = useGameContext()
  if (!game) return null

  const getPiecePosition = (p: number) => {
    return new Vector3(-1 - deadPositions[p].x, -deadPositions[p].y, 0)
  }

  return (
    <group position={position}>
      {deadPieces.map((piece, p) => (
        <Piece
          key={piece.id}
          piece={piece}
          position={getPiecePosition(p)}
          selected={piece.id === selectedPiece?.id}
          onPieceClick={() => handleClickPiece(piece)}
        />
      ))}
    </group>
  )
}
