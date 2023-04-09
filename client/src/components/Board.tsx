import React from 'react'
import { useGameContext } from '@/context'
import { Cell, DeadPieces, Piece } from '@/components'
import { Vector3 } from 'three'
import { Coordinates, Piece as PieceModel } from 'shared'

export const Board = () => {
  const { game, selectedPiece, selectPiece } = useGameContext()

  if (!game) return null

  const { board, deadPiecesL, deadPiecesR } = game

  const handleDeadPieceClick = (piece: PieceModel) => {
    selectPiece(piece)
  }

  const handleBoardPieceClick = (coords: Coordinates) => {
    const nPieces = board[coords.x][coords.y].length
    if (nPieces === 0) return
    const piece = board[coords.x][coords.y][nPieces - 1]
    selectPiece(piece, coords)
  }

  return (
    <group position={[-2, 0, 2]}>
      <DeadPieces
        position={new Vector3(0, 0, 0)}
        deadPieces={deadPiecesL}
        side="L"
        handleClickPiece={handleDeadPieceClick}
      />
      <group>
        {board.map((row, r) =>
          row.map((col, c) => (
            <React.Fragment key={r.toString() + c.toString()}>
              {col.map((piece, p) => (
                <Piece
                  key={piece.id}
                  piece={piece}
                  position={new Vector3(r, c, p)}
                  selected={piece.id === selectedPiece?.id}
                  onPieceClick={() => handleBoardPieceClick({ x: r, y: c })}
                />
              ))}
              <Cell position={{ x: r, y: c }} />
            </React.Fragment>
          ))
        )}
      </group>
      <DeadPieces
        position={new Vector3(board.length + 2, 0, 0)}
        deadPieces={deadPiecesR}
        side="R"
        handleClickPiece={handleDeadPieceClick}
      />
    </group>
  )
}
