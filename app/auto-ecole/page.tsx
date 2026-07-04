"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Rock_Salt } from "next/font/google";
import Link from "next/link";

const rockSalt = Rock_Salt({ weight: "400", subsets: ["latin"] });

export default function AutoEcolePage() {
  const { t } = useLanguage();
  const [honkCount, setHonkCount] = useState(0);
  const [isHonking, setIsHonking] = useState(false);

  const handleHonk = () => {
    setIsHonking(true);
    setHonkCount((prev) => prev + 1);
    
    // Essayer de faire vibrer le téléphone (haptique)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    setTimeout(() => {
      setIsHonking(false);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A061E] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl text-center space-y-10 relative z-10">
        
        {/* Animated Icon Container */}
        <div className="relative flex justify-center items-center">
          {/* Radar Waves Animation */}
          <motion.div
            animate={{ scale: [1, 2, 2.5], opacity: [0.6, 0.2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute w-24 h-24 rounded-full border-2 border-emerald-500/40 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.8, 2.2], opacity: [0.4, 0.1, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.7, ease: "easeOut" }}
            className="absolute w-24 h-24 rounded-full border-2 border-violet-500/40 pointer-events-none"
          />

          {/* Drifting Neon Car Animation */}
          <motion.div
            animate={
              isHonking
                ? { y: [0, -25, 0], rotate: [0, -10, 10, 0] }
                : {
                    rotate: [0, 360],
                    x: [0, 15, 0, -15, 0],
                    y: [0, -5, 5, -5, 0],
                  }
            }
            transition={
              isHonking
                ? { duration: 0.4 }
                : {
                    rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                    x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  }
            }
            className="w-28 h-28 bg-white/5 border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)] relative cursor-pointer"
            onClick={handleHonk}
          >
            {/* The Little Car */}
            <span className="text-5xl select-none select-all-none">🚗</span>
            
            {/* Honking cloud bubble */}
            <AnimatePresence>
              {isHonking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: -45 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute bg-violet-600 border border-violet-400 px-3 py-1.5 rounded-2xl text-xs font-black tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.6)] text-white select-none pointer-events-none"
                >
                  BIP-BIP ! 🎺
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Text Details */}
        <div className="space-y-4">
          <h1 className={`${rockSalt.className} text-4xl md:text-5xl font-black tracking-wider text-emerald-400`}>
            SOUS TRAVAUX 🛠️
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-violet-300">
            Une refonte complète de la carte est en route !
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Nous préparons une carte interactive de recherche d'auto-écoles de nouvelle génération, plus fluide, responsive et intégrée avec de superbes fonctionnalités de favoris.
          </p>
        </div>

        {/* Fun button interaction */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52,211,153,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHonk}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0A061E] font-black rounded-2xl shadow-lg transition-all text-sm tracking-widest uppercase"
          >
            Klaxonner la voiture 🎺
          </motion.button>
          
          {honkCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-white/30 font-semibold"
            >
              Vous avez klaxonné {honkCount} fois. {honkCount >= 10 ? "Arrêtez, vous allez réveiller les voisins ! 🤫" : ""}
            </motion.p>
          )}
        </div>

        {/* Back Link */}
        <div>
          <Link
            href="/dashboard"
            className="text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors tracking-wide underline decoration-violet-500/40 underline-offset-8"
          >
            ← Retourner en lieu sûr (Dashboard)
          </Link>
        </div>

      </div>
    </div>
  );
}
