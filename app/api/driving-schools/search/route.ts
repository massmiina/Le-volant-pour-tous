import { NextResponse, type NextRequest } from "next/server";
import { searchDrivingSchoolsByText } from "@/lib/driving-schools/googlePlaces";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  const lat = parseOptionalNumber(searchParams.get("lat"));
  const lng = parseOptionalNumber(searchParams.get("lng"));
  const radiusMeters = parseOptionalNumber(searchParams.get("radius")) ?? 10000;

  if ((lat === undefined) !== (lng === undefined)) {
    return NextResponse.json({ error: "lat and lng must be provided together" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "VOTRE_CLE_API_SERVEUR_GOOGLE_ICI") {
    return NextResponse.json(
      { error: "Google Places API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const googleResults = await searchDrivingSchoolsByText(query, { lat, lng, radiusMeters });

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
    console.error("Driving school search error:", error);
    return NextResponse.json({ error: "Unable to search driving schools" }, { status: 500 });
  }
}

function parseOptionalNumber(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

