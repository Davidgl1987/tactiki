import {
  Board,
  Player,
  Move,
  Phase,
  Revive,
  Coordinates,
  Piece,
  PlayerId,
  Side,
  Game,
} from './models'

export function createGame(playerL: Player, playerR: Player): Game {
  return {
    phase: Phase.Setup,
    currentPlayerTurns: 2,
    battleCoords: null,
    board: [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ],
    currentPlayer: Math.round(Math.random()) ? 'L' : 'R',
    playerL,
    playerR,
    deadPiecesL: [],
    deadPiecesR: [],
    gameOver: false,
  }
}

export function createPlayer(id: PlayerId, name: string, side: Side): Player {
  return {
    id,
    name,
    side,
  }
}

export function generateDeadPieces(side: Side) {
  return [
    {
      id: `${side}0`,
      side,
      value: 1,
    },
    {
      id: `${side}1`,
      side,
      value: 2,
    },
    {
      id: `${side}2`,
      side,
      value: 3,
    },
    {
      id: `${side}3`,
      side,
      value: 4,
    },
    {
      id: `${side}4`,
      side,
      value: 5,
    },
    {
      id: `${side}5`,
      side,
      value: 1,
    },
    {
      id: `${side}6`,
      side,
      value: 2,
    },
    {
      id: `${side}7`,
      side,
      value: 3,
    },
    {
      id: `${side}8`,
      side,
      value: 4,
    },
    {
      id: `${side}9`,
      side,
      value: 5,
    },
  ].sort((a, b) => 0.5 - ((Date.now() * Math.random()) % 1))
}

export function setPlayerData(state: Game, side: Side, name: string): Game {
  const game = { ...state }
  if (side === 'L') game.playerL.name = name
  if (side === 'R') game.playerR.name = name
  return game
}

export function startGame(state: Game): Game {
  const game = { ...state }
  game.phase = Phase.Setup
  game.deadPiecesL = generateDeadPieces('L')
  game.deadPiecesR = generateDeadPieces('R')
  return game
}

export function makeRevive(state: Game, revive: Revive): Game {
  const game = { ...state }
  if (!isValidRevive(game, revive)) return game
  const deadPieces = revive.side === 'L' ? game.deadPiecesL : game.deadPiecesR
  const piece = deadPieces.find((piece) => piece?.id === revive.pieceId)
  if (piece) {
    game.board[revive.to.x][revive.to.y].push(piece)
    deadPieces[deadPieces.findIndex((piece) => piece?.id === revive.pieceId)] =
      null
  }
  if (game.phase === Phase.Setup) {
    if (game.deadPiecesL.length === 0 && game.deadPiecesR.length === 0) {
      game.phase = Phase.Playing
    }
    return game
  }
  if (game.phase === Phase.Playing) game.currentPlayer = getNextPlayer(game)
  return game
}

export function getNextPlayer(state: Game): Side {
  return state.currentPlayer === 'L' ? 'R' : 'L'
}

export function makeMove(state: Game, move: Move): Game {
  const game = { ...state }
  if (!isValidMove(game, move)) return game
  // Movemos la pieza
  const piece = game.board[move.from.x][move.from.y].pop()
  if (!piece) return game
  game.board[move.to.x][move.to.y].push(piece)

  //Miramos si ha ganado alguien
  if (isWinningMove(game, move)) {
    game.gameOver = true
    return game
  }

  // Miramos si se produce un combate
  if (game.board[move.to.x][move.to.y].length >= 2) {
    const cell = game.board[move.to.x][move.to.y]
    if (cell[cell.length - 1].side !== cell[cell.length - 2].side) {
      game.phase = Phase.Battle
      game.battleCoords = { x: move.to.x, y: move.to.y }
    }
  }

  // Actualizamos el turno
  game.currentPlayerTurns--
  if (game.currentPlayerTurns === 0) {
    game.currentPlayer = getNextPlayer(game)
    game.currentPlayerTurns = 2
  }
  return game
}

export function makeBattle(state: Game): Game {
  const game = { ...state }
  if (game.battleCoords === null) return game
  const attacker = game.board[game.battleCoords.x][game.battleCoords.y].pop()
  const defender = game.board[game.battleCoords.x][game.battleCoords.y].pop()
  if (!attacker || !defender) return game
  let winner: Piece | null = null
  let loser: Piece | null = null
  if (attacker.value === 5 && defender.value === 1) {
    winner = defender
    loser = attacker
  }
  if (attacker.value === 1 && defender.value === 5) {
    winner = attacker
    loser = defender
  }
  if (!winner && !loser) {
    if (attacker.value > defender.value) {
      winner = attacker
      loser = defender
    }
    if (attacker.value < defender.value) {
      winner = defender
      loser = attacker
    }
    if (winner && loser) {
      game.board[game.battleCoords.x][game.battleCoords.y].push(winner)
      if (loser.side === 'L') game.deadPiecesL.push(loser)
      if (loser.side === 'R') game.deadPiecesR.push(loser)
    }
  }

  if (
    attacker.value === defender.value ||
    game.board[game.battleCoords.x][game.battleCoords.y].length === 1
  ) {
    game.phase = Phase.Playing
    game.battleCoords = null
  }
  return game
}

