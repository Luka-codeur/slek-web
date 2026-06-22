'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useDeckScene } from './deck-scene-context'

type From = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'

const OFFSETS: Record<From, { x?: number; y?: number; scale?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.8 },
  blur: { y: 24 },
}

/**
 * Révèle son contenu avec un décalage (`delay`) pour un effet « un à un ».
 * - Dans le deck épinglé : se déclenche quand la scène devient active.
 * - Hors deck (mobile) : se déclenche à l'entrée dans l'écran (et se
 *   re-cache en sortant).
 */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  once = false,
  className,
}: {
  children: ReactNode
  delay?: number
  from?: From
  once?: boolean
  className?: string
}) {
  const { active, inDeck } = useDeckScene()
  const off = OFFSETS[from]

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: off.x ?? 0,
      y: off.y ?? 0,
      scale: off.scale ?? 1,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  }

  // Dans le deck : piloté par l'état actif de la scène.
  if (inDeck) {
    return (
      <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    )
  }

  // Hors deck : piloté par le scroll / viewport.
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}
