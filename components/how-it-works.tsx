import { Mic, Cpu, Zap } from 'lucide-react'
import { Reveal } from './reveal'

const steps = [
  {
    icon: Mic,
    title: '1. Activez SLEK',
    text: 'Appuyez sur F9 ou dites « Slek » — l\u2019assistant s\u2019active et écoute votre commande.',
  },
  {
    icon: Cpu,
    title: '2. L\u2019IA comprend',
    text: 'SLEK analyse votre intention et sélectionne automatiquement les outils nécessaires pour l\u2019exécuter.',
  },
  {
    icon: Zap,
    title: '3. Ça s\u2019exécute',
    text: 'L\u2019action est effectuée sur votre PC : email envoyé, fichier ouvert, site consulté, réponse prononcée.',
  },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Comment ça marche
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Trois étapes, zéro friction.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="glass h-full rounded-2xl p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/12 text-blue">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
