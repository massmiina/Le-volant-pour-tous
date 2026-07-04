# Product & UX Layer : Authentification & Espace Compte

Ce document définit l'expérience utilisateur et les règles d'interaction pour la création de compte, l'accès sécurisé et la gestion des données personnelles sur **Le Volant Pour Tous**.

---

## 1. Parcours Utilisateur : Inscription & Connexion

La page d'authentification (`/login` et `/register`) adopte le thème esthétique rétro-cyberpunk (fonds sombres et lueurs néon violettes).

### 1.1 Options de Connexion
L'élève dispose de deux onglets distincts pour s'identifier :
1. **Lien Magique (OTP / Sans mot de passe)** : L'élève saisit son email. Supabase Auth envoie un lien sécurisé par email. Le clic sur le lien ouvre le navigateur de l'élève, valide la session et le redirige directement vers son `/dashboard`.
2. **Email & Mot de passe classique** : Connexion standard avec formulaire de saisie sécurisé.

### 1.2 Flux d'Inscription
L'inscription requiert :
- Un pseudo (nom d'utilisateur)
- Une adresse email valide
- Un mot de passe robuste (minimum 6 caractères)

Une fois le formulaire soumis, un e-mail de validation est envoyé. Le clic sur le lien d'activation déclenche le flux d'échange de code PKCE côté serveur via la route `/api/auth/callback`, créant de manière atomique l'utilisateur dans Supabase Auth et dans la table `User` de Prisma.

---

## 2. Espace Compte (`/compte`)

L'espace de configuration est réservé aux élèves connectés. Il leur permet de gérer les aspects de leur profil :

- **Profil** : Modification du pseudo en direct.
- **Sécurité** : Modification du mot de passe (mise à jour directe sur Supabase Auth).
- **Zone de Danger** (Boutons rouges néons) :
  - *Réinitialiser la progression* : Efface tous les scores et modules validés en base après confirmation dans une modale.
  - *Supprimer le compte* : Supprime définitivement l'utilisateur de Supabase Auth et en cascade dans Prisma.

---

## 3. Synchronisation Invisible de la Progression

L'expérience invité est préservée : un utilisateur non connecté peut lire des cours et faire des quiz. Sa progression est sauvegardée localement dans `localStorage`.

### UX de conversion
Dès que l'élève se connecte pour la première fois :
1. Une notification l'informe que sa progression d'invité est en cours d'importation.
2. Le système fusionne de manière transparente son historique local avec le serveur.
3. Les données du `localStorage` sont nettoyées pour éviter les doublons.
4. L'élève est redirigé vers son Dashboard mis à jour.
