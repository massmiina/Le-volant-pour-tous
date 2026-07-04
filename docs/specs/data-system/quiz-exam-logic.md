# Data System : Logique de Sélection, Répétition & Chronométrage

Ce document décrit les algorithmes de sélection de questions, de prévention des collisions temporelles (chronomètre) et de synchronisation des états (anti-crash / fusion de données).

---

## 1. Logique de Sélection des Questions

### 1.1 Mode Quiz
Le mode Quiz cible un unique module ou thème ETG.
- **Sélection** : Extraction de toutes les questions associées au thème demandé dans le dictionnaire statique.
- **Ordre** : Séquentiel. L'élève doit franchir les questions de manière ordonnée pour garantir l'assimilation progressive de tous les concepts.

### 1.2 Mode Examen Blanc
Le mode Examen Blanc génère un test transversal de 40 questions respectant la répartition réglementaire officielle de la sécurité routière.

#### Algorithme de génération de série :
1. **Extraction** de la banque complète de questions groupées par thème ETG.
2. **Filtrage par historique (Algorithme anti-répétition)** : 
   - Exclure du tirage les questions réussies par l'utilisateur lors de ses 2 dernières sessions d'examen.
   - Surpondérer (probabilité accrue de 50%) les questions qui se trouvent actuellement dans la file de la "Revue d'erreurs" de l'utilisateur (questions précédemment ratées et non encore corrigées).
3. **Sélection par quotas** : Choisir aléatoirement le nombre exact de questions requis pour chaque thème :
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
4. **Mélange final** : Application du mélange de *Fisher-Yates* sur la sélection globale pour désordonner le questionnaire et éviter les effets de mémorisation de position.

---

## 2. Chronomètre Anti-Dérive (Examen Blanc)

Afin de contrer le ralentissement classique des timers JavaScript (ex: `setInterval`) lorsque l'onglet est mis en arrière-plan ou que le processeur ralentit, le moteur d'examen utilise un calcul de temps absolu basé sur l'horloge système :

$$\text{TargetAbsolute} = \text{Date.now()} + 20\,000\text{ ms}$$

Le rafraîchissement visuel de la jauge s'effectue toutes les 50 ms en comparant l'heure actuelle à la cible absolue de fin de question :

$$\text{Temps Restant} = \text{TargetAbsolute} - \text{Date.now()}$$

Si cette valeur est inférieure ou égale à 0, la question est automatiquement soumise avec les choix courants de l'élève.

---

## 3. Système Anti-Crash (State Recovery)

En cas de rechargement accidentel de la page, de fermeture d'onglet ou de coupure de batterie lors d'un examen blanc :
1. À chaque validation de question, l'état complet (`currentIdx` et `allAnswers`) est sérialisé en JSON et sauvegardé dans le `localStorage` sous la clé `exam_recovery`.
2. Au montage de `/examen`, l'application vérifie la présence de cette clé. Si un examen en cours est détecté, la session reprend exactement à l'index de la dernière question non répondue.
3. À la validation de la 40ème question, la clé `exam_recovery` est purgée.

---

## 4. Algorithme de Synchronisation des Progrès

Pour fusionner la progression hors-connexion (invité) avec le profil cloud d'un élève qui vient de s'authentifier, le hook global `useProgress` exécute la logique suivante :

```typescript
async function syncProgressAfterLogin(userId: string) {
  const localCompleted = JSON.parse(localStorage.getItem('completed_modules') || '[]');
  const localQuizScores = JSON.parse(localStorage.getItem('quiz_scores') || '{}');
  
  if (localCompleted.length > 0 || Object.keys(localQuizScores).length > 0) {
    // Appel API de fusion
    const res = await fetch('/api/progress/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, localCompleted, localQuizScores })
    });
    
    if (res.ok) {
      // Nettoyage après synchronisation réussie
      localStorage.removeItem('completed_modules');
      localStorage.removeItem('quiz_scores');
    }
  }
}
```

### Fusion côté serveur (`POST /api/progress/sync`) :
1. Extraction de la progression existante en base de données pour cet utilisateur.
2. **Union des ensembles** pour les modules complétés :
   $$\text{cloudCompleted} = \text{cloudCompleted} \cup \text{localCompleted}$$
3. **Comparaison des scores de quiz** : Pour chaque quiz, l'API compare le score cloud et le score local et persiste le score maximal :
   $$\text{scoreFinal}(id) = \max(\text{scoreCloud}(id), \text{scoreLocal}(id))$$
