import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { Socket } from 'socket.io-client'

import {
  canSelect,
  Game,
  Coordinates,
  getAvailableRevives,
  Piece,
  Room,
  ServerEvents,
  Side,
  getAvailableMoves,
  isValidRevive,
  isValidMove,
  makeMove,
  makeRevive,
} from 'shared'
import { GameHelper, VersusHelper, TurnsHelper, CpuHelper } from '@/helpers'

type Mode = 'VERSUS' | 'CPU' | 'TURNS'

interface Context {
  mode: Mode | null
  setMode: React.Dispatch<React.SetStateAction<Mode | null>>
  room: Room | null
  setRoom: React.Dispatch<React.SetStateAction<Room | null>>
  socket: Socket | null
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
  game: Game | null
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
  updateGame: (game: Game) => void
  side: Side | null
  setSide: React.Dispatch<React.SetStateAction<Side | null>>
  selectedPiece: Piece | null
  selectPiece: (piece: Piece | null, coords?: Coordinates) => void
  availableMoves: Coordinates[]
  movePiece: (coords: Coordinates) => void
  isValidMovement: (to: Coordinates) => boolean
}

const GameContext = createContext<Context>({
  mode: null,
  setMode: () => {},
  room: null,
  setRoom: () => {},
  socket: null,
  setSocket: () => {},
  game: null,
  setGame: () => {},
  updateGame: () => {},
  side: null,
  setSide: () => {},
  selectedPiece: null,
  selectPiece: () => {},
  availableMoves: [],
  movePiece: () => {},
  isValidMovement: () => {
    return true
  },
})

type Props = {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | string | string[]
}

export const GameContextProvider: React.FC<Props> = ({ children }) => {
  const [gameHelper, setGameHelper] = useState<GameHelper>()
  const [mode, setMode] = useState<Mode | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [side, setSide] = useState<Side | null>(null)
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null)
  const [availableMoves, setAvailableMoves] = useState<Coordinates[]>([])
  const [fromCoords, setFromCoords] = useState<Coordinates | null>(null)

  const [socket, setSocket] = useState<Socket | null>(null)
  const [room, setRoom] = useState<Room | null>(null)

  const toast = useToast()

  const selectPiece = (piece: Piece | null, coords?: Coordinates) => {
    if (!game) return
    if (piece === null || canSelect(game, piece)) {
      setSelectedPiece(piece)
      if (piece !== null) {
        const deadPieces =
          piece.side === 'L' ? game.deadPiecesL : game.deadPiecesR
        if (deadPieces.find((p) => p?.id === piece.id)) {
          setAvailableMoves(getAvailableRevives(game, piece))
        } else if (coords) {
          setAvailableMoves(getAvailableMoves(game, coords))
        }
      } else {
        setAvailableMoves([])
      }
    }
    setFromCoords(coords || null)
  }
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
      setSide(turnsHelper.game.currentPlayer)
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

  const updateGame = (game: Game) => {
    let gameUpdated = gameHelper?.updateGame(game)
    if (gameUpdated) setGame(gameUpdated)
  }

  const isValidMovement = (to: Coordinates): boolean => {
    if (!selectedPiece || !game) return false
    if (!fromCoords) {
      return isValidRevive(game, {
        side: selectedPiece.side,
        pieceId: selectedPiece.id,
        to,
      })
    } else {
      return isValidMove(game, { from: fromCoords, to })
    }
  }

  const movePiece = (to: Coordinates) => {
    if (!selectedPiece || !game) return
    if (!isValidMovement(to)) return
    let _game = null
    if (!fromCoords) {
      _game = makeRevive(game, {
        pieceId: selectedPiece.id,
        side: selectedPiece.side,
        to,
      })
    } else {
      _game = makeMove(game, { from: fromCoords, to })
    }
    setAvailableMoves([])
    setSelectedPiece(null)
    updateGame(_game)
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
        side,
        setSide,
        selectedPiece,
        selectPiece,
        availableMoves,
        isValidMovement,
        movePiece,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  return useContext(GameContext)
}
