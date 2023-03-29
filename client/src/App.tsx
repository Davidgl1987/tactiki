import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameContextProvider } from '@/context/GameContext'
import { Cpu, Home, Turns, Versus } from '@/views'

function App() {
  return (
    <ChakraProvider>
      <GameContextProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/versus/:roomId" element={<Versus />} />
            <Route path="/turns" element={<Turns />} />
            <Route path="/cpu" element={<Cpu />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GameContextProvider>
    </ChakraProvider>
  )
}

export default App
