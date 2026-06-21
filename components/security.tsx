import { Shield, Lock, FileSearch } from 'lucide-react'
import { Reveal } from './reveal'

const cols = [
  {
    icon: Shield,
    title: 'Confirmation avant action',
    text: 'Les actions sensibles (suppression, envoi d\u2019email) demandent une confirmation vocale avant exécution.',
  },
  {
    icon: Lock,
    title: 'Licence offline inviolable',
    text: 'Votre licence est vérifiée localement par cryptographie Ed25519. Aucun serveur requis pour l\u2019utiliser.',
  },
  {
    icon: FileSearch,
    title: 'Journal d\u2019audit complet',
    text: 'Chaque action exécutée est enregistrée localement dans un journal (audit.log), secrets masqués.',
  },
]

export function Security() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Conçu pour la confiance
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Votre audio est traité localement. SLEK ne stocke aucune de vos données.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {cols.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet/12 text-violet">
                <c.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
