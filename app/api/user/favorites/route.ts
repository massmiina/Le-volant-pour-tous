import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// GET: Retrieve the list of favorite driving school references for the logged-in user
export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser?.email) {
      return NextResponse.json({ favorites: [] }); // Return empty array if not logged in instead of 401, to simplify guest client states
    }

    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
      select: {
        id: true,
        favoriteSchools: true,
        favoriteSchoolLinks: {
          select: {
            googlePlaceId: true,
            partnerId: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const legacyFavorites = parseLegacyFavorites(user.favoriteSchools);
    const favorites = [
      ...user.favoriteSchoolLinks.map((favorite) => ({
        googlePlaceId: favorite.googlePlaceId ?? undefined,
        partnerId: favorite.partnerId ?? undefined,
      })),
      ...legacyFavorites,
    ];

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("GET Favorites Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Add or remove a favorite driving school reference
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { googlePlaceId, partnerId, action } = await req.json();

    if (!googlePlaceId && !partnerId) {
      return NextResponse.json({ error: "googlePlaceId or partnerId is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "remove") {
      await prisma.userFavoriteSchool.deleteMany({
        where: {
          userId: user.id,
          ...(partnerId ? { partnerId } : { googlePlaceId }),
        },
      });
    } else {
      await prisma.userFavoriteSchool.upsert({
        where: partnerId
          ? {
              userId_partnerId: {
                userId: user.id,
                partnerId,
              },
            }
          : {
              userId_googlePlaceId: {
                userId: user.id,
                googlePlaceId,
              },
            },
        update: {},
        create: {
          userId: user.id,
          googlePlaceId: googlePlaceId || null,
          partnerId: partnerId || null,
        },
      });
    }

    const favorites = await prisma.userFavoriteSchool.findMany({
      where: { userId: user.id },
      select: {
        googlePlaceId: true,
        partnerId: true,
      },
    });

    return NextResponse.json({
      message: "Favoris mis à jour",
      favorites: favorites.map((favorite) => ({
        googlePlaceId: favorite.googlePlaceId ?? undefined,
        partnerId: favorite.partnerId ?? undefined,
      })),
    });
  } catch (error) {
    console.error("POST Favorites Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function parseLegacyFavorites(value: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is string => typeof item === "string")
      .map((googlePlaceId) => ({ googlePlaceId }));
  } catch {
    return [];
  }
}
