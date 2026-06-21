'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const links = [
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Télécharger', href: '#telecharger' },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      // hide on scroll down, show on scroll up
      if (y > lastY && y > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 py-3 transition-colors duration-300 sm:px-6 ${
          scrolled
            ? 'border-b border-border bg-background/70 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
        aria-label="Navigation principale"
      >
        <a href="#" className="flex items-center gap-2" aria-label="Accueil SLEK">
          <Image src="/logo.png" alt="SLEK" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            SLEK
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#telecharger"
            className="hidden rounded-lg bg-blue px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-blue/20 transition-colors hover:bg-blue/90 sm:inline-flex"
          >
            Télécharger gratuitement
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open ? 'true' : 'false'}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#telecharger"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-blue px-3 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Télécharger gratuitement
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
