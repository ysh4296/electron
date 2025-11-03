import { GuideColor, GuideSize } from '@renderer/App';
import { useEffect, useRef, useState } from 'react';

type Postit = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    color?: string;
    text: string;
};

const sizeMap: Record<GuideSize, { w: number; h: number }> = {
    small: { w: 140, h: 80 },
    medium: { w: 280, h: 160 },
    large: { w: 420, h: 240 }
};
const colorMap: Record<GuideColor, string> = {
    red: '#ef4444',
    orange: '#f97316',
    yellow: '#fbbf24',
    green: '#22c55e',
    blue: '#3b82f6'
};

export function OverlayCanvas({
    focused,
    guideSize,
    guideColor
}: {
    focused: boolean;
    guideSize: GuideSize;
    guideColor: GuideColor;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [postits, setPostits] = useState<Postit[]>([]);
    const [overlayVisible, setOverlayVisible] = useState(true);

    useEffect(() => {
        window.customAPI?.onToggleOverlay?.(() => {
            setOverlayVisible((prev) => !prev);
        });

        return () => {
            // cleanup: ipcRenderer listener 제거
            const { customAPI } = window;
            const ipc = (customAPI as any)?.ipcRenderer;
            if (ipc?.removeListener)
                ipc.removeListener('toggle-overlay', () => {
                    setOverlayVisible((prev) => !prev);
                });
        };
    }, []);

    const draw = () => {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 포커스 상태에 따른 배경 처리
        if (focused) {
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (!overlayVisible) {
            return;
        }

        // 포스트잇 그리기
        postits.forEach((p) => {
            if (p.id == 'center') {
                // ✅ CENTER 포스트잇은 원으로 그리기
                ctx.beginPath();
                ctx.arc(
                    p.x + p.w / 2,
                    p.y + p.h / 2,
                    Math.min(p.w, p.h) / 2,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.fillStyle = p.color ?? '';
                ctx.strokeStyle = p.color ?? '';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(p.x, p.y, p.w, p.h);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = p.color ?? '';
                ctx.font = 'bold 16px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.text, p.x + p.w / 2, p.y + p.h / 2);
            }
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctxRef.current = ctx;

        const updateCanvasSize = () => {
            const ratio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;
            ctx.scale(ratio, ratio);

            // ✅ 캔버스 크기에 맞춰 포스트잇 배치 다시 계산
            const W = window.innerWidth;
            const H = window.innerHeight;
            const size = {
                w: sizeMap[guideSize].w,
                h: sizeMap[guideSize].h,
                c: colorMap[guideColor]
            };

            setPostits([
                {
                    id: 'north',
                    x: W / 2 - size.w / 2,
                    y: 0,
                    ...size,
                    text: 'NORTH',
                    color: size.c
                },
                {
                    id: 'south',
                    x: W / 2 - size.w / 2,
                    y: H - size.h,
                    ...size,
                    text: 'SOUTH',
                    color: size.c
                },
                {
                    id: 'west',
                    x: 0,
                    y: H / 2 - size.h / 2,
                    ...size,
                    text: 'WEST',
                    color: size.c
                },
                {
                    id: 'east',
                    x: W - size.w,
                    y: H / 2 - size.h / 2,
                    ...size,
                    text: 'EAST',
                    color: size.c
                },
                {
                    id: 'center',
                    x: W / 2 - size.w / 2,
                    y: H / 2 - size.h / 2,
                    ...size,
                    text: 'CENTER',
                    color: size.c
                }
            ]);
        };

        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, [guideSize, guideColor]);

    useEffect(() => {
        let animationId: number;
        const loop = () => {
            draw();
            animationId = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(animationId);
    }, [postits, focused, overlayVisible, guideSize, guideColor]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                zIndex: -1,
                pointerEvents: 'none',
                backgroundColor: 'transparent'
            }}
        />
    );
}
