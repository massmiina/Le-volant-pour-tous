# Plan d'implémentation : Rendre opérationnelle la carte des auto-écoles (`/auto-ecole`)

Ce document décrit le plan pour implémenter toutes les fonctionnalités interactives et de base de données sur la page de recherche des auto-écoles : la géolocalisation de l'utilisateur, le calcul des distances en temps réel, l'affichage d'un panneau latéral de détails, la synchronisation des favoris avec la base de données PostgreSQL via Prisma, et une incitation à l'inscription pour les visiteurs non connectés.

---

## 🎯 Objectifs
1. **Géolocalisation & Calcul de Distance** : Permettre à l'utilisateur de cliquer sur un bouton "Me géolocaliser" pour centrer la carte et calculer la distance exacte (en km) vers les auto-écoles en utilisant la formule de Haversine.
2. **Synchronisation des Favoris (Base de Données)** :
   - Pour les **élèves connectés** : Enregistrer et récupérer leurs écoles favorites directement depuis la colonne `favoriteSchools` de la table `User` dans Supabase.
   - Pour les **visiteurs publics** : Afficher une fenêtre modale attrayante les incitant à s'inscrire ou se connecter s'ils tentent d'ajouter une école en favori.
3. **Panneau Lateral Cyberpunk & Interactions** :
   - Cliquer sur un marqueur de la carte ou sur un élément de la liste ouvre un panneau d'information (sidebar mobile-friendly) avec les détails de l'école (avis, prix, coordonnées, itinéraire fictif).
   - Centrer automatiquement la carte sur l'auto-école sélectionnée.

---

## Modifications Proposées

### 1. API Backend (Favoris)

#### [NEW] [route.ts](file:///Users/yasmina.dzhv/ss5/app/api/user/favorites/route.ts)
Création d'un point d'accès API pour gérer les favoris de l'utilisateur connecté :
* **GET** : Récupérer le tableau des IDs des auto-écoles favorites de l'utilisateur (`favoriteSchools`).
* **POST** : Mettre à jour le tableau des favoris dans Prisma en formatant la liste sous forme de chaîne JSON dans le modèle `User`.

---

### 2. Composant Cartographique

#### [MODIFY] [MapComponent.tsx](file:///Users/yasmina.dzhv/ss5/components/MapComponent.tsx)
* Ajouter les props : `selectedId` (ID de l'école sélectionnée), `onSelect` (callback lors du clic sur un marqueur), `center` (coordonnées de centrage de la carte), `zoom` (niveau de zoom de la carte).
* Ajouter un marqueur néon distinct pour la position géolocalisée de l'utilisateur (si disponible).
* Intégrer un effet de lueur néon animée sur le marqueur actif (sélectionné) et ouvrir automatiquement son popup ou son panneau latéral de détails.
* Exposer un composant interne pour gérer dynamiquement le déplacement de la caméra de Leaflet (`useMap`) lorsque la prop `center` change.

---

### 3. Page Principale des Auto-écoles

#### [MODIFY] [page.tsx](file:///Users/yasmina.dzhv/ss5/app/auto-ecole/page.tsx)
* **Intégration Authentification** : Importer le hook `useAuth()` de `contexts/AuthContext`.
* **Récupération des Favoris** : Si l'utilisateur est connecté, charger ses favoris depuis `GET /api/user/favorites` au démarrage de la page.
* **Gestion des Favoris** :
   - Si connecté : Mettre à jour la base de données via `POST /api/user/favorites` en temps réel lors du clic sur le bouton cœur.
   - Si invité : Activer l'affichage d'une boîte de dialogue modale promotionnelle avec des boutons "Se connecter" et "Créer un compte".
* **Géolocalisation** : Implémenter le bouton de géolocalisation en appelant `navigator.geolocation.getCurrentPosition()`.
* **Calcul des Distances** : Utiliser la formule mathématique de Haversine pour calculer la distance entre l'utilisateur géolocalisé et chaque auto-école et trier la liste par proximité.
* **Panneau de Détails (Sidebar/Bottom-sheet)** : Créer un panneau latéral animé (avec Framer Motion) affichant les détails riches de l'école sélectionnée avec bouton d'itinéraire et d'appel.

---

## Plan de Vérification

### Tests Manuels
1. **Test de Géolocalisation** :
   - Cliquer sur "Me géolocaliser". Autoriser la position dans le navigateur et vérifier que la carte se centre et que les distances s'affichent correctement sur les fiches des auto-écoles.
2. **Test des Favoris (Hors connexion)** :
   - En mode visiteur, cliquer sur le cœur d'une école et vérifier que la modale de redirection d'authentification s'ouvre.
3. **Test des Favoris (Connecté)** :
   - Se connecter à un compte élève, ajouter une école en favori, actualiser la page et vérifier que l'école est toujours marquée comme favorite (provenant de Supabase).
4. **Test d'Intégration de la Carte** :
   - Cliquer sur le bouton "Voir détails" d'une carte d'auto-école et vérifier que la carte se déplace sur son marqueur et ouvre ses informations riches dans la barre latérale.

### Tests Automatisés
- Lancement de `npm run build` pour garantir qu'aucune erreur TypeScript ou d'importation client-side de Leaflet ne casse le build du projet.
