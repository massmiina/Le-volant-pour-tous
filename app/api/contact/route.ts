import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Vérifier si l'utilisateur connecté est bien l'administrateur officiel
async function checkAdminAuth(req: NextRequest): Promise<boolean> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    const supabase = createServerClient(
      supabaseUrl!,
      supabaseKey!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll().map((c) => ({ name: c.name, value: c.value }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    return user?.email === "yasmina.dzhv@gmail.com";
  } catch (error) {
    console.error("Admin Auth Check Error:", error);
    return false;
  }
}

// API GET: Permet aux administrateurs de lister les messages de contact
export async function GET(req: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Accès interdit. Réservé à l'administrateur." }, { status: 403 });
    }

    // Récupérer les demandes de contact triées par date décroissante
    const requests = await prisma.contactRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(requests);
  } catch (error: any) {
    console.error("GET Contact API Error:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}

// API POST: Permet aux utilisateurs d'envoyer une demande de contact (publique)
export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        email,
        subject,
        message,
        status: "pending",
      },
    });

    return NextResponse.json(
      { message: "Votre demande de contact a été envoyée avec succès !", data: contactRequest },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Contact API Error:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}

// API PATCH: Permet à l'admin de mettre à jour le statut d'un message
export async function PATCH(req: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
    }

    const updated = await prisma.contactRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH Contact API Error:", error);
    return NextResponse.json({ error: "Échec de la mise à jour." }, { status: 500 });
  }
}

// API DELETE: Permet à l'admin de supprimer un message
export async function DELETE(req: NextRequest) {
  try {
    const isAdmin = await checkAdminAuth(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis." }, { status: 400 });
    }

    await prisma.contactRequest.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Message supprimé avec succès." });
  } catch (error: any) {
    console.error("DELETE Contact API Error:", error);
    return NextResponse.json({ error: "Échec de la suppression." }, { status: 500 });
  }
}
