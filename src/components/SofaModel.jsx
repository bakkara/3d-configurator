// import { useGLTF } from '@react-three/drei'
// import { useRef } from 'react'
// import { DragControls } from '@react-three/drei'


// export default function SofaModel({ url }) {
//   const groupRef = useRef()
//   const { scene } = useGLTF(url)

//   return (
//     <DragControls objects={[groupRef]} transformGroup>
//       <group ref={groupRef} position={[0, 0, 0]}>
//         <primitive object={scene} scale={10} />
//       </group>
//     </DragControls>
//   )
// }

import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function SofaModel({ url, position }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
      }
    })
  }, [scene])

  return (
    <primitive object={scene} ref={modelRef} position={position} scale={8} />
  )
}