'use client'

import { motion } from 'motion/react'
import { Sparkles, ArrowDown } from 'lucide-react'
import { HeroMockup } from './hero-mockup'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 sm:px-6 sm:pt-40">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, #3b82f6 0%, #8b5cf6 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* mesh grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue" aria-hidden="true" />
          Assistant vocal IA pour Windows
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Pilotez votre PC <br className="hidden sm:block" />
          <span className="text-gradient">à la voix.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
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
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-blue/25 transition-colors hover:bg-blue/90 sm:w-auto"
          >
            Télécharger SLEK — Gratuit
          </a>
          <a
            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-transparent px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
          >
            Voir la démo
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-5 text-sm text-muted-foreground"
        >
          Windows 10/11 · Python requis · 20 commandes/jour gratuites
        </motion.p>
      </div>

      <motion.div
        id="demo"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <HeroMockup />
      </motion.div>
    </section>
  )
}
