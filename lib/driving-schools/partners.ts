import "server-only";

import { prisma } from "@/lib/prisma";
import { getDistanceMeters } from "@/lib/driving-schools/geo";
import type { DrivingSchoolSearchResult, FavoriteSchoolRef } from "@/lib/driving-schools/types";

interface PartnerLookupOptions {
  lat?: number;
  lng?: number;
  radiusMeters?: number;
  city?: string;
}

export async function getPartnerSchools(options: PartnerLookupOptions = {}) {
  const partners = await prisma.drivingSchoolPartner.findMany({
    where: {
      isActive: true,
      ...(options.city ? { city: { contains: options.city, mode: "insensitive" } } : {}),
    },
  });

  return partners
    .map((partner) => {
      const distanceMeters =
        options.lat !== undefined && options.lng !== undefined
          ? getDistanceMeters(options.lat, options.lng, partner.latitude, partner.longitude)
          : undefined;

      if (
        distanceMeters !== undefined &&
        options.radiusMeters !== undefined &&
        distanceMeters > options.radiusMeters
      ) {
        return null;
      }

      const result: DrivingSchoolSearchResult = {
        id: partner.googlePlaceId ?? partner.id,
        source: "partner",
        googlePlaceId: partner.googlePlaceId ?? undefined,
        partnerId: partner.id,
        name: partner.name,
        address: partner.address ?? "",
        city: partner.city ?? undefined,
        lat: partner.latitude,
        lng: partner.longitude,
        phone: partner.phone ?? undefined,
        website: partner.website ?? undefined,
        distanceMeters,
        isFeatured: true,
        featuredLabel: partner.featuredLabel ?? "Recommandée par Le Volant Pour Tous",
        iconVariant: "featured",
      };

      return result;
    })
    .filter((partner): partner is DrivingSchoolSearchResult => partner !== null);
}

export async function getUserFavoriteRefs(userId?: string): Promise<FavoriteSchoolRef[]> {
  if (!userId) return [];

  const favorites = await prisma.userFavoriteSchool.findMany({
    where: { userId },
    select: {
      googlePlaceId: true,
      partnerId: true,
    },
  });

  return favorites.map((favorite) => ({
    googlePlaceId: favorite.googlePlaceId ?? undefined,
    partnerId: favorite.partnerId ?? undefined,
  }));
}
