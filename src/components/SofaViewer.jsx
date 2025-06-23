import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RoomBackground from './RoomBackground'
import SofaModel from './SofaModel'
// import { TransformControls } from '@react-three/drei'
import DraggableModel from './DraggableModel'


const sofaOptions = [
  { name: 'Beige Sofa', url: '/3d-configurator/models/Frankof_Norman_sofa_Beige.glb' },
  { name: 'Brown Sofa', url: '/3d-configurator/models/Frankof_Norman_sofa_Brown.glb' },
  { name: 'Module Beige', url: '/3d-configurator/models/Frankof_NormanModule_Beige.glb' },
]

export default function Configurator() {
  const [sofas, setSofas] = useState([])

  const addSofa = (url) => {
    const posX = sofas.length * 5
    setSofas([...sofas, { url, position: [posX, 0, 0] }])
  }

  const removeSofa = (indexToRemove) => {
    setSofas(sofas.filter((_, idx) => idx !== indexToRemove))
  }
  const rotateSofa = (index, delta) => {
    const updated = [...sofas]
    updated[index].rotation = (updated[index].rotation || 0) + delta
    setSofas(updated)
  }

  return (
    <>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        {sofaOptions.map((item, idx) => (
          <button key={idx} onClick={() => addSofa(item.url)} style={{ margin: 4 }}>
            {item.name}
          </button>
        ))}
        {sofas.map((sofa, idx) => (
  <div key={idx}>
    <span>{`Sofa ${idx + 1}`}</span>
    <button onClick={() => rotateSofa(idx, 0.1)}>⟲</button>
    <button onClick={() => rotateSofa(idx, -0.1)}>⟳</button>
    <button onClick={() => removeSofa(idx)}>❌</button>
  </div>
))}
      </div> 
        <RoomBackground />
      <Canvas camera={{ position: [0, 5, 20], fov: 50 }} onContextMenu={(e) => e.preventDefault()}>
      <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 20, 15]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
  


  {sofas.map((sofa, idx) => (
    <DraggableModel
    key={idx}
    position={sofa.position}
    rotation={sofa.rotation} // передаємо кнопку rotation
  >
    <SofaModel url={sofa.url} />
  </DraggableModel>
  ))}

  <OrbitControls enableRotate={false} />
</Canvas>
    </>
  )
}
