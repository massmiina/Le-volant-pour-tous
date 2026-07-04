# 📖 Documentation Technique — Le Volant Pour Tous

> Plateforme d'apprentissage du code de la route bilingue (Français / Russe)  
> Stack : Next.js 16 · TypeScript · Tailwind CSS · Prisma · Supabase · Vercel

---

## 🗂️ Index des Spécifications

Lire dans cet ordre pour une compréhension progressive du projet :

| # | Fichier | Rôle |
|:-:|---|---|
| 1 | [01\_global-spec.md](./01_global-spec.md) | 📌 **Point d'entrée** — Vision produit, stack technique, architecture globale |
| 2 | [02\_pedagogical-spec.md](./02_pedagogical-spec.md) | 📚 **Cœur métier** — Référentiel ETG / REMC, bilinguisme FR/RU, 12 modules |
| 3 | [03\_functional-map.md](./03_functional-map.md) | 🗺️ **UX globale** — Arborescence des routes, profils utilisateurs, flux de conversion |
| 4 | [04\_feature-spec-dashboard.md](./04_feature-spec-dashboard.md) | 📊 **Feature** — Tableau de bord élève (VolantReady™, Radar, Revue d'erreurs) |
| 5 | [05\_feature-spec-examen.md](./05_feature-spec-examen.md) | 📝 **Feature** — Simulateur d'examen blanc (40 questions, anti-crash, persistance) |
| 6 | [06\_feature-spec-gamification.md](./06_feature-spec-gamification.md) | 🎮 **Feature** — Arcade Hub (Sign Master, Esquive Route, XP, badges) |
| 7 | [07\_feature-spec-login.md](./07_feature-spec-login.md) | 🔐 **Feature** — Authentification Supabase, Magic Link, gestion de compte |
| 8 | [08\_feature-spec-map.md](./08_feature-spec-map.md) | 📍 **Feature** — Carte interactive des auto-écoles (Google Places, Haversine, favoris) |
| 9 | [09\_roadmap.md](./09_roadmap.md) | 🚀 **Roadmap** — Planning, état d'avancement (Gantt), prochaines étapes |

---

## 🔧 Outils Internes (non destinés à la lecture externe)

| Fichier | Usage |
|---|---|
| [\_template-spec.md](./_template-spec.md) | Modèle vierge pour rédiger une nouvelle spec feature |
| [\_spec-reviewer.md](./_spec-reviewer.md) | Skill d'audit critique des spécifications (Architecte Senior) |

---

## 🏗️ Vue d'ensemble rapide

```
Le Volant Pour Tous
├── Vision         → Plateforme SaaS d'apprentissage du code de la route FR/RU
├── Stack          → Next.js 16, TypeScript, Tailwind, Prisma, Supabase PostgreSQL
├── Auth           → Supabase Auth (Magic Link OTP + Email/MDP), flux PKCE
├── Pédagogie      → 12 modules REMC, 10 thèmes ETG, seuil 80% par module
├── /examen        → 40q · 20s/q · anti-dérive · anti-crash · ≥ 35/40 pour réussir
├── /dashboard     → VolantReady™ · Radar thèmes · Revue d'erreurs interactive
├── /jeu           → Sign Master (drag & drop) · Esquive Route (arcade 3 voies)
└── /auto-ecole    → Google Places + Partenaires Supabase + tri Haversine
```

---

## 📊 État d'avancement

| Étape | Statut |
|---|---|
| ✅ Étape 1 — Fondations & UI Rétro-Cyberpunk | **Complété** |
| ✅ Étape 2 — Données & Localisation (Supabase, traductions) | **Complété** |
| ✅ Étape 3 — Auth, Compte & Carte auto-écoles | **Complété** |
| 🚀 Étape 4 — Dashboard & Gamification | **En cours** |

> Voir le détail complet dans [09\_roadmap.md](./09_roadmap.md)
