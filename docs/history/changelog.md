# Historique du Projet (Project Changelog)

Ce document récapitule l'historique des versions et les modifications apportées à l'application **Le Volant Pour Tous**.

---

## [1.3.0] - 2026-06-04
### Ajouté
- **Géolocalisation (`navigator.geolocation`)** : Centrage de la carte sur l'utilisateur avec marqueur néon cyan à effet d'onde clignotante.
- **Formule de Haversine** : Calcul de la distance réelle en kilomètres de l'utilisateur à chaque école et tri automatique de la liste par proximité.
- **Panneau Latéral Cyberpunk** : Barre latérale droite animée (Framer Motion) affichant les détails de l'auto-école sélectionnée (adresse, prestations, téléphone, e-mail, redirection d'itinéraire Google Maps).
- **Favoris persistés sur Supabase** : Nouvelle route API `GET/POST /api/user/favorites` pour enregistrer les écoles favorites dans la table utilisateur.
- **Modale d'Authentification Invité** : Invite les utilisateurs non connectés à s'inscrire pour pouvoir ajouter des écoles en favori.

---

## [1.2.0] - 2026-06-04
### Ajouté
- **Supabase Auth** : Remplacement complet de NextAuth par une authentification native Supabase (via les helpers `@supabase/ssr`).
- **Connexion Lien Magique (OTP)** : Option de connexion par e-mail sans mot de passe avec envoi de code temporaire.
- **Route de callback PKCE** : Redirection sécurisée après validation d'e-mail d'inscription.
- **Espace Compte (`/compte`)** : Page permettant de voir sa progression, modifier son pseudo/mot de passe et gérer les actions de la zone de danger.
- **Suppression de compte** : Route API `/api/user` qui supprime l'utilisateur de Prisma et de l'annuaire Supabase Auth de manière synchrone.
- **Migration de progression locale** : Détection des scores d'invités dans le stockage du navigateur (`localStorage`) et fusion automatique en base de données lors de la connexion.

### Modifié
- **Hauteur de Page & Ergonomie** : Ajustement des paddings, des hauteurs d'éléments (`min-h-[calc(100vh-4rem)]`) pour éliminer le besoin de faire défiler la page verticalement sur les écrans d'ordinateurs portables classiques.
- **Menu Profil** : L'avatar de la Navbar ouvre un menu contextuel complet redirigeant vers `/compte` et `/dashboard`.

---

## [1.1.0] - 2026-05-23
### Ajouté
- **Base de Données Supabase** : Remplacement de la base SQLite locale par PostgreSQL de Supabase en production.
- **Modèle de Données Prisma** : Schémas mis à jour pour correspondre à la structure PostgreSQL.
- **Traductions FR / RU** : Intégration complète du support multilingue dans les menus, les badges de catégories, les boutons de sortie et les formulaires de quiz.

### Modifié
- **Navbar Sleek** : Optimisation de l'affichage mobile et de la barre de navigation supérieure pour un rendu plus compact.
- **Menu Plus** : Déplacement des liens secondaires (*Avis* et *Contact*) sous un menu déroulant "Plus" pour désencombrer l'en-tête de page.

---

## [1.0.0] - 2026-04-15
### Ajouté
- **Design Rétro-Cyberpunk** : Implémentation du thème sombre par défaut avec néons bleus/roses et typographies stylisées.
- **Mises en Situation Réelles** : Rendu subjectif de cockpit 3D pour simuler des questions réelles d'examen du code de la route.
- **Cours Interactifs** : Pages de cours structurées par thèmes avec navigation fluide.
- **Quiz d'Entraînement** : Système de questions/réponses avec correction instantanée et explications.
