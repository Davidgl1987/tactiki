import { createGame, ServerEvents, Room } from 'shared'
import { Server, Socket } from 'socket.io'

export function startGame(io: Server, socket: Socket, room: Room) {
  const { clientL, clientR } = room
  if (!clientL || !clientR) {
    console.error('No existe algún jugador en esta sala', JSON.stringify(room))
    return
  }
  if (clientL.socket === socket.id && !clientL.ready) {
    clientL.ready = true
  }
  if (clientR.socket === socket.id && !clientR.ready) {
    clientR.ready = true
  }
  if (clientL.ready && clientR.ready) {
    room.game = createGame(clientL.player, clientR.player)
    io.to(room.id).emit(ServerEvents.GAME_STARTED, { game: room.game })
  } else {
    io.to(room.id).emit(ServerEvents.PLAYER_UPDATED, { room })
  }
}
