'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Minimum display time so the splash doesn't flash too quickly
    const MIN_MS = 1400

    const start = Date.now()

    const dismiss = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_MS - elapsed)
      setTimeout(() => setVisible(false), remaining)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
      return () => window.removeEventListener('load', dismiss)
    }
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
        >
          {/* Logo + nom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Halo pulsant derrière le logo */}
            <div className="relative flex items-center justify-center">
              <span className="absolute h-24 w-24 animate-ping rounded-full bg-blue/20" />
              <span className="absolute h-16 w-16 animate-ping rounded-full bg-blue/30 [animation-delay:0.3s]" />
              <Image
                src="/logo.png"
                alt="SLEK"
                width={72}
                height={72}
                priority
                className="relative h-16 w-16 drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]"
              />
            </div>

            <span className="text-2xl font-bold tracking-[0.2em] text-foreground">
              SLEK
            </span>

            {/* Barre de chargement indéterminée */}
            <div className="mt-2 h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-blue"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
