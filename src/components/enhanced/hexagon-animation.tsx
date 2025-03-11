"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface HexagonAnimationProps {
  className?: string
  opacity?: number
  rotationSpeedY?: number // optional prop for external rotation control
}

export function HexagonAnimation({
  className = "",
  opacity = 0.15,
  rotationSpeedY = 0.003
}: HexagonAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // ─────────────────────────────────────────────────────────────────
    // Instead of a cuboid, we define an icosahedron (12 vertices, 30 edges).
    // We'll adapt the same bounding logic so balls still bounce around.
    // ─────────────────────────────────────────────────────────────────

    // Use one dimension for bounding and naming, so the code remains consistent.
    // Our shape is a wireframe icosahedron of radius ~ "CUBOID_WIDTH / 2"
    const CUBOID_WIDTH = 300 
    const CUBOID_HEIGHT = 300
    const CUBOID_DEPTH = 300

    // For the icosahedron geometry, we first define the 12 vertices in 3D,
    // using the golden ratio, then scale them. 
    const phi = (1 + Math.sqrt(5)) / 2
    // We'll keep them within ~ [-150..150].
    const scaleFactor = CUBOID_WIDTH / 2

    // 12 vertices of an icosahedron, oriented around origin:
    // (0, ±1, ±phi), (±1, ±phi, 0), (±phi, 0, ±1)
    const rawVertices = [
      [ 0,    1,    +phi ],
      [ 0,   -1,    +phi ],
      [ 0,    1,    -phi ],
      [ 0,   -1,    -phi ],
      [ +1,   +phi,  0   ],
      [ -1,   +phi,  0   ],
      [ +1,   -phi,  0   ],
      [ -1,   -phi,  0   ],
      [ +phi,  0,    +1  ],
      [ -phi,  0,    +1  ],
      [ +phi,  0,    -1  ],
      [ -phi,  0,    -1  ],
    ].map(([x, y, z]) => [
      x * scaleFactor,
      y * scaleFactor,
      z * scaleFactor
    ])

    // 30 edges, referencing vertex indices above:
    const icosaEdges = [
      [0,1],[0,4],[0,5],[0,8],[0,9],
      [1,4],[1,5],[1,6],[1,9],
      [2,3],[2,4],[2,5],[2,7],[2,11],
      [3,6],[3,7],[3,10],[3,11],
      [4,5],[4,8],
      [5,9],
      [6,7],[6,8],[6,9],[6,10],
      [7,9],[7,11],
      [8,9],[8,10],
      [10,11],
    ]

    // Ball behavior remains the same, but they bounce inside the bounding box: 
    // [-CUBOID_WIDTH/2, +CUBOID_WIDTH/2] in x, etc.
    const BALL_COUNT = 15
    const MAX_SPEED = 0.8
    const perspective = 600

    let rotationY = 0

    interface Ball {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      radius: number
      color: string
    }

    let balls: Ball[] = []

    // Projection & rotation functions remain the same
    function projectTo2D(x: number, y: number, z: number) {
      const scale = perspective / (perspective - z)
      return { x: x * scale, y: y * scale }
    }

    function rotateY3D(x: number, y: number, z: number, angle: number) {
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const nx = x * cosA + z * sinA
      const nz = -x * sinA + z * cosA
      return { x: nx, y, z: nz }
    }

    // Draw wireframe edges for the icosahedron
    function drawIcosahedron() {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      ctx.beginPath()

      for (const [startIndex, endIndex] of icosaEdges) {
        const [sx, sy, sz] = rawVertices[startIndex]
        const [ex, ey, ez] = rawVertices[endIndex]

        const startRot = rotateY3D(sx, sy, sz, rotationY)
        const endRot   = rotateY3D(ex, ey, ez, rotationY)

        const start2D  = projectTo2D(startRot.x, startRot.y, startRot.z)
        const end2D    = projectTo2D(endRot.x, endRot.y, endRot.z)

        ctx.moveTo(centerX + start2D.x, centerY + start2D.y)
        ctx.lineTo(centerX + end2D.x, centerY + end2D.y)
      }

      ctx.strokeStyle = "#444"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Reuse same approach for balls: random positions within bounding box
    function initBalls() {
      balls = []
      for (let i = 0; i < BALL_COUNT; i++) {
        const radius = 3 + Math.random() * 4
        balls.push({
          x: (Math.random() - 0.5) * (CUBOID_WIDTH - radius * 2),
          y: (Math.random() - 0.5) * (CUBOID_HEIGHT - radius * 2),
          z: (Math.random() - 0.5) * (CUBOID_DEPTH - radius * 2),
          vx: (Math.random() * 2 - 1) * MAX_SPEED,
          vy: (Math.random() * 2 - 1) * MAX_SPEED,
          vz: (Math.random() * 2 - 1) * MAX_SPEED,
          color: "#3B82F6", // Blue
          radius
        })
      }
    }

    function updateBalls() {
      for (const ball of balls) {
        ball.x += ball.vx
        ball.y += ball.vy
        ball.z += ball.vz

        // bounce if ball hits the bounding box walls
        if (ball.x + ball.radius >  CUBOID_WIDTH / 2 || ball.x - ball.radius < -CUBOID_WIDTH / 2) {
          ball.vx = -ball.vx
        }
        if (ball.y + ball.radius >  CUBOID_HEIGHT / 2 || ball.y - ball.radius < -CUBOID_HEIGHT / 2) {
          ball.vy = -ball.vy
        }
        if (ball.z + ball.radius >  CUBOID_DEPTH / 2 || ball.z - ball.radius < -CUBOID_DEPTH / 2) {
          ball.vz = -ball.vz
        }
      }
    }

    function drawBalls() {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (const ball of balls) {
        const rotated = rotateY3D(ball.x, ball.y, ball.z, rotationY)
        const { x: px, y: py } = projectTo2D(rotated.x, rotated.y, rotated.z)
        ctx.beginPath()
        ctx.arc(centerX + px, centerY + py, ball.radius, 0, 2 * Math.PI)
        ctx.fillStyle = ball.color
        ctx.fill()
      }
    }

    function updateCanvasSize() {
      const container = canvas.parentElement
      if (!container) return
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    window.addEventListener("resize", updateCanvasSize)
    updateCanvasSize()
    initBalls()

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = opacity

      // Rotate by user-defined speed
      rotationY += rotationSpeedY

      updateBalls()
      drawIcosahedron()
      drawBalls()

      requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [opacity, rotationSpeedY])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
