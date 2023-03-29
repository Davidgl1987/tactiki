import { RoomId, ServerEvents, createPlayer, Room, Client } from 'shared'
import { Server, Socket } from 'socket.io'

export function joinRoom(
  io: Server,
  socket: Socket,
  rooms: { [key: string]: Room },
  roomId: RoomId,
  clients: { [key: string]: string }
) {
  if (rooms[roomId]) {
    const room = rooms[roomId]
    if (room && room.clientL && room.clientR) {
      io.to(socket.id).emit(ServerEvents.ROOM_FULL)
    } else {
      //join
      if (!room) {
        io.to(socket.id).emit(ServerEvents.ROOM_NOT_FOUND)
      } else if (
        room.clientL?.socket === socket.id ||
        room.clientR?.socket === socket.id
      ) {
        io.to(roomId).emit(ServerEvents.PLAYER_ALREADY_CONNECTED)
      } else {
        room.clientR = {
          socket: socket.id,
          player: createPlayer(socket.id, 'Player 2', 'R'),
          ready: false,
        } as Client
        socket.join(roomId)
        clients[socket.id] = roomId
        if (!room.clientL?.player) {
          console.error(
            'No existe algún jugador en esta sala',
            JSON.stringify(room)
          )
        } else {
          io.to(roomId).emit(ServerEvents.ROOM_JOINED, { room })
        }
      }
    }
  } else {
    // create player & room
    const room = {
      id: roomId,
      clientL: {
        socket: socket.id,
        player: createPlayer(socket.id, 'Player 1', 'L'),
        ready: false,
      } as Client,
      clientR: null,
      game: null,
    } as Room
    rooms[roomId] = room
    socket.join(roomId)
    clients[socket.id] = roomId
    io.to(socket.id).emit(ServerEvents.ROOM_JOINED, { room })
  }
}
