# Spécifications Fonctionnelles : Espace de Connexion (Auth)

Ce document définit les spécifications pour la création de comptes et l'authentification des utilisateurs sur "Le Volant Pour Tous".

## 1. Objectifs de la fonctionnalité
1. Permettre aux visiteurs de **créer un compte sécurisé**.
2. Permettre aux utilisateurs inscrits de **se connecter**.
3. Assurer la **transition transparente de la progression locale** (localStorage) vers le serveur de base de données (Cloud) lors de la première inscription.
4. Protéger l'accès aux pages privées (ex: `/dashboard`).

## 2. Architecture & Choix Technologiques
Afin de garantir la sécurité et la scalabilité du système dans l'écosystème Next.js :
- **Librairie d'Authentification** : `NextAuth.js` (Auth.js). C'est le standard de sécurité pour Next.js, gérant les sessions via des cookies chiffrés et sécurisés.
- **Base de Données** : `Prisma` (ORM) couplé à une base de données robuste (comme `PostgreSQL` via Vercel ou Supabase).
- **Cryptographie** : Hashage des mots de passe avec `bcrypt` (les mots de passe ne sont jamais stockés en clair).

## 3. Interfaces Utilisateur (Pages & Composants)
Les pages devront s'intégrer parfaitement au design "Dark Mode / Néon" actuel.

- **Page d'Inscription (`/register`)** :
  - Champs : *Nom d'utilisateur*, *Email*, *Mot de passe*, *Confirmation du mot de passe*.
  - Option Social Login : Bouton "S'inscrire avec Google" (SSO).
- **Page de Connexion (`/login`)** :
  - Champs : *Email*, *Mot de passe*.
  - Lien : "Mot de passe oublié ?".
- **Mise à jour de la Navbar globale** :
  - Si *Non Connecté* : Affichage d'un bouton "S'identifier".
  - Si *Connecté* : Affichage de l'Avatar de l'utilisateur avec un menu déroulant ("Mon Dashboard", "Se déconnecter").

## 4. Règles de Gestion (Business Rules)
1. **Migration de Sauvegarde (Crucial)** : Lorsqu'un utilisateur navigue sans compte (sa progression est stockée dans son `localStorage`) et qu'il décide de s'inscrire, le système doit automatiquement capter ce `localStorage` et le fusionner dans la base de données liée à son nouveau compte.
2. **Redirection Intelligente** :
   - Après une connexion/inscription réussie, rediriger l'utilisateur vers la page `/dashboard`.
   - Si un utilisateur non connecté tente d'accéder manuellement à `/dashboard`, un **Middleware Next.js** le redirigera automatiquement vers `/login`.

## 5. Modèle de Données (Base de Données)
Aperçu simplifié du schéma de données nécessaire (format Prisma) :

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?   // Hashé via bcrypt
  image         String?   // Avatar Google par défaut
  createdAt     DateTime  @default(now())
  
  // Relations
  progress      Progress? // Historique de l'élève
}

model Progress {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  completedModules String[] // ex: ["mod1", "mod5"]
  quizScores      Json     // ex: { "signalisation": 5, "priorites": 3 }
}
```
