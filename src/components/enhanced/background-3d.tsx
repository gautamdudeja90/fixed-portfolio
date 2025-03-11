"use client"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"
import { useClientOnly } from "@/lib/use-client-only"

interface Background3DProps {
  className?: string
  color?: string
  backgroundColor?: string
  mouseMultiplier?: number
  showPoints?: boolean
}

export function Background3D({
  className,
  color = "#3B82F6",
  backgroundColor = "transparent",
  mouseMultiplier = 0.4,
  showPoints = true,
}: Background3DProps) {
  const isClient = useClientOnly()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const animationFrameId = useRef<number>()
  
  useEffect(() => {
    if (!containerRef.current || !isClient) return
    
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(backgroundColor)
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Create lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.2,
    })
    
    const linesGeometry = new THREE.BufferGeometry()
    const linesArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      linesArray[i] = posArray[i]
      linesArray[i + 1] = posArray[i + 1]
      linesArray[i + 2] = posArray[i + 2]
    }
    
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesArray, 3))
    const linesMesh = new THREE.Line(linesGeometry, linesMaterial)
    scene.add(linesMesh)
    
    // Animation
    const animate = () => {
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
      
      linesMesh.rotation.x = particlesMesh.rotation.x
      linesMesh.rotation.y = particlesMesh.rotation.y
      
      renderer.render(scene, camera)
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animate()
    setIsLoaded(true)
    
    // Mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      
      mouse.current.x = ((event.clientX - rect.left) / width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / height) * 2 + 1
      
      particlesMesh.rotation.x += mouse.current.y * 0.001 * mouseMultiplier
      particlesMesh.rotation.y += mouse.current.x * 0.001 * mouseMultiplier
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      
      renderer.setSize(newWidth, newHeight)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [color, backgroundColor, mouseMultiplier, showPoints, isClient])
  
  if (!isClient) {
    return <div className={cn("absolute inset-0 w-full h-full", className)} ref={containerRef} />
  }
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full",
        isLoaded ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000",
        className
      )}
    />
  )
}