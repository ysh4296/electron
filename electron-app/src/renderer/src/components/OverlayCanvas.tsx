import { useEffect, useRef } from 'react'

type Postit = {
    id: string
    x: number
    y: number
    w: number
    h: number
    color: string
    text: string
}

export function OverlayCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

    // 기본 포스트잇 5개
    const postits: Postit[] = [
        { id: 'north', x: 1200, y: 40, w: 140, h: 80, color: '#fef08a', text: 'NORTH' },
        { id: 'south', x: 1200, y: 1200, w: 140, h: 80, color: '#fef08a', text: 'SOUTH' },
        { id: 'west', x: 200, y: 600, w: 140, h: 80, color: '#fef08a', text: 'WEST' },
        { id: 'east', x: 2400, y: 600, w: 140, h: 80, color: '#fef08a', text: 'EAST' },
        { id: 'center', x: 1200, y: 600, w: 140, h: 80, color: '#fef08a', text: 'CENTER' },
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctxRef.current = ctx

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            draw()
        }
        window.addEventListener('resize', resize)
        resize()

        return () => window.removeEventListener('resize', resize)
    }, [])

    const draw = () => {
        const ctx = ctxRef.current
        if (!ctx) return
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        postits.forEach((p) => {
            ctx.fillStyle = p.color
            ctx.strokeStyle = '#222'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.roundRect(p.x, p.y, p.w, p.h, 10)
            ctx.fill()
            ctx.stroke()

            ctx.fillStyle = '#111'
            ctx.font = 'bold 16px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(p.text, p.x + p.w / 2, p.y + p.h / 2)
        })
    }

    // 단순히 draw loop 돌리기 (나중에 drag나 편집 추가 가능)
    useEffect(() => {
        let animationId: number
        const loop = () => {
            draw()
            animationId = requestAnimationFrame(loop)
        }
        loop()
        return () => cancelAnimationFrame(animationId)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[999]"
            style={{
                pointerEvents: 'none',
                backgroundColor: 'transparent' // ✅ 투명
            }}
        />
    )
}
