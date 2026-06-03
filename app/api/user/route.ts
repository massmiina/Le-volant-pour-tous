import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// PUT: Update profile name and/or password
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, currentPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: any = {};

    if (name) {
      updateData.name = name;
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Mot de passe actuel requis pour changer de mot de passe." }, { status: 400 });
      }

      // Check current password valid
      if (user.password) {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 400 });
        }
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedNewPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData
    });

    return NextResponse.json({ message: "Profil mis à jour avec succès", user: { name: updatedUser.name, email: updatedUser.email } });
  } catch (error) {
    console.error("PUT User Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Delete account or reset stats
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json(); // "delete" or "reset"

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "reset") {
      // Reset progress, exam results, and game scores
      await prisma.$transaction([
        prisma.progress.upsert({
          where: { userId: user.id },
          update: { completedModules: "[]", quizScores: "{}" },
          create: { userId: user.id, completedModules: "[]", quizScores: "{}" }
        }),
        prisma.examResult.deleteMany({ where: { userId: user.id } }),
        prisma.gameScore.deleteMany({ where: { userId: user.id } })
      ]);
      return NextResponse.json({ message: "Statistiques réinitialisées avec succès" });
    } else if (action === "delete") {
      // Permanently delete user
      await prisma.user.delete({
        where: { email: session.user.email }
      });
      return NextResponse.json({ message: "Compte supprimé avec succès" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("DELETE User Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
