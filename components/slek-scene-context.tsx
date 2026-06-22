'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SLEK_STATES, SLEK_CYCLE, type SlekStateKey } from '@/lib/slek-states'

interface SceneRefs {
  /** Position souris normalisée -1..1 (lue par le canvas pour le parallax) */
  pointer: { x: number; y: number }
  /** Progression du scroll : scrollY / innerHeight */
  scroll: number
}

interface SlekSceneValue {
  stateKey: SlekStateKey
  refs: React.MutableRefObject<SceneRefs>
  reducedMotion: boolean
}

const SlekSceneContext = createContext<SlekSceneValue | null>(null)

export function useSlekScene() {
  const ctx = useContext(SlekSceneContext)
  if (!ctx) throw new Error('useSlekScene doit être utilisé dans SlekSceneProvider')
  return ctx
}

export function SlekSceneProvider({ children }: { children: ReactNode }) {
  const [stateKey, setStateKey] = useState<SlekStateKey>('ready')
  const [reducedMotion, setReducedMotion] = useState(false)
  const refs = useRef<SceneRefs>({ pointer: { x: 0, y: 0 }, scroll: 0 })
  const idx = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(reduced)

    const onPointer = (e: PointerEvent) => {
      refs.current.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      refs.current.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onScroll = () => {
      refs.current.scroll = window.scrollY / window.innerHeight
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let timeout: ReturnType<typeof setTimeout> | undefined
    if (!reduced) {
      const tick = () => {
        idx.current = (idx.current + 1) % SLEK_CYCLE.length
        const next = SLEK_CYCLE[idx.current]
        setStateKey(next)
        timeout = setTimeout(tick, SLEK_STATES[next].duration)
      }
      timeout = setTimeout(tick, SLEK_STATES.ready.duration)
    }

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return (
    <SlekSceneContext.Provider value={{ stateKey, refs, reducedMotion }}>
      {children}
    </SlekSceneContext.Provider>
  )
}
