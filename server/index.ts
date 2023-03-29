import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'

import { PORT, ClientEvents, ServerEvents, RoomId, Room } from 'shared'
import { disconnect, joinRoom, changePlayerData, startGame } from './src'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const rooms: { [key: RoomId]: Room } = {}
const clients: { [key: string]: RoomId } = {}

io.on(ClientEvents.CONNECT, (socket: Socket) => {
  console.log(`${socket.id} se ha conectado`)

  socket.on(ClientEvents.DISCONNECT, () => {
    console.log(`${socket.id} se ha desconectado`)
    disconnect(io, socket, rooms)
  })

  let currentRoom: Room

  socket.onAny((eventName, ...args) => {
    // Check roomId and get room
    const roomId = clients[socket.id]
    if (eventName !== ClientEvents.JOIN_ROOM) {
      const room = rooms[roomId]
      if (!room) {
        io.to(socket.id).emit(ServerEvents.ROOM_NOT_FOUND)
      } else {
        currentRoom = room
      }
    }
  })

  socket.on(ClientEvents.JOIN_ROOM, ({ roomId }: { roomId: RoomId }) => {
    console.log(`Join room ${roomId} ${socket.id}`)
    joinRoom(io, socket, rooms, roomId, clients)
  })

  socket.on(ClientEvents.UPDATE_PLAYER, ({ name }: { name: string }) => {
    console.log(`Update player ${currentRoom.id} ${name} ${socket.id}`)
    changePlayerData(io, socket, currentRoom, name)
  })

  socket.on(ClientEvents.START_GAME, () => {
    console.log(`Start game! ${currentRoom.id}`)
    startGame(io, socket, currentRoom)
  })
})

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
