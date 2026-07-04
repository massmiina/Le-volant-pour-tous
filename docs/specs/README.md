# 📖 Documentation Technique — Le Volant Pour Tous

> Plateforme d'apprentissage du code de la route bilingue (Français / Russe)  
> Stack : Next.js 16 · TypeScript · Tailwind CSS · Prisma · Supabase · Vercel

---

## 🧭 System Overview (Point d'Entrée)

Commencez par lire le document d'ensemble qui résume le fonctionnement global et lie les différentes couches du projet :
- [**system-overview.md**](./system-overview.md) : Vision end-to-end et découpage en 3 couches.

---

## 🧠 Couche 1 : Data System (Technique & Logique)

Cette couche décrit la structure des données et les algorithmes du moteur applicatif.

- [**data-system/questions.md**](./data-system/questions.md) : Spécification de la banque de questions (Question Bank) et modèles de données Prisma/TypeScript.
- [**data-system/quiz-exam-logic.md**](./data-system/quiz-exam-logic.md) : Algorithme de tirage d'examens (anti-répétition), chronomètre anti-dérive et synchronisation localStorage ↔ base de données.

---

## 🎓 Couche 2 : Pedagogical Framework (Cadre Éducatif)

Cette couche documente les fondations réglementaires françaises et l'approche didactique du bilinguisme.

- [**pedagogy/remc-etg.md**](./pedagogy/remc-etg.md) : Référentiels REMC & ETG officiels, modèle comportemental GADGET, et règles de traduction bilingue.
- [**pedagogy/mapping-modules.md**](./pedagogy/mapping-modules.md) : Table de correspondance entre nos 12 modules de cours et les 10 thèmes officiels ETG, seuils de complétion et validation.

---

## 🎨 Couche 3 : Product & UX Layer (Expérience Utilisateur)

Cette couche définit les interfaces interactives et le flux utilisateur au sein de l'application.

- [**product/login-auth.md**](./product/login-auth.md) : Expérience de connexion (Lien Magique, mot de passe) et synchronisation de progression.
- [**product/dashboard.md**](./product/dashboard.md) : Suivi personnalisé, calcul prédictif VolantReady™, Radar thématique et Revue d'erreurs.
- [**product/exam.md**](./product/exam.md) : Interface immersive du simulateur d'examen blanc en conditions réelles.
- [**product/quiz.md**](./product/quiz.md) : Parcours utilisateur d'apprentissage et de validation des chapitres.
- [**product/gamification.md**](./product/gamification.md) : Espace de jeux (Arcade Hub), mécanique d'XP et système de badges.
- [**product/driving-school-map.md**](./product/driving-school-map.md) : Carte Google Maps cyberpunk de recherche et de sauvegarde d'auto-écoles.

---

## 📌 Documents Généraux

- [**01_global-spec.md**](./01_global-spec.md) : Vision produit, stack technologique et architecture générale.
- [**02_roadmap.md**](./02_roadmap.md) : Feuille de route globale (progression Gantt) et étapes de développement.

---

## 🔧 Outils Internes

- [**_template-spec.md**](./_template-spec.md) : Gabarit pour rédiger une nouvelle spécification fonctionnelle.
- [**_spec-reviewer.md**](./_spec-reviewer.md) : Guide d'audit critique des spécifications.
