'use client'

import { motion } from 'motion/react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { SLEK_STATES } from '@/lib/slek-states'
import { useSlekScene } from './slek-scene-context'

export function Hero() {
  const { stateKey } = useSlekScene()
  const state = SLEK_STATES[stateKey]

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-28 sm:px-6">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Pastille d'état live — calquée sur l'app SLEK */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 transition-colors duration-700"
              style={{ backgroundColor: state.core }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-700"
              style={{ backgroundColor: state.core }}
            />
          </span>
          <span className="text-muted-foreground">Assistant vocal IA</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-7 text-balance text-5xl font-bold leading-[1.04] tracking-tight text-foreground drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl"
        >
          Pilotez votre PC <br className="hidden sm:block" />
          <span className="text-gradient">à la voix.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground drop-shadow-[0_1px_20px_rgba(0,0,0,0.8)] sm:text-xl"
        >
          SLEK écoute, comprend et agit à votre place. Dites simplement ce que
          vous voulez faire — SLEK s&apos;en charge, en français.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#telecharger"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-blue/30 transition-colors hover:bg-blue/90 sm:w-auto"
          >
            Télécharger SLEK — Gratuit
          </a>
          <a
            href="#fonctionnement"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-7 py-3.5 text-base font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary sm:w-auto"
          >
            <Sparkles className="h-4 w-4 text-blue" aria-hidden="true" />
            Voir comment ça marche
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-5 text-sm text-muted-foreground"
        >
          Windows 10/11 64-bit · Microphone requis · 50 commandes/jour gratuites
        </motion.p>
      </div>

      {/* indice de scroll */}
      <motion.a
        href="#fonctionnement"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Faire défiler vers le bas"
      >
        <span className="text-xs uppercase tracking-widest">Faites défiler</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
