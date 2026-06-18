import { Check, X } from 'lucide-react'
import { Reveal } from './reveal'

const freeFeatures = [
  { label: '20 commandes par jour', included: true },
  { label: 'Navigation web', included: true },
  { label: 'Documents & PDF', included: true },
  { label: 'Rappels', included: true },
  { label: 'Contrôle système de base', included: true },
  { label: 'Email (Pro)', included: false },
  { label: 'Terminal & scripts (Pro)', included: false },
  { label: 'Gestionnaire de mots de passe (Pro)', included: false },
  { label: 'Word & Outlook COM (Pro)', included: false },
]

const proFeatures = [
  'Commandes illimitées',
  'Tous les outils (email, terminal, credentials…)',
  'Priorité sur les modèles IA les plus puissants',
  'Licence offline — fonctionne sans internet',
  'Mises à jour à vie (licence à vie disponible)',
  'Support prioritaire',
]

export function Pricing() {
  return (
    <section id="tarifs" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tarifs simples et honnêtes
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Commencez gratuitement. Passez Pro quand vous êtes prêt.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-6 md:grid-cols-2">
          {/* FREE */}
          <Reveal>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Gratuit
              </h3>
              <p className="mt-4 text-4xl font-bold text-foreground">0 €</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pour découvrir SLEK
              </p>
              <ul className="mt-6 space-y-3">
                {freeFeatures.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    {f.included ? (
                      <Check
                        className="h-4 w-4 shrink-0 text-blue"
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className="h-4 w-4 shrink-0 text-muted-foreground/60"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        f.included
                          ? 'text-foreground'
                          : 'text-muted-foreground/70'
                      }
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#telecharger"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Télécharger gratuitement
              </a>
            </div>
          </Reveal>

          {/* PRO */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl p-[1.5px]">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                }}
                aria-hidden="true"
              />
              <div className="relative rounded-2xl bg-popover p-8">
                <span className="absolute right-6 top-6 rounded-full bg-blue/15 px-3 py-1 text-xs font-medium text-blue">
                  Recommandé
                </span>
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Pro
                </h3>
                <p className="mt-4 text-4xl font-bold text-foreground">
                  À définir
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pour une utilisation sans limites
                </p>
                <ul className="mt-6 space-y-3">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check
                        className="h-4 w-4 shrink-0 text-blue"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#telecharger"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-blue/25 transition-colors hover:bg-blue/90"
                >
                  Obtenir la licence Pro
                </a>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Paiement unique disponible · Licence nominative et
                  non-cessible
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
