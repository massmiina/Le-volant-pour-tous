# Spécifications Fonctionnelles : Espace Personnel (Dashboard)

Ce document décrit l'interface et la logique de l'espace personnel sécurisé (`/dashboard`) destiné aux élèves connectés.

## 1. Objectifs du Dashboard
1. Centraliser **la progression globale** de l'élève en un coup d'œil.
2. Permettre une **reprise rapide** de l'apprentissage (pointer vers le dernier module étudié).
3. Mettre en évidence les **forces et faiblesses** via des statistiques claires pour cibler les révisions.
4. Gérer les éléments favoris (comme les auto-écoles sélectionnées).

## 2. Interface Utilisateur (UI)
Le Dashboard agira comme le véritable "Panneau de bord" d'un vaisseau spatial (rappel du thème Futuriste/Néon), avec une mise en page aérée et hyper-lisible :

- **En-tête (Hero Section)** :
  - Message d'accueil : *"Bonjour, [Prénom] 🚀"*.
  - Une **Jauge de Progression Globale** circulaire ou horizontale très visuelle (ex: "Vous avez complété 45% du programme").
- **Widget "Reprendre l'apprentissage"** :
  - Un grand bouton d'action (Call-to-Action) redirigeant automatiquement vers le premier module non lu (ex: *"Continuer avec le Module 4 : Vitesse"*).
- **Grille des 12 Modules (Vue d'ensemble)** :
  - 12 cartes miniatures (une par module).
  - Code couleur d'état :
    - *Complété* : Lueur Émeraude + Icône Check (✅).
    - *En cours* : Lueur Violette/Orange.
    - *À faire* : Grisé avec faible opacité.
- **Zone "Statistiques et Entraînement"** :
  - **Historique des Examens Blancs** : Liste des derniers scores obtenus sur 40.
  - **Radar de Compétences** : Un graphique (type Radar/Toile d'araignée) montrant les catégories maîtrisées (Signalisation, Priorités) et celles à travailler (Mécanique, Éco-conduite).
- **Zone "Mes Favoris"** :
  - Accès rapide aux auto-écoles sauvegardées depuis la carte interactive (`/auto-ecole`).

## 3. Composants et Logique Technique
Le Dashboard s'appuiera sur des requêtes sécurisées à notre base de données :

- **Protection de Route** : Utilisation du middleware Next.js pour s'assurer que personne ne peut charger `/dashboard` sans un token de session valide.
- **Server Components (RSC)** : La majorité de la page sera rendue côté serveur (Server-Side Rendering) pour aller chercher les données Prisma (`progress`, `quizScores`) avant l'affichage de la page, garantissant des performances maximales.
- **Nouveaux Composants UI à créer** :
  - `<CircularProgress />` : Un cercle SVG animé affichant le pourcentage.
  - `<RadarChart />` : Utilisation d'une librairie légère (ex: `recharts` ou `chart.js`) pour le rendu des statistiques.

## 4. Gamification avancée (Récompenses)
Le Dashboard doit récompenser les efforts :
- Obtention d'un badge spécial (ex: *"Expert Signalisation"*) dès qu'un utilisateur a 5/5 sur les 12 modules.
- Déclenchement d'une animation "Confettis" (canvas) si l'utilisateur réussit un Examen Blanc avec une note > 35/40 depuis le dashboard.
