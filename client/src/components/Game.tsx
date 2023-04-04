import {
  Environment,
  OrbitControls,
  PerformanceMonitor,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Board } from './Board'
import { Ui } from './Ui'

export const Game = () => {
  return (
    <>
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
        <ambientLight intensity={0.4} />
        <directionalLight />
      </Canvas>
    </>
  )
}
