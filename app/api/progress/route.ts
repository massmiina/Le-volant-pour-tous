import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { progress: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.progress || { quizScores: "{}", completedModules: "[]" });
  } catch (error) {
    console.error("GET Progress Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { moduleId, score } = body;

    if (moduleId === undefined || score === undefined) {
      return NextResponse.json({ error: "Missing moduleId or score" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { progress: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let quizScores: Record<string, number> = {};
    let completedModules: number[] = [];

    if (user.progress) {
      try { quizScores = JSON.parse(user.progress.quizScores); } catch (e) {}
      try { completedModules = JSON.parse(user.progress.completedModules); } catch (e) {}
    }

    // Garder le score le plus élevé
    const existingScore = quizScores[moduleId.toString()] || 0;
    if (score > existingScore) {
      quizScores[moduleId.toString()] = score;
    }

    // Ajouter aux modules complétés si pas déjà présent
    const modIdNum = Number(moduleId);
    if (!completedModules.includes(modIdNum)) {
      completedModules.push(modIdNum);
    }

    const updatedProgress = await prisma.progress.upsert({
      where: { userId: user.id },
      update: {
        quizScores: JSON.stringify(quizScores),
        completedModules: JSON.stringify(completedModules),
      },
      create: {
        userId: user.id,
        quizScores: JSON.stringify(quizScores),
        completedModules: JSON.stringify(completedModules),
      }
    });

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error("POST Progress Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
