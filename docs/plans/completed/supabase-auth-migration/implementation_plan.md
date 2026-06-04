# Plan d'implémentation : Migration vers Supabase (PostgreSQL)

Ce document décrit le plan pour connecter l'application "Le Volant Pour Tous" à une base de données de production PostgreSQL hébergée sur **Supabase** via **Prisma ORM**, en remplacement de la base de données SQLite locale actuelle (`dev.db`).

---

## ⚠️ Action Requise de l'Utilisateur

Pour que cette migration fonctionne, vous devez posséder un projet **Supabase** actif et récupérer vos chaînes de connexion PostgreSQL.
Nous configurerons les fichiers pour que tout soit prêt. Il vous suffira de renseigner les valeurs correspondantes dans votre fichier `.env`.

> [!IMPORTANT]
> **Chaînes de connexion Supabase requises :**
> 1. **`DATABASE_URL`** : URL du mode Transaction Pooler (port `6543`, généralement recommandée pour les environnements Serverless comme Next.js/Vercel).
> 2. **`DIRECT_URL`** (Optionnel mais recommandé) : URL de connexion directe à la base de données (port `5432`, nécessaire pour effectuer les migrations Prisma).
>
> Exemple type :
> * `DATABASE_URL="postgres://postgres.[username]:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"`
> * `DIRECT_URL="postgres://postgres.[username]:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"`

---

## Modifications Proposées

### 1. Prisma Schema

#### [MODIFY] [schema.prisma](file:///Users/yasmina.dzhv/ss5/prisma/schema.prisma)
* Remplacer le `provider = "sqlite"` par `provider = "postgresql"`.
* Mettre à jour le bloc `datasource db` pour inclure les variables `url` et `directUrl`.

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 2. Variables d'Environnement

#### [MODIFY] [.env](file:///Users/yasmina.dzhv/ss5/.env)
* Ajouter les espaces réservés pour `DATABASE_URL` et `DIRECT_URL` (avec des exemples descriptifs) tout en commentant l'ancienne configuration SQLite.

---

## Plan de Vérification & Déploiement

Une fois les modifications appliquées et votre fichier `.env` configuré avec vos accès Supabase, voici les étapes à suivre dans votre terminal :

### Étape 1 : Synchronisation du Schéma
Nous exécuterons la commande suivante pour synchroniser le schéma Prisma actuel vers votre base Supabase toute neuve :
```bash
npx prisma db push
```
*(Cette commande crée automatiquement toutes les tables : `User`, `Progress`, `ExamResult`, `GameScore` sur Supabase sans nécessiter de fichiers de migration lourds).*

### Étape 2 : Régénération du Client Prisma
Pour mettre à jour les types TypeScript générés par Prisma :
```bash
npx prisma generate
```

### Étape 3 : Validation
Nous lancerons l'application en mode développement (`npm run dev`) pour vérifier qu'aucune erreur de compilation ne survient et testerons le bon fonctionnement de la connexion.
