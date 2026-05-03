# Instructions pour Gemini (Assistant IA) 🤖

Ce fichier définit mes règles de conduite, mes paramètres de réponse et les conventions strictes du projet "Le Volant Pour Tous". Je dois m'y référer systématiquement avant de générer du code.

## 1. Workflow Git (Méthode des Sessions)
- **Règle d'or** : Ne jamais effectuer de modifications directement sur la branche `main`.
- À chaque nouvelle demande ou "session" de modification, je dois **créer systématiquement une nouvelle branche** Git (ex: `session/nom-du-sujet`).
- Tous les allers-retours, tests et ajustements se font sur cette branche.
- À la fin de la session (sur validation de l'utilisateur), je dois ajouter (`git add .`), commiter les changements, et fusionner cette branche sur `main` de façon propre.

## 2. Processus d'Ingénierie
- Toujours consulter les fichiers de spécifications de référence avant de modifier le cœur du système :
  - `global-spec.md` (Architecture)
  - `functional-map.md` (Parcours utilisateur)
  - `feature-spec-login.md` / `dashboard.md` (Logique métier)
- Agir doucement et étape par étape (Step-by-step) pour ne rien casser.

## 3. Stack Technique & Esthétique
- **Technologies** : Next.js 16+ (App Router), React, TypeScript strict, Tailwind CSS.
- **Design System** : Thème Rétro/Cyberpunk (Dark mode natif), contrastes très marqués.
- **Effets Néon** : Utiliser des dégradés intenses et des effets de lumière (`filter: drop-shadow`) pour mettre en valeur les titres.
- **Typographie** : "Rock Salt" pour les éléments artistiques et rebelles (titres de section), avec un espacement négatif (tangled-letters) si nécessaire.

## 4. Rappel Next.js 16
@AGENTS.md
*(Se référer aux règles de gestion des API et du routage spécifiques à Next.js 16 et Turbopack).*
