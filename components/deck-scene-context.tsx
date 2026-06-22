'use client'

import { createContext, useContext } from 'react'

// Indique à un <Reveal> s'il est dans le deck épinglé et si sa scène est
// active. Hors deck (mobile empilé) → inDeck=false : on retombe sur le
// déclenchement par scroll/viewport classique.
export const DeckSceneContext = createContext<{ active: boolean; inDeck: boolean }>({
  active: true,
  inDeck: false,
})

export function useDeckScene() {
  return useContext(DeckSceneContext)
}
