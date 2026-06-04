import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe requis." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    
    const supabase = createServerClient(
      supabaseUrl!,
      supabaseKey!,
      {
        cookies: {
          getAll() { return [] },
          setAll() {}
        }
      }
    );

    // 1. Sign up on Supabase (triggers verification email)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${req.nextUrl.origin}/api/auth/callback`,
        data: {
          name: name || email.split("@")[0]
        }
      }
    });

    if (authError) {
      console.error("Supabase Auth SignUp Error:", authError);
      return NextResponse.json({ message: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ message: "Échec de l'enregistrement de l'utilisateur." }, { status: 400 });
    }

    // 2. Check if user already exists in Prisma database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Cet email est déjà enregistré." }, { status: 400 });
    }

    // 3. Create profile in database using the exact same ID as Supabase user ID
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        name: name || email.split("@")[0],
        progress: {
          create: {
            completedModules: "[]",
            quizScores: "{}"
          }
        }
      },
    });

    return NextResponse.json({ 
      message: "Utilisateur créé avec succès. Veuillez confirmer votre adresse email pour continuer.", 
      user: { id: user.id, email: user.email } 
    }, { status: 201 });
  } catch (error) {
    console.error("Erreur d'inscription :", error);
    return NextResponse.json({ message: "Erreur serveur lors de l'inscription." }, { status: 500 });
  }
}
