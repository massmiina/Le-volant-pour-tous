import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { searchDrivingSchoolsNearby } from "@/lib/driving-schools/googlePlaces";
import { getPartnerSchools, getUserFavoriteRefs } from "@/lib/driving-schools/partners";
import { mergeDrivingSchoolResults } from "@/lib/driving-schools/mergeResults";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  const radiusMeters = Number(searchParams.get("radius") ?? 10000);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "Valid lat and lng parameters are required" }, { status: 400 });
  }

  try {
    const authUserId = await getAuthUserId();
    const [googleResults, partnerResults, favorites] = await Promise.all([
      searchDrivingSchoolsNearby(lat, lng, Number.isFinite(radiusMeters) ? radiusMeters : 10000),
      getPartnerSchools({ lat, lng, radiusMeters: Number.isFinite(radiusMeters) ? radiusMeters : 10000 }),
      getUserFavoriteRefs(authUserId),
    ]);

    return NextResponse.json({
      results: mergeDrivingSchoolResults(googleResults, partnerResults, favorites),
    });
  } catch (error) {
    console.error("Nearby driving school search error:", error);
    return NextResponse.json({ error: "Unable to search nearby driving schools" }, { status: 500 });
  }
}

async function getAuthUserId() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.id;
  } catch {
    return undefined;
  }
}
