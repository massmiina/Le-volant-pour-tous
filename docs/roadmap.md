# Feuille de Route (Project Roadmap)

Cette feuille de route présente l'état d'avancement des fonctionnalités de l'application **Le Volant Pour Tous** et les prochaines étapes de développement.

---

## 🗺️ Progression Globale

```mermaid
gantt
    title Progression du Projet
    dateFormat  YYYY-MM
    section Fondations & UI
    Structure de Base & UI Rétro-Cyberpunk   :done,    des1, 2026-04, 2026-05
    Mise en Situation & Canvas subjectif     :done,    des2, 2026-05, 2026-05
    section Données & Internationalisation
    Migration PostgreSQL (Supabase)           :done,    des3, 2026-05, 2026-05
    Traduction FR / RU & Ajustements Écrans   :done,    des4, 2026-05, 2026-06
    section Espace Utilisateur & Sécurité
    Supabase Auth (Magic Link, PKCE)         :done,    des5, 2026-06, 2026-06
    Espace Compte & Sync de Progression      :done,    des6, 2026-06, 2026-06
    Déploiement Continu (Vercel)             :done,    des7, 2026-06, 2026-06
    section Gamification & Dashboard
    Tableau de Bord & Stats Avancées        :active,  des8, 2026-06, 2026-07
    Moteur de Points, Niveaux & Badges      :todo,    des9, 2026-07, 2026-07
```

---

## ✅ Étape 1 : Fondations & Interface Rétro-Cyberpunk (Complété)
- [x] Structure de base Next.js 16 (App Router) et Tailwind CSS.
- [x] Charte graphique Rétro/Cyberpunk avec mode sombre natif, effets néon, lueurs et polices personnalisées ("Rock Salt").
- [x] Pages de cours interactifs et de quiz thématiques (Signalisation, Priorités, etc.).
- [x] Moteur de rendu subjectif pour les situations de conduite réelles (cockpit 3D simulé).

## ✅ Étape 2 : Données & Localisation (Complété)
- [x] Migration de la base de données locale SQLite vers **Supabase PostgreSQL** en production via Prisma ORM.
- [x] Système de traduction complet prenant en charge le **Français** et le **Russe**.
- [x] Résolution des problèmes de débordement d'écran : ajustement des hauteurs de mise en page pour s'adapter parfaitement aux écrans d'ordinateurs portables classiques sans défilement vertical forcé.

## ✅ Étape 3 : Authentification & Espace Compte (Complété)
- [x] Remplacement de NextAuth par **Supabase Auth** natif (utilisation des cookies sécurisés via `@supabase/ssr`).
- [x] Flux de connexion sans mot de passe via **Lien Magique (OTP)** et mot de passe standard.
- [x] Validation des comptes par e-mail avec route de callback PKCE sécurisée.
- [x] Espace utilisateur complet (`/compte`) permettant :
  - La modification des données de profil (nom d'utilisateur, mot de passe).
  - La réinitialisation complète de sa progression avec boîte de dialogue de confirmation.
  - La suppression définitive de compte (effacement en cascade dans la base de données et dans Supabase Auth).
- [x] Migration transparente de la progression locale : les scores des invités enregistrés dans `localStorage` sont automatiquement importés vers Supabase PostgreSQL lors de leur première connexion.
- [x] Déploiement continu automatisé sur la plateforme **Vercel** avec intégration des variables d'environnement de production.

## 🚀 Étape 4 : Tableau de Bord & Gamification (En Cours / À venir)
- [ ] **Tableau de Bord Personnel** (`/dashboard`) :
  - Graphiques de progression par catégorie de code de la route.
  - Calendrier d'assiduité (streaks) et historique détaillé des derniers examens blancs.
- [ ] **Moteur de Gamification** (conforme à [feature-spec-gamification.md](file:///Users/yasmina.dzhv/ss5/docs/specs/feature-spec-gamification.md)) :
  - Système d'XP (points d'expérience) et de niveaux.
  - Déblocage de badges interactifs et animés.
  - Succès secrets pour motiver les utilisateurs dans leur apprentissage.