export function getAvailableMoves(
  state: Game,
  coord: Coordinates
): Coordinates[] {
  let coords: Coordinates[] = []
  if (state.phase === Phase.Playing) {
    const cell = state.board[coord.x][coord.y]
    if (cell.length > 0 && cell[cell.length - 1].side === 'L') {
      coords.push({ x: coord.x, y: coord.y + 1 })
      coords.push({ x: coord.x, y: coord.y - 1 })
      coords.push({ x: coord.x + 1, y: coord.y })
    }
    if (cell.length > 0 && cell[cell.length - 1].side === 'R') {
      coords.push({ x: coord.x, y: coord.y + 1 })
      coords.push({ x: coord.x, y: coord.y - 1 })
      coords.push({ x: coord.x - 1, y: coord.y })
    }
    coords = coords.filter(
      (coord) =>
        coord.x < state.board.length &&
        coord.y < state.board[0].length &&
        coord.x >= 0 &&
        coord.y >= 0
    )
  }
  return coords
}

export function getAvailableRevives(state: Game, piece: Piece): Coordinates[] {
  let coords: Coordinates[] = []
  const firstRow = piece.side === 'L' ? 0 : state.board.length - 1
  state.board[firstRow].forEach((cell, col) => {
    if (
      (state.phase === Phase.Setup && cell.length < 2) ||
      (state.phase === Phase.Playing && cell.length === 0)
    )
      coords.push({ x: firstRow, y: col })
  })
  return coords
}

export function isValidRevive(state: Game, revive: Revive): boolean {
  const deadPieces = revive.side === 'L' ? state.deadPiecesL : state.deadPiecesR
  // No es una pieza muerta válida del jugador
  if (!deadPieces.find((piece) => piece?.id === revive.pieceId)) {
    return false
  }
  // El jugador 0 sólo puede ponerlas en la primera fila
  if (state.currentPlayer === 'L' && revive.to.x !== 0) return false
  // El jugador 1 sólo puede ponerlas en la última fila
  if (state.currentPlayer === 'R' && revive.to.x !== 4) return false
  // Sólo se pueden poner 2 fichas por casilla
  if (state.board[revive.to.x][revive.to.y].length >= 2) return false
  // Durante el juego no se pueden revivir a menos q la casilla esté libre
  if (
    state.phase === Phase.Playing &&
    state.board[revive.to.x][revive.to.y].length !== 0
  ) {
    return false
  }
  // Durante el juego revivir una pieza consume dos puntos
  if (state.phase === Phase.Playing && state.currentPlayerTurns < 2) {
    return false
  }
  return true
}

export function isValidMove(state: Game, move: Move): boolean {
  if (state.phase !== Phase.Playing) return false
  if (move.to.x >= state.board.length || move.to.y >= state.board[0].length)
    return false
  if (state.currentPlayer === 'L') {
    if (
      move.from.x + 1 === move.to.x ||
      move.from.x - 1 === move.to.x ||
      move.from.y + 1 === move.to.y
    )
      return true
  }
  if (state.currentPlayer === 'R') {
    if (
      move.from.x + 1 === move.to.x ||
      move.from.x - 1 === move.to.x ||
      move.from.y - 1 === move.to.y
    )
      return true
  }
  return false
}

export function isWinningMove(state: Game, move: Move): boolean {
  if (
    state.board[move.to.x][move.to.y].length === 5 &&
    state.board[move.to.x][move.to.y].every(
      (piece) => piece.side === state.currentPlayer
    )
  )
    return true
  else return false
}

export function isGameOver(state: Game): boolean {
  return state.gameOver
}

export function getBoard(state: Game): Board {
  return state.board
}

export function getPhase(state: Game): Phase {
  return state.phase
}

export function canSelect(state: Game, piece: Piece): boolean {
  if (state.currentPlayer !== piece.side) return false
  if (state.phase === Phase.Setup) {
    if (
      piece.side === 'L' &&
      !state.deadPiecesL.find((p) => p?.id === piece.id)
    )
      return false
    if (
      piece.side === 'R' &&
      !state.deadPiecesR.find((p) => p?.id === piece.id)
    )
      return false
  }
  return true
}
