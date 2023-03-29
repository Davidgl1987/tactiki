import { createGame, createPlayer, Game } from 'shared'
import { GameHelper } from './GameHelper'

export class TurnsHelper implements GameHelper {
  game: Game
  updateGame = () => {
    return this.game
  }
  constructor() {
    this.game = createGame(
      createPlayer('p1', 'Player 1', 'L'),
      createPlayer('p2', 'Player 2', 'R')
    )
  }
}
