import { Mic, Paperclip } from 'lucide-react'

function Waveform() {
  const bars = Array.from({ length: 28 })
  return (
    <div
      className="flex h-10 items-center justify-center gap-[3px]"
      aria-hidden="true"
    >
      {bars.map((_, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-blue/70"
          style={{
            height: '100%',
            animationDelay: `${(i % 14) * 0.08}s`,
            opacity: 0.4 + ((i * 37) % 60) / 100,
          }}
        />
      ))}
    </div>
  )
}

export function HeroMockup() {
  return (
    <div className="glass relative w-full max-w-xl rounded-2xl p-6 shadow-2xl shadow-blue/5 sm:p-8">
      {/* window dots */}
      <div className="mb-8 flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
        <span className="h-3 w-3 rounded-full bg-white/15" />
      </div>

      {/* pulsing mic */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="mic-ring absolute inset-0 rounded-full border-2 border-blue/50" />
          <span className="mic-pulse flex h-16 w-16 items-center justify-center rounded-full bg-blue text-primary-foreground">
            <Mic className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
          À l&apos;écoute…
        </p>
      </div>

      {/* conversation */}
      <div className="space-y-3">
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm border border-border bg-secondary px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground">Vous</p>
          <p className="mt-1 text-sm text-foreground">
            Rédige un email à Paul pour lui envoyer le rapport PDF
          </p>
        </div>
        <div className="mr-auto max-w-[88%] rounded-2xl rounded-bl-sm border border-blue/30 bg-blue/10 px-4 py-3">
          <p className="text-xs font-medium text-blue">SLEK</p>
          <p className="mt-1 flex items-start gap-2 text-sm text-foreground">
            <Paperclip
              className="mt-0.5 h-4 w-4 shrink-0 text-blue"
              aria-hidden="true"
            />
            <span>
              Email envoyé à paul@exemple.fr avec le fichier rapport.pdf en pièce
              jointe.
            </span>
          </p>
        </div>
      </div>

      {/* waveform */}
      <div className="mt-6 border-t border-border pt-4">
        <Waveform />
      </div>
    </div>
  )
}
