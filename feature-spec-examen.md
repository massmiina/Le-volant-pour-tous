# Spécifications Fonctionnelles : Examen Blanc (`/examen`)

## 1. Objectifs de la fonctionnalité
- Permettre à l'élève de s'évaluer dans les **conditions réelles** de l'examen officiel du code de la route.
- L'habituer à la gestion du stress via un chronomètre strict.
- Déterminer s'il est prêt (Score ≥ 35/40) et identifier ses lacunes persistantes.

## 2. Interface Utilisateur (UI) & Expérience (UX)
Le design doit différer légèrement des cours classiques : il doit être plus "strict", minimaliste et immersif (façon tableau de bord de simulation).

- **Page d'Accueil de l'Examen** :
  - Rappel des règles (40 questions, 20 secondes par question, pas de retour en arrière possible).
  - Bouton "Démarrer la simulation" (Gros CTA Néon).
- **L'Interface de l'Examen (Mode Console)** :
  - **Média Central** : Une grande image (ou vidéo) d'une situation de conduite.
  - **Chronomètre (TimerBar)** : Une barre de progression de 20 secondes en haut de l'écran. Elle vire de l'émeraude au rouge (Warning) dans les 5 dernières secondes.
  - **Télécommande (Boîtier)** : 4 gros boutons interactifs (A, B, C, D) gérant la **sélection multiple** (ex: A et C valides). Un bouton "Valider" finalise le choix.
  - **Accessibilité (Raccourcis Clavier)** : L'élève peut utiliser les touches `A`, `B`, `C`, `D` pour sélectionner et `Entrée` pour valider rapidement.
- **Écran de Résultats (Score Screen)** :
  - Affichage massif du score (ex: **38/40**).
  - Animation de "Réussite" (Confettis/Lueur verte) ou "Échec" (Lueur rouge).
  - **Revue des erreurs** : Un listing détaillé permettant de revoir uniquement les questions ratées avec la correction pédagogique.

## 3. Règles de Gestion (Business Logic)
- **Génération du Test** : Lors du clic sur "Démarrer", l'application pioche **40 questions aléatoires** dans la base de données. L'algorithme doit idéalement respecter une répartition proportionnelle (ex: plus de questions de Signalisation que de Premiers Secours).
- **Règles strictes** :
  - Zéro retour en arrière possible (comme au vrai code).
  - Si le chrono tombe à zéro, la question est marquée fausse, et on passe automatiquement à la suivante.
- **Sauvegarde Anti-Crash (Offline-First)** :
  - L'état de progression de l'examen est sauvegardé en temps réel dans le `localStorage` à chaque question. 
  - En cas de coupure réseau, perte de batterie ou fermeture de l'onglet, l'utilisateur reprend son test exactement là où il s'était arrêté.
- **Paywall / Accès Limité** :
  - **Visiteur public** : N'a le droit de lancer qu'un seul examen blanc (produit d'appel). Son résultat final est conservé en local en attente de la création de son compte.
  - **Élève inscrit** : Accès illimité.

## 4. Architecture Technique & Data
- **Composant Client Lourd (`<ExamEngine />`)** : Toute la logique (Timer, passage à la question suivante, accumulation du score) se fait côté client en React pour garantir une fluidité parfaite (zéro latence réseau pendant l'examen).
- **Chronomètre Infaillible (Timestamps)** : Le moteur n'utilise pas de simple `setInterval` (qui se désynchronise si l'onglet passe en arrière-plan). Il utilise `Date.now()` ou `performance.now()` pour calculer avec précision absolue les 20 secondes écoulées.
- **Intégration Framer Motion** : Utilisé pour animer la transition fluide entre les 40 diapositives sans rechargement de page.
- **Persistance (Base de données Prisma)** :
  À la fin des 40 questions (et une fois le réseau assuré), un appel API (`POST /api/exams`) envoie le résultat final.

  *Schéma de données ajouté au backend :*
  ```prisma
  model ExamResult {
    id        String   @id @default(cuid())
    userId    String
    user      User     @relation(fields: [userId], references: [id])
    score     Int      // Score sur 40
    mistakes  Json     // Tableau des erreurs : [{ qId: "A12", given: "B", correct: "A" }]
    passed    Boolean  // Vrai si score >= 35
    createdAt DateTime @default(now())
  }
  ```
