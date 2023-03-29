import { Server, Socket } from 'socket.io'
import { RoomId, ServerEvents, Room } from 'shared'

export function disconnect(
  io: Server,
  socket: Socket,
  rooms: { [key: RoomId]: Room }
) {
  const disconected: string[] = []
  Object.values(rooms).forEach((room) => {
    let client = null
    if (room.clientL?.socket === socket.id) client = room.clientL
    if (room.clientR?.socket === socket.id) client = room.clientR
    io.to(room.id).emit(ServerEvents.DISCONNECTED, {
      client,
    })
    disconected.push(room.id)
  })
  disconected.forEach((r) => delete rooms[r])
}
