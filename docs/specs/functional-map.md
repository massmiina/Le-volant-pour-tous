# Cartographie Fonctionnelle (Functional Map)

Ce document décrit l'arborescence du site, les différents profils d'utilisateurs et leurs parcours respectifs (User Journeys) sur la plateforme "Le Volant Pour Tous".

## 1. Arborescence Globale (Site Map)

- **`/` (Accueil)** : Landing page (design immersif néon), proposition de valeur, sélection de niveau (Débutant/Intermédiaire/Avancé).
- **`/cours` (Catalogue Pédagogique)** : Liste complète des 12 modules d'apprentissage.
  - **`/cours/[id]`** : Contenu d'un module spécifique. Contient la théorie et se termine par un mini-quiz de validation.
- **`/quiz`** : Espace d'entraînement rapide (série de questions aléatoires ou ciblées).
- **`/examen`** : Mode Examen Blanc (Conditions réelles, 40 questions, chronométré).
- **`/jeu`** : Espace de gamification / Arcade Hub (Sign Master - drag & drop de panneaux, Esquive Route - jeu d'évitement).
- **`/auto-ecole`** : Carte interactive pour rechercher les auto-écoles réelles d'une ville ou autour de la position utilisateur (Google Places), avec mise en avant des auto-écoles recommandées et partenaires par Le Volant Pour Tous, et gestion des favoris.
- **`/contact`** : Formulaire de demande d'assistance.
- **`/avis`** : Section des témoignages (Social Proof).
- **`/dashboard`** : Tableau de bord de l'élève (suivi de progression, VolantReady™ prediction, Radar des thèmes, Revue d'erreurs).
- **`/compte`** : Espace de configuration personnel (mise à jour du profil, changement de mot de passe, destruction de compte, reset de progression).
- **`/login` / `/register`** : Pages d'authentification (Magic Link OTP, Email/Mot de passe standard).

## 2. Profils et Parcours Utilisateurs (User Journeys)

### A. Le Visiteur Public (Non Authentifié)
L'objectif est de lui faire découvrir la qualité pédagogique pour l'inciter à s'inscrire.
- Arrive sur la Landing Page.
- Peut basculer la langue du site (Français / Russe) à tout moment.
- A un accès complet à la lecture des cours théoriques (`/cours`).
- Peut tester quelques quiz de base.
- Utilise la carte des auto-écoles librement (recherche par ville, géolocalisation, consultation de fiches détaillées, itinéraires).
- **Sauvegarde Locale (Sans Compte)** : Sa progression (modules lus, scores des quiz) est **automatiquement sauvegardée** de manière persistante sur son appareil via `localStorage`.

### B. L'Élève Inscrit
L'objectif est de le fidéliser et de l'accompagner jusqu'à l'obtention du code.
- Possède un compte sécurisé via Supabase Auth.
- Redirigé vers son `/dashboard` à la connexion.
- **Fonctionnalités débloquées** :
  - **Sauvegarde Cloud** automatique de sa progression lors de la connexion (fusion transparente de son historique `localStorage` invité vers la base de données PostgreSQL).
  - **Espace Compte (`/compte`)** pour modifier ses informations ou supprimer définitivement son compte (cascade en base et Supabase Auth).
  - **Historique des Examens Blancs** : Liste des 5 derniers scores obtenus sur 40.
  - **Radar des 10 thèmes** : Pourcentage de réussite par catégorie d'examen calculé dynamiquement.
  - **Revue d'Erreurs** : Carrousel interactif au sein du dashboard pour réviser et éliminer spécifiquement les questions d'examens manquées.
  - Possibilité de mettre des auto-écoles en "Favoris" personnels.

### C. L'Administrateur (Futur)
- Accès sécurisé à une interface d'administration métier (`/admin`).
- **Droits** : Édition des questions de quiz, gestion de la liste des auto-écoles partenaires dans Supabase et association avec leur identifiant Google Places.

## 3. Flux de Conversion Principal (Core User Flow)

Voici le parcours idéal que nous souhaitons faire vivre à un nouvel utilisateur :
1. **Acquisition** : Arrivée sur `/` (Landing Page).
2. **Engagement** : Clic sur "Commencer l'Aventure" → Redirection vers `/cours/1` (Signalisation routière) pour étudier le contenu théorique bilingue.
3. **Action & Gamification** : Lecture du cours, suivie du Quiz Signalisation. La réussite du quiz avec un score d'au moins 80% (ex: 4/5) valide le module et augmente le taux de progression global de l'élève.
4. **Conversion** : À la fin du quiz ou en essayant d'ajouter une auto-école en favori, une modale/invite s'affiche : *"Sauvegardez votre progression et débloquez l'accès illimité aux examens en créant un compte gratuit"*.
5. **Synchronisation** : Inscription réussie. Le `localStorage` est fusionné vers sa base cloud, et l'utilisateur est redirigé vers son `/dashboard`.
6. **Fidélisation** : L'élève revient quotidiennement, suit ses statistiques sur le Radar thématique et travaille sur sa Revue d'erreurs pour augmenter son indice de préparation VolantReady™.
