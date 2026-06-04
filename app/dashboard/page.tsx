import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser?.email) {
    redirect("/login");
  }

  // Récupération des données utilisateur complètes
  const user = await prisma.user.findUnique({
    where: { email: authUser.email },
    include: {
      progress: true,
      examResults: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardClient 
      user={{ name: user.name || "", email: user.email }}
      progress={user.progress}
      examResults={user.examResults}
    />
  );
}
