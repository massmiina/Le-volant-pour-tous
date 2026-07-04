# Spécifications Fonctionnelles : Espace de Connexion, Gestion de Compte & Synchronisation (Auth)

Ce document définit les spécifications pour l'authentification des utilisateurs, la gestion de leur compte (`/compte`) et la persistance cloud sur "Le Volant Pour Tous".

## 1. Objectifs du Système d'Authentification
1. Permettre aux visiteurs de **créer un compte** sécurisé avec validation d'adresse e-mail.
2. Permettre aux utilisateurs de se connecter soit via **e-mail/mot de passe classique**, soit via un **Lien Magique (OTP)** sans mot de passe.
3. Permettre aux élèves connectés de gérer leur compte sur l'espace dédié (`/compte`) : modifier le pseudo, changer de mot de passe, réinitialiser la progression ou supprimer définitivement le compte.
4. Assurer la **migration transparente de la progression locale** d'invité (`localStorage`) vers le serveur de base de données (PostgreSQL) lors de la première connexion.
5. Protéger l'accès aux pages privées via un contrôle de session côté serveur (RSC) et middleware.

## 2. Architecture & Choix Technologiques
- **Service d'Authentification** : **Supabase Auth** natif. Les sessions sont gérées par des cookies sécurisés et chiffrés via les assistants `@supabase/ssr` (gestion de session côté client et serveur).
- **Sécurité et Flux PKCE** : Lors de la confirmation d'email d'inscription, Supabase Auth utilise le flux d'échange de code PKCE (Proof Key for Code Exchange) via la route dédiée `/api/auth/callback` pour échanger le code à usage unique contre une session de cookie active avant de rediriger l'élève vers son dashboard.
- **Base de Données Métier** : **Supabase PostgreSQL** interrogée via l'ORM **Prisma**. Lors d'une inscription, un profil utilisateur Prisma est automatiquement créé à l'aide de l'UID généré par Supabase Auth pour assurer l'atomicité.

## 3. Interfaces Utilisateur (Pages & Composants)

- **Page d'Authentification (`/login` & `/register`)** :
  - Design sombre / néon cyberpunk.
  - Onglet de choix : *Mot de passe standard* (Email, Mot de passe, Pseudo à l'inscription) et *Lien Magique* (Email uniquement).
  - Validation interactive et affichage des retours d'erreurs (formatage email, mot de passe trop court).
- **Menu Profil (Navbar)** :
  - Remplacement du bouton "S'identifier" par l'avatar de l'élève une fois connecté.
  - Clic sur l'avatar ouvre un menu contextuel avec redirections vers `/dashboard`, `/compte` et un bouton "Se déconnecter".
- **Espace Compte (`/compte`)** :
  - **Profil** : Formulaire pour mettre à jour son pseudo.
  - **Sécurité** : Formulaire pour mettre à jour son mot de passe en direct sur Supabase Auth.
  - **Zone de Danger** :
    - *Bouton de réinitialisation* : Efface toute la progression cloud (modules lus, scores) après confirmation dans une modale.
    - *Bouton de suppression* : Supprime le compte de Prisma et de l'annuaire Supabase Auth de manière synchrone (cascade) après confirmation.

## 4. Règles de Gestion (Business Rules)

1. **Migration et Fusion de la Progression (Crucial)** :
   - Lorsqu'un élève non connecté effectue des quiz, ses scores et modules validés sont sauvés dans le `localStorage` du navigateur.
   - Dès la connexion d'un utilisateur, le fichier `app/providers.tsx` détecte la présence de scores invités en local, les envoie via `POST /api/progress` à la base cloud, puis nettoie le `localStorage`.
   - Si l'élève avait déjà une progression cloud, les modules terminés en local et en ligne sont fusionnés (union).
2. **Protection des Routes** :
   - `/dashboard` et `/compte` requièrent une session active. Si l'utilisateur n'est pas connecté, il est redirigé vers `/login`.
   - La détection de session utilise `supabase.auth.getUser()` côté serveur pour éviter toute falsification de session côté client.

## 5. Modèle de Données (Base de Données Prisma)

Le schéma Prisma associe l'identifiant Supabase Auth au profil de l'utilisateur :

```prisma
model User {
  id                  String               @id @default(cuid()) // UID Supabase Auth
  name                String?
  email               String               @unique
  password            String?              // Optionnel (géré principalement par Supabase Auth)
  image               String?
  createdAt           DateTime             @default(now())
  
  progress            Progress?
  examResults         ExamResult[]
  gameScores          GameScore[]
  favoriteSchoolLinks UserFavoriteSchool[]
}

model Progress {
  id               String   @id @default(cuid())
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  completedModules String   @default("[]") // Liste JSON (ex: "[1, 3, 5]")
  quizScores       String   @default("{}") // Objet JSON (ex: '{"1": 5, "2": 4}')
  updatedAt        DateTime @updatedAt
}
```
