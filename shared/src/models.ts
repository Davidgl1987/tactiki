export type Side = 'L' | 'R'
export type Board = Piece[][][]
export type RoomId = string
export type PlayerId = string
export type PieceId = string

export interface Game {
  board: Board
  playerL: Player
  playerR: Player
  deadPiecesL: (Piece | null)[]
  deadPiecesR: (Piece | null)[]
  currentPlayer: Side
  currentPlayerTurns: number
  phase: Phase
  gameOver: boolean
  battleCoords: Coordinates | null
}

export interface Piece {
  side: Side
  value: number
  id: PieceId
}

export interface Coordinates {
  x: number
  y: number
}

export interface Player {
  id: PlayerId
  name: string
  side: Side
}

export interface Move {
  from: Coordinates
  to: Coordinates
}

export interface Revive {
  side: Side
  pieceId: PieceId
  to: Coordinates
}

export enum Phase {
  Setup,
  Playing,
  Battle,
  GameOver,
}

export interface Room {
  id: RoomId
  clientL: Client | null
  clientR: Client | null
  game: Game | null
}

export interface Client {
  socket: string
  player: Player
  ready: boolean
}
