import { createGame, createPlayer, Game, startGame } from 'shared'
import { GameHelper } from './GameHelper'

export class TurnsHelper implements GameHelper {
  game: Game
  updateGame = () => {
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
