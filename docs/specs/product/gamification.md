# Product & UX Layer : Arcade Hub & Gamification

Ce document présente l'expérience utilisateur de l'espace de jeux de l'Arcade Hub (`/jeu`) et les mécaniques de gamification (gains d'XP et déblocage de récompenses).

---

## 1. L'Espace Arcade Hub (`/jeu`)

L'espace de jeux adopte une identité visuelle "Retro-Arcade" cyberpunk, rompant avec le style plus sobre des cours et examens blancs :

- **Cartes de jeu d'arcade** : Cartes lumineuses néon avec effets de hover animés pour sélectionner un jeu.
- **Tableau des High Scores** : Affiche les 3 meilleurs scores de l'utilisateur pour chaque mini-jeu.

---

## 2. Les Jeux Disponibles (UX & Interaction)

### 2.1 Sign Master (Jeu de drag & drop)
- **Objectif** : Associer le panneau routier affiché au centre de l'écran avec sa signification ou sa catégorie (ex: "Danger", "Interdiction") en le glissant-déposant dans la bonne zone de dépôt.
- **Micro-animations** : Propulsé par Framer Motion pour assurer une physique de glisse fluide et tactile sur mobile, avec des effets d'ondes lumineuses lors d'une bonne association.
- **Système de Combo** : L'enchaînement de réponses rapides consécutives augmente un multiplicateur de score (x2, x3). L'erreur réinitialise le multiplicateur.

### 2.2 Esquive Route (Jeu d'arcade 3 voies)
- **Objectif** : Piloter une voiture sur 3 voies parallèles et esquiver les panneaux d'obstacles (panneaux ⚠️) qui défilent.
- **Contrôles** : Raccourcis clavier (flèches gauche/droite) sur ordinateur, et gros boutons virtuels fléchés superposés en bas d'écran sur smartphone.
- **Accélération progressive** : Les obstacles descendent de plus en plus vite au fil du temps. Le score augmente continuellement tant qu'il n'y a pas de collision.

---

## 3. Système d'XP et Niveaux

Toutes les actions éducatives et ludiques sur la plateforme rapportent des points d'expérience (XP) :

- **Lecture complète d'un cours** : +10 XP
- **Réussite d'un quiz de module** : +50 XP
- **Réussite d'un examen blanc (score $\ge$ 35/40)** : +100 XP
- **Meilleur score battu sur un jeu d'arcade** : +40 XP

### Progression de niveau (Levels)
L'élève progresse à travers différents grades (ex: *Apprenti*, *Conducteur de nuit*, *Pilote chevronné*). Chaque passage de niveau déclenche une animation de confettis et d'éclairs de lumière néon sur son Dashboard.

---

## 4. Les Badges de Réussite

Les badges sont des distinctions visuelles uniques débloquées selon des critères précis :

- 🏆 **Expert de la Route** : Réussir 3 examens blancs consécutifs.
- 🎯 **Sans-Faute** : Obtenir un score parfait de 40/40 à un examen blanc.
- 🔥 **Régulier** : Se connecter 5 jours consécutifs pour réviser (calculé sur le streak).
- 🧩 **As du Volant** : Atteindre un score supérieur à 1000 points sur Esquive Route.

Les badges débloqués apparaissent en couleur néon lumineuse sur le profil et le Dashboard de l'élève, tandis que les badges non obtenus restent grisés avec une infobulle indiquant le critère d'obtention.
