import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { score, passed } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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
