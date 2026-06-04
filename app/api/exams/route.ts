import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { score, passed } = body;

    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    // Sauvegarde en base de données
    const result = await prisma.examResult.create({
      data: {
        userId: user.id,
        score,
        passed,
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Erreur API exams:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
