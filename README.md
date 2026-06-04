# Le Volant Pour Tous 🚗💨

Une plateforme d'apprentissage du Code de la Route français au style **Rétro-Cyberpunk**, optimisée pour les écrans d'ordinateurs portables et intégrée avec Supabase (Auth, Base de données PostgreSQL) et Prisma.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Base de Données** : Supabase PostgreSQL (via Prisma ORM)
- **Authentification** : Supabase Auth (Lien Magique OTP / E-mail & Mot de passe)
- **Styles** : Tailwind CSS & Vanilla CSS (Thème Cyberpunk sombre, effets néons)
- **Langues** : Français (FR) & Russe (RU)

---

## 📁 Structure du Projet & Documentation

Pour garder le projet propre et organisé, toute la documentation a été classée dans le dossier [docs/](file:///Users/yasmina.dzhv/ss5/docs/) :

```
le-volant-pour-tous/
├── app/                  # Application Next.js (Pages, API et Routage)
├── components/           # Composants réutilisables (Navbar, Quiz, etc.)
├── contexts/             # Contextes React (Authentification Supabase)
├── docs/                 # Documentation du projet
│   ├── history/          # Historique des versions
│   │   └── changelog.md  # Journal des modifications détaillées (versions, dates)
│   ├── plans/            # Plans de développement par session
│   │   ├── active/       # Plans actifs / en cours (ex: implementation_plan.md, task.md)
│   │   └── completed/    # Archives des plans et walkthroughs terminés
│   ├── specs/            # Spécifications fonctionnelles et techniques
│   │   ├── global-spec.md
│   │   ├── functional-map.md
│   │   └── feature-spec-*.md (Dashboard, Examen, Gamification, Map, etc.)
│   └── roadmap.md        # Feuille de route globale (progression et prochaines étapes)
├── prisma/               # Schéma Prisma et fichiers de base de données
├── public/               # Ressources statiques (images, polices, etc.)
├── utils/                # Utilitaires (configuration des clients Supabase SSR)
├── GEMINI.md             # Règles d'instructions spécifiques pour l'IA Gemini
└── AGENTS.md             # Règles d'instructions pour les agents Next.js
```

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Variables d'Environnement
Créez un fichier `.env.local` à la racine et configurez les variables suivantes :
```env
NEXT_PUBLIC_SUPABASE_URL="votre_url_supabase"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="votre_cle_publishable"
DATABASE_URL="votre_url_pooler_transaction"
DIRECT_URL="votre_url_connexion_directe"
```

### 3. Génération du client Prisma
```bash
npx prisma generate
```

### 4. Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

---

## 📦 Déploiement

Le projet est configuré pour un déploiement continu sur **Vercel**. Les variables d'environnement de production sont gérées directement via le dashboard Vercel ou via la CLI.
