import {
  Environment,
  OrbitControls,
  PerformanceMonitor,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Board } from './Board'
import TikiModel from './TikiModel'
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
        <TikiModel position={[0, 0, 0]} color={'green'} />
        <TikiModel position={[1, 0, 0]} color={'red'} />
        <TikiModel position={[2, 0, 0]} color={'blue'} />
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
