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
  density?: number
  particleSize?: number
}

export function Background3D({
  className,
  color = "#3B82F6",
  backgroundColor = "transparent",
  mouseMultiplier = 0.4,
  density = 1500,
  particleSize = 0.015,
}: Background3DProps) {
  const isClient = useClientOnly()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const mouse = useRef(new THREE.Vector2())
  const animationFrameId = useRef<number>()
  
  useEffect(() => {
    if (!containerRef.current || !isClient) return
    
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = backgroundColor === "transparent" 
      ? null 
      : new THREE.Color(backgroundColor)
    
    // Camera setup with refined FOV and position
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.z = 5
    
    // Renderer setup with antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    
    // Create particles with improved distribution
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = density
    const posArray = new Float32Array(particlesCount * 3)
    
    // Modified distribution for more natural clustering
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create clusters in 3D space
      const radius = 10
      const theta = THREE.MathUtils.randFloatSpread(360) 
      const phi = THREE.MathUtils.randFloatSpread(360)
      
      posArray[i] = radius * Math.sin(theta) * Math.cos(phi) * Math.random()
      posArray[i + 1] = radius * Math.sin(theta) * Math.sin(phi) * Math.random()
      posArray[i + 2] = radius * Math.cos(theta) * Math.random()
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    // Advanced particle material with bloom effect
    const particlesMaterial = new THREE.PointsMaterial({
      size: particleSize,
      sizeAttenuation: true,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(color, 0.1)
    scene.add(ambientLight)
    
    // Animation with improved rotation
    const animate = () => {
      particlesMesh.rotation.x += 0.0002
      particlesMesh.rotation.y += 0.0003
      
      renderer.render(scene, camera)
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animate()
    setIsLoaded(true)
    
    // Enhanced mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      
      // Normalized mouse coordinates
      mouse.current.x = ((event.clientX - rect.left) / width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / height) * 2 + 1
      
      // Smoother rotation based on mouse movement
      particlesMesh.rotation.x += mouse.current.y * 0.0005 * mouseMultiplier
      particlesMesh.rotation.y += mouse.current.x * 0.0005 * mouseMultiplier
      
      // Slight zoom effect
      camera.position.z += mouse.current.y * 0.005 * mouseMultiplier
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
      
      // Dispose resources
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [color, backgroundColor, mouseMultiplier, density, particleSize, isClient])
  
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