# Product & UX Layer : Simulateur d'Examen Blanc

Ce document décrit l'interface et le parcours utilisateur lors de la réalisation d'une simulation d'examen blanc (`/examen`).

---

## 1. briefing et lencement de l'Examen

Avant de débuter l'épreuve, l'élève accède à un écran de briefing qui rappelle les conditions officielles de l'ETG :
- 40 questions à choix multiples.
- 20 secondes par question.
- Pas de retour en arrière possible.
- Réussite à partir de 35 bonnes réponses.

L'épreuve débute après le clic sur le bouton "Lancer l'Examen" (effet pulse néon).

---

## 2. La Console de Simulation

L'interface est conçue pour être minimaliste et immersive :

- **Le Média Central** : Une image à haute résolution simulant une vue subjective depuis le poste de conduite (ex: rétroviseurs, tableau de bord, signalisation routière).
- **Le Chronomètre Visuel** : Une barre horizontale située tout en haut de l'écran. Elle se vide de gauche à droite sur 20 secondes. 
  - *Vert émeraude* par défaut.
  - Passe au *Rouge clignotant* sous la barre des 5 secondes restantes.
- **Le Pavé Tactile / Raccourcis Clavier** :
  - L'élève peut cliquer sur les boutons virtuels A, B, C, D ou appuyer sur les touches correspondantes du clavier.
  - La validation se fait soit par clic sur le bouton "Valider", soit via la touche `Entrée`.
- **Retour Haptique (Vibration)** :
  - Une vibration de 20ms est déclenchée lors de la sélection d'une option sur smartphone.
  - Une vibration de 40ms est émise lors de la validation.

---

## 3. Écran de Résultats et Revue des Erreurs

Une fois la 40ème question répondue, l'examen prend fin et le score final sur 40 s'affiche avec une lueur néon :
- **Vert Émeraude** en cas de réussite ($\ge$ 35).
- **Rouge Néon** en cas d'échec ($<$ 35).

### La Section Revue des Erreurs
Un volet en bas de page permet à l'élève d'examiner chaque question ratée lors de la session.
- Il peut y comparer la réponse qu'il a fournie avec la bonne réponse attendue.
- L'explication théorique et le rappel de la règle s'affichent pour chaque erreur commise.
- Un bouton permet de retourner au Dashboard, un autre de relancer immédiatement un nouvel examen blanc.
