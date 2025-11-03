import { useMotionValue, useSpring, AnimatePresence, motion } from 'framer-motion';
import { useRef, useEffect, useMemo } from 'react';

export type GuideSize = 'small' | 'medium' | 'large';
export type GuideColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue';

declare global {
    interface Window {
        customAPI?: {
            onToggleSettings?: (cb: () => void) => void;
            get: () => Promise<{ guideSize: GuideSize; guideColor: GuideColor }>
            save: (settings: { guideSize: GuideSize; guideColor: GuideColor }) => void
        };
    }
}

export default function SettingPanel({
    open,
    setOpen,
    height = 240,
    className = '',
    contentClassName = '',
    children
}: any) {
    const containerRef = useRef<HTMLDivElement>(null);

    const y = useMotionValue(-height);
    const ySpring = useSpring(y, { stiffness: 260, damping: 30, mass: 0.8 });

    // 🔹 F1 신호 수신 (main → renderer)
    useEffect(() => {
        const handler = () => {
            setOpen((prev) => {
                const next = !prev;
                y.set(next ? 0 : -height);
                window.electron.ipcRenderer.send('set-clickable', next);
                return next;
            });
        };

        window.customAPI?.onToggleSettings?.(handler);
        return () => {
            // cleanup: ipcRenderer listener 제거
            const { customAPI } = window;
            const ipc = (customAPI as any)?.ipcRenderer;
            if (ipc?.removeListener) ipc.removeListener('toggle-settings', handler);
        };
    }, [height, y]);

    const shadowOpacity = useMemo(() => (open ? 0.6 : 0), [open]);

    useEffect(() => {
        y.set(0);
    }, []);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-[45]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: shadowOpacity }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'tween', duration: 0.18 }}
                        onClick={() => {
                            setOpen(false);
                            y.set(-height);
                        }}
                        style={{ background: 'rgba(0,0,0,0.6)' }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                ref={containerRef}
                className={`fixed left-1/2 -translate-x-1/2 top-0 z-[50] w-[min(960px,92vw)] ${className}`}
                style={{ y: ySpring }}
            >
                <div
                    className={`rounded-b-2xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-md shadow-2xl ${contentClassName}`}
                    style={{ height }}
                >
                    <div className="flex items-center justify-center py-2">
                        <div className="h-1.5 w-16 rounded-full bg-neutral-700" />
                    </div>
                    <div className="px-4 pb-4">{children}</div>
                </div>
            </motion.div>
        </>
    );
}
