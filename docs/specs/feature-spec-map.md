# Spécifications Fonctionnelles : Carte des Auto-écoles (`/auto-ecole`)

## 1. Objectifs de la fonctionnalité
- Permettre à l'élève de rechercher des auto-écoles réelles par ville, adresse ou position actuelle.
- Afficher les auto-écoles sur une carte avec une expérience proche de Google Maps : résultats visibles, marqueurs, fiche détaillée et itinéraire.
- Mettre en avant les auto-écoles sélectionnées par Le Volant Pour Tous lorsqu'elles existent dans la zone recherchée.
- Permettre à l'utilisateur connecté d'enregistrer ses propres auto-écoles favorites pour les retrouver plus tard depuis son tableau de bord.

## 2. Définitions importantes
- **Auto-écoles externes** : résultats publics récupérés depuis Google Places. Elles représentent les auto-écoles disponibles autour d'une ville ou d'une position.
- **Auto-écoles recommandées / partenaires** : auto-écoles choisies par Le Volant Pour Tous et stockées dans Supabase. Elles doivent apparaître avant les résultats ordinaires et utiliser une icône distincte.
- **Favoris utilisateur** : auto-écoles sauvegardées par un utilisateur connecté. Ce n'est pas la même chose qu'une auto-école recommandée par la plateforme.

## 3. Interface Utilisateur (UI) & Expérience (UX)
Le design reste intégré au thème sombre et rétro-néon du produit, mais la carte doit d'abord être utile et fiable.

- **Recherche** :
  - Champ de recherche permettant de saisir une ville, une adresse ou un texte du type "auto-école Paris".
  - Bouton "Me géolocaliser" utilisant la position du navigateur.
  - État de chargement visible pendant les appels réseau.
  - Message clair si aucun résultat n'est trouvé.
- **Carte interactive** :
  - Affiche les auto-écoles retournées par l'API de recherche.
  - Recentre automatiquement la carte sur la zone recherchée ou sur la position utilisateur.
  - Affiche la position utilisateur si la géolocalisation est active.
  - Met à jour les résultats lorsque l'utilisateur relance une recherche ou active la géolocalisation.
- **Marqueurs** :
  - Marqueur standard pour une auto-école externe.
  - Marqueur distinct et plus visible pour une auto-école recommandée / partenaire.
  - État sélectionné lorsqu'une fiche est ouverte.
- **Liste de résultats** :
  - Les auto-écoles recommandées / partenaires apparaissent en premier.
  - Les résultats ordinaires suivent, triés par pertinence ou distance selon le mode de recherche.
  - Chaque carte affiche au minimum : nom, adresse, distance si disponible, note si disponible, statut recommandé/partenaire si applicable.
- **Fiche détaillée** :
  - Ouvre au clic sur un marqueur ou une carte de résultat.
  - Contient : nom, adresse, distance, note, téléphone/site web si disponibles, label partenaire/recommandé si applicable.
  - Propose un bouton d'itinéraire vers Google Maps.

## 4. Règles de Gestion (Business Logic)
- **Source des résultats ordinaires** :
  - Les auto-écoles ordinaires ne doivent pas être codées en dur dans le frontend.
  - Elles sont récupérées via une API backend qui interroge Google Places.
- **Source des résultats recommandés** :
  - Les auto-écoles recommandées / partenaires sont stockées dans Supabase.
  - Chaque partenaire doit idéalement avoir un `googlePlaceId` pour être rapproché proprement d'un résultat Google Places.
  - Si `googlePlaceId` est absent, un rapprochement secondaire peut utiliser nom normalisé + adresse + coordonnées, mais cela reste moins fiable.
- **Fusion des résultats** :
  - Le backend interroge Google Places pour obtenir les auto-écoles dans la zone.
  - Le backend interroge Supabase pour récupérer les partenaires présents dans la même zone.
  - Les deux sources sont fusionnées avant d'être renvoyées au frontend.
  - Si un résultat Google correspond à un partenaire Supabase, le résultat final doit contenir `isFeatured: true` et les métadonnées internes du partenaire.
- **Ordre d'affichage** :
  - Priorité 1 : auto-écoles recommandées / partenaires dans la zone.
  - Priorité 2 : auto-écoles ordinaires, triées par distance si l'utilisateur est géolocalisé, sinon par pertinence Google Places.
