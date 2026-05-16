"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Rock_Salt } from 'next/font/google';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(language === 'fr' ? "Email ou mot de passe incorrect." : "Неверный email или пароль.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative z-10"
        style={{ boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}
      >
        <h1 className={`text-4xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 ${rockSalt.className}`}
            style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' }}>
          {language === 'fr' ? 'Connexion' : 'Войти'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {language === 'fr' ? 'Adresse Email' : 'Email адрес'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              placeholder="pilote@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {language === 'fr' ? 'Mot de passe' : 'Пароль'}
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
              ? (language === 'fr' ? 'Chargement...' : 'Загрузка...') 
              : (language === 'fr' ? 'Allumer le moteur' : 'Завести двигатель')}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          {language === 'fr' ? "Pas encore de compte ?" : "Еще нет аккаунта?"}{" "}
          <Link href="/register" className="text-violet-400 hover:text-emerald-400 font-bold transition-colors">
            {language === 'fr' ? "S'inscrire" : "Зарегистрироваться"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
