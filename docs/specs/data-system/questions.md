# Data System : Modèle de Données & Question Bank

Ce document détaille la couche technique de stockage des questions, leur structure et leur format de persistance au sein de la plateforme **Le Volant Pour Tous**.

---

## 1. Source de Vérité des Questions

Pour la V1, l'application utilise des **fichiers statiques localisés et fortement typés** comme source de vérité.

- **Quiz de module** : Définis de manière localisée dans `lib/translations.ts` sous les clés `quiz.modules.[theme].[index]`.
- **Examens blancs** : Définis dans `lib/examData.ts` (pour les métadonnées et la configuration des questions d'examen) couplés aux assets physiques d'illustrations (`/public/images/exam/`).

### Maintenance et cycles de mise à jour
Toute modification de question ou ajout de contenu fait l'objet d'un commit Git et d'un déploiement continu automatisé via Vercel. 
Une évolution en V2 prévoit de migrer ces structures statiques vers une table SQL dynamique dans PostgreSQL pour permettre l'édition via une interface administrative sans redéploiement.

---

## 2. Modèle de Données des Questions

Chaque question du système respecte la structure unifiée suivante :

### 2.1 Modèle TypeScript Unifié (`lib/types.ts`)
```typescript
export type ETGTheme =
  | 'signalisation'
  | 'priorites'
  | 'circulation'
  | 'vitesse'
  | 'securite'
  | 'alcool'
  | 'mecanique'
  | 'eco_conduite'
  | 'premiers_secours'
  | 'partage_route';

export interface Question {
  id: string;                // Identifiant unique de la question (ex: "q-101")
  themeEtg: ETGTheme;        // L'un des 10 thèmes officiels de l'ETG
  difficulty: 'A' | 'B' | 'C'; // A: Facile, B: Moyen, C: Difficile (pour le ciblage)
  image?: string;            // Chemin de l'image de mise en situation (ex: "/images/exam/q1.png")
  
  // Contenu textuel localisé (récupéré à la volée via la langue active)
  question: string;          // Énoncé bilingue
  options: string[];         // Tableau de 3 ou 4 options de réponse
  correctAnswers: number[];  // Tableau d'indices des réponses correctes (ex: [0, 2] pour A+C)
  explanation: string;       // Explication pédagogique et rappel de la règle
}
```

### 2.2 Schéma de Données Prisma (Modèle de rechange pour persistance BDD)
```prisma
model Question {
  id             String   @id @default(cuid())
  themeEtg       String   // Mapping avec l'enum ETGTheme
  difficulty     String   @default("facile")
  image          String?
  
  // Champs multilingues
  questionFr     String
  questionRu     String
  optionsFr      String[] // ex: ["Oui", "Non"]
  optionsRu      String[] // ex: ["Да", "Нет"]
  
  // Indices des bonnes réponses (stocké sous forme de tableau d'entiers)
  correctAnswers Int[]
  
  explanationFr  String
  explanationRu  String
  
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([themeEtg])
}
```