- **Favoris utilisateur** :
  - Un utilisateur connecté peut sauvegarder une auto-école dans ses favoris.
  - Un visiteur non connecté qui clique sur "Favori" voit une invitation à se connecter ou à créer un compte.
  - Les favoris utilisateur doivent être stockés séparément des auto-écoles recommandées par la plateforme.
- **Contraintes Google Places** :
  - Les résultats doivent venir de l'API officielle Google Places, pas d'un scraping de Google Maps.
  - Si les résultats Google Places sont affichés sur une carte, la carte doit être une carte Google Maps, avec l'attribution attendue.
  - Les données Google Places ne doivent pas être considérées comme une base de données permanente. Le `place_id` peut être conservé durablement; les autres champs doivent être rafraîchis selon les règles Google.

## 5. Architecture Technique & Data

### 5.1 Frontend
- Remplacer la liste statique `mockAutoEcoles` par des appels à l'API interne.
- Utiliser une carte Google Maps si les résultats viennent de Google Places.
- Le frontend ne doit pas appeler directement Google Places avec une clé secrète.
- Le frontend reçoit des objets déjà normalisés :

```ts
type DrivingSchoolSearchResult = {
  id: string;
  source: "google" | "partner";
  googlePlaceId?: string;
  name: string;
  address: string;
  city?: string;
  lat: number;
  lng: number;
  rating?: number;
  reviews?: number;
  phone?: string;
  website?: string;
  distanceMeters?: number;
  isFeatured: boolean;
  featuredLabel?: string;
  iconVariant: "standard" | "featured" | "selected";
  isUserFavorite?: boolean;
};
```

### 5.2 Backend API Next.js
- `GET /api/driving-schools/search?query=Paris`
  - Recherche textuelle par ville/adresse.
  - Appelle Google Places Text Search côté serveur.
  - Fusionne les résultats avec les partenaires Supabase.
- `GET /api/driving-schools/nearby?lat=48.8566&lng=2.3522&radius=10000`
  - Recherche par géolocalisation.
  - Appelle Google Places Nearby Search côté serveur.
  - Fusionne les résultats avec les partenaires Supabase présents dans le rayon.
- `GET /api/user/favorites`
  - Récupère les favoris de l'utilisateur connecté.
- `POST /api/user/favorites`
  - Met à jour les favoris de l'utilisateur connecté.

### 5.3 Modèle de données Supabase / Prisma
Le modèle doit distinguer les partenaires de la plateforme et les favoris personnels des utilisateurs.

```prisma
model User {
  // ... champs existants ...
  favoriteSchools UserFavoriteSchool[]
}

model DrivingSchoolPartner {
  id             String   @id @default(cuid())
  googlePlaceId  String?  @unique
  name           String
  address        String?
  city           String?
  latitude       Float
  longitude      Float
  phone          String?
  website        String?
  featuredLabel  String?
  iconVariant    String   @default("featured")
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  favoritedBy    UserFavoriteSchool[]
}

model UserFavoriteSchool {
  id             String   @id @default(cuid())
  userId         String
  googlePlaceId  String?
  partnerId      String?
  createdAt      DateTime @default(now())

  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  partner        DrivingSchoolPartner? @relation(fields: [partnerId], references: [id], onDelete: SetNull)

  @@unique([userId, googlePlaceId])
  @@unique([userId, partnerId])
}
```

Si le volume de partenaires augmente, activer PostGIS dans Supabase pour rechercher rapidement les partenaires dans un rayon ou dans les limites visibles de la carte.

## 6. Critères d'acceptation
- Il n'existe plus de liste d'auto-écoles codée en dur comme source principale des résultats.
- Une recherche par ville affiche des auto-écoles réelles issues de Google Places.
- Une géolocalisation affiche les auto-écoles autour de la position utilisateur.
- Une auto-école partenaire présente dans la zone est affichée avant les autres et avec une icône différente.
- Les favoris utilisateur fonctionnent sans être confondus avec les partenaires recommandés.
- Les clés API sensibles restent côté serveur ou sont limitées/restrictées selon leur usage.
- Le comportement respecte les contraintes d'affichage et d'attribution de Google Maps Platform.
