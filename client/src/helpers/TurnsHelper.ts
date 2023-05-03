import { createGame, createPlayer, Game, Phase, startGame } from 'shared'
import { GameHelper } from '@/helpers'

export class TurnsHelper implements GameHelper {
  game: Game
  updateGame = (game: Game): Game => {
    this.game = game
    if (game.phase === Phase.Setup) {
      if (
        game.currentPlayer === 'L' &&
        game.deadPiecesL.every((piece) => piece === null)
      ) {
        game.currentPlayer = 'R'
      }
      if (
        game.currentPlayer === 'R' &&
        game.deadPiecesR.every((piece) => piece === null)
      ) {
        game.currentPlayer = 'L'
      }
      if (
        game.deadPiecesL.every((piece) => piece === null) &&
        game.deadPiecesR.every((piece) => piece === null)
      ) {
        game.phase = Phase.Playing
      }
    }
    return this.game
  }
  constructor() {
    const game = createGame(
      createPlayer('p1', 'Player 1', 'L'),
      createPlayer('p2', 'Player 2', 'R')
    )
    this.game = startGame(game)
  }
}
