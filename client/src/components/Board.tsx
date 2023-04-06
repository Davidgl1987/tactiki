import React from 'react'
import { useGameContext } from '@/context'
import { Cell, DeadPieces } from '@/components'
import { Vector3 } from 'three'

export const Board = () => {
  const { game } = useGameContext()

  if (!game) return null

  const { board, deadPiecesL, deadPiecesR } = game

  return (
    <group position={[-2, 0, 2]}>
      <DeadPieces
        position={new Vector3(0, 0, 0)}
        deadPieces={deadPiecesL}
        side="L"
      />
      <group>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <React.Fragment key={r.toString() + c.toString()}>
              <Cell position={{ x: r, y: -c }} cell={cell} />
            </React.Fragment>
          ))
        )}
      </group>
      <DeadPieces
        position={new Vector3(board.length + 2, 0, 0)}
        deadPieces={deadPiecesR}
        side="R"
      />
    </group>
  )
}
