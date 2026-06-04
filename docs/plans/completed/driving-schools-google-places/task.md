# Tâches : Carte réelle des auto-écoles via Google Places + partenaires Supabase

## Préparation
- `[x]` Créer / vérifier le projet Google Cloud et la facturation.
- `[x]` Activer Maps JavaScript API et Places API.
- `[x]` Créer une clé navigateur restreinte par domaine.
- `[x]` Créer une clé serveur pour Places API.
- `[x]` Ajouter `GOOGLE_PLACES_API_KEY` et `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` dans `.env.local`.

## Base de données
- `[x]` Ajouter `DrivingSchoolPartner` dans `prisma/schema.prisma`.
- `[x]` Ajouter `UserFavoriteSchool` dans `prisma/schema.prisma`.
- `[x]` Ajouter la relation `favoriteSchools` dans `User`.
- `[x]` Générer le client Prisma localement.
- `[x]` Appliquer la migration / `prisma db push` sur la base locale Supabase.
- `[x]` Prévoir la migration des anciens favoris JSON si des données réelles existent.
- `[x]` Ajouter au moins une auto-école partenaire de test avec `googlePlaceId`.

## Couche Google Places
- `[x]` Créer `lib/googlePlaces.ts`.
- `[x]` Implémenter `searchDrivingSchoolsByText`.
- `[x]` Implémenter `searchDrivingSchoolsNearby`.
- `[x]` Implémenter `getPlaceDetails`.
- `[x]` Ajouter les field masks minimaux.
- `[x]` Normaliser les réponses Google vers un type interne stable.
- `[x]` Gérer proprement les erreurs Google sans exposer la clé API.

## API interne
- `[x]` Créer `app/api/driving-schools/search/route.ts`.
- `[x]` Créer `app/api/driving-schools/nearby/route.ts`.
- `[x]` Créer `app/api/driving-schools/details/route.ts`.
- `[x]` Valider les paramètres entrants.
- `[x]` Fusionner résultats Google + partenaires Supabase.
- `[x]` Ajouter `isFeatured`, `iconVariant`, `isUserFavorite`.
- `[x]` Dédupliquer les résultats.
- `[x]` Trier partenaires d'abord, puis distance / pertinence.

## Favoris utilisateur
- `[x]` Remplacer le stockage JSON des favoris par `UserFavoriteSchool`.
- `[x]` Adapter `GET /api/user/favorites`.
- `[x]` Adapter `POST /api/user/favorites`.
- `[x]` Gérer visiteur non connecté sans erreur bloquante.
- `[x]` Vérifier persistance après refresh.

## Frontend carte
- `[x]` Retirer `mockAutoEcoles` comme source principale.
- `[x]` Installer / intégrer le loader Google Maps choisi.
- `[x]` Remplacer `MapComponent.tsx` Leaflet par un composant Google Maps.
- `[x]` Créer le hook `useDrivingSchoolSearch`.
- `[x]` Brancher la recherche par ville/adresse.
- `[x]` Brancher la géolocalisation.
- `[x]` Afficher les markers standard, featured, selected et user location.
- `[x]` Adapter la liste de résultats.
- `[x]` Adapter la sidebar de détails.
- `[x]` Gérer les états loading, empty, error et geolocation denied.

## Tests
- `[x]` Tester la normalisation Google Places.
- `[x]` Tester la fusion Google + partenaires.
- `[x]` Tester le tri partenaires d'abord.
- `[x]` Tester la déduplication par `googlePlaceId`.
- `[x]` Tester les validations API.
- `[x]` Tester manuellement Paris, Lyon, Marseille.
- `[x]` Tester geolocalisation acceptée/refusée.
- `[x]` Tester favori connecté et invité.
- `[x]` Lancer ESLint sur les fichiers modifiés.
- `[x]` Lancer `npx tsc --noEmit`.
- `[x]` Lancer `npm run build`.
- `[x]` Vérifier que `GOOGLE_PLACES_API_KEY` n'est pas exposée côté client.
- `[x]` Vérifier que `/auto-ecole` rend localement sans erreur console.
