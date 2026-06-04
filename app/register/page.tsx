"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Rock_Salt } from 'next/font/google';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || t('auth.error_generic'));
      }
    } catch (err) {
      setError(t('auth.error_network'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative z-10"
        style={{ boxShadow: '0 0 40px rgba(16,185,129,0.1)' }}
      >
        {success ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg border border-emerald-500/30">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-emerald-300">Confirmation requise !</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Un email de confirmation a été envoyé à <span className="font-bold text-white">{email}</span>. Veuillez cliquer sur le lien qu'il contient pour confirmer votre inscription et activer votre espace.
            </p>
            <Link 
              href="/login" 
              className="block w-full py-4 px-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold uppercase text-sm tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] text-center hover:from-emerald-300 hover:to-cyan-300"
            >
              Aller à la page de connexion
            </Link>
          </div>
        ) : (
          <>
            <h1 className={`text-4xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 ${rockSalt.className}`}
                style={{ filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.5))' }}>
              {t('auth.register')}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('auth.name')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="Alex"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="pilote@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl font-bold text-black uppercase tracking-wider transition-all duration-300 relative group overflow-hidden bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 disabled:opacity-50"
                style={{ boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}
              >
                {loading 
                  ? t('auth.loading_register') 
                  : t('auth.btn_register')}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              {t('auth.have_account')}{" "}
              <Link href="/login" className="text-emerald-400 hover:text-cyan-400 font-bold transition-colors">
                {t('auth.login')}
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
