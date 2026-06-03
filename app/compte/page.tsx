import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import CompteClient from "./CompteClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Mon Espace Compte | Le Volant Pour Tous',
  description: 'Gérez vos informations de compte et vos statistiques de conduite.',
};

export default async function ComptePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      progress: true,
      examResults: true,
      gameScores: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <CompteClient 
      user={{
        name: user.name || "",
        email: user.email,
        createdAt: user.createdAt.toISOString()
      }}
      progress={user.progress}
      examResultsCount={user.examResults.length}
      gameScoresCount={user.gameScores.length}
    />
  );
}
