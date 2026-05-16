import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Récupération des données utilisateur complètes
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
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
