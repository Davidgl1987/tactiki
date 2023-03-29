import { Vector3 } from 'three'
// import { useSocketContext } from '../context/SocketContext'
import { Piece } from './Piece'
export const Board = () => {
  // const { game, player, rival } = useSocketContext()
  const game = null,
    player = null,
    rival = null
  if (!game || !player || !rival) return null

  const { board } = game

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

  return (
    <group position={[-2, 0, 2]}>
      <group>
        {player.deadPieces.map((piece, p) => (
          <Piece
            key={piece.id}
            piece={piece}
            position={
              new Vector3(-1 - deadPositions[p].x, -deadPositions[p].y, 0)
            }
            selected={false}
            onPieceClick={() => console.log('click')}
          />
        ))}
      </group>
      <group>
        {rival.deadPieces.map((piece, p) => (
          <Piece
            key={piece.id}
            piece={piece}
            position={
              new Vector3(board[0].length + (p % 2), -p % board[0].length, 0)
            }
            selected={false}
            onPieceClick={() => console.log('click')}
          />
        ))}
      </group>
    </group>
  )
}
