import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFiltersStore } from "@/stores/filtersStore";
import { DISTANCES, PERIODES } from "@/types/offre";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  motsCles: z.string().optional(),
  commune: z.string().max(5).optional(),
  distance: z.coerce.number().optional(),
  typeContrat: z.string().optional(),
  experience: z.string().optional(),
  periodeDays: z.string().optional(),
  alternance: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

const TYPES_CONTRAT = [
  { value: "CDI", label: "CDI" },
  { value: "CDD", label: "CDD" },
  { value: "MIS", label: "Intérim" },
  { value: "SAI", label: "Saisonnier" },
  { value: "LIB", label: "Libéral" },
  { value: "REP", label: "Reprise" },
  { value: "FRA", label: "Franchise" },
  { value: "TTI", label: "Travail temporaire insertion" },
];

const EXPERIENCE = [
  { value: "1", label: "Moins d'1 an" },
  { value: "2", label: "1 à 3 ans" },
  { value: "3", label: "Plus de 3 ans" },
];

export function SearchFilters() {
  const { filtres, setFiltres, resetFiltres } = useFiltersStore();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>({
      defaultValues: {
        motsCles: filtres.motsCles ?? "",
        commune: filtres.commune ?? "",
        distance: filtres.distance ?? 10,
        typeContrat: filtres.typeContrat ?? "",
        experience: filtres.experience ?? "",
        periodeDays: filtres.periodeDays ?? "1",
        alternance: filtres.alternance ?? false,
      },
    });

  const commune = watch("commune");
  const alternance = watch("alternance");

  const onSubmit = (values: FormValues) => {
    setFiltres({
      ...values,
      distance: values.commune ? values.distance : undefined,
      periodeDays: values.periodeDays === "all" ? "" : values.periodeDays,
    });
  };

  const handleReset = () => {
    reset();
    resetFiltres();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border p-6 space-y-4"
    >
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="motsCles">Poste / mots-clés</Label>
          <Input
            id="motsCles"
            placeholder="Développeur, comptable, commercial..."
            className="mt-1"
            {...register("motsCles")}
          />
        </div>

        <div className="w-36">
          <Label htmlFor="commune">Code INSEE commune</Label>
          <Input
            id="commune"
            placeholder="75056, 69123..."
            maxLength={5}
            className="mt-1"
            {...register("commune")}
          />
        </div>

        <div className="w-32">
          <Label>Rayon</Label>
          <Select
            onValueChange={(v) => setValue("distance", Number(v))}
            defaultValue={String(filtres.distance ?? 10)}
            disabled={!commune}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Distance" />
            </SelectTrigger>
            <SelectContent>
              {DISTANCES.map((d) => (
                <SelectItem key={d.value} value={String(d.value)}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Type de contrat</Label>
          <Select
            onValueChange={(v) => setValue("typeContrat", v)}
            defaultValue={filtres.typeContrat}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Tous les contrats" />
            </SelectTrigger>
            <SelectContent>
              {TYPES_CONTRAT.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Label>Expérience</Label>
          <Select
            onValueChange={(v) => setValue("experience", v)}
            defaultValue={filtres.experience}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Toute expérience" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Label>Publiée depuis</Label>
          <Select
            onValueChange={(v) => setValue("periodeDays", v)}
            defaultValue={filtres.periodeDays ?? "1"}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIODES.map((p) => (
                <SelectItem key={p.value || "all"} value={p.value || "all"}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <Checkbox
              checked={alternance}
              onCheckedChange={(checked) => setValue("alternance", checked === true)}
            />
            <span className="text-sm font-medium">Alternance uniquement</span>
          </label>
        </div>

        <div className="flex items-end gap-2">
          <Button type="submit" className="gap-2">
            <Search className="h-4 w-4" />
            Rechercher
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleReset}
            title="Réinitialiser"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {commune && (
        <p className="text-xs text-muted-foreground">
          Recherche dans un rayon autour du code INSEE{" "}
          <strong>{commune}</strong>
        </p>
      )}
    </form>
  );
}
