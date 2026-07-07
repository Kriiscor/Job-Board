import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/JobCard'
import { useFavoritesStore } from '@/stores/favoritesStore'

export function FavoritesPage() {
  const navigate = useNavigate()
  const { favoris } = useFavoritesStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <h1 className="text-xl font-bold text-gray-900">Mes favoris</h1>
          </div>
          <span className="text-sm text-gray-500">({favoris.length} offre{favoris.length > 1 ? 's' : ''})</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {favoris.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Heart className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucun favori pour l'instant</p>
            <p className="text-sm mt-1">Sauvegardez des offres depuis la recherche</p>
            <Button className="mt-4" variant="outline" onClick={() => navigate('/')}>
              Retour à la recherche
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {favoris.map((offre) => (
              <JobCard
                key={offre.id}
                offre={offre}
                onClick={() => navigate(`/offre/${offre.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
