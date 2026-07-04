# Spécifications Fonctionnelles : Question System V1

> **Contexte** : Ce document corrige et clarifie l'architecture du système de questions de la plateforme "Le Volant Pour Tous", à partir d'une analyse du code existant. Il remplace toute ambiguïté dans les specs précédentes.

---

## 1. Source de Vérité des Questions

### Qui crée et maintient les questions ?

**V1 actuelle** : Le développeur. Les questions sont définies directement dans des fichiers TypeScript statiques versionnés dans le dépôt Git.

Il n'existe pas d'interface d'administration. Toute modification de question nécessite une modification du code source suivie d'un redéploiement.

### Où sont stockées les questions ?

Le système utilise **deux sources distinctes** selon le contexte :

| Source | Fichier | Utilisé par |
|---|---|---|
| **Questions d'examen blanc** | `lib/examData.ts` | `ExamEngineClient.tsx` → `/examen` |
| **Questions de quiz de module** | `lib/translations.ts` | `ModuleQuiz.tsx` → `/cours/[id]` + `/quiz` |

> ⚠️ Ces deux sources sont **architecturalement séparées** et n'utilisent pas le même format de données. C'est le principal problème de cohérence du système actuel.

### Comment les questions sont-elles mises à jour ?

1. Modifier `lib/examData.ts` ou `lib/translations.ts`
2. `git commit` + `git push`
3. Redéploiement automatique sur Vercel via CI/CD

---

## 2. Modèle de Données des Questions

### 2.1 Question d'Examen Blanc (format actuel — `lib/examData.ts`)

```typescript
export interface ExamQuestion {
  id: number;              // Identifiant unique (1 à 40)
  module: ExamModule;      // Thème ETG
  correctAnswer: number;   // Index de la bonne réponse : 0=A, 1=B, 2=C, 3=D
  image?: string;          // Chemin vers l'image de mise en situation
}
```

> ❌ **Problème critique** : Ce modèle ne contient **ni l'énoncé, ni les options de réponse**.
> L'énoncé et les choix A/B/C/D sont portés uniquement par les **images**.
> Cela rend impossible la Revue d'Erreurs textuelle, le SEO et l'accessibilité.

### 2.2 Question de Quiz de Module (format actuel — `lib/translations.ts`)

```typescript
export interface QuizQuestion {
  question: string;      // Énoncé complet bilingue (via clé i18n)
  options: string[];     // Tableau de 4 options [A, B, C, D]
  answer: number;        // Index de la bonne réponse (0 à 3)
  explanation: string;   // Explication pédagogique
  imageUrl?: string;     // Image optionnelle
}
```

### 2.3 Modèle Unifié Recommandé (V1 cible)

```typescript
export interface Question {
  id: number;
  theme: ETGTheme;
  difficulty?: 'facile' | 'moyen' | 'difficile'; // Optionnel en V1
  question: string;         // Énoncé textuel (obligatoire)
  options: string[];        // [A, B, C, D] — exactement 4 options
  correctAnswer: number;    // Index : 0=A, 1=B, 2=C, 3=D
  explanation: string;      // Explication pédagogique (obligatoire)
  image?: string;           // Chemin vers image (optionnel)
}

type ETGTheme =
  | 'signalisation' | 'priorites' | 'circulation' | 'vitesse'
  | 'securite' | 'alcool' | 'mecanique' | 'eco_conduite'
  | 'premiers_secours' | 'partage_route';
```

---

## 3. Différence Fonctionnelle et Technique : Quiz vs Examen Blanc

### Tableau Comparatif

| Critère | Quiz de Module | Examen Blanc |
|---|---|---|
| **Objectif** | Valider l'acquisition d'un thème | Simuler l'ETG officiel |
| **Nombre de questions** | 5 à 12 selon le module | Exactement **40** |
| **Source** | `lib/translations.ts` | `lib/examData.ts` |
| **Thème** | 1 seul thème | 10 thèmes mélangés |
| **Sélection** | Séquentielle (i = 0 à 11) | Ordre fixe (id 1 à 40) |
| **Chronomètre** | ❌ Aucun | ✅ 20s / question |
| **Explication immédiate** | ✅ Après chaque réponse | ❌ Revue d'erreurs uniquement |
| **Seuil de réussite** | 80% (ex: 4/5) | 87.5% (35/40) |
| **Anti-crash** | ❌ Non | ✅ `localStorage['exam_recovery']` |
| **Persistance** | `localStorage` ou `POST /api/progress` | `POST /api/exams` (connecté uniquement) |
| **Réponses multiples** | ❌ 1 seule réponse | ✅ Multiples (A + C) |

### Gestion des répétitions

**V1 actuelle** : Aucune randomisation. L'examen pose toujours les mêmes 40 questions dans le même ordre.

**Impact** : L'élève peut mémoriser les positions des réponses. À corriger en V2.

---

## 4. Contradictions Identifiées et Corrections

### ❌ Contradiction 1 — Accès invité à l'examen blanc

**Spec précédente** :
> *"Les visiteurs invités ont le droit d'effectuer un examen d'évaluation."*

**Réalité du code** (`/api/exams/route.ts`, ligne 12) :
```typescript
if (!authUser?.email) {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}
```

Un invité peut jouer l'examen côté client, mais son score ne sera **jamais sauvegardé** (401).

**Correction choisie (V1 — Option A) :**
Supprimer la promesse "invités autorisés". Afficher une modale d'inscription au clic sur "Lancer l'examen" si non connecté.

---

### ❌ Contradiction 2 — `mistakes` non sauvegardé en base

Client (`ExamEngineClient.tsx`) envoie `mistakes` à l'API.
API (`/api/exams/route.ts`) **ignore `mistakes`** :

```typescript
// BUGUÉ (actuel)
const { score, passed } = body;

// CORRIGÉ
const { score, passed, mistakes } = body;
await prisma.examResult.create({
  data: { userId: user.id, score, passed, mistakes: JSON.stringify(mistakes ?? []) }
});
```

La Revue d'Erreurs du Dashboard ne peut pas fonctionner tant que ce bug n'est pas corrigé.

---

### ❌ Contradiction 3 — Double type de module incohérent

- `QuizModuleKey` (quiz) : 12 valeurs dont `'regles'` et `'stationnement'`
- `ExamModule` (examen) : 10 valeurs dont `'circulation'` et `'partage_route'`

Ces noms ne correspondent pas aux 10 thèmes ETG officiels.

**Correction** : Unifier sous un seul type `ETGTheme` (10 valeurs), avec mapping explicite modules → thèmes ETG.

---

## 5. Plan d'Action Correctif V1

| Priorité | Action | Fichier(s) |
|---|---|---|
| 🔴 **P0** | Corriger l'API `/api/exams` pour sauvegarder `mistakes` | `app/api/exams/route.ts` |
| 🔴 **P0** | Supprimer la promesse "invités autorisés" + modale inscription | `docs/specs/05_feature-spec-examen.md` + `app/examen/page.tsx` |
| 🟠 **P1** | Ajouter énoncés textuels aux 40 questions d'examen | `lib/examData.ts` |
| 🟠 **P1** | Unifier `ExamModule` et `QuizModuleKey` → type unique `ETGTheme` | `lib/examData.ts` + `lib/quizData.ts` |
| 🟡 **P2** | Randomiser l'ordre des questions à chaque session | `components/ExamEngineClient.tsx` |
| 🟡 **P2** | Ajouter `questionId` dans `mistakes` pour traçabilité précise | `components/ExamEngineClient.tsx` |
