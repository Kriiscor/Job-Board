import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Offre } from '@/types/offre'

interface FavoritesStore {
  favoris: Offre[]
  ajouterFavori: (offre: Offre) => void
  supprimerFavori: (id: string) => void
  estFavori: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoris: [],
      ajouterFavori: (offre) =>
        set((state) => ({ favoris: [...state.favoris, offre] })),
      supprimerFavori: (id) =>
        set((state) => ({ favoris: state.favoris.filter((f) => f.id !== id) })),
      estFavori: (id) => get().favoris.some((f) => f.id === id),
    }),
    { name: 'job-board-favoris' }
  )
)
