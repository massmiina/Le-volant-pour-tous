# Data System : Logique des Moteurs de Quiz et d'Examen Blanc

> **Rôle** : Architecte Logiciel Senior
> **Statut** : Spécifications Logiques & Algorithmiques

Ce document détaille le traitement logique, le flux de données et la gestion des cas limites pour les moteurs de Quiz de module et d'Examen Blanc de la plateforme **Le Volant Pour Tous**.

---

## 1. Data Flow Global (Flux de Données)

Le cycle de vie d'une question, du stockage statique ou dynamique jusqu'à l'affichage à l'élève et l'enregistrement de sa performance, suit ce cheminement :

```
[Question Bank (TS/JSON)] 
       ↓ 
[Selection Engine] ── (Tirage aléatoire/sélection par thèmes) ──> [Memory Cache (State)]
                                                                           ↓
[User Interface (RSC/Client)] <── (Rendu multilingue interactif) ── [JSON Endpoint/Prop]
       ↓
[User Submission (A/B/C/D)] 
       ↓
[Scoring Engine] ── (Calcul score & mistakes) 
       ↓
[API POST /api/exams] ── (Persistance Prisma) ──> [Database (Supabase PostgreSQL)]
                                                           ↓
[Dashboard UI] <── (Radar & VolantReady™) ── [API GET /api/user/progress]
```

---

## 2. Le Moteur de Quiz (Quiz Engine)

Le mode Quiz sert à l'apprentissage immédiat à la suite d'un chapitre de cours.
- **Règles de sélection** : L'ID du module est fourni en entrée. Le moteur extrait de la base statique l'ensemble des questions qui lui sont associées.
- **Répétition** : Si l'élève échoue au quiz, il peut le relancer immédiatement. Les mêmes questions sont proposées afin de favoriser la mémorisation et la correction des concepts non acquis.
- **Scoring** : Le score est calculé sous forme de pourcentage de bonnes réponses ($\frac{\text{bonnes réponses}}{\text{questions posées}} \times 100$). La complétion du module est validée si ce score est $\ge 80\%$.

---

## 3. Le Moteur d'Examen Blanc (Exam Engine)

Le mode Examen Blanc évalue le niveau réel de préparation de l'élève à l'aide d'une simulation officielle de 40 questions.

### 3.1 Génération et distribution thématique
Le moteur de tirage extrait de la banque de questions globale les questions pour chaque thème officiel afin de respecter les quotas réglementaires de l'ETG français (8 Circulation, 8 Conducteur, 4 Route, 4 Usagers, 4 Réglementation, 3 Sécurité, 3 Mécanique, 2 Secours, 2 Précautions, 2 Environnement).

### 3.2 Verrouillage du test (No Back Navigation)
- **États immuables** : Les questions déjà répondues sont verrouillées dans l'état de l'application (`React State`). L'utilisateur ne peut pas modifier une réponse déjà validée.
- **Navigation bloquée** : Les contrôles de navigation du navigateur (bouton retour) sont interceptés à l'aide d'un écouteur d'événement sur `beforeunload` et l'interdiction de changer de route client sans validation.

### 3.3 Chronométrage de précision (Anti-Dérive)
Le chronomètre évite les décalages induits par l'activité système du navigateur (ex: mise en veille de l'onglet).
1. Au chargement de la question, une date limite absolue est calculée :
   $$\text{LimitTime} = \text{Date.now()} + 20\,000\text{ ms}$$
2. Un intervalle de 50ms calcule récursivement la différence :
   $$\text{Remaining} = \text{LimitTime} - \text{Date.now()}$$
3. À $\text{Remaining} \le 0$, le moteur soumet automatiquement les réponses actuellement cochées et passe à la question suivante.

---

## 4. Anti-Bugs & Gestion des Edge Cases (Résilience)

### 4.1 Rechargement de page accidentel (Refresh)
Pour parer aux interruptions d'examen :
- À chaque soumission de réponse, l'index de la question courante et le tableau des réponses données sont enregistrés dans le `localStorage` sous la clé `exam_recovery`.
- Si l'élève rafraîchit la page, le composant client détecte `exam_recovery` et recharge la session à la question où elle s'était arrêtée, avec les réponses précédentes déjà pré-remplies.
- La clé est supprimée de la mémoire locale lors de l'envoi final des résultats à la base de données.

### 4.2 Perte de connexion internet
- **Pendant l'examen** : Le test se déroule entièrement côté client (toutes les 40 questions sont chargées en mémoire au démarrage). La perte de réseau n'interrompt pas le déroulement des questions.
- **Lors de la soumission du score** : Si l'envoi de la requête `POST /api/exams` échoue à cause du réseau, les résultats sont sauvegardés dans le `localStorage` sous la clé `pending_exam_submissions`. L'application tentera de renvoyer le score dès que la connexion sera rétablie ou au prochain chargement de l'application.

### 4.3 Multi-onglets (Multi-tab)
Pour éviter qu'un utilisateur n'ouvre le même examen sur plusieurs onglets afin de tricher :
- Un timestamp de session unique est généré au démarrage de l'examen et écrit dans le `localStorage` (`active_exam_session`).
- Si un autre onglet s'ouvre sur `/examen` avec une session différente, le premier onglet détecte le changement de session locale et s'interrompt en affichant un écran de déconnexion.

---

## 5. Comparaison Synthétique Quiz vs Examen

| Fonctionnalité | Quiz de Module | Examen Blanc |
| :--- | :--- | :--- |
| **Sélection** | Filtrée sur 1 thème | Aléatoire transversale sur 10 thèmes |
| **Questions** | 5 à 12 questions | **Exactement 40 questions** |
| **Timer** | Pas de limite de temps | **20 secondes / question** |
| **Répétitions** | Permises | Exclues de l'historique récent |
| **Verrouillage** | Navigation libre | Navigation bloquée (sans retour) |
| **Persistance** | Table `Progress` | Table `ExamResult` |
