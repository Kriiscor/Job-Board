import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Building2, Clock, ExternalLink, Heart, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useOffreQuery } from '@/queries/OffresQuery'
import { useFavoritesStore } from '@/stores/favoritesStore'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function OffrePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: offre, isLoading, isError } = useOffreQuery(id!)
  const { estFavori, ajouterFavori, supprimerFavori } = useFavoritesStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (isError || !offre) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>Offre introuvable ou erreur de chargement.</p>
        </div>
      </div>
    )
  }

  const favori = estFavori(offre.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-semibold text-gray-900 truncate flex-1">{offre.intitule}</h1>
          <Button
            variant="outline"
            className={cn('gap-2', favori && 'text-red-500 border-red-200')}
            onClick={() => favori ? supprimerFavori(offre.id) : ajouterFavori(offre)}
          >
            <Heart className={cn('h-4 w-4', favori && 'fill-current')} />
            {favori ? 'Sauvegardé' : 'Sauvegarder'}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{offre.intitule}</h2>
              {offre.entreprise?.nom && (
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">{offre.entreprise.nom}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {offre.lieuTravail.libelle}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Publiée le {formatDate(offre.dateCreation)}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-800">{offre.typeContratLibelle}</Badge>
              {offre.alternance && <Badge className="bg-purple-100 text-purple-800">Alternance</Badge>}
              {offre.dureeTravailLibelleConverti && (
                <Badge variant="outline">{offre.dureeTravailLibelleConverti}</Badge>
              )}
              {offre.experienceLibelle && (
                <Badge variant="outline">{offre.experienceLibelle}</Badge>
              )}
            </div>

            {offre.salaire?.libelle && (
              <p className="text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-md">
                {offre.salaire.libelle}
                {offre.salaire.complement1 && ` — ${offre.salaire.complement1}`}
              </p>
            )}
          </CardContent>
        </Card>

        {offre.description && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description du poste</h3>
              <div
                className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: offre.description }}
              />
            </CardContent>
          </Card>
        )}

        {offre.competences && offre.competences.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {offre.competences.map((c) => (
                  <Badge key={c.code} variant={c.exigence === 'E' ? 'default' : 'outline'} className="text-xs">
                    {c.libelle}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center gap-3">
          {offre.contact?.urlPostulation && (
            <Button asChild className="gap-2" size="lg">
              <a href={offre.contact.urlPostulation} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Postuler
              </a>
            </Button>
          )}
          {offre.origineOffre?.urlOrigine && (
            <Button asChild variant="outline" className="gap-2" size="lg">
              <a href={offre.origineOffre.urlOrigine} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Voir l'annonce originale
              </a>
            </Button>
          )}
          {!offre.contact?.urlPostulation && !offre.origineOffre?.urlOrigine && offre.contact?.coordonnees1 && (
            <p className="text-sm text-muted-foreground text-center">
              Contact : <strong>{offre.contact.coordonnees1}</strong>
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
