import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { io, Socket } from 'socket.io-client'
import {
  Client,
  ClientEvents,
  Game,
  PORT,
  Room,
  ServerEvents,
  SERVER_HOST,
} from 'shared'

export const useLobby = ({
  onGameStarted,
}: {
  onGameStarted?: (game: Game) => void
}) => {
  const socket = useRef<Socket>()
  const [room, setRoom] = useState<Room>()
  const [game, setGame] = useState<Game>()
  const { roomId } = useParams()
  const toast = useToast()

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`${SERVER_HOST}:${PORT}`)
    }
    socket.current.on('connect', () => {
      joinRoom()
      socket.current?.on(
        ServerEvents.DISCONNECTED,
        ({ client }: { client: Client }) => {
          if (client.socket !== socket.current?.id) {
            toast({
              title: 'User disconnected',
              description: `${client.player.name} has gone`,
              status: 'error',
              duration: 2000,
            })
          }
        }
      )
      socket.current?.on(
        ServerEvents.ROOM_JOINED,
        ({ room }: { room: Room }) => {
          setRoom(room)
        }
      )
      socket.current?.on(
        ServerEvents.PLAYER_UPDATED,
        ({ room }: { room: Room }) => {
          setRoom(room)
        }
      )
      socket.current?.on(
        ServerEvents.GAME_STARTED,
        ({ game }: { game: Game }) => {
          setGame(game)
          if (onGameStarted) onGameStarted(game)
        }
      )
    })
  }, [])

  const joinRoom = () => {
    if (!socket.current) {
      console.error('No hay socket')
      return
    }
    if (!roomId) {
      console.error('No hay roomId')
      return
    }
    console.log(`send join ${roomId}`)
    socket.current.emit(ClientEvents.JOIN_ROOM, { roomId })
  }

  const updatePlayer = (name: string) => {
    if (!socket.current) {
      console.error('No hay socket')
      return
    }
    socket.current.emit(ClientEvents.UPDATE_PLAYER, { name })
  }

  const startGame = () => {
    if (!socket.current) {
      console.error('No hay socket')
      return
    }
    socket.current.emit(ClientEvents.START_GAME)
  }

  const player =
    socket.current && socket.current?.id === room?.clientL?.socket
      ? room?.clientL
      : room?.clientR || null

  const rival =
    socket.current && socket.current?.id === room?.clientL?.socket
      ? room?.clientR
      : room?.clientL || null

  return {
    socket: socket.current,
    room,
    game,
    joinRoom,
    updatePlayer,
    startGame,
    player,
    rival,
  }
}
