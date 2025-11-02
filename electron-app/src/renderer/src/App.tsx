import '@radix-ui/themes/styles.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { OverlayCanvas } from './components/OverlayCanvas'

type HoverRevealPanelProps = {
  height?: number
  hotspotHeight?: number
  followMouse?: boolean
  snapOnLeave?: boolean
  escapeKey?: boolean
  className?: string
  contentClassName?: string
  children?: React.ReactNode
}

export default function App() {
  return (
    <div className="min-h-screen">
      <OverlayCanvas />
      {/* <HoverRevealPanel height={280} followMouse hotspotHeight={48}>
          <PanelContent />
        </HoverRevealPanel> */}
      {/* <main className="mx-auto max-w-4xl px-6 pt-24 pb-48 space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight">Hover-Reveal Top Panel 데모</h1>
          <p className="text-neutral-300">
            최상단 <span className="font-medium text-white">48px</span> 핫존에 마우스를 올리면
            설정창이 고정된 위치에서 내려온다.
          </p>
        </main> */}
    </div>
  )
}

function HoverRevealPanel({
  height = 240,
  hotspotHeight = 40,
  followMouse = true,
  snapOnLeave = true,
  escapeKey = true,
  className = '',
  contentClassName = '',
  children
}: HoverRevealPanelProps) {
  const [open, setOpen] = useState(false)
  const [inside, setInside] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const y = useMotionValue(-height)
  const ySpring = useSpring(y, { stiffness: 260, damping: 30, mass: 0.8 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const my = e.clientY
      if (my <= hotspotHeight) {
        if (!open) setOpen(true)
        y.set(0)
      } else if (!inside) {
        if (snapOnLeave) {
          y.set(-height)
          setOpen(false)
        } else {
          y.set(-height)
          setOpen(false)
        }
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [open, inside, hotspotHeight, height, snapOnLeave, y])

  useEffect(() => {
    if (!escapeKey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        y.set(-height)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [escapeKey, height, y])

  const onEnter = () => {
    setInside(true)
    y.set(0)
  }
  const onLeave = () => {
    setInside(false)
    setOpen(false)
    y.set(-height)
  }

  const shadowOpacity = useMemo(() => (open ? 0.6 : 0), [open])

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 h-[--hotspot] z-[40] pointer-events-none"
        style={{ ['--hotspot' as any]: `${hotspotHeight}px` }}
      />

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
              setOpen(false)
              y.set(-height)
            }}
            style={{ background: 'rgba(0,0,0,0.6)' }}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        className={`fixed left-1/2 -translate-x-1/2 top-0 z-[50] w-[min(960px,92vw)] ${className}`}
        style={{ y: ySpring }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
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
  )
}

function PanelContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <section className="col-span-1 md:col-span-2 rounded-xl border border-neutral-800 p-3">
        <h2 className="text-base font-medium">일반 설정</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Toggle label="자동 저장" />
          <Toggle label="알림 활성화" defaultChecked />
          <Select label="테마" options={['System', 'Light', 'Dark']} />
          <Select label="밀도" options={['편안함', '중간', '조밀함']} />
        </div>
      </section>

      <section className="rounded-xl border border-neutral-800 p-3">
        <h2 className="text-base font-medium">단축키</h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-300">
          <li>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">Esc</kbd> 닫기
          </li>
          <li>
            <span className="px-1.5 py-0.5 bg-neutral-800 rounded">Top 48px</span>에 마우스 오버로
            열기
          </li>
        </ul>
      </section>
    </div>
  )
}

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`flex items-center justify-between rounded-lg border border-neutral-800 px-3 py-2 hover:bg-neutral-800/60 transition`}
    >
      <span>{label}</span>
      <span
        className={`inline-flex h-6 w-11 items-center rounded-full transition border ${on ? 'bg-emerald-500/20 border-emerald-500' : 'bg-neutral-800 border-neutral-700'
          }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transform transition ${on ? 'translate-x-5' : 'translate-x-1'
            }`}
        />
      </span>
    </button>
  )
}

function Select({ label, options }: { label: string; options: string[] }) {
  const [val, setVal] = useState(options[0])
  return (
    <label className="flex flex-col gap-1">
      <span className="text-neutral-400 text-xs">{label}</span>
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-600"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
