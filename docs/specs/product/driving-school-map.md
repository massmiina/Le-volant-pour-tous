# Product & UX Layer : Carte Interactive des Auto-Écoles

Ce document décrit l'interface, l'expérience utilisateur et les interactions avec la carte de recherche des auto-écoles (`/auto-ecole`).

---

## 1. Interface de la Carte & Filtres

La page affiche une carte Google Maps intégrée avec un style sombre cyberpunk personnalisé :

- **Position de l'élève** : Un marqueur cyan clignotant entouré d'une onde d'effet radar.
- **Marqueurs d'auto-écoles** : 
  - *Rose/Violet avec halo lumineux* pour les auto-écoles partenaires / recommandées par la plateforme.
  - *Vert* pour les auto-écoles standard à proximité.
  - *Orange* pour l'auto-école sélectionnée.
- **Barre de recherche** : Permet de saisir une adresse ou une ville.
- **Bouton Boussole** : Déclenche la géolocalisation de l'appareil (`navigator.geolocation`) pour recentrer la carte sur la position actuelle de l'élève.

---

## 2. Le Panneau Latéral de Détails (Sidebar)

Au clic sur un marqueur de carte ou une vignette de la liste, un panneau latéral (propulsé par Framer Motion) s'ouvre depuis la droite :

- **Informations affichées** : Nom de l'auto-école, note Google, adresse, téléphone (lien `tel:`), email (lien `mailto:`), et site internet.
- **Badges de services** : Indique si l'établissement propose des cours bilingues (ex: "Bilingue Russe"), s'il accepte le financement CPF ("Permis CPF"), ou s'il propose la formation au permis de conduire accélérée.
- **Bouton Itinéraire** : Ouvre un nouvel onglet vers Google Maps Directions pré-rempli avec l'itinéraire optimal depuis la position de l'élève.
- **Bouton Favoris (Étoile)** : Permet d'ajouter ou de retirer l'école de ses favoris.

---

## 3. Modale d'Authentification Invité

Si un utilisateur invité (non connecté) tente de sauvegarder une école dans ses favoris :
1. Une boîte de dialogue néon s'affiche : *"Sauvegardez vos favoris et suivez vos progrès gratuitement"*.
2. Elle propose deux boutons : "Créer un compte" (redirige vers `/register`) et "Annuler".
3. Si l'utilisateur s'inscrit, l'auto-école est automatiquement ajoutée à ses favoris dans la base de données cloud à la création du compte.
