import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import TableModel from './TableModel'
import { useState } from 'react'

const models = {
  'L56': '/public/models/urban-kruglyj_l56.glb',
  'L63': '/public/models/urban-kruglyj_l63.glb',
  'L113': '/public/models/urban-kruglyj_l113.glb',
  'L115': '/public/models/urban-kruglyj_l115.glb',
}



export default function SofaViewer() {
  const [modelUrl, setModelUrl] = useState(models['L56'])

  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        {Object.keys(models).map(key => (
          <button key={key} onClick={() => setModelUrl(models[key])} style={{ marginRight: 10 }}>
            Модель {key}
          </button>
        ))}
      </div>

      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />

        {/* Підлога (НЕ draggable) */}
        <gridHelper args={[20, 20]} position={[0, 0, 0]} />

        {/* Стіл (тільки він draggable) */}
        <TableModel url={modelUrl} />

        <OrbitControls />
      </Canvas>
    </>
  )
}
