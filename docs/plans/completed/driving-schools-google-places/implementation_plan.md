# Plan d'implémentation : Carte réelle des auto-écoles via Google Places + partenaires Supabase

## Contexte
La page `/auto-ecole` fonctionne aujourd'hui comme une démo : les auto-écoles sont définies dans `mockAutoEcoles` côté frontend et la carte affiche ces données locales. La nouvelle spécification demande une carte proche d'un usage Google Maps :

- recherche de vraies auto-écoles par ville/adresse ou géolocalisation ;
- affichage des résultats publics issus de Google Places ;
- mise en avant des auto-écoles recommandées / partenaires stockées dans Supabase ;
- séparation nette entre partenaires de la plateforme et favoris personnels d'un utilisateur.

## Décisions d'architecture

### Source des auto-écoles ordinaires
Utiliser Google Places API côté serveur, via les endpoints Places API (New).

- Recherche ville/adresse : `Text Search (New)` avec `textQuery`, par exemple `auto-école Paris`.
- Recherche autour de l'utilisateur : `Text Search (New)` avec `textQuery: "auto-école"` et un biais géographique autour de `lat/lng`.
- `Nearby Search (New)` reste une option secondaire, mais Google Places ne fournit pas de type officiel `driving_school`; les types proches (`school`, `educational_institution`) risquent de manquer des auto-écoles. La recherche textuelle est donc le meilleur choix produit pour ce cas.

### Source des auto-écoles recommandées
Stocker les partenaires / recommandations dans Supabase via Prisma.

- Chaque partenaire doit avoir si possible un `googlePlaceId`.
- Le matching principal se fait par `googlePlaceId`.
- Le matching secondaire nom + adresse + coordonnées ne doit être qu'un fallback temporaire.

### Carte frontend
Remplacer Leaflet par Google Maps JavaScript API pour la page `/auto-ecole`, car les résultats Google Places affichés sur une carte doivent respecter les règles d'affichage et d'attribution Google Maps.

