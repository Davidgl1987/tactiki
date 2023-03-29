import {
  OrbitControls,
  Environment,
  PerformanceMonitor,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Perf } from 'r3f-perf'

import { useGameContext } from '@/context'
import { ModalConnect, Ui, Board } from '@/components'
import { useToast } from '@chakra-ui/react'

export function Versus() {
  const { mode, setMode, game } = useGameContext()
  const [modalOpen, setModalOpen] = useState(true)
  const toast = useToast()

  useEffect(() => {
    setMode('VERSUS')
  }, [])

  useEffect(() => {
    if (game) setModalOpen(false)
  }, [game])

  const handleOnStart = () => {
    if (game !== null) setModalOpen(false)
  }

  if (!mode) return null

  return (
    <>
      <ModalConnect isOpen={modalOpen} onStart={handleOnStart} />
      <Ui />
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        shadows
        camera={{ position: [-6, 4, 0] }}
        onPointerMissed={() => {
          // selectedPice != null => selectedPice = null
        }}
      >
        <Perf />
        <PerformanceMonitor />
        <Board />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.5}
        />
        <Environment background preset="forest" />
        <ambientLight />
        <spotLight
          intensity={0.8}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
      </Canvas>
    </>
  )
}
