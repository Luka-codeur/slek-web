import {
  Mail,
  Globe,
  FileText,
  Monitor,
  Eye,
  Bell,
  Key,
  Image as ImageIcon,
  BookOpen,
} from 'lucide-react'
import { Reveal } from './reveal'

const features = [
  {
    icon: Mail,
    title: 'Email',
    text: 'Rédige, envoie et lit vos emails à voix haute. Compatible Gmail via votre compte Google.',
  },
  {
    icon: Globe,
    title: 'Navigation web',
    text: 'Ouvre des sites, effectue des recherches, clique sur des éléments et extrait des informations depuis n\u2019importe quelle page.',
  },
  {
    icon: FileText,
    title: 'Documents & PDF',
    text: 'Lit, résume et répond à des questions sur vos fichiers PDF, Word et texte.',
  },
  {
    icon: Monitor,
    title: 'Contrôle système',
    text: 'Gère vos applications, fichiers, presse-papier, fenêtres et paramètres Windows.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'Analyse ce qu\u2019il y a à l\u2019écran : identifie les éléments, lit le texte visible, décrit la situation.',
  },
  {
    icon: Bell,
    title: 'Rappels',
    text: 'Pose des rappels vocaux avec heure précise. SLEK vous alerte au bon moment.',
  },
  {
    icon: Key,
    title: 'Gestionnaire de mots de passe',
    text: 'Stocke et récupère vos identifiants en toute sécurité, directement à la voix.',
  },
  {
    icon: ImageIcon,
    title: 'Fond d\u2019écran & interface',
    text: 'Change votre fond d\u2019écran, interagit avec l\u2019interface Windows (clics, saisie, raccourcis).',
  },
  {
    icon: BookOpen,
    title: 'Mémoire contextuelle',
    text: 'SLEK se souvient des informations que vous lui confiez au fil de la conversation.',
  },
]

export function Features() {
  return (
    <section id="fonctionnalites" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce que SLEK sait faire
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Plus de 50 outils intégrés, activés par la voix.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="glass group h-full rounded-2xl p-6 transition-colors hover:border-blue/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/12 text-blue transition-colors group-hover:bg-blue/20">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
