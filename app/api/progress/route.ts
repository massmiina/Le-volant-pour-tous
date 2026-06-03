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
    const { moduleId, score, guestScores } = body;

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

    const moduleKeyToIdMap: Record<string, number> = {
      signalisation: 1,
      priorites: 2,
      regles: 3,
      vitesse: 4,
      stationnement: 5,
      autoroute: 6,
      securite: 7,
      alcool: 8,
      mecanique: 9,
      eco_conduite: 10,
      premiers_secours: 11,
      partage_route: 12
    };

    if (guestScores && typeof guestScores === 'object') {
      // Bulk merge guest scores
      Object.entries(guestScores).forEach(([key, val]) => {
        const scoreVal = Number(val);
        const targetModuleKey = key;
        
        let targetModuleId = Number(key);
        if (isNaN(targetModuleId)) {
          targetModuleId = moduleKeyToIdMap[key] || 0;
        }

        const existingScore = quizScores[targetModuleKey] || 0;
        if (scoreVal > existingScore) {
          quizScores[targetModuleKey] = scoreVal;
        }

        if (targetModuleId > 0 && !completedModules.includes(targetModuleId)) {
          completedModules.push(targetModuleId);
        }
      });
    } else {
      // Single score post
      if (moduleId === undefined || score === undefined) {
        return NextResponse.json({ error: "Missing moduleId or score" }, { status: 400 });
      }

      const existingScore = quizScores[moduleId.toString()] || 0;
      if (score > existingScore) {
        quizScores[moduleId.toString()] = score;
      }

      let modIdNum = Number(moduleId);
      if (isNaN(modIdNum)) {
        modIdNum = moduleKeyToIdMap[moduleId.toString()] || 0;
      }

      if (modIdNum > 0 && !completedModules.includes(modIdNum)) {
        completedModules.push(modIdNum);
      }
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
