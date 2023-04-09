import React from 'react'

import { Coordinates, Piece as PieceModel } from 'shared'
import { useGameContext } from '@/context'
import { Cell, DeadPieces, Piece } from '@/components'

export const Board = () => {
  const { game, selectedPiece, selectPiece, isValidMovement, movePiece } =
    useGameContext()

  if (!game) return null

  const { board, deadPiecesL, deadPiecesR } = game

  const handleDeadPieceClick = (piece: PieceModel) => {
    selectPiece(piece)
  }

  const handleBoardPieceClick = (coords: Coordinates) => {
    const nPieces = board[coords.x][coords.y].length
    if (nPieces === 0) return
    const piece = board[coords.x][coords.y][nPieces - 1]
    if (!selectedPiece) selectPiece(piece, coords)
    else movePiece(coords)
  }

  const handleCellClick = (coords: Coordinates) => {
    const isValid = isValidMovement(coords)
    if (isValid) movePiece(coords)
  }

  return (
    <group position={[-2, 0, 2]}>
      <DeadPieces
        position={{ x: 0, y: 0, z: 0 }}
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
                  position={{ x: r, y: c, z: p }}
                  selected={piece.id === selectedPiece?.id}
                  onPieceClick={() => handleBoardPieceClick({ x: r, y: c })}
                />
              ))}
              <Cell
                position={{ x: r, y: c }}
                onCellClick={() => handleCellClick({ x: r, y: c })}
              />
            </React.Fragment>
          ))
        )}
      </group>
      <DeadPieces
        position={{ x: board.length + 2, y: 0, z: 0 }}
        deadPieces={deadPiecesR}
        side="R"
        handleClickPiece={handleDeadPieceClick}
      />
    </group>
  )
}
