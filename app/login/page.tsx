"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Rock_Salt } from 'next/font/google';
import { createClient } from "@/utils/supabase/client";

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Auth methods: "password" or "magic-link"
  const [authMethod, setAuthMethod] = useState<"password" | "magic-link">("password");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (authMethod === "password") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || t('auth.error_credentials'));
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      // Magic Link flow
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        }
      });

      if (otpError) {
        setError(otpError.message || t('auth.error_generic'));
        setLoading(false);
      } else {
        setMagicLinkSent(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative z-10"
        style={{ boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}
      >
        {magicLinkSent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto shadow-lg border border-purple-500/30">
              <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-purple-300">Lien magique envoyé !</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nous avons envoyé un lien de connexion rapide à l&apos;adresse <span className="font-bold text-white">{email}</span>. Cliquez sur ce lien pour vous connecter instantanément.
            </p>
            <button 
              onClick={() => { setMagicLinkSent(false); setEmail(""); }}
              className="block w-full py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold uppercase text-sm tracking-wider transition-all"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <>
            <h1 className={`text-4xl text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 ${rockSalt.className}`}
                style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' }}>
              {t('auth.login')}
            </h1>

            {/* Toggle method */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5 mb-8">
              <button
                type="button"
                onClick={() => { setAuthMethod("password"); setError(""); }}
                className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  authMethod === "password" 
                    ? "bg-violet-600 text-white shadow-md" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Mot de passe
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod("magic-link"); setError(""); }}
                className={`py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  authMethod === "magic-link" 
                    ? "bg-violet-600 text-white shadow-md" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Lien Magique ✉️
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-semibold"
                  placeholder="pilote@email.com"
                />
              </div>

              {authMethod === "password" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('auth.password')}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl font-bold text-black uppercase tracking-wider transition-all duration-300 relative group overflow-hidden bg-gradient-to-r from-violet-400 to-emerald-400 hover:from-violet-300 hover:to-emerald-300 disabled:opacity-50"
                style={{ boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}
              >
                {loading 
                  ? t('auth.loading_login') 
                  : (authMethod === "password" ? t('auth.btn_login') : "M'envoyer le lien magique")}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              {t('auth.no_account')}{" "}
              <Link href="/register" className="text-violet-400 hover:text-emerald-400 font-bold transition-colors">
                {t('auth.register')}
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
