import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlaceDetails } from "@/lib/driving-schools/googlePlaces";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get("placeId")?.trim();

  if (!placeId) {
    return NextResponse.json({ error: "Missing placeId parameter" }, { status: 400 });
  }

  try {
    const [details, partner] = await Promise.all([
      getPlaceDetails(placeId),
      prisma.drivingSchoolPartner.findUnique({
        where: { googlePlaceId: placeId },
      }),
    ]);

    return NextResponse.json({
      school: partner
        ? {
            ...details,
            source: "partner",
            partnerId: partner.id,
            isFeatured: true,
            featuredLabel: partner.featuredLabel ?? "Recommandée par Le Volant Pour Tous",
            iconVariant: "featured",
          }
        : details,
    });
  } catch (error) {
    console.error("Driving school details error:", error);
    return NextResponse.json({ error: "Unable to load driving school details" }, { status: 500 });
  }
}
