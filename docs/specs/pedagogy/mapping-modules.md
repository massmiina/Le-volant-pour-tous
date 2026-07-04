# Pedagogical Framework : Mapping des 12 Modules & Validation

Ce document décrit comment notre programme de formation de 12 modules d'apprentissage s'aligne sur les 10 thèmes officiels de l'Épreuve Théorique Générale (ETG).

---

## 1. Table de Correspondance (Modules vs Thèmes ETG)

Nos 12 modules de cours couvrent l'intégralité du programme requis par l'examen de l'ETG officiel :

| Code Thème ETG | Thématique Officielle | Modules "Le Volant Pour Tous" |
| :---: | :--- | :--- |
| **L** | La circulation routière | **M1** : Signalisation routière<br>**M2** : Priorités et intersections<br>**M3** : Règles de circulation |
| **C** | Le conducteur | **M7** : Sécurité routière<br>**M8** : Alcool, drogues et conduite |
| **R** | La route | **M4** : Vitesse et limitations<br>**M6** : Autoroute et voies rapides |
| **U** | Les autres usagers | **M12** : Partage de la route |
| **D** | La réglementation générale | *Intégré transversalement dans les modules 1, 3, 4, 5 et 8.* |
| **A** | Les premiers secours | **M11** : Premiers secours |
| **P** | Précautions en quittant le véhicule | **M5** : Stationnement et arrêt<br>**M7** : Sécurité routière |
| **M** | Mécanique et équipements | **M9** : Mécanique et entretien |
| **S** | Équipements de sécurité | **M7** : Sécurité routière<br>**M9** : Mécanique et entretien |
| **E** | Environnement et éco-conduite | **M10** : Éco-conduite |

---

## 2. Cycle de Validation de Progression Pédagogique

Pour garantir l'acquisition des compétences de l'élève avant son examen blanc, chaque module de cours suit un parcours de validation strict :

### 2.1 Lecture Théorique
L'élève étudie les sections interactives, illustrées par des cas pratiques en vue subjective.

### 2.2 Quiz de fin de module
À la fin de chaque chapitre, un quiz comprenant de 5 à 12 questions évalue l'assimilation immédiate du cours.

### 2.3 Seuil de complétion (Completion Threshold)
- Un module est considéré comme **validé** si l'élève obtient un score d'au moins **80%** de bonnes réponses au quiz (ex: 4/5 ou 8/10).
- Dès que le score de validation est atteint, l'identifiant du module (ex: `1` pour le module 1) est poussé dans le tableau `completedModules` de la progression de l'étudiant (localStorage ou Supabase PostgreSQL).
- Le taux de complétion théorique global visible sur le Dashboard augmente de $\frac{1}{12}$ (soit environ **8.3%**) par module validé.
- Une fois le module validé, le bouton d'action du module passe de "Étudier" à "Revoir" et sa couleur néon s'illumine.
