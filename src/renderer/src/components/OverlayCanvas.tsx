import { GuideColor, GuideSize } from '@renderer/App';
import { layouts } from '@renderer/layouts';
import { useEffect, useRef, useState } from 'react';

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
  guideColor,
  guideOpacity,
  guideType
}: {
  focused: boolean;
  guideSize: GuideSize;
  guideColor: GuideColor;
  guideOpacity: number;
  guideType: string;
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

    postits.forEach((p) => {
      ctx.save();
      ctx.fillStyle = colorMap[guideColor] ?? '';
      ctx.strokeStyle = colorMap[guideColor] ?? '';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(p.x, p.y, p.w[guideSize], p.h[guideSize]);
      ctx.globalAlpha = guideOpacity ?? 1;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = colorMap[guideColor] ?? '';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.restore();
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
      const layoutFn =
        layouts[guideType as keyof typeof layouts] ?? layouts.crossHair;
      setPostits(layoutFn(window.innerWidth, window.innerHeight, guideSize));
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [guideSize, guideColor, guideOpacity, guideType]);

  useEffect(() => {
    let animationId: number;
    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationId);
  }, [
    postits,
    focused,
    overlayVisible,
    guideSize,
    guideColor,
    guideOpacity,
    guideType
  ]);

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
