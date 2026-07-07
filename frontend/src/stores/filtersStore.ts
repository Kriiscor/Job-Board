import { create } from 'zustand'
import type { FiltresRecherche } from '@/types/offre'
import defaultFilters from '@/config/defaultFilters.json'

interface FiltersStore {
  filtres: FiltresRecherche
  setFiltres: (filtres: Partial<FiltresRecherche>) => void
  resetFiltres: () => void
  setPage: (page: number) => void
}

const filtresDefaut: FiltresRecherche = defaultFilters

export const useFiltersStore = create<FiltersStore>((set) => ({
  filtres: filtresDefaut,
  setFiltres: (nouveauxFiltres) =>
    set((state) => ({
      filtres: { ...state.filtres, ...nouveauxFiltres, page: 0 },
    })),
  resetFiltres: () => set({ filtres: filtresDefaut }),
  setPage: (page) => set((state) => ({ filtres: { ...state.filtres, page } })),
}))
