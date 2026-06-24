'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
} from 'motion/react'

/**
 * Le « S » SLEK : deux arcs opposés formant un S arrondi, tracé en un
 * seul chemin continu pour pouvoir le dessiner du haut vers le bas.
 * (viewBox 0 0 120 120, ~r22 centré sur 60)
 */
const S_PATH = 'M 82 40 A 22 22 0 1 0 60 62 A 22 22 0 1 1 38 84'

// Onde sonore au centre (comme le logo) : barres verticales [x, demi-hauteur]
const WAVE: [number, number][] = [
  [45, 6],
  [50, 13],
  [55, 21],
  [60, 27],
  [65, 17],
  [70, 10],
  [75, 6],
]

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const reduceMotion = useReducedMotion()

  // Progression réelle, normalisée 0 → 1. Pilote le dessin du « S ».
  const progress = useMotionValue(0)

  // L'onde sonore "s'allume" en fin de tracé.
  const waveOpacity = useTransform(progress, [0.5, 1], [0, 1])

  // Le halo bleu s'intensifie au fur et à mesure.
  const glowRadius = useTransform(progress, [0, 1], [2, 16])
  const glow = useMotionTemplate`drop-shadow(0 0 ${glowRadius}px rgba(59, 130, 246, 0.6))`

  useEffect(() => {
    // Accessibilité : on affiche le « S » complet sans tracé animé.
    if (reduceMotion) {
      progress.set(1)
      const finish = () => setTimeout(() => setVisible(false), 250)
      if (document.readyState === 'complete') finish()
      else window.addEventListener('load', finish, { once: true })
      return () => window.removeEventListener('load', finish)
    }

    // Durée minimale d'affichage : évite le "flash" si la page est déjà prête.
    const MIN_MS = 1200
    const start = Date.now()

    // 1) Trickle : la progression grimpe seule vers ~85 % en décélérant.
    const trickle = animate(progress, 0.85, {
      duration: 1.1,
      ease: [0.1, 0.9, 0.2, 1],
    })

    let done = false
    const finish = () => {
      if (done) return
      done = true
      const remaining = Math.max(0, MIN_MS - (Date.now() - start))
      window.setTimeout(() => {
        trickle.stop()
        // 2) Page prête : le « S » finit de se dessiner puis le splash s'efface.
        animate(progress, 1, {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          onComplete: () => window.setTimeout(() => setVisible(false), 320),
        })
      }, remaining)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => {
      trickle.stop()
      window.removeEventListener('load', finish)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          role="status"
          aria-label="Chargement de SLEK"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Le « S » du logo qui se dessine */}
            <motion.svg
              width={180}
              height={180}
              viewBox="0 2 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{ filter: glow }}
            >
              <defs>
                <linearGradient
                  id="slek-loader-grad"
                  x1="60"
                  y1="18"
                  x2="60"
                  y2="106"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a855f7" />
                  <stop offset="0.5" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>

              {/* Track : le « S » complet, en filigrane */}
              <path
                d={S_PATH}
                stroke="currentColor"
                className="text-white/8"
                strokeWidth={7}
                strokeLinecap="round"
              />

              {/* Tracé lumineux piloté par la progression */}
              <motion.path
                d={S_PATH}
                stroke="url(#slek-loader-grad)"
                strokeWidth={7}
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />

              {/* Onde sonore (identité du logo), s'allume en fin de chargement */}
              <motion.g style={{ opacity: waveOpacity }}>
                {WAVE.map(([x, h]) => (
                  <line
                    key={x}
                    x1={x}
                    y1={62 - h}
                    x2={x}
                    y2={62 + h}
                    stroke="url(#slek-loader-grad)"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                ))}
              </motion.g>
            </motion.svg>

            <span className="text-2xl font-bold tracking-[0.2em] text-foreground">
              SLEK
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
