'use client'

import { useState } from 'react'
import { Download as DownloadIcon, ChevronDown, Monitor } from 'lucide-react'
import { Reveal } from './reveal'

const requirements = [
  'Windows 10 ou 11 (64-bit)',
  'Microphone fonctionnel',
  'Connexion internet pour les requêtes IA',
  'Chrome installé (optionnel, pour la navigation web)',
]

export function Download() {
  const [open, setOpen] = useState(false)

  return (
    <section id="telecharger" className="relative scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at center, #3b82f6 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Prêt à parler à votre PC ?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Téléchargez SLEK et lancez votre première commande en moins de 2
          minutes.
        </p>

        <a
          href="/download/slek-setup.exe"
          className="mt-9 inline-flex items-center justify-center gap-3 rounded-xl bg-blue px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-blue/30 transition-colors hover:bg-blue/90"
        >
          <DownloadIcon className="h-5 w-5" aria-hidden="true" />
          Télécharger SLEK pour Windows
        </a>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Monitor className="h-4 w-4 text-blue" aria-hidden="true" />
            Windows 10 / 11
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            Python 3.10+
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            Gratuit pour commencer
          </span>
        </div>

        {/* requirements accordion */}
        <div className="mx-auto mt-10 max-w-md text-left">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="glass flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm font-medium text-foreground"
            aria-expanded={open}
          >
            Configuration requise
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            className={`grid transition-all duration-300 ${
              open
                ? 'mt-2 grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <ul className="glass space-y-2 rounded-xl px-5 py-4">
                {requirements.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                      aria-hidden="true"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
