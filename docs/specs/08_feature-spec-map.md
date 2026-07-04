# Spécifications Fonctionnelles : Carte des Auto-écoles (`/auto-ecole`)

Ce document détaille le fonctionnement technique et fonctionnel de la carte interactive de recherche d'auto-écoles sur "Le Volant Pour Tous".

## 1. Objectifs de la Carte
- Permettre à l'élève de **rechercher des auto-écoles réelles** autour d'une ville ou de sa position géographique actuelle.
- Mettre en valeur les **auto-écoles recommandées et partenaires** de la plateforme.
- Offrir une fiche détaillée et un guidage d'itinéraire direct.
- Permettre aux utilisateurs connectés de sauvegarder leurs auto-écoles préférées dans leurs **favoris**.

## 2. Définitions & Concepts Clés
- **Auto-écoles externes** : Résultats publics récupérés à la volée via Google Places API.
- **Auto-écoles recommandées / partenaires** : Écoles premium gérées par la plateforme et enregistrées dans Supabase. Elles apparaissent en tête de liste et ont un marqueur néon rose distinctif.
- **Favoris Utilisateur** : Auto-écoles (partenaires ou Google Places) sauvegardées par un utilisateur connecté. Persistées dans la table `UserFavoriteSchool`.

## 3. Interface Utilisateur & Expérience Client (UI/UX)

- **Recherche & Contrôles** :
  - Champ de saisie d'adresse ou ville.
  - Bouton "Boussole" pour déclencher la géolocalisation de l'appareil (`navigator.geolocation`).
  - Marqueur utilisateur : Un cercle néon cyan clignotant avec onde animée.
- **La Carte Interactive** :
  - Intégration de Google Maps avec un thème sombre personnalisé cyberpunk.
  - Marqueurs colorés : Cyan pour la position de l'élève, Rose/Violet à effet de halo pour les partenaires, Vert pour les écoles standard, Orange pour l'école actuellement sélectionnée.
- **Panneau de Détails Latéral (Sidebar)** :
  - Clic sur un marqueur ou une carte ouvre un volet coulissant latéral droit (propulsé par Framer Motion).
  - Contenu : Nom, note, adresse, badges de caractéristiques (ex: "Bilingue", "Permis CPF"), lien direct d'appel (`tel:`), lien e-mail (`mailto:`), et un bouton "Itinéraire" qui ouvre **Google Maps Directions** pré-rempli.
- **Modale d'Authentification Invité** :
  - Si un visiteur non connecté clique sur l'icône étoile pour ajouter en favoris, une boîte de dialogue néon l'invite à créer un compte pour sauvegarder ses favoris et suivre sa progression.

## 4. Logique Algorithmique & Backend

### 4.1 Fusion de Données (Google Places & Supabase)
Le backend interroge de manière asynchrone :
1. L'API Google Places (Text Search ou Nearby Search) pour trouver les auto-écoles physiques dans le secteur.
2. La table Supabase `DrivingSchoolPartner` pour identifier les partenaires dans le même périmètre (en comparant les `googlePlaceId` ou les coordonnées géographiques).
3. Les résultats sont fusionnés : si une école Google correspond à un partenaire Supabase, l'objet résultant est marqué comme `isFeatured: true`.

### 4.2 Tri par Proximité (Formule de Haversine)
Dès que la géolocalisation de l'élève est active, la distance à vol d'oiseau entre sa position $(\text{lat}_1, \text{lng}_1)$ et chaque auto-école $(\text{lat}_2, \text{lng}_2)$ est calculée via la **formule trigonométrique de Haversine** :
$$d = 2R \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta\text{lng}}{2}\right)}\right)$$
Où $R = 6371\text{ km}$ est le rayon de la Terre.
La liste des résultats est instantanément triée par ordre croissant de distance.

## 5. API Backend & Modèle de Données Prisma

### 5.1 Endpoints API
- `GET /api/driving-schools/search?query=Paris` : Recherche textuelle serveur (Google Places Text Search + Partenaires).
- `GET /api/driving-schools/nearby?lat=XX&lng=YY` : Recherche de proximité serveur (Google Places Nearby Search + Partenaires dans le rayon).
- `GET /api/user/favorites` : Récupère la liste des favoris de l'utilisateur connecté.
- `POST /api/user/favorites` : Ajoute ou retire une école des favoris.

### 5.2 Schéma de Données Prisma
```prisma
model DrivingSchoolPartner {
  id            String               @id @default(cuid())
  googlePlaceId String?              @unique
  name          String
  address       String?
  city          String?
  latitude      Float
  longitude     Float
  phone         String?
  website       String?
  featuredLabel String?
  iconVariant   String               @default("featured")
  isActive      Boolean              @default(true)
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt

  favoritedBy   UserFavoriteSchool[]
}

model UserFavoriteSchool {
  id            String                @id @default(cuid())
  userId        String
  googlePlaceId String?
  partnerId     String?
  createdAt     DateTime              @default(now())

  user          User                  @relation(fields: [userId], references: [id], onDelete: Cascade)
  partner       DrivingSchoolPartner? @relation(fields: [partnerId], references: [id], onDelete: SetNull)

  @@unique([userId, googlePlaceId])
  @@unique([userId, partnerId])
}
```
