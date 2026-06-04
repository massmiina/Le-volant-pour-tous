import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// GET: Retrieve the list of favorite driving school IDs for the logged-in user
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
      select: { favoriteSchools: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const favorites = user.favoriteSchools ? JSON.parse(user.favoriteSchools) : [];
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("GET Favorites Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Save the updated list of favorite driving school IDs
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { favorites } = await req.json();

    if (!Array.isArray(favorites)) {
      return NextResponse.json({ error: "Invalid data format: favorites must be an array" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: authUser.email },
      data: {
        favoriteSchools: JSON.stringify(favorites)
      }
    });

    return NextResponse.json({ 
      message: "Favoris mis à jour", 
      favorites: updatedUser.favoriteSchools ? JSON.parse(updatedUser.favoriteSchools) : [] 
    });
  } catch (error) {
    console.error("POST Favorites Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
