# Spécifications Globales : Le Volant Pour Tous

## 1. Vision du Produit
- **Nom du Projet** : Le Volant Pour Tous
- **Objectif Principal** : Offrir une plateforme moderne, haut de gamme et interactive pour l'apprentissage du code de la route, facilitant la réussite à l'examen grâce à une approche pédagogique gamifiée et visuelle.
- **Public Cible** : Candidats au permis de conduire de tous niveaux (Débutant, Intermédiaire, Avancé).
- **Spécificité** : Plateforme bilingue (Français / Russe) avec un design immersif (Rétro-Néon / Futuriste).

## 2. Architecture Technique (Stack)
L'application repose sur des technologies modernes pour garantir performance, SEO et maintenabilité :
- **Framework Core** : Next.js 16+ (App Router).
- **Langage** : TypeScript strict pour la sécurité du code.
- **Styling & UI** : Tailwind CSS (approches utilitaires), Framer Motion (pour les micro-animations fluides).
- **Gestion d'État** : React Context API (ex: `LanguageContext` pour l'internationalisation à la volée).
- **Données statiques pédagogiques** : Fichiers TypeScript pour les contenus stables du produit (ex: `lib/translations.ts`, `lib/quizData.ts`) tant qu'ils ne nécessitent pas d'administration métier.
- **Backend / BDD** : Next.js API Routes + Prisma + Supabase PostgreSQL pour les comptes, la progression, les favoris utilisateur et les données métier administrables.
- **Données cartographiques externes** : La carte des auto-écoles utilise une API externe de lieux (Google Places) pour les résultats publics, et Supabase pour les auto-écoles recommandées / partenaires par la plateforme.

## 3. Principes de Design (UI/UX)
- **Esthétique** : Thème sombre (Dark mode) profond (`#0A061E`), contrastes élevés avec des couleurs Néon (Violet, Émeraude) pour guider l'attention de l'utilisateur.
- **Typographie** : "Rock Salt" pour les titres créatifs à fort impact, couplé à des polices modernes et très lisibles (ex: Inter ou Roboto) pour le contenu pédagogique.
- **Responsive** : Conception Mobile-First stricte, chaque module doit être parfaitement utilisable sur smartphone.
- **Gamification** : Feedback visuel immédiat (effets de lumière, animations de score sur les quiz).

## 4. Structure de l'Application
- `/app` : Architecture des routes (Accueil, Cours 1 à 12, Quiz, Examen, Auto-écoles, Contact).
- `/components` : Composants isolés et réutilisables (Navbar, Cards, Quiz interactif, MapComponent).
- `/lib` : Logique métier, données de cours et dictionnaires de traduction.
- `/contexts` : Fournisseurs d'état pour englober l'application.

## 5. Stratégie d'Évolution (Roadmap)
Ce fichier sert de base. Les prochaines étapes définies sont :
1. **Cartographie** : Définir les parcours utilisateurs précis (`functional-map.md`).
2. **Authentification** : Protéger les données et suivre la progression (`feature-spec-login.md`).
3. **Espace Personnel** : Créer l'interface de suivi des élèves (`feature-spec-dashboard.md`).
