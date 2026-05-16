import { withAuth } from "next-auth/middleware";

// Le middleware protège automatiquement les routes définies dans le matcher.
// S'il n'y a pas de session valide, l'utilisateur est redirigé vers la page signIn.
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// Définir ici toutes les routes qui nécessitent d'être connecté
export const config = {
  matcher: [
    "/dashboard/:path*", 
    // On ajoutera "/examen/:path*" ou d'autres routes si on veut les protéger strictement
  ],
};
