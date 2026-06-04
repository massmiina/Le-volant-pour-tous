import { prisma } from "@/lib/prisma";
import CompteClient from "./CompteClient";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Mon Espace Compte | Le Volant Pour Tous',
  description: 'Gérez vos informations de compte et vos statistiques de conduite.',
};

export default async function ComptePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: authUser.email },
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
