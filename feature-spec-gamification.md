# Spécifications Fonctionnelles : Espace Mini-Jeux (`/jeu`)

## 1. Objectifs de la fonctionnalité
- Rendre l'apprentissage du code de la route (notamment les panneaux) ludique et moins rébarbatif.
- Augmenter le temps passé sur la plateforme (rétention) grâce à des mécaniques addictives d'Arcade.
- Stimuler la mémorisation par la vitesse d'exécution.

## 2. Interface Utilisateur (UI) & Expérience (UX)
L'interface rompt avec le format "cours" pour adopter un style de jeu d'Arcade Cyberpunk.

- **Menu de Sélection** : Choix du jeu (Actuellement : "Sign Master" - Drag & Drop des panneaux).
- **L'Interface en Jeu** :
  - **Zone supérieure** : Affichage du Score, du multiplicateur (Combo x2, x3) et du temps restant (ex: mode 60 secondes).
  - **Zone centrale** : 
    - À gauche : Les panneaux (visuels) qui apparaissent aléatoirement.
    - À droite : Des "zones de dépôt" (Dropzones) correspondant aux définitions (ex: "Interdiction de stationner").
  - **Animations & Feedback** :
    - Succès : Lueur émeraude, son de validation, le score bondit.
    - Échec : Tremblement (Shake), lueur rouge, perte du multiplicateur de combo.

## 3. Règles de Gestion (Business Logic)
- **Mécanique Principale** : L'utilisateur clique et glisse (Drag & Drop) un panneau sur sa définition. Si c'est correct, les éléments disparaissent et un nouveau panneau apparaît.
- **Système de Score** :
  - +100 points par bonne réponse.
  - Multiplicateur de Combo : Si l'utilisateur enchaîne 3 bonnes réponses en moins de 5 secondes, les points comptent double (x2), puis triple (x3). Une erreur remet le combo à zéro.
- **Fin de partie** : À la fin des 60 secondes, l'écran de "Game Over" affiche le score total, le plus grand combo, et un trophée s'il a battu son High Score personnel.

## 4. Architecture Technique & Data
- **Composants Requis** :
  - Utilisation de `framer-motion` (propriétés `drag` et `dragConstraints`) pour gérer le Drag & Drop de façon fluide et réactive, indispensable pour le tactile (Mobile-first).
- **Persistance des Scores (Prisma)** :
  ```prisma
  model GameScore {
    id        String   @id @default(cuid())
    userId    String
    user      User     @relation(fields: [userId], references: [id])
    gameType  String   // ex: "sign-master"
    score     Int
    maxCombo  Int
    createdAt DateTime @default(now())
  }
  ```
