# Product & UX Layer : Tableau de Bord Élève

Ce document décrit l'interface, la logique et les interactions du tableau de bord de suivi de l'élève (`/dashboard`).

---

## 1. Structure Visuelle

L'interface du tableau de bord utilise le thème Rétro-Cyberpunk (fond sombre profond `#0A061E`, lueurs néon vertes, violettes et émeraudes).

- **En-tête de bienvenue** : Affiche un message personnalisé (*"Bonjour, [Nom] 🚀"*) et indique le statut de préparation général de l'élève (VolantReady™).
- **Double Jauge SVG Animée** :
  - *Jauge 1 : Progression Théorique* : Pourcentage de chapitres validés (sur les 12 modules d'apprentissage).
  - *Jauge 2 : VolantReady™* : Indice prédictif de réussite.
- **Raccourci intelligent** : Bouton "Reprendre l'apprentissage" qui rouvre automatiquement le premier cours non validé de la liste.
- **Radar des 10 Thèmes** : Graphique de type radar ou diagramme en barres affichant le taux de maîtrise pour chaque catégorie réglementaire de l'examen.
- **Revue d'Erreurs interactive** : Carrousel permettant de rejouer les questions manquées lors des simulations d'examens blancs.

---

## 2. L'Indice de Préparation VolantReady™

L'indice estime la probabilité que l'élève réussisse son examen officiel (score $\ge$ 35/40). Il est recalculé en temps réel :

- **Si aucun examen blanc n'a été fait** : L'indice se base uniquement sur la lecture des cours :
  $$\text{VolantReady} = \text{Pourcentage de cours validés} \times 0.4 \quad (\text{plafond à } 40\%)$$
- **Si au moins un examen blanc a été fait** : L'indice combine la complétion théorique et les scores récents :
  $$\text{VolantReady} = (\text{modules complétés} \times 0.3) + \left(\frac{\text{score moyen aux examens}}{40} \times 100 \times 0.7\right)$$

### Code couleur de l'indice :
- **Excellent ($\ge$ 85%)** : Vert Émeraude clignotant. L'étudiant est prêt pour l'examen officiel.
- **Moyen ($\ge$ 50%)** : Bleu Cyan. Bonnes bases, mais doit poursuivre ses révisions.
- **Insuffisant ($<$ 50%)** : Rose Néon. L'étudiant doit continuer à lire ses modules théoriques.

---

## 3. Le Radar Interactif des 10 Thèmes

Le graphique analyse les mauvaises réponses de l'historique des examens blancs de l'utilisateur.

- **Calcul de maîtrise** :
  $$\text{Score Thématique} = \frac{\text{Questions posées} - \text{Erreurs commises}}{\text{Questions posées}} \times 100$$
- **Aide visuelle** : Les thèmes affichant un score inférieur à 50% clignotent en rouge néon pour conseiller à l'élève d'ouvrir le cours théorique correspondant.

---

## 4. Le Hub de Revue d'Erreurs (Mistake Review)

Il s'agit d'une interface de rattrapage interactive intégrée au Dashboard :
1. Le carrousel rassemble toutes les questions uniques enregistrées comme erronées dans l'historique de l'élève connecté.
2. L'élève répond à la question directement au sein du widget.
3. **Si la réponse est correcte** : L'explication pédagogique s'affiche, et au clic sur "Suivant", la question est retirée de la liste des erreurs.
4. **Si la réponse est incorrecte** : La question est conservée pour un passage ultérieur.
5. Les statistiques du Radar des thèmes sont recalculées après la correction des erreurs.
