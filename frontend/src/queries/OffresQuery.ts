import { useQuery } from '@tanstack/react-query'
import { rechercherOffres, getOffre } from '@/lib/franceTravailClient'
import type { FiltresRecherche } from '@/types/offre'

export function useOffresQuery(filtres: FiltresRecherche) {
  return useQuery({
    queryKey: ['offres', filtres],
    queryFn: () => rechercherOffres(filtres),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  })
}

export function useOffreQuery(id: string) {
  return useQuery({
    queryKey: ['offre', id],
    queryFn: () => getOffre(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}
