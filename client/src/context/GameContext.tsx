import { createContext, useContext, useState, useEffect } from 'react'
import { Game, Room, RoomId, ServerEvents } from 'shared'
import { GameHelper, VersusHelper, TurnsHelper, CpuHelper } from '../helpers'
import { useToast } from '@chakra-ui/react'
import { Socket } from 'socket.io-client'

type Mode = 'VERSUS' | 'CPU' | 'TURNS' | null

interface Context {
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
  room?: Room
  setRoom: React.Dispatch<React.SetStateAction<Room | undefined>>
  socket?: Socket
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>
  game?: Game
  setGame: React.Dispatch<React.SetStateAction<Game | undefined>>
  updateGame: () => void
}

const GameContext = createContext<Context>({
  mode: null,
  setMode: () => {},
  room: undefined,
  setRoom: (): void => {},
  socket: undefined,
  setSocket: (): void => {},
  game: undefined,
  setGame: (): void => {},
  updateGame: (): void => {},
})

type Props = {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | string | string[]
}

export const GameContextProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(null)
  const [game, setGame] = useState<Game>()
  const [gameHelper, setGameHelper] = useState<GameHelper>()

  const [socket, setSocket] = useState<Socket>()
  const [room, setRoom] = useState<Room>()

  const toast = useToast()

  useEffect(() => {
    if (mode === 'VERSUS') {
      if (socket && game) {
        const versusHelper = new VersusHelper(socket, game, setGame)
        setGameHelper(versusHelper)
        setGame(versusHelper.game)
        socket.on(ServerEvents.DISCONNECTED, disconnected)
      }
    }
    if (mode === 'TURNS') {
      const turnsHelper = new TurnsHelper()
      setGameHelper(turnsHelper)
      setGame(turnsHelper.game)
    }
    if (mode === 'CPU') {
      const cpuHelper = new CpuHelper()
      setGameHelper(cpuHelper)
      setGame(cpuHelper.game)
    }
  }, [mode])

  const disconnected = ({ socketId }: { socketId: string }) => {
    if (!socket) return
    let description = ''
    if (socket.id === socketId) {
      description = "You've disconnected"
    } else {
      description = 'Your opponent was disconnected'
    }
    toast({
      duration: 3000,
      title: 'Player disconected',
      description,
    })
  }

  const updateGame = () => {
    gameHelper?.updateGame()
  }

  return (
    <GameContext.Provider
      value={{
        mode,
        setMode,
        room,
        setRoom,
        socket,
        setSocket,
        game,
        setGame,
        updateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  return useContext(GameContext)
}
