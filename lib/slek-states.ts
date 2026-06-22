// État de l'orbe SLEK — partagé entre l'animation 3D et l'UI du hero.
// Reproduit la signature de l'app : PRÊT (vert) → RÉFLEXION (or) → PAROLE (cyan).

export type SlekStateKey = 'ready' | 'thinking' | 'speaking'

export interface SlekState {
  key: SlekStateKey
  label: string
  /** Couleur du cœur lumineux (hex) */
  core: string
  /** Couleur des anneaux / halo (hex) */
  glow: string
  /** Durée d'affichage avant transition (ms) */
  duration: number
  /** Intensité de déformation du cœur */
  distort: number
  /** Vitesse de pulsation */
  speed: number
}

export const SLEK_STATES: Record<SlekStateKey, SlekState> = {
  ready: {
    key: 'ready',
    label: 'PRÊT',
    core: '#34d399',
    glow: '#22c55e',
    duration: 3200,
    distort: 0.28,
    speed: 1.1,
  },
  thinking: {
    key: 'thinking',
    label: 'RÉFLEXION',
    core: '#fbbf24',
    glow: '#f59e0b',
    duration: 2800,
    distort: 0.5,
    speed: 2.4,
  },
  speaking: {
    key: 'speaking',
    label: 'PAROLE',
    core: '#22d3ee',
    glow: '#06b6d4',
    duration: 4200,
    distort: 0.42,
    speed: 1.8,
  },
}

export const SLEK_CYCLE: SlekStateKey[] = ['ready', 'thinking', 'speaking']
