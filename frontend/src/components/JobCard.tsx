import { MapPin, Building2, Clock, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFavoritesStore } from '@/stores/favoritesStore'
import type { Offre } from '@/types/offre'

interface JobCardProps {
  offre: Offre
  onClick: () => void
}

const CONTRAT_COLORS: Record<string, string> = {
  CDI: 'bg-green-100 text-green-800',
  CDD: 'bg-blue-100 text-blue-800',
  MIS: 'bg-orange-100 text-orange-800',
  SAI: 'bg-yellow-100 text-yellow-800',
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

export function JobCard({ offre, onClick }: JobCardProps) {
  const { estFavori, ajouterFavori, supprimerFavori } = useFavoritesStore()
  const favori = estFavori(offre.id)

  const toggleFavori = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (favori) supprimerFavori(offre.id)
    else ajouterFavori(offre)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault()
      window.open(`/offre/${offre.id}`, '_blank')
    }
  }

  return (
    <Card
      className="cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{offre.intitule}</h3>
            {offre.entreprise?.nom && (
              <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{offre.entreprise.nom}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn('shrink-0 h-8 w-8', favori && 'text-red-500')}
            onClick={toggleFavori}
            title={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={cn('h-4 w-4', favori && 'fill-current')} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={cn('text-xs', CONTRAT_COLORS[offre.typeContrat] ?? 'bg-gray-100 text-gray-700')}>
            {offre.typeContratLibelle}
          </Badge>
          {offre.alternance && (
            <Badge className="text-xs bg-purple-100 text-purple-800">Alternance</Badge>
          )}
          {offre.dureeTravailLibelleConverti && (
            <Badge variant="outline" className="text-xs">
              {offre.dureeTravailLibelleConverti}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{offre.lieuTravail.libelle}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDate(offre.dateCreation)}</span>
          </div>
        </div>

        {offre.salaire?.libelle && (
          <p className="mt-2 text-xs text-gray-600 font-medium">{offre.salaire.libelle}</p>
        )}
      </CardContent>
    </Card>
  )
}
