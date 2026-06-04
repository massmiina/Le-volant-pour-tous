# Spécifications Fonctionnelles : Carte des Auto-écoles (`/auto-ecole`)

## 1. Objectifs de la fonctionnalité
- Permettre à l'élève de trouver rapidement une auto-école partenaire près de chez lui.
- Fluidifier la transition entre l'apprentissage théorique (en ligne) et la pratique de conduite (physique).
- Permettre d'enregistrer ses écoles "Favorites" pour y accéder rapidement depuis son tableau de bord.

## 2. Interface Utilisateur (UI) & Expérience (UX)
Le design s'intègre au Dark Mode général, en remplaçant la carte standard par une carte hyper-stylisée.

- **La Carte Interactive** :
  - Thème sombre personnalisé (Mapbox Dark v11 ou Leaflet avec des tuiles sombres).
  - Marqueurs (Pins) personnalisés projetant une lueur Néon (Violet/Cyan).
  - Bouton flottant (FAB) "Me géolocaliser".
- **Le Panneau Latéral (Sidebar / Bottom Sheet sur mobile)** :
  - Lorsqu'on clique sur un marqueur, la fiche de l'auto-école s'ouvre par le bas ou le côté.
  - **Contenu** : Nom, Adresse complète, Distance calculée (ex: 2.3 km), Note Moyenne (⭐⭐⭐⭐⭐).
  - **Bouton d'action (CTA)** : Un gros bouton "⭐ Ajouter aux favoris".

## 3. Règles de Gestion (Business Logic)
- **Recherche et Filtrage** : La carte affiche uniquement les écoles visibles selon le niveau de zoom et la position de l'utilisateur (Spatial Indexing).
- **Système de Favoris (Paywall)** :
  - **Utilisateur Connecté** : Un clic sur "Favoris" sauvegarde instantanément l'école sur son compte.
  - **Utilisateur Visiteur** : Un clic sur "Favoris" ouvre une fenêtre (Modale) attrayante qui dit : *"Créez un compte gratuit pour sauvegarder cette école et retrouver votre progression."*

## 4. Architecture Technique & Data
- **Technologies Frontend** :
  - Librairie Cartographique : `react-map-gl` (pour Mapbox) ou `react-leaflet`.
  - Géolocalisation : Utilisation de l'API native `navigator.geolocation`.
- **Modèle de Données (Prisma)** :
  - Extension du modèle `User` actuel pour relier les auto-écoles.
  ```prisma
  model User {
    // ... champs existants ...
    favoriteSchools String[] // Stocke la liste des IDs des auto-écoles favorites
  }
  
  // Si nous hébergeons la base de données des écoles nous-mêmes :
  model DrivingSchool {
    id          String @id @default(cuid())
    name        String
    latitude    Float
    longitude   Float
    rating      Float
    address     String
    contactInfo String?
  }
  ```
