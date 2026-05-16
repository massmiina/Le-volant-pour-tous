import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis." }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Cet email est déjà utilisé." }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        // On initialise une progression vide
        progress: {
          create: {
            completedModules: "[]",
            quizScores: "{}"
          }
        }
      },
    });

    return NextResponse.json({ message: "Utilisateur créé avec succès", user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json({ message: "Erreur serveur lors de l'inscription." }, { status: 500 });
  }
}
