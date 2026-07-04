# Spécifications Pédagogiques, Réglementation & Bilinguisme

Ce document définit le cadre réglementaire français sur lequel repose le contenu pédagogique de "Le Volant Pour Tous", ainsi que notre méthodologie de formation bilingue (Français/Russe) pour la préparation à l'Épreuve Théorique Générale (ETG).

---

## 1. Cadre Réglementaire de Référence

Le contenu pédagogique et d'examen de la plateforme est basé sur deux piliers réglementaires de la législation routière française :

1. **Le REMC (Référentiel pour l'Éducation à une Mobilité Citoyenne)** : Entré en vigueur en 2014 pour remplacer le Programme National de Formation (PNF), le REMC structure l'éducation routière autour de compétences citoyennes, sécuritaires et environnementales (au-delà du simple respect passif des règles).
2. **L'ETG (Épreuve Théorique Générale)** : La réforme de 2016 a réorganisé l'examen théorique du code de la route autour de **10 thèmes officiels**, avec une exigence de réussite fixée à **35 bonnes réponses sur 40 questions**.

---

## 2. Mapping Pédagogique (12 Modules vs 10 Thèmes ETG)

Nos 12 modules de cours interactifs couvrent l'intégralité du programme officiel de l'ETG. Le tableau suivant présente la correspondance entre nos chapitres et les 10 thèmes réglementaires :

| Thème ETG Officiel | Code Thème | Description Officielle | Modules "Le Volant Pour Tous" Correspondants |
| :--- | :---: | :--- | :--- |
| **La circulation routière** | **L** | Signalisation, règles de priorité, intersections, règles de conduite générales. | [M1] Signalisation routière<br>[M2] Priorités et intersections<br>[M3] Règles de circulation |
| **Le conducteur** | **C** | Vigilance, fatigue, alcoolémie, drogues, perception et traitement des informations. | [M7] Sécurité routière<br>[M8] Alcool, drogues et conduite |
| **La route** | **R** | Conduite sous intempéries (pluie, neige), de nuit, en montagne, sur autoroute. | [M4] Vitesse et limitations<br>[M6] Autoroute et voies rapides |
| **Les autres usagers** | **U** | Partage de la chaussée (piétons, cyclistes, bus, poids lourds, tramways). | [M12] Partage de la route |
| **La réglementation générale** | **D** | Permis de conduire, permis probatoire, documents obligatoires, infractions et retraits de points. | *Intégré transversalement dans les modules 1, 3, 4, 5, et 8.* |
| **Les premiers secours** | **A** | Comportement en cas d'accident (Protéger, Alerter, Secourir - PAS). | [M11] Premiers secours |
| **Précautions en quittant le véhicule** | **P** | Installation au poste de conduite, passagers, chargement et bagages, sortie sécurisée. | [M5] Stationnement et arrêt<br>[M7] Sécurité routière |
| **Mécanique et équipements** | **M** | Fonctionnement du véhicule, tableau de bord, voyants d'alerte, entretien courant. | [M9] Mécanique et entretien |
| **Équipements de sécurité** | **S** | Technologies d'aide à la conduite (ABS, ESP), ceintures de sécurité, airbags, sièges enfants. | [M7] Sécurité routière<br>[M9] Mécanique et entretien |
| **Environnement et éco-conduite** | **E** | Conduite souple, économie de carburant, pollution, covoiturage, entretien éco-responsable. | [M10] Éco-conduite |

---

## 3. Stratégie Pédagogique du Bilinguisme (Français / Russe)

L'apprentissage bilingue sur "Le Volant Pour Tous" répond à une contrainte légale forte : **l'examen officiel de l'ETG en France se déroule en langue française**. L'objectif principal de la plateforme est de permettre à des élèves russophones de réussir cet examen en France.

### 3.1 Règle d'Or de la Terminologie Technique
Les termes officiels de la réglementation française ne doivent **jamais** faire l'objet d'une traduction littérale brute en russe si cela dilue leur signification juridique ou leur impact visuel à l'examen. 
- **Exemple incorrect** : Traduire *"Sas vélo"* uniquement par *"Велосипедный шлюз"* (l'élève ne ferait pas le lien avec l'inscription au sol *"Sas vélo"* ou le panneau en situation réelle).
- **Exemple correct** : Conserver le terme français **"Sas vélo"** (en gras), puis expliquer conceptuellement en russe sa fonction : *"Zone réservée aux cyclistes devant un feu de signalisation..."* (**"Sas vélo"** — зона перед светофором, резервированная для велосипедистов...).

### 3.2 Liste des concepts clés et traitement bilingue
Voici des exemples de termes dont la compréhension bilingue est spécifiquement ciblée dans nos cours :
*   **Priorité à droite** : Indiquer le terme français en priorité, puis expliquer le principe de priorité par défaut en Russie (qui diffère par la notion de "priorité à droite" généralisée).
*   **Croisement à l'indonésienne** : Expliquer en russe qu'il s'agit d'un croisement tangentiel face-à-face (sans contournement par l'arrière).
*   **Bande d'arrêt d'urgence (BAU)** : Présenter le terme français pour que l'élève comprenne immédiatement les repères de sécurité de 2 traits de la BAU sur autoroute.
*   **Permis probatoire** : Expliciter les limitations de vitesse réduites et le capital initial de 6 points en France pour les jeunes conducteurs.

---

## 4. Cycle de Validation & Progression Pédagogique

Chaque module d'apprentissage suit un cycle de validation strict pour certifier l'acquisition des compétences :

1. **Lecture Théorique** : L'élève étudie les sections illustrées et les cas pratiques du cours.
2. **Quiz de fin de module** : L'élève doit répondre à une série de questions (de 5 à 12 questions selon le thème).
3. **Seuil de validation (Completion Threshold)** : 
   - Un module est considéré comme **validé** si l'élève obtient un score de réussite d'au moins **80%** (ex: 4 bonnes réponses sur 5 questions).
   - Une fois validé, l'identifiant du module (ex: `1`) est ajouté à la liste des modules complétés (`completedModules`) dans le stockage de progression (local ou cloud).
4. **Calcul du Tableau de bord** :
   - Le taux de complétion globale du programme augmente de $\frac{1}{12}$ soit environ **8.3%** par module validé.
   - Ce taux est injecté directement dans la jauge de progression circulaire du `/dashboard`.
