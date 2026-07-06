import { NextResponse, type NextRequest } from "next/server";
import { searchDrivingSchoolsNearby } from "@/lib/driving-schools/googlePlaces";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const radiusMeters = Number(searchParams.get("radius") ?? 10000);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "Valid lat and lng parameters are required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "VOTRE_CLE_API_SERVEUR_GOOGLE_ICI") {
    return NextResponse.json(
      { error: "Google Places API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const googleResults = await searchDrivingSchoolsNearby(
      lat,
      lng,
      Number.isFinite(radiusMeters) ? radiusMeters : 10000
    );

    // Format strictly to simple JSON structure as requested
    const formattedResults = googleResults.map((school) => ({
      placeId: school.googlePlaceId ?? school.id,
      name: school.name,
      lat: school.lat,
      lng: school.lng,
      address: school.address,
      rating: school.rating,
      phone: school.phone,
      website: school.website,
      googleMapsUri: school.googleMapsUri,
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Nearby driving school search error:", error);
    return NextResponse.json({ error: "Unable to search nearby driving schools" }, { status: 500 });
  }
}

