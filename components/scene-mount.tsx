'use client'

import dynamic from 'next/dynamic'
import { SceneErrorBoundary } from './scene-error-boundary'

// L'orbe 3D utilise WebGL → uniquement côté client (ssr: false n'est
// autorisé que dans un Client Component).
const SceneBackground = dynamic(
  () => import('./slek-orb').then((m) => m.SceneBackground),
  { ssr: false },
)

export function SceneMount() {
  return (
    <SceneErrorBoundary>
      <SceneBackground />
    </SceneErrorBoundary>
  )
}
