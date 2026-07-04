# System Overview — Le Volant Pour Tous

## 🎯 Objectif du document
Ce document décrit la vision globale et le fonctionnement end-to-end de la plateforme **Le Volant Pour Tous**, en reliant les 3 couches du système :
- Data System (questions & logique)
- Pedagogical Framework (cadre éducatif ETG / REMC)
- Product & UX Layer (expérience utilisateur)

---

## 🧠 1. Vue d’ensemble du système
La plateforme repose sur un flux simple :

Question Bank → Logic Engine → User Interface → Progress Tracking

Chaque interaction utilisateur (quiz, examen blanc, jeu) s’appuie sur la même base de données de questions, mais avec des règles d’utilisation différentes.

---

## 📦 2. Data System (couche technique)
### 🎯 Rôle
Gérer toutes les données de contenu pédagogique.
### 📚 Contenu
- Question Bank (source unique de vérité)
- Modèle de question (id, thème ETG, réponses, bonne réponse, explication)
- Règles de sélection (quiz / examen)
- Stockage : JSON seed (V1) ou base PostgreSQL (Supabase + Prisma)
### 🔁 Cycle de vie des questions (V1)
1. Les questions sont définies dans un **fichier seed JSON**
2. Chargement dans l’application au build ou runtime
3. Utilisation directe dans quiz et examen blanc
4. Mise à jour manuelle par le développeur (pas d’admin panel en V1)

---

## 🎓 3. Pedagogical Framework (couche éducative)
### 🎯 Rôle
Définir le cadre officiel d’apprentissage.
### 📘 Contenu
- REMC (Référentiel Éducation Mobilité Citoyenne)
- ETG (10 thèmes officiels de l’examen)
- Modèle GADGET (comportement du conducteur)
- Mapping des 12 modules pédagogiques
### 📌 Principe clé
Les questions ne sont pas créées arbitrairement :
> Elles sont alignées sur les exigences officielles de l’ETG français.

---

## 🎨 4. Product & UX Layer (couche expérience utilisateur)
### 🎯 Rôle
Définir comment l’utilisateur interagit avec le système.
### 📱 Interfaces principales
- `/quiz` → entraînement rapide
- `/examen` → simulation officielle (40 questions)
- `/dashboard` → suivi progression + VolantReady™
- `/jeu` → gamification (signs, arcade, réflexes)
- `/cours` → apprentissage théorique
### 🔄 Logique utilisateur
- L’utilisateur consomme du contenu pédagogique
- Répond à des questions issues du Question Bank
- Gagne de la progression (XP, validation modules)
- Suit sa performance via dashboard

---

## 🧩 5. Relation entre les 3 couches
### 🔗 Flux global

```
[Pedagogy Layer]
       ↓
Defines rules & structure

[Data System]
       ↓
Provides questions based on rules

[Product Layer]
       ↓
Delivers UX to user
       ↓
Tracks progress back into system
```

---

## 🔁 6. Quiz vs Examen Blanc (logique système)
### 📘 Quiz
- Utilise la Question Bank complète
- Sélection aléatoire ou par thème
- Répétition possible des questions
- Objectif : apprentissage progressif
### 🧪 Examen Blanc
- Utilise la même Question Bank
- Sélection contrôlée (40 questions)
- Répartition équilibrée selon les 10 thèmes ETG
- Pas de répétition dans une session
- Objectif : simulation officielle

---

## 💾 7. Données utilisateur (progression)
### 📌 Sources de données
- `localStorage` → utilisateur invité
- Supabase PostgreSQL → utilisateur connecté
### 🔄 Synchronisation
- Fusion automatique à la première connexion
- Priorité au cloud en cas de conflit
- Conservation des progrès non sauvegardés localement

---

## 🚪 8. Entrée du système
Le point d’entrée logique de la plateforme est :
> `/dashboard` (pour utilisateur connecté)  
> `/cours` (pour utilisateur invité)  

Tous les autres modules sont des extensions fonctionnelles de ces deux points.

---

## ⚠️ 9. Contraintes V1
- Pas d’admin panel
- Questions maintenues manuellement par le développeur
- Base de données simple et stable
- Logique explicable sans complexité backend avancée

---

## 🧭 Résumé
Le système est conçu autour d’un principe unique :
> Une seule base de questions, plusieurs façons de les utiliser.
- Pedagogy définit les règles
- Data System stocke et fournit les questions
- Product Layer les rend interactives et gamifiées
