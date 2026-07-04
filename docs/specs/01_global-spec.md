# Spécifications Globales : Le Volant Pour Tous

## 1. Vision du Produit
- **Nom du Projet** : Le Volant Pour Tous
- **Objectif Principal** : Offrir une plateforme moderne, haut de gamme et interactive pour l'apprentissage du code de la route, facilitant la réussite à l'examen grâce à une approche pédagogique gamifiée et visuelle.
- **Public Cible** : Candidats au permis de conduire de tous niveaux (Débutant, Intermédiaire, Avancé).
- **Spécificité** : Plateforme bilingue (Français / Russe) avec un design immersif (Rétro-Néon / Futuriste) et un apprentissage calqué sur le référentiel français **REMC** et l'examen **ETG** (voir les [spécifications pédagogiques](file:///Users/yasmina.dzhv/ss5/docs/specs/pedagogical-spec.md)).

## 2. Architecture Technique (Stack)
L'application repose sur des technologies modernes pour garantir performance, SEO et maintenabilité :
- **Framework Core** : Next.js 16+ (App Router).
- **Langage** : TypeScript strict pour la sécurité du code.
- **Styling & UI** : Tailwind CSS (approches utilitaires), Framer Motion (pour les micro-animations fluides).
- **Gestion d'État** : React Context API (ex: `LanguageContext` pour l'internationalisation à la volée).
- **Données statiques pédagogiques** : Fichiers TypeScript pour les contenus stables du produit (ex: `lib/translations.ts`, `lib/quizData.ts`) tant qu'ils ne nécessitent pas d'administration métier.
- **Backend / BDD & Authentification** : Next.js API Routes + Prisma + Supabase PostgreSQL pour la persistence. L'authentification et la gestion des sessions sécurisées par cookies sont gérées nativement par **Supabase Auth** (via `@supabase/ssr`), avec synchronisation réactive via `AuthContext`.
- **Données cartographiques externes** : La carte des auto-écoles utilise Google Places API (Text/Nearby/Details Search) côté serveur, géolocalisation client (`navigator.geolocation`), et tri dynamique par distance (formule de Haversine). Les auto-écoles recommandées et partenaires sont stockées dans Supabase et fusionnées dans l'API.

## 3. Principes de Design (UI/UX)
- **Esthétique** : Thème sombre (Dark mode) profond (`#0A061E`), contrastes élevés avec des couleurs Néon (Violet, Émeraude) pour guider l'attention de l'utilisateur.
- **Typographie** : "Rock Salt" pour les titres créatifs à fort impact, couplé à des polices modernes et très lisibles (ex: Inter ou Roboto) pour le contenu pédagogique.
- **Responsive** : Conception Mobile-First stricte, chaque module doit être parfaitement utilisable sur smartphone.
- **Gamification** : Feedback visuel immédiat (effets de lumière, animations de score sur les quiz).
- **Alignement Pédagogique** : Pédagogie bilingue calquée sur la réglementation française. Les termes légaux français sont conservés et expliqués conceptuellement en russe (voir [pedagogical-spec.md](file:///Users/yasmina.dzhv/ss5/docs/specs/pedagogical-spec.md)).

## 4. Structure de l'Application
- `/app` : Architecture des routes (Accueil, Cours 1 à 12, Quiz, Examen, Auto-écoles, Contact, Compte, Dashboard, Jeu).
- `/components` : Composants isolés et réutilisables (Navbar, Cards, Quiz interactif, GoogleMapComponent).
- `/lib` : Logique métier, données de cours, dictionnaire de traductions et moteur de recherche d'auto-écoles.
- `/contexts` : Fournisseurs d'état pour englober l'application (ex: `AuthContext`, `LanguageContext`).

## 5. Stratégie d'Évolution (Roadmap)
Ce fichier sert de base. La suite du développement se concentre sur :
1. **Gamification Avancée** : Mettre en œuvre le moteur de points, XP, streaks, et les récompenses / badges pour l'apprentissage.
2. **Intégration BDD des Mini-jeux** : Connecter l'Arcade Hub (`/jeu`) à la table `GameScore` via API pour sauvegarder les meilleurs scores des élèves.
3. **Mise en situation subjective 8K** : Enrichir le catalogue de quiz et examens blancs avec de nouveaux cas pratiques de conduite à vue immersive.
