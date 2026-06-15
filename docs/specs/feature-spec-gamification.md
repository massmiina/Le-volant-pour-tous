# Spécifications Fonctionnelles : Espace Jeux & Gamification (`/jeu`)

Ce document présente l'architecture de l'Arcade Hub (`/jeu`) et les mécaniques de gamification (scores, XP et badges) intégrées à la plateforme "Le Volant Pour Tous".

## 1. Objectifs du Hub de Jeux
1. Diversifier l'apprentissage en proposant des formats d'exercices interactifs et compétitifs.
2. Stimuler les réflexes visuels de l'élève (reconnaissance immédiate des panneaux et des dangers routiers).
3. Renforcer la fidélisation des utilisateurs grâce à des mécaniques addictives (High Scores, niveaux d'XP).

## 2. Structure de l'Arcade Hub (`/jeu`)

L'espace de jeux rompt avec le format pédagogique standard et adopte une identité visuelle "Arcade rétro-cyberpunk" avec lueurs animées et badges thématiques :
- **Hub central de sélection** : Présentation sous forme de cartes d'arcade pour choisir son jeu.
- **Jeu 1 : Sign Master** (Glisser-Déposer / Drag & Drop) :
  - **Concept** : Associer un panneau réglementaire affiché à l'écran à sa signification ou sa zone de dépôt (ex: "Interdiction de stationner").
  - **Technologie** : Propulsé par `framer-motion` (propriétés `drag`, `dragConstraints` et `dragElastic`) pour assurer un glisser-déposer fluide et réactif, adapté aux écrans tactiles (Mobile-first).
- **Jeu 2 : Esquive Route** (Jeu d'arcade dynamique en 3D/2D) :
  - **Concept** : Piloter une voiture sur 3 voies et esquiver les obstacles (panneaux de danger `⚠️`) qui descendent de l'écran à vitesse progressive.
  - **Contrôles** : Raccourcis clavier (flèches gauche/droite) sur ordinateur, et boutons directionnels virtuels superposés en bas d'écran sur mobile.
  - **Score** : Augmente de façon continue tant que le véhicule n'entre pas en collision. L'écran de Game Over affiche le score final avec une option de rejeu.

## 3. Système de Score & Intégration Base de Données

Les jeux intègrent un système de points et de combos :
- **Combos multiplicateur** (Prévu pour Sign Master) : L'enchaînement de bonnes réponses rapides augmente le multiplicateur (Combo x2, x3). Une mauvaise réponse ou un dépassement de délai réinitialise le multiplicateur.
- **Persistance des High Scores** :
  Lors du "Game Over" ou de la fin de partie, le score de l'élève connecté est envoyé à la base de données via une API backend pour persistance :

```prisma
model GameScore {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  gameType  String   // ex: "sign-master" ou "esquive-route"
  score     Int      // Score final atteint
  maxCombo  Int      // Combo maximal atteint
  createdAt DateTime @default(now())
}
```

*Note d'intégration : Les mini-jeux disposent d'un moteur client autonome complet. L'envoi automatique via la route `POST /api/gamescores` est configuré dans le schéma Prisma et sera finalisé à l'étape 4 de la roadmap pour lier directement les interfaces de jeux au backend.*

## 4. Moteur de Niveaux & Badges (Roadmap)
- **Points d'Expérience (XP)** : Chaque quiz validé ou partie de jeu terminée rapporte de l'XP. Les élèves passent des niveaux (ex: "Apprenti", "Pilote chevronné").
- **Badges de Réussite** : Des distinctions animées sont débloquées selon des critères métier (ex: badge "Sans-Faute" pour un examen blanc à 40/40, badge "Assidu" pour 7 jours consécutifs de connexion).
- **Feedback Visuel** : Déclenchement d'effets de lumière néon et de confettis sur le Dashboard lors du passage de niveau.
