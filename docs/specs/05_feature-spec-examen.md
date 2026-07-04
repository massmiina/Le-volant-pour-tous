# Spécifications Fonctionnelles : Examen Blanc (`/examen`)

Ce document définit les spécifications techniques et fonctionnelles du simulateur d'examen blanc en conditions réelles de la plateforme "Le Volant Pour Tous".

## 1. Objectifs de la fonctionnalité
- Permettre à l'élève de s'évaluer dans les **conditions exactes de l'épreuve officielle** (40 questions, sélection multiple, temps limité, aucun retour en arrière).
- Offrir une ergonomie "simulation" immersive et optimisée pour réduire le stress.
- Assurer la résilience du test face aux pannes ou interruptions de navigation.
- Sauvegarder et analyser les résultats pour alimenter les statistiques du profil utilisateur.

## 2. Interface Utilisateur & Interactions (UI/UX)

- **Accueil du simulateur** :
  - Écran de briefing expliquant les règles : 40 questions, 20 secondes par question, sélection multiple (ex: A et C), aucun retour possible, réussite à ≥ 35/40.
  - Bouton "Lancer l'examen" à effet néon.
- **La Console d'Examen** :
  - **Média Principal** : Image de mise en situation réelle de conduite (ou texte de remplacement si absent).
  - **Chronomètre de Réponse** : Barre de progression horizontale en haut de l'écran avec indicateur numérique (ex: "15s"). La barre passe du vert émeraude au rouge clignotant sous les 5 secondes (25% du temps restant).
  - **Options de Réponse (Pavé de saisie)** : Boutons A, B, C, D interactifs permettant des choix multiples. Bouton de validation "Valider".
  - **Raccourcis Clavier** : L'élève peut utiliser les touches `A`, `B`, `C` et `D` pour basculer les sélections et la touche `Entrée` pour soumettre sa réponse instantanément.
  - **Retour Haptique** : Déclenchement de vibrations physiques via l'API `navigator.vibrate` sur mobile lors de la sélection (20ms) et de la validation (40ms).
- **Écran de Résultats** :
  - Score final massif sur 40 avec lueur émeraude (réussite ≥ 35) ou rouge (échec < 35).
  - Bouton de retour au dashboard, de relance rapide, ou de revue détaillée.
  - **Revue des erreurs** : Section permettant d'afficher uniquement les questions ratées, avec les réponses soumises par l'élève, la réponse correcte attendue et l'explication pédagogique.

## 3. Logique Applicative & Résilience

### 3.1 Chronomètre de Précision (Anti-Dérive)
Pour éviter les dérives de temps classiques des navigateurs (notamment si l'élève change d'onglet, ce qui ralentit les `setInterval` JavaScript), le chronomètre d'examen calcule le temps restant en soustrayant le timestamp actuel de la cible absolue de fin de question :
$$\text{Fin Question} = \text{Date.now()} + 20\,000\text{ ms}$$
Le rafraîchissement se fait toutes les 50ms pour assurer une fluidité visuelle parfaite sans dérive temporelle. Si le chronomètre tombe à zéro, les choix actuels sont validés automatiquement.

### 3.2 Système Anti-Crash (State Recovery)
Pour se prémunir contre les micro-coupures de batterie, fermetures d'onglets ou rechargements accidentels :
- À chaque validation de question, l'état complet du test (`currentIdx` et `allAnswers`) est sérialisé et sauvegardé dans le `localStorage` de l'appareil de l'élève sous la clé `exam_recovery`.
- Au chargement de la page `/examen`, l'application vérifie la présence de cette clé. Si un test incomplet est détecté (index < 40), l'élève reprend la simulation exactement à la question où il s'était arrêté.
- Dès que l'examen est terminé et que les scores sont calculés, la clé `exam_recovery` est effacée.

## 4. Persistance (Modèle Prisma & API)

Dès que la 40ème question est validée, le client envoie les résultats à la base de données via `POST /api/exams` :

```prisma
model ExamResult {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  score     Int      // Score final sur 40
  mistakes  String   @default("[]") // Liste JSON d'erreurs (contient question, choix donné, choix correct)
  passed    Boolean  // Vrai si score >= 35
  createdAt DateTime @default(now())
}
```

*Note : Les visiteurs invités (non connectés) ont le droit d'effectuer un examen d'évaluation. Leur score est conservé en local avant d'être fusionné en base lors de leur inscription.*
