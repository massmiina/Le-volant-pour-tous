# Walkthrough : Carte réelle des auto-écoles via Google Places + partenaires Supabase

## Résumé
La carte `/auto-ecole` ne dépend plus d'une liste statique `mockAutoEcoles`. Elle utilise maintenant une architecture locale complète pour rechercher des auto-écoles réelles via Google Places, fusionner les résultats avec les auto-écoles recommandées / partenaires stockées dans Supabase, et afficher des marqueurs distincts sur une carte Google Maps.

## Ce qui a été livré
- Ajout des modèles Prisma `DrivingSchoolPartner` et `UserFavoriteSchool`.
- Ajout d'une couche server-only `lib/driving-schools` pour Google Places, la distance, les partenaires et la fusion des résultats.
- Ajout des routes internes :
  - `GET /api/driving-schools/search`
  - `GET /api/driving-schools/nearby`
  - `GET /api/driving-schools/details`
- Mise à jour de `GET/POST /api/user/favorites` pour utiliser la table relationnelle des favoris.
- Remplacement de la source statique de `/auto-ecole` par les APIs internes.
- Ajout d'un composant Google Maps avec marqueurs standard, partenaire/recommandé, sélectionné et position utilisateur.
- Mise à jour des spécifications et du plan actif correspondant.

## Vérifications effectuées
- `npx prisma generate`
- `npx prisma db push --skip-generate` avec les variables de `.env.local`
- `npx eslint` ciblé sur les fichiers modifiés
- `npx tsc --noEmit`
- `npm run build`
- Vérification locale de `/auto-ecole` dans le navigateur
- Vérification que `GOOGLE_PLACES_API_KEY` n'apparaît pas dans `.next/static`

## Notes locales
Les clés Google restent locales et ne sont pas versionnées :

```env
GOOGLE_PLACES_API_KEY="..."
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY="..."
```

Le déploiement n'a pas été fait volontairement. Cette session est limitée au test local.
