export interface Offre {
  id: string
  intitule: string
  description?: string
  dateCreation: string
  dateActualisation?: string
  lieuTravail: {
    libelle: string
    codePostal?: string
    commune?: string
  }
  romeCode?: string
  romeLibelle?: string
  appellationlibelle?: string
  entreprise?: {
    nom?: string
    description?: string
    logo?: string
  }
  typeContrat: string
  typeContratLibelle: string
  natureContrat?: string
  experienceExige?: string
  experienceLibelle?: string
  competences?: Array<{ code: string; libelle: string; exigence?: string }>
  salaire?: {
    libelle?: string
    commentaire?: string
    complement1?: string
    complement2?: string
  }
  dureeTravailLibelle?: string
  dureeTravailLibelleConverti?: string
  alternance?: boolean
  contact?: {
    nom?: string
    coordonnees1?: string
    coordonnees2?: string
    urlRecruteur?: string
    urlPostulation?: string
  }
  agence?: {
    telephone?: string
    courriel?: string
  }
  nombrePostes?: number
  accessibleTH?: boolean
  origineOffre?: {
    origine?: string
    urlOrigine?: string
  }
}

export interface RechercheOffresResult {
  resultats: Offre[]
  filtresPossibles?: Array<{
    filtre: string
    agregation: Array<{ valeurPossible: string; nbResultats: number }>
  }>
}

export interface FiltresRecherche {
  motsCles?: string
  departement?: string
  commune?: string
  distance?: number
  typeContrat?: string
  codeROME?: string
  salaireMin?: string
  experience?: string
  periodeDays?: string
  alternance?: boolean
  page: number
}

export const PERIODES = [
  { value: '1', label: 'Dernières 24h' },
  { value: '3', label: '3 derniers jours' },
  { value: '7', label: 'Cette semaine' },
  { value: '30', label: 'Ce mois' },
  { value: '', label: 'Toutes les offres' },
]

export const DISTANCES = [
  { value: 10, label: '10 km' },
  { value: 20, label: '20 km' },
  { value: 30, label: '30 km' },
  { value: 50, label: '50 km' },
  { value: 100, label: '100 km' },
]
