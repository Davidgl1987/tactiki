import { useGameContext } from '@/context'
import { DeadPieces } from '@/components'

export const Board = () => {
  const { game } = useGameContext()

  if (!game) return null

  const { board, deadPiecesL, deadPiecesR } = game

  return (
    <group position={[-2, 0, 2]}>
      <DeadPieces deadPieces={deadPiecesL} side="L" />
      <DeadPieces deadPieces={deadPiecesR} side="R" />
    </group>
  )
}
