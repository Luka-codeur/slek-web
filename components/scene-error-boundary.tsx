'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  message: string | null
}

// Isole les erreurs de la scène WebGL : si Three.js échoue, le reste du
// site reste affiché (au lieu de blanchir toute la page).
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { message: null }

  static getDerivedStateFromError(error: unknown): State {
    return { message: error instanceof Error ? error.message : String(error) }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('[SceneErrorBoundary]', error)
  }

  render() {
    if (this.state.message) {
      return (
        <div
          data-orb-error={this.state.message}
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
        />
      )
    }
    return this.props.children
  }
}
