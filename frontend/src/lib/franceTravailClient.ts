import type { FiltresRecherche, RechercheOffresResult, Offre } from '@/types/offre'
import { getToken } from '@/lib/auth'

const API_URL = '/proxy/api/partenaire/offresdemploi/v2'

export async function rechercherOffres(filtres: FiltresRecherche): Promise<RechercheOffresResult> {
  const token = await getToken()
  const params = new URLSearchParams()

  if (filtres.motsCles) params.set('motsCles', filtres.motsCles)
  if (filtres.departement) params.set('departement', filtres.departement)
  if (filtres.commune) params.set('commune', filtres.commune)
  if (filtres.distance) params.set('distance', filtres.distance.toString())
  if (filtres.typeContrat) params.set('typeContrat', filtres.typeContrat)
  if (filtres.codeROME) params.set('codeROME', filtres.codeROME)
  if (filtres.salaireMin) params.set('salaireMin', filtres.salaireMin)
  if (filtres.experience) params.set('experience', filtres.experience)
  if (filtres.periodeDays) {
    const now = new Date()
    const since = new Date()
    since.setDate(since.getDate() - Number(filtres.periodeDays))
    params.set('minCreationDate', since.toISOString().split('.')[0] + 'Z')
    params.set('maxCreationDate', now.toISOString().split('.')[0] + 'Z')
  }

  params.set('tri', '1')

  const pageSize = 20
  const start = filtres.page * pageSize
  params.set('range', `${start}-${start + pageSize - 1}`)

  const response = await fetch(`${API_URL}/offres/search?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (response.status === 204) {
    return { resultats: [] }
  }

  if (!response.ok) {
    throw new Error(`Erreur API France Travail: ${response.status}`)
  }

  return response.json()
}

export async function getOffre(id: string): Promise<Offre> {
  const token = await getToken()

  const response = await fetch(`${API_URL}/offres/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Offre introuvable: ${id}`)
  }

  return response.json()
}
