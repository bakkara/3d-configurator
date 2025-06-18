import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { DragControls } from '@react-three/drei'


export default function TableModel({ url }) {
  const groupRef = useRef()
  const { scene } = useGLTF(url)

  // Обгортаємо лише саму модель в DragControls
  return (
    <DragControls objects={[groupRef]} transformGroup>
      <group ref={groupRef} position={[0, 0, 0]}>
        <primitive object={scene} scale={10} />
      </group>
    </DragControls>
  )
}
