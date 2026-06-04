import "server-only";

import { getDistanceMeters } from "@/lib/driving-schools/geo";
import type { DrivingSchoolSearchResult, SearchOptions } from "@/lib/driving-schools/types";

const TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const PLACE_DETAILS_URL = "https://places.googleapis.com/v1/places";
const DEFAULT_RADIUS_METERS = 10000;
const LIST_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.googleMapsUri",
].join(",");
const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "location",
  "rating",
  "userRatingCount",
  "internationalPhoneNumber",
  "websiteUri",
  "googleMapsUri",
].join(",");

interface GooglePlacesTextResponse {
  places?: GooglePlace[];
}

interface GoogleDisplayName {
  text?: string;
}

interface GoogleLocation {
  latitude?: number;
  longitude?: number;
}

interface GooglePlace {
  id?: string;
  displayName?: GoogleDisplayName;
  formattedAddress?: string;
  location?: GoogleLocation;
  rating?: number;
  userRatingCount?: number;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
}

export async function searchDrivingSchoolsByText(query: string, options: SearchOptions = {}) {
  const normalizedQuery = normalizeDrivingSchoolQuery(query);
  const body: Record<string, unknown> = {
    textQuery: normalizedQuery,
    languageCode: options.languageCode ?? "fr",
  };

  if (options.lat !== undefined && options.lng !== undefined) {
    body.locationBias = {
      circle: {
        center: {
          latitude: options.lat,
          longitude: options.lng,
        },
        radius: options.radiusMeters ?? DEFAULT_RADIUS_METERS,
      },
    };
  }

  const data = await callGooglePlaces<GooglePlacesTextResponse>(TEXT_SEARCH_URL, {
    method: "POST",
    fieldMask: LIST_FIELD_MASK,
    body,
  });

  return normalizeGooglePlaces(data.places ?? [], options);
}

export async function searchDrivingSchoolsNearby(lat: number, lng: number, radiusMeters = DEFAULT_RADIUS_METERS) {
  return searchDrivingSchoolsByText("auto-école", {
    lat,
    lng,
    radiusMeters,
    languageCode: "fr",
  });
}

export async function getPlaceDetails(placeId: string) {
  const place = await callGooglePlaces<GooglePlace>(
    `${PLACE_DETAILS_URL}/${encodeURIComponent(placeId)}`,
    {
      method: "GET",
      fieldMask: DETAILS_FIELD_MASK,
    },
  );

  const normalized = normalizeGooglePlace(place);

  if (!normalized) {
    throw new Error(`Google Places details response is missing required fields for ${placeId}`);
  }

  return normalized;
}

function normalizeDrivingSchoolQuery(query: string) {
  const trimmed = query.trim();
  if (/auto[-\s]?école/i.test(trimmed) || /auto[-\s]?ecole/i.test(trimmed)) {
    return trimmed;
  }

  return `auto-école ${trimmed}`;
}

function normalizeGooglePlaces(places: GooglePlace[], options: SearchOptions) {
  return places
    .map((place) => normalizeGooglePlace(place, options))
    .filter((place): place is DrivingSchoolSearchResult => place !== null);
}

function normalizeGooglePlace(place: GooglePlace, options: SearchOptions = {}): DrivingSchoolSearchResult | null {
  const lat = place.location?.latitude;
  const lng = place.location?.longitude;
  const googlePlaceId = place.id;

  if (!googlePlaceId || lat === undefined || lng === undefined) {
    return null;
  }

  return {
    id: googlePlaceId,
    source: "google",
    googlePlaceId,
    name: place.displayName?.text ?? "Auto-école",
    address: place.formattedAddress ?? "",
    lat,
    lng,
    rating: place.rating,
    reviews: place.userRatingCount,
    phone: place.internationalPhoneNumber,
    website: place.websiteUri,
    googleMapsUri: place.googleMapsUri,
    distanceMeters:
      options.lat !== undefined && options.lng !== undefined
        ? getDistanceMeters(options.lat, options.lng, lat, lng)
        : undefined,
    isFeatured: false,
    iconVariant: "standard",
  };
}

async function callGooglePlaces<T>(
  url: string,
  options: {
    method: "GET" | "POST";
    fieldMask: string;
    body?: Record<string, unknown>;
  },
) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is missing");
  }

  const response = await fetch(url, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": options.fieldMask,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Places request failed with ${response.status}: ${errorText}`);
  }

  return (await response.json()) as T;
}
