# Product & UX Layer : Quiz de Chapitres & Validation

Ce document décrit l'interface et le parcours d'évaluation des connaissances d'un module théorique spécifique (`/cours/[id]`).

---

## 1. Structure Visuelle du Quiz de Module

Le quiz est affiché immédiatement après le contenu théorique de chaque cours. L'interface utilise une mise en page claire et interactive :

- **Numérotation et progression** : Affiche l'indice de la question courante (ex: "Question 3 / 10").
- **Énoncé et propositions** : La question s'affiche en français avec sa traduction en russe. Les 4 options de réponse sont affichées sous forme de boutons interactifs larges.
- **Bouton d'écoute audio** : Permet de lire l'énoncé de la question à voix haute pour faciliter l'assimilation orale de la langue française.

---

## 2. Interaction & Feedback Immédiat

Contrairement à l'examen blanc, le quiz de fin de module a un but purement éducatif :

- **Pas de chronomètre** : L'élève peut prendre son temps pour analyser la situation.
- **Correction immédiate** : Dès que l'élève choisit une réponse et valide :
  - Le bouton de la bonne réponse s'illumine en **Vert Émeraude**.
  - Si l'élève s'est trompé, sa proposition s'affiche en **Rouge**.
  - La zone d'explication pédagogique s'affiche instantanément en dessous pour lui expliquer la règle en français et en russe.
- **Validation** : L'élève clique sur "Suivant" pour charger la question suivante.

---

## 3. Fin de Quiz & Impact sur la progression

À la fin du questionnaire, un écran de synthèse récapitule les performances de l'élève :
- **Si le score est $\ge$ 80%** : Le module est validé. Une animation visuelle s'affiche et le module est marqué comme complété en base de données.
- **Si le score est inférieur** : L'élève est invité à relire le cours théorique et à retenter le quiz pour le valider.
- Un bouton permet de passer directement au cours suivant ou de revenir au Dashboard.
