export type DrivingSchoolSource = "google" | "partner";

export type DrivingSchoolIconVariant = "standard" | "featured" | "selected";

export interface DrivingSchoolSearchResult {
  id: string;
  source: DrivingSchoolSource;
  googlePlaceId?: string;
  partnerId?: string;
  name: string;
  address: string;
  city?: string;
  lat: number;
  lng: number;
  rating?: number;
  reviews?: number;
  phone?: string;
  website?: string;
  googleMapsUri?: string;
  distanceMeters?: number;
  isFeatured: boolean;
  featuredLabel?: string;
  iconVariant: DrivingSchoolIconVariant;
  isUserFavorite?: boolean;
}

export interface FavoriteSchoolRef {
  googlePlaceId?: string;
  partnerId?: string;
}

export interface SearchOptions {
  lat?: number;
  lng?: number;
  radiusMeters?: number;
  languageCode?: string;
}
