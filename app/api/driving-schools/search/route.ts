import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { searchDrivingSchoolsByText } from "@/lib/driving-schools/googlePlaces";
import { getPartnerSchools, getUserFavoriteRefs } from "@/lib/driving-schools/partners";
import { mergeDrivingSchoolResults } from "@/lib/driving-schools/mergeResults";

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

  try {
    const authUserId = await getAuthUserId();
    const [googleResults, partnerResults, favorites] = await Promise.all([
      searchDrivingSchoolsByText(query, { lat, lng, radiusMeters }),
      getPartnerSchools({ lat, lng, radiusMeters, city: lat === undefined ? normalizeCityQuery(query) : undefined }),
      getUserFavoriteRefs(authUserId),
    ]);

    return NextResponse.json({
      results: mergeDrivingSchoolResults(googleResults, partnerResults, favorites),
    });
  } catch (error) {
    console.error("Driving school search error:", error);
    return NextResponse.json({ error: "Unable to search driving schools" }, { status: 500 });
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

function parseOptionalNumber(value: string | null) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeCityQuery(query: string) {
  return query
    .replace(/auto[-\s]?école/gi, "")
    .replace(/auto[-\s]?ecole/gi, "")
    .trim();
}
