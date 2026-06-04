import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// PUT: Update profile name and/or password
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: authUser.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Update password or name in Supabase Auth if provided
    if (newPassword || name) {
      const updateData: any = {};
      if (newPassword) updateData.password = newPassword;
      if (name) updateData.data = { name };

      const { error: updateError } = await supabase.auth.updateUser(updateData);
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 400 });
      }
    }

    // 2. Also update display name in Prisma
    const updatedUser = await prisma.user.update({
      where: { email: authUser.email },
      data: {
        name: name || undefined
      }
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
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json(); // "delete" or "reset"

    const user = await prisma.user.findUnique({
      where: { email: authUser.email }
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
      // Permanently delete user from Prisma
      await prisma.user.delete({
        where: { email: authUser.email }
      });

      // Optionally delete from Supabase Auth if service role key is configured
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        try {
          const { createClient: createAdminClient } = require("@supabase/supabase-js");
          const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          );
          await supabaseAdmin.auth.admin.deleteUser(user.id);
        } catch (adminErr) {
          console.error("Failed to delete user from Supabase Auth admin:", adminErr);
        }
      }

      return NextResponse.json({ message: "Compte supprimé avec succès" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("DELETE User Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
