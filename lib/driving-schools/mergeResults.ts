import type { DrivingSchoolSearchResult, FavoriteSchoolRef } from "@/lib/driving-schools/types";

export function mergeDrivingSchoolResults(
  googleResults: DrivingSchoolSearchResult[],
  partnerResults: DrivingSchoolSearchResult[],
  favorites: FavoriteSchoolRef[] = [],
) {
  const partnersByGooglePlaceId = new Map(
    partnerResults
      .filter((partner) => partner.googlePlaceId)
      .map((partner) => [partner.googlePlaceId as string, partner]),
  );
  const merged = new Map<string, DrivingSchoolSearchResult>();

  for (const googleResult of googleResults) {
    const partner = googleResult.googlePlaceId
      ? partnersByGooglePlaceId.get(googleResult.googlePlaceId)
      : undefined;

    const result = partner
      ? {
          ...googleResult,
          source: "partner" as const,
          partnerId: partner.partnerId,
          isFeatured: true,
          featuredLabel: partner.featuredLabel,
          iconVariant: "featured" as const,
        }
      : googleResult;

    merged.set(result.googlePlaceId ?? result.id, withFavoriteState(result, favorites));
  }

  for (const partner of partnerResults) {
    const key = partner.googlePlaceId ?? partner.partnerId ?? partner.id;
    if (!merged.has(key)) {
      merged.set(key, withFavoriteState(partner, favorites));
    }
  }

  return [...merged.values()].sort(sortDrivingSchools);
}

function withFavoriteState(result: DrivingSchoolSearchResult, favorites: FavoriteSchoolRef[]) {
  return {
    ...result,
    isUserFavorite: favorites.some((favorite) => {
      if (favorite.partnerId && result.partnerId) return favorite.partnerId === result.partnerId;
      if (favorite.googlePlaceId && result.googlePlaceId) {
        return favorite.googlePlaceId === result.googlePlaceId;
      }
      return false;
    }),
  };
}

function sortDrivingSchools(a: DrivingSchoolSearchResult, b: DrivingSchoolSearchResult) {
  if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;

  if (a.distanceMeters !== undefined && b.distanceMeters !== undefined) {
    return a.distanceMeters - b.distanceMeters;
  }

  if (a.distanceMeters !== undefined) return -1;
  if (b.distanceMeters !== undefined) return 1;

  return 0;
}
