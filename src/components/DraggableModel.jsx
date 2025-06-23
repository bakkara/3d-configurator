import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useGesture } from '@use-gesture/react'
import * as THREE from 'three'

export default function DraggableModel({ children, position, rotation = [0, 0, 0] }) {
    const meshRef = useRef()
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
  
    const [pos, setPos] = useState(() => new THREE.Vector3(...position))
    const [rot, setRot] = useState(() => new THREE.Euler(...rotation))
  
    const bind = useGesture({
      onDrag: ({ offset: [x, y], ctrlKey, shiftKey, altKey }) => {
        if (ctrlKey) {
          setRot((prev) => new THREE.Euler(prev.x, prev.y + 0.05, prev.z)) // Y
        } else if (shiftKey) {
          setRot((prev) => new THREE.Euler(prev.x + 0.05, prev.y, prev.z)) // X
        } else if (altKey) {
          setRot((prev) => new THREE.Euler(prev.x, prev.y, prev.z + 0.05)) // Z
        } else {
          setPos(new THREE.Vector3(x / aspect, -y / aspect, pos.z))
        }
      }
    })
  
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.position.lerp(pos, 0.2)
        meshRef.current.rotation.x = rot.x
        meshRef.current.rotation.y = rot.y
        meshRef.current.rotation.z = rot.z
      }
    })
  
    return (
      <group ref={meshRef} {...bind()}>
        {children}
      </group>
    )
  }
  
