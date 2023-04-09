import { Piece as PieceModel, Side } from 'shared'
import { useGameContext } from '@/context'
import { Piece } from '@/components'

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
  position: { x: number; y: number; z: number }
  deadPieces: (PieceModel | null)[]
  side: Side
  handleClickPiece: (piece: PieceModel) => void
}) => {
  const { game, selectedPiece } = useGameContext()
  if (!game) return null

  const getPiecePosition = (p: number) => {
    return { x: -1 - deadPositions[p].x, y: deadPositions[p].y, z: 0 }
  }

  return (
    <group position={[position.x, position.y, position.z]}>
      {deadPieces.map((piece, p) =>
        !piece ? null : (
          <Piece
            key={piece.id}
            piece={piece}
            position={getPiecePosition(p)}
            selected={piece.id === selectedPiece?.id}
            onPieceClick={() => handleClickPiece(piece)}
          />
        )
      )}
    </group>
  )
}
