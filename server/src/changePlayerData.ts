import { ServerEvents, createPlayer, Room } from 'shared'
import { Server, Socket } from 'socket.io'

export function changePlayerData(
  io: Server,
  socket: Socket,
  room: Room,
  name: string
) {
  if (room.clientL?.socket === socket.id) {
    const player = createPlayer(socket.id, name, 'L')
    room.clientL.player = player
  }
  if (room.clientR?.socket === socket.id) {
    const player = createPlayer(socket.id, name, 'R')
    room.clientR.player = player
  }
  io.to(room.id).emit(ServerEvents.PLAYER_UPDATED, { room })
}
