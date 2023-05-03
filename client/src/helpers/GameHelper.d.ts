import { Game, Player } from 'shared'

export interface GameHelper {
  game: Game
  updateGame: (game: Game) => Game
}
