import { useEffect, useRef, useState } from 'react'

type Postit = {
    id: string
    x: number
    y: number
    w: number
    h: number
    color?: string
    text: string
}

export function OverlayCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const [postits, setPostits] = useState<Postit[]>([])

    const draw = () => {
        const ctx = ctxRef.current
        const canvas = canvasRef.current
        if (!ctx || !canvas) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        postits.forEach((p) => {
            ctx.fillStyle = p.color ?? ''
            ctx.strokeStyle = '#abb33bff'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.roundRect(p.x, p.y, p.w, p.h, 10)
            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = '#347562ff'
            ctx.font = 'bold 16px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(p.text, p.x + p.w / 2, p.y + p.h / 2)
        })
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctxRef.current = ctx

        const updateCanvasSize = () => {
            const ratio = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * ratio
            canvas.height = window.innerHeight * ratio
            ctx.scale(ratio, ratio)

            // ✅ 캔버스 크기에 맞춰 포스트잇 배치 다시 계산
            const W = window.innerWidth
            const H = window.innerHeight
            const size = { w: 140, h: 80, c: '#fef08a' }

            setPostits([
                { id: 'north', x: W / 2 - size.w / 2, y: 40, ...size, text: 'NORTH' },
                { id: 'south', x: W / 2 - size.w / 2, y: H - size.h - 40, ...size, text: 'SOUTH' },
                { id: 'west', x: 40, y: H / 2 - size.h / 2, ...size, text: 'WEST' },
                { id: 'east', x: W - size.w - 40, y: H / 2 - size.h / 2, ...size, text: 'EAST' },
                { id: 'center', x: W / 2 - size.w / 2, y: H / 2 - size.h / 2, ...size, text: 'CENTER' },
            ])
        }

        window.addEventListener('resize', updateCanvasSize)
        updateCanvasSize()

        return () => window.removeEventListener('resize', updateCanvasSize)
    }, [])

    useEffect(() => {
        let animationId: number
        const loop = () => {
            draw()
            animationId = requestAnimationFrame(loop)
        }
        loop()
        return () => cancelAnimationFrame(animationId)
    }, [postits])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[999]"
            style={{
                pointerEvents: 'none',
                backgroundColor: 'transparent'
            }}
        />
    )
}
