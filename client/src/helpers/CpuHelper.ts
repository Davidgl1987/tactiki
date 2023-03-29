import { Game, createGame, createPlayer } from 'shared'
import { GameHelper } from './GameHelper'

export class CpuHelper implements GameHelper {
  game: Game
  updateGame = () => {
    return this.game
  }
  constructor() {
    this.game = createGame(
      createPlayer('human', 'Player', 'L'),
      createPlayer('cpu', 'CPU', 'R')
    )
  }
}
