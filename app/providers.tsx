"use client";

import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function ProgressSync() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && typeof window !== "undefined") {
      const localScores = localStorage.getItem("guest_quiz_scores");
      if (localScores) {
        try {
          const parsed = JSON.parse(localScores);
          if (Object.keys(parsed).length > 0) {
            fetch("/api/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ guestScores: parsed }),
            })
              .then((res) => {
                if (res.ok) {
                  localStorage.removeItem("guest_quiz_scores");
                  console.log("Guest progress successfully migrated to database.");
                }
              })
              .catch((err) => console.error("Error migrating guest progress:", err));
          } else {
            localStorage.removeItem("guest_quiz_scores");
          }
        } catch (e) {
          console.error("Failed to parse guest scores:", e);
        }
      }
    }
  }, [user]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProgressSync />
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
}