### Sécurité des clés
- `GOOGLE_PLACES_API_KEY` : clé serveur uniquement, utilisée dans les Route Handlers Next.js.
- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` : clé navigateur pour afficher la carte Google Maps, restreinte par domaine et limitée aux APIs nécessaires.
- Ne jamais appeler Places Web Service directement depuis le navigateur avec une clé serveur.

### Stockage des données Google
Ne pas transformer Google Places en base permanente locale. Stocker durablement seulement ce qui est nécessaire :

- `googlePlaceId` pour identifier une auto-école Google ;
- données internes de nos partenaires ;
- favoris utilisateur par `googlePlaceId` ou `partnerId`.

Les détails publics comme téléphone, rating, adresse et site web doivent être relus depuis Google Places quand nécessaire ou rafraîchis selon les règles Google.

## Phase 0 - Préparation

1. Créer / vérifier le projet Google Cloud.
2. Activer les APIs nécessaires :
   - Maps JavaScript API ;
   - Places API.
3. Créer deux clés :
   - clé navigateur restreinte par HTTP referrer ;
   - clé serveur stockée uniquement en variables d'environnement Vercel/local.
4. Ajouter les variables `.env.local` :

```env
GOOGLE_PLACES_API_KEY="..."
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY="..."
```

5. Vérifier les restrictions de budget / quotas dans Google Cloud.

## Phase 1 - Modèle de données Supabase / Prisma

1. Ajouter le modèle `DrivingSchoolPartner`.
2. Ajouter le modèle `UserFavoriteSchool`.
3. Ajouter la relation `favoriteSchools` dans `User`.
4. Prévoir une migration des anciens favoris stockés dans `User.favoriteSchools` si des données réelles existent déjà.
5. Garder `User.favoriteSchools` temporairement pendant la migration si nécessaire, puis le supprimer dans une migration séparée.
6. Ajouter des index utiles :
   - `googlePlaceId` unique côté partenaires ;
   - `userId + googlePlaceId` unique côté favoris ;
   - `userId + partnerId` unique côté favoris ;
   - index sur `latitude`, `longitude`, `city`, `isActive`.
7. Prévoir PostGIS plus tard si le volume de partenaires devient important. Pour une première version, les partenaires sont peu nombreux et un filtre lat/lng + distance serveur suffit.

## Phase 2 - Couche serveur Google Places

Créer une couche server-only, par exemple `lib/googlePlaces.ts`, qui centralise tous les appels Google.

Fonctions attendues :

- `searchDrivingSchoolsByText(query, options)` ;
- `searchDrivingSchoolsNearby(lat, lng, radiusMeters)` ;
- `getPlaceDetails(placeId)` si la fiche détaillée doit charger téléphone/site web à l'ouverture.

Règles :

- Utiliser `fetch` côté Route Handler.
- Envoyer `X-Goog-Api-Key`.
- Envoyer `X-Goog-FieldMask` minimal.
- Ne pas utiliser `*` en production.
- Normaliser les réponses Google dans un type interne unique.
- Gérer les erreurs Google sans exposer la clé ou les détails sensibles au client.

Field mask initial recommandé pour la liste :

```text
places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.googleMapsUri
```

Field mask pour la fiche détaillée, seulement au clic :

```text
id,displayName,formattedAddress,location,rating,userRatingCount,internationalPhoneNumber,websiteUri,googleMapsUri
```

## Phase 3 - API interne Next.js

Créer les Route Handlers suivants :

### `GET /api/driving-schools/search`
Paramètres :

- `query` obligatoire ;
- `lat/lng` optionnels pour biaiser la recherche ;
- `radius` optionnel.

Comportement :

1. Valider la requête.
2. Appeler Google Places Text Search.
3. Charger les partenaires Supabase pertinents.
4. Fusionner les deux sources.
5. Ajouter les flags `isFeatured`, `iconVariant`, `isUserFavorite`.
6. Retourner un tableau normalisé.

### `GET /api/driving-schools/nearby`
Paramètres :

- `lat` obligatoire ;
- `lng` obligatoire ;
- `radius` optionnel, valeur par défaut raisonnable : 10000 mètres.

Comportement :

1. Valider les coordonnées.
2. Chercher `auto-école` autour du point utilisateur.
3. Charger les partenaires dans le rayon.
4. Trier les partenaires en premier, puis les résultats ordinaires par distance.

### `GET /api/driving-schools/details`
Paramètres :

- `placeId` obligatoire.

Comportement :

1. Charger uniquement les détails nécessaires depuis Google Places.
2. Fusionner avec les données partenaire si `placeId` correspond à un partenaire.

## Phase 4 - Fusion Google + Supabase

Créer un helper dédié, par exemple `lib/drivingSchools/mergeResults.ts`.

Règles de fusion :

1. Indexer les partenaires par `googlePlaceId`.
2. Pour chaque résultat Google :
   - si `placeId` correspond à un partenaire actif, marquer `isFeatured: true` ;
   - ajouter `featuredLabel`, `iconVariant`, éventuels textes internes ;
   - conserver les champs Google frais pour adresse/rating/téléphone.
3. Ajouter les partenaires actifs de la zone qui ne sont pas revenus dans Google, si leurs coordonnées sont dans le rayon.
4. Trier :
   - partenaires/recommandés d'abord ;
   - puis distance si disponible ;
   - puis ordre de pertinence Google.
5. Dédupliquer strictement par `googlePlaceId`, puis fallback par coordonnées proches + nom normalisé.

## Phase 5 - Favoris utilisateur

Remplacer le stockage actuel en JSON string par une vraie table relationnelle.

1. `GET /api/user/favorites` retourne les favoris du user connecté.
2. `POST /api/user/favorites` ajoute ou supprime un favori :
   - `googlePlaceId` pour une auto-école Google ;
   - `partnerId` pour un partenaire interne ;
   - ne pas sauvegarder durablement les détails Google comme source de vérité.
3. Le frontend affiche :
   - badge/marker partenaire pour les auto-écoles recommandées par Le Volant Pour Tous ;
   - coeur ou état personnel pour les favoris de l'utilisateur.

## Phase 6 - Frontend `/auto-ecole`

1. Retirer `mockAutoEcoles` comme source principale.
2. Remplacer `MapComponent.tsx` Leaflet par un composant Google Maps, par exemple `GoogleMapComponent.tsx`.
3. Ajouter un hook local :

```ts
useDrivingSchoolSearch()
```

Responsabilités du hook :

- état `query`, `results`, `selectedSchool`, `loading`, `error`, `userLocation` ;
- appel `/api/driving-schools/search` ;
- appel `/api/driving-schools/nearby` ;
- appel `/api/driving-schools/details` au clic si nécessaire ;
- synchronisation des favoris utilisateur.

4. Marqueurs :
   - standard : auto-école Google normale ;
   - featured : partenaire/recommandée ;
   - selected : école actuellement ouverte ;
   - user location : position utilisateur.
5. Liste :
   - partenaires en haut ;
   - distances affichées si géolocalisation active ;
   - état vide et erreurs lisibles.
6. Sidebar :
   - nom, adresse, rating, distance ;
   - label partenaire si `isFeatured`;
   - téléphone/site web si chargés ;
   - bouton itinéraire vers `googleMapsUri` ou URL Google Maps directions.

## Phase 7 - États d'erreur et limites produit

Cas à gérer :

- clé Google manquante ;
- quota Google dépassé ;
- Google ne retourne aucun résultat ;
- utilisateur refuse la géolocalisation ;
- réseau indisponible ;
- Supabase indisponible pour les partenaires ou favoris ;
- partenaire sans `googlePlaceId`.

L'interface doit rester utilisable même si les favoris ne chargent pas : on affiche les résultats Google et on désactive seulement l'état personnel.

## Phase 8 - Tests et vérification

### Tests unitaires ciblés
- Normalisation des résultats Google.
- Fusion Google + partenaires Supabase.
- Tri partenaires d'abord, puis distance.
- Déduplication par `googlePlaceId`.
- Validation des paramètres API.

### Tests manuels
- Recherche `Paris`, `Lyon`, `Marseille`.
- Géolocalisation autorisée.
- Géolocalisation refusée.
- Partenaire présent dans une zone : marker différent + résultat en haut.
- Partenaire absent des résultats Google mais dans le rayon : affiché quand même.
- Favori utilisateur connecté : ajout, suppression, persistance après refresh.
- Visiteur non connecté : modal de connexion au clic sur favori.

### Vérifications techniques
- `npm run lint`
- `npm run build`
- Vérification visuelle desktop/mobile dans le navigateur.
- Vérification que `GOOGLE_PLACES_API_KEY` n'apparaît pas dans le bundle client.

## Risques et arbitrages

- Google Places peut coûter cher si chaque frappe déclenche une recherche : lancer la recherche uniquement au submit, pas à chaque caractère.
- Text Search retourne un maximum limité de résultats : prévoir pagination ou bouton "charger plus" plus tard.
- Les données Google changent : ne pas les dupliquer comme base locale permanente.
- Les partenaires doivent être maintenus proprement : sans `googlePlaceId`, le matching sera fragile.
- La migration Leaflet vers Google Maps peut changer le style visuel : il faut préserver la lisibilité avant l'esthétique.

## Références techniques

- Google Places Text Search (New) : https://developers.google.com/maps/documentation/places/web-service/text-search
- Google Places Nearby Search (New) : https://developers.google.com/maps/documentation/places/web-service/nearby-search
- Google Place Details (New) : https://developers.google.com/maps/documentation/places/web-service/place-details
- Google Places policies and attribution : https://developers.google.com/maps/documentation/places/web-service/policies
- Supabase PostGIS geo queries : https://supabase.com/docs/guides/database/extensions/postgis
- Next.js Route Handlers : `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
