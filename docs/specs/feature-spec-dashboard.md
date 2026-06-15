# Spécifications Fonctionnelles : Tableau de Bord Élève (`/dashboard`)

Ce document décrit l'interface et la logique du tableau de bord interactif destiné aux élèves connectés sur "Le Volant Pour Tous".

## 1. Objectifs du Tableau de Bord (Dashboard)
1. Permettre à l'élève de suivre sa progression de manière dynamique et gamifiée.
2. Évaluer en temps réel ses chances de réussite à l'examen officiel grâce à un indice prédictif.
3. Cartographier précisément ses forces et ses faiblesses sur les 10 thèmes réglementaires.
4. Fournir un outil de correction ciblée (Revue d'erreurs) pour réviser interactivement les questions ratées lors des examens blancs.

## 2. Structure Graphique (Interface Utilisateur)

Le tableau de bord est conçu selon les principes du design Rétro-Cyberpunk (fond sombre, lueurs néon violettes, émeraudes et cyans) :

- **En-tête & Message de bienvenue** : Salutation personnalisée à l'élève (*"Bonjour, [Pseudo] 🚀"*) et bandeau dynamique indiquant son niveau de préparation global (VolantReady™).
- **Double Jauge Circulaire Animée (Gauges SVG)** :
  - **Progression Théorique** : Pourcentage de chapitres lus et validés sur les 12 modules d'apprentissage.
  - **Indice VolantReady™** : Prédictions de réussite calculées en direct.
- **Bouton "Reprendre l'apprentissage"** : Un raccourci intelligent pour rouvrir immédiatement le premier module restant à lire.
- **Radar des 10 Thèmes Officiels** : Vue d'ensemble de la maîtrise des 10 catégories réglementaires du code de la route.
- **Hub de Revue d'Erreurs** : Espace interactif permettant de rejouer et corriger les questions précédemment ratées.
- **Historique des Examens Blancs** : Liste des 5 derniers résultats de simulation d'examen (score sur 40 et badge de validation vert/rouge).

## 3. Logique Métier & Algorithmes (Business Logic)

### 3.1 L'Indicateur de Préparation VolantReady™
L'indice VolantReady™ estime sur une échelle de 0 à 100 le niveau de préparation de l'élève pour le vrai examen :
- **Si aucun examen n'a été effectué** : L'indice est basé sur la progression des cours :
  $$\text{VolantReady} = \text{Pourcentage de modules complétés} \times 0.4$$ (plafonnant ainsi à 40%).
- **Si au moins un examen a été effectué** : L'indice combine la lecture des modules et les scores d'examens récents :
  $$\text{VolantReady} = (\text{modules complétés} \times 0.3) + \left(\frac{\text{score moyen aux examens}}{40} \times 100 \times 0.7\right)$$
- **Niveaux de préparation** :
  - **Excellent (≥ 85%)** : Couleur Émeraude clignotante. Prêt à s'inscrire à l'examen officiel.
  - **Moyen (≥ 50%)** : Couleur Cyan. Bonnes bases mais nécessite d'autres révisions.
  - **En apprentissage (< 50%)** : Couleur Violette. Nécessite de continuer la lecture des cours et de faire des examens blancs.

### 3.2 Radar des 10 Thèmes Officiels
L'application calcule la maîtrise de l'élève sur les 10 thématiques de l'examen officiel en analysant ses mauvaises réponses aux examens blancs :
1. *Signalisation & Panneaux* (8 questions par examen)
2. *Priorités & Croisements* (8 questions par examen)
3. *Limites de Vitesse* (4 questions par examen)
4. *Règles de Circulation* (4 questions par examen)
5. *Sécurité & Conducteur* (4 questions par examen)
6. *Alcool, Fatigue & Vigilance* (3 questions par examen)
7. *Mécanique & Équipements* (3 questions par examen)
8. *Éco-conduite* (2 questions par examen)
9. *Premiers Secours* (2 questions par examen)
10. *Partage de la Route* (2 questions par examen)

**Formule de score thématique** :
$$\text{Score Thématique} = \frac{\text{Total de questions posées dans le thème} - \text{Erreurs commises dans ce thème}}{\text{Total de questions posées dans le thème}} \times 100$$
*(Les thèmes avec un score < 50% apparaissent en rouge rose avec recommandation de révision)*.

### 3.3 Le Hub "Revue d'Erreurs" (Mistake Review Carousel)
Il s'agit d'une mécanique offline-first et interactive de rattrapage :
- L'application rassemble toutes les questions uniques ayant fait l'objet d'une erreur dans l'historique des examens blancs de l'utilisateur.
- **Mode Actif** : L'élève lance le carrousel de rattrapage et répond à ces questions directement dans le widget.
- **Effacement d'Erreur** : Si l'élève sélectionne la bonne réponse, la question affiche l'explication pédagogique, et au clic sur "Suivant", la question est retirée de la file d'erreurs en attente.
- Si la réponse est incorrecte, la question reste dans la liste pour un passage futur.

## 4. Évolutions Futures (Gamification)
- **Streaks** : Intégration d'un calendrier d'assiduité affichant le nombre de jours consécutifs de révision.
- **Badges débloquables** : Déclenchement d'animations de récompenses (badge "Expert Signalisation", etc.) et de confettis sur le dashboard lors du franchissement de jalons (ex: premier 40/40).
