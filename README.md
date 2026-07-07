# Job Board FR

Application web d'agrégation d'offres d'emploi en France, à usage personnel. Centralise les offres de l'API France Travail avec des filtres avancés pour éviter de jongler entre plusieurs job boards.

## Fonctionnalités

- Recherche d'offres avec filtres : mots-clés, commune (code INSEE) + rayon, type de contrat, expérience, période de publication, alternance
- Affichage paginé des résultats
- Sauvegarde d'offres en favoris (localStorage)
- Page de détail d'une offre (description, compétences, salaire, liens de postulation)

## Stack technique

- React 19 + TypeScript
- Vite
- TanStack Query — fetching et cache des offres
- Zustand — état UI local (filtres, favoris)
- React Hook Form + Zod — formulaire de recherche
- Tailwind CSS + shadcn/ui
- React Router DOM

## Architecture

V1 : frontend only, sans backend. L'app React appelle directement l'API France Travail (OAuth2 client credentials) via un proxy Vite en développement pour contourner le CORS.

```
React (TanStack Query) → proxy Vite → API France Travail
```

Une V2 avec backend (.NET) est prévue pour sécuriser les credentials côté serveur, persister les favoris en base de données et ajouter des alertes email.

## Installation

```bash
cd frontend
npm install
```

Crée un fichier `frontend/.env` avec tes credentials [France Travail](https://francetravail.io/) :

```
VITE_FRANCE_TRAVAIL_CLIENT_ID=...
VITE_FRANCE_TRAVAIL_CLIENT_SECRET=...
```

Puis lance le serveur de développement :

```bash
npm run dev
```
