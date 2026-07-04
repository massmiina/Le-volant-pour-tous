# Data System : Spécification Technique du Système de Questions (Question Bank)

> **Rôle** : Architecte Logiciel Senior & Expert EdTech
> **Statut** : Document de Référence / Source de Vérité

Ce document définit de manière stricte et sans ambiguïté la structure de données et les règles de gestion de la banque de questions (Question Bank) utilisée pour l'ensemble des modules d'évaluation et d'apprentissage sur **Le Volant Pour Tous**.

---

## 1. Source de Vérité des Questions (V1)

Ce système constitue l'unique source de vérité (Single Source of Truth) de l'application. Aucune question ou alternative de réponse ne peut être injectée en dehors de ce cadre.

### 1.1 Emplacement physique
Pour la V1, l'intégralité du catalogue de questions est stockée de manière statique au format TypeScript dans le projet :
- **Fichier centralisateur** : `lib/examData.ts` (pour les questions d'examens blancs) et les clés de traductions localisées bilingues dans `lib/translations.ts` (pour les quiz de cours).
- **Maintenance** : Gérée manuellement par le développeur / propriétaire du projet. Toute modification de question (correction d'une erreur réglementaire, changement d'énoncé) fait l'objet d'un commit Git et d'un déploiement sur Vercel. Il n'existe pas d'interface d'administration en ligne pour cette V1.

---

## 2. Modèle de Données Unique (Question Schema)

Chaque question présente dans le système doit respecter le typage strict suivant :

```typescript
export type ETGTheme =
  | 'circulation'      // Signalisation, priorités, règles de conduite
  | 'conducteur'       // Vigilance, alcool, temps de réaction, fatigue
  | 'route'            // Intempéries, conduite de nuit, autoroute
  | 'usagers'          // Partage de la route (piétons, cyclistes, tramways)
  | 'reglementation'   // Documents, permis probatoire, infractions
  | 'secours'          // Premiers secours en cas d'accident (PAS)
  | 'precautions'      // Installation à bord, passagers, sortie sécurisée
  | 'mecanique'        // Entretien, voyants du tableau de bord
  | 'securite'         // Aides à la conduite (ABS, ESP), ceinture, airbags
  | 'environnement';   // Éco-conduite, pollution, covoiturage

export interface Question {
  id: string;                // Identifiant unique (ex: "q-101")
  themeEtg: ETGTheme;        // L'un des 10 thèmes officiels de l'ETG
  difficulty: 'A' | 'B' | 'C'; // Difficulté : A (Facile), B (Moyenne), C (Difficile)
  image?: string;            // Chemin de l'image d'illustration (ex: "/images/exam/q1.png")
  
  // Textes multilingues
  question: {
    fr: string;              // Énoncé en Français (obligatoire)
    ru: string;              // Énoncé explicatif en Russe (obligatoire)
  };
  
  // Options de réponse A, B, C, D (FR / RU)
  options: {
    fr: string[];            // Tableau de 4 propositions en Français
    ru: string[];            // Tableau de 4 propositions en Russe
  };
  
  // Indices des bonnes réponses (0: A, 1: B, 2: C, 3: D)
  // L'ETG français autorise les réponses multiples (ex: [0, 2] pour A et C)
  correctAnswers: number[];
  
  // Explications pédagogiques
  explanation: {
    fr: string;              // Explication en Français
    ru: string;              // Explication en Russe
  };
}
```

---

## 3. Règles de Construction des Questions

Afin de garantir l'homologation pédagogique et l'accessibilité :
- **Nombre de réponses** : Chaque question doit proposer exactement entre 2 et 4 options de réponse (pas plus, pas moins).
- **Validité logique** : Le tableau `correctAnswers` ne doit jamais être vide. Il doit contenir au moins 1 valeur et au plus 3 valeurs.
- **Règle d'or du bilinguisme** : Les termes réglementaires français et inscriptions au sol (ex: **"Sas vélo"**, **"Cédez le passage"**) doivent figurer en français (en gras) dans l'énoncé russe, suivis de leur définition explicative en cyrillique pour habituer l'élève à l'examen officiel de l'ETG.

---

## 4. Logique du Moteur de Quiz (Quiz Engine Logic)

- **Sélection** : Les questions sont filtrées par module ou thème ETG.
- **Randomisation** : L'ordre des questions d'un quiz de module est fixe pour s'assurer que tous les concepts du cours sont passés en revue séquentiellement.
- **Répétition** : Autorisée. L'élève peut rejouer le quiz autant de fois que nécessaire pour atteindre le seuil de validation.

---

## 5. Logique du Moteur d'Examen Blanc (Exam Engine Logic)

- **Nombre de questions** : Toujours **exactement 40 questions**.
- **Répartition réglementaire** : Le tirage doit respecter strictement les quotas officiels :
  - *Circulation* : 8 questions
  - *Conducteur* : 8 questions
  - *Route* : 4 questions
  - *Usagers* : 4 questions
  - *Réglementation* : 4 questions
  - *Équipements de sécurité* : 3 questions
  - *Mécanique* : 3 questions
  - *Premiers secours* : 2 questions
  - *Précautions* : 2 questions
  - *Environnement* : 2 questions
- **Répétition** : Strictement interdite au sein d'une même session de 40 questions. L'algorithme exclut du tirage les questions réussies lors des 2 derniers examens blancs de l'utilisateur.
- **Validation** : La soumission de la réponse à une question est définitive. L'utilisateur ne peut pas revenir en arrière. À l'expiration du délai de 20 secondes, la question est soumise automatiquement.

---

## 6. Différence entre le mode Quiz et le mode Examen

| Dimension | Quiz de Module | Examen Blanc |
| :--- | :--- | :--- |
| **Objectif** | Assimilation théorique immédiate | Simulation officielle en conditions réelles |
| **Volume de questions** | 5 à 12 questions | **Exactement 40 questions** |
| **Chronomètre** | Pas de limite de temps | **20 secondes par question** (anti-dérive) |
| **Sélection** | Fixe et ciblée sur 1 seul thème | Aléatoire et transversale sur les 10 thèmes |
| **Retour en arrière** | Autorisé | Strictement interdit |
| **Affichage de la correction** | Instantané après chaque question | Différé (écran de synthèse + revue d'erreurs) |
| **Validation du module** | Seuil de réussite à **80%** (ex: 4/5) | Seuil de réussite à **35 bonnes réponses sur 40** |
