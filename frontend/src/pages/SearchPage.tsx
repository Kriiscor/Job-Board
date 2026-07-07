import { useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle, BriefcaseIcon } from 'lucide-react'
import { SearchFilters } from '@/components/SearchFilters'
import { JobCard } from '@/components/JobCard'
import { Button } from '@/components/ui/button'
import { useOffresQuery } from '@/queries/OffresQuery'
import { useFiltersStore } from '@/stores/filtersStore'

export function SearchPage() {
  const navigate = useNavigate()
  const { filtres, setPage } = useFiltersStore()
  const { data, isLoading, isError, isFetching } = useOffresQuery(filtres)

  const tous = data?.resultats ?? []
  const offres = filtres.alternance ? tous.filter((o) => o.alternance === true) : tous
  const hasResults = offres.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Job Board FR</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/favoris')}>
            Mes favoris
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <SearchFilters />

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {isError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">Erreur lors du chargement des offres. Vérifiez vos credentials ou réessayez.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {hasResults ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {isFetching ? (
                      <span className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" /> Mise à jour...
                      </span>
                    ) : (
                      `${offres.length} offres trouvées`
                    )}
                  </p>
                  <p className="text-sm text-gray-500">Page {filtres.page + 1}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {offres.map((offre) => (
                    <JobCard
                      key={offre.id}
                      offre={offre}
                      onClick={() => navigate(`/offre/${offre.id}`)}
                    />
                  ))}
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  <Button
                    variant="outline"
                    disabled={filtres.page === 0}
                    onClick={() => setPage(filtres.page - 1)}
                  >
                    ← Précédent
                  </Button>
                  <Button
                    variant="outline"
                    disabled={offres.length < 20}
                    onClick={() => setPage(filtres.page + 1)}
                  >
                    Suivant →
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <BriefcaseIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Aucune offre trouvée</p>
                <p className="text-sm mt-1">Modifiez vos critères de recherche</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
