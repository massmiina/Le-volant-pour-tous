# Tâches : Migration Supabase, Optimisation de la Hauteur, Espace Compte et Inscription Supabase Auth

## Base de Données Supabase & SDK SSR
- `[x]` Configurer `prisma/schema.prisma` pour PostgreSQL
- `[x]` Configurer les variables d'environnement dans `.env` et `.env.local`
- `[x]` Synchroniser le schéma de données (`npx prisma db push`)
- `[x]` Installer `@supabase/supabase-js` et `@supabase/ssr`
- `[x]` Implémenter les utilitaires client/serveur Supabase SSR et le middleware

## Optimisation de la Hauteur d'Écran
- `[x]` Remplacer `min-h-screen` par `min-h-[calc(100vh-4rem)]` sur tous les layouts
- `[x]` Réduire les paddings et marges pour éviter le défilement vertical inutile
- `[x]` Optimiser l'affichage des images et canvas de cockpit 3D

## Authentification Supabase Auth (E-mail & Lien Magique)
- `[x]` Supprimer la configuration obsolète de NextAuth
- `[x]` Créer le contexte d'authentification réactif client-side `contexts/AuthContext.tsx`
- `[x]` Modifier l'inscription backend pour enregistrer sur Supabase Auth et synchroniser Prisma avec le même identifiant utilisateur
- `[x]` Implémenter le endpoint de callback PKCE (`app/api/auth/callback/route.ts`)
- `[x]` Intégrer l'onglet et le flux de connexion par **Lien Magique (OTP)** sur la page `/login`

## Espace Compte & Inscription
- `[x]` Créer la page de profil utilisateur `/compte` et son composant client interactif
- `[x]` Implémenter les formulaires de mise à jour de nom d'utilisateur et de mot de passe
- `[x]` Créer les points d'API backend (PUT / DELETE `/api/user`) pour les comptes
- `[x]` Mettre en place la Zone de Danger (réinitialisation et suppression de compte avec confirmations)
- `[x]` Intégrer les liens vers le compte et le dashboard dans le menu déroulant de l'avatar de la Navbar

## Déploiement Git & Validation
- `[x]` Créer une branche de session dédiée `session/user-registration-and-account`
- `[x]` Pousser toutes les modifications locales sur la branche distante
- `[x]` Fusionner proprement la branche de session dans `main` (merge commit avec `--no-ff`)
- `[x]` Pousser la branche `main` fusionnée sur GitHub (`origin/main`)
- `[x]` Valider que l'application compile sans erreurs avec `npm run build`

