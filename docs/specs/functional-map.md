# Cartographie Fonctionnelle (Functional Map)

Ce document décrit l'arborescence du site, les différents profils d'utilisateurs et leurs parcours respectifs (User Journeys) sur la plateforme "Le Volant Pour Tous".

## 1. Arborescence Globale (Site Map)

- **`/` (Accueil)** : Landing page (design immersif néon), proposition de valeur, sélection de niveau (Débutant/Intermédiaire/Avancé).
- **`/cours` (Catalogue Pédagogique)** : Liste complète des 12 modules d'apprentissage.
  - **`/cours/[id]`** : Contenu d'un module spécifique (ex: Signalisation, Priorités). Contient la théorie et se termine par un mini-quiz de validation.
- **`/quiz`** : Espace d'entraînement rapide (série de questions aléatoires ou ciblées).
- **`/examen`** : Mode Examen Blanc (Conditions réelles, 40 questions, chronométré).
- **`/jeu`** : Espace de gamification / Mini-jeux (ex: Glisser-déposer de panneaux).
- **`/auto-ecole`** : Carte interactive pour rechercher les auto-écoles réelles d'une ville ou autour de la position utilisateur, avec mise en avant des auto-écoles recommandées / partenaires par Le Volant Pour Tous.
- **`/contact`** : Formulaire de demande d'assistance et informations de contact.
- **`/avis`** : Section des témoignages (Social Proof).
- ***(Futur)* `/dashboard`** : Espace personnel de l'élève (suivi de progression).
- ***(Futur)* `/login` / `/register`** : Pages d'authentification.

## 2. Profils et Parcours Utilisateurs (User Journeys)

### A. Le Visiteur Public (Non Authentifié)
L'objectif est de lui faire découvrir la qualité pédagogique pour l'inciter à s'inscrire.
- Arrive sur la Landing Page.
- Peut basculer la langue du site (Français / Russe) à tout moment de sa navigation.
- A un accès complet à la lecture des cours théoriques (`/cours`).
- Peut tester quelques quiz de base pour découvrir l'interface gamifiée.
- Utilise la carte des auto-écoles librement : recherche par ville/adresse, géolocalisation, consultation des fiches et ouverture d'un itinéraire.
- **Sauvegarde Locale (Sans Compte)** : Sa progression (modules lus, scores des quiz) est **automatiquement sauvegardée** de manière persistante sur son appareil (via `localStorage` ou équivalent). Le visiteur peut fermer son navigateur et revenir des jours plus tard sans perdre son avancement.

### B. L'Élève Inscrit (Futur)
L'objectif est de le fidéliser et de l'accompagner jusqu'à l'obtention du code.
- Possède un compte sécurisé (Email/Mot de passe ou Connexion Sociale type Google).
- Est automatiquement redirigé vers son `/dashboard` à la connexion.
- **Fonctionnalités débloquées** :
  - **Sauvegarde Cloud** de sa progression (marquage automatique des modules comme "Terminés").
  - **Historique** de tous ses scores aux quiz et examens blancs.
  - **Analyse des faiblesses** : L'algorithme lui conseille les modules à réviser selon ses mauvaises réponses.
  - Possibilité de mettre des auto-écoles en "Favoris" personnels.

### C. L'Administrateur (Futur lointain)
- Accès sécurisé à une interface d'administration métier (`/admin`).
- **Droits** : Édition des questions de quiz, modération des avis utilisateurs, gestion de la liste des auto-écoles recommandées / partenaires, association avec leur identifiant Google Places et choix de leur affichage prioritaire sur la carte.

## 3. Flux de Conversion Principal (Core User Flow)

Voici le parcours idéal que nous souhaitons faire vivre à un nouvel utilisateur :
1. **Acquisition** : Arrivée sur `/` (Landing Page). Le design rétro-néon et le bilinguisme créent un effet "Wow" immédiat.
2. **Engagement** : Clic sur "Commencer l'Aventure" → Redirection vers `/cours/1` (Signalisation).
3. **Action & Gamification** : Lecture fluide du cours, suivie d'un clic sur "Quiz Signalisation". L'utilisateur répond à 5 questions avec des animations visuelles en cas de bonne réponse.
4. **Conversion (À implémenter)** : À la fin du quiz, affichage du score (ex: 4/5) avec un appel à l'action (CTA) : *"Sauvegardez votre score et débloquez l'examen blanc en créant un compte gratuit"*.
5. **Fidélisation** : Inscription réussie. L'utilisateur revient quotidiennement sur son `/dashboard` pour voir sa barre de progression avancer vers les 100%.
