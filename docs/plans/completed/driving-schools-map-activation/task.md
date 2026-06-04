# Tâches : Rendre opérationnelle la carte des auto-écoles (`/auto-ecole`)

## API Backend & Base de Données
- `[x]` Créer la route d'API `app/api/user/favorites/route.ts` (méthodes GET et POST)
- `[x]` Récupérer les favoris de l'utilisateur connecté depuis Supabase
- `[x]` Enregistrer et sérialiser les favoris dans le champ `favoriteSchools` de Prisma

## Composant Cartographique (`components/MapComponent.tsx`)
- `[x]` Ajouter les props `selectedId`, `onSelect`, `center` et `zoom`
- `[x]` Implémenter le recentrage fluide de la caméra avec `useMap` lors du changement des coordonnées de centrage
- `[x]` Gérer le marqueur de géolocalisation de l'utilisateur
- `[x]` Ajouter des effets de lueur néon animée sur le marqueur actif (sélectionné)

## Page de Recherche des Auto-écoles (`app/auto-ecole/page.tsx`)
- `[x]` Connecter le hook `useAuth` pour détecter la connexion de l'utilisateur
- `[x]` Implémenter le chargement et la sauvegarde des favoris dans l'API si connecté
- `[x]` Implémenter la boîte modale de connexion/inscription pour les invités cliquant sur le cœur
- `[x]` Implémenter la géolocalisation de l'utilisateur (`navigator.geolocation`)
- `[x]` Intégrer la formule de Haversine pour calculer les distances et trier la liste par proximité
- `[x]` Créer un panneau latéral (Sidebar/Bottom-sheet) animé affichant les détails riches de l'école sélectionnée

## Validation & Déploiement
- `[/]` Lancer la commande de build local `npm run build` pour s'assurer que tout compile sans erreurs
- `[/]` Déployer la version stable sur Vercel avec `npx vercel --prod --yes`
