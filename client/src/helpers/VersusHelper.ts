import { Game } from 'shared'
import { Socket } from 'socket.io-client'

import { GameHelper } from '@/helpers'

export class VersusHelper implements GameHelper {
  socket: Socket
  game: Game
  updateGame = () => this.game
  constructor(socket: Socket, game: Game, setGame: any) {
    this.game = game
    this.socket = socket
  }
}
