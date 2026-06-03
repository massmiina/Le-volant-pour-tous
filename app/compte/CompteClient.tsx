"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Rock_Salt } from "next/font/google";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  User, Mail, Calendar, Key, RefreshCw, Trash2, 
  ArrowLeft, Award, Zap, BookOpen, CheckCircle, ShieldAlert 
} from "lucide-react";
import Link from "next/link";

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

interface CompteClientProps {
  user: {
    name: string;
    email: string;
    createdAt: string;
  };
  progress: any;
  examResultsCount: number;
  gameScoresCount: number;
}

export default function CompteClient({ user, progress, examResultsCount, gameScoresCount }: CompteClientProps) {
  const { t } = useLanguage();

  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Dialog states
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Parse statistics
  const completedModules = progress?.completedModules 
    ? JSON.parse(progress.completedModules).length 
    : 0;

  const quizScores = progress?.quizScores 
    ? JSON.parse(progress.quizScores) 
    : {};
  const totalQuizzes = Object.keys(quizScores).length;

  const avgQuizScore = totalQuizzes > 0
    ? Math.round(Object.values(quizScores).reduce((acc: number, curr: any) => acc + Number(curr), 0) / totalQuizzes * 10) / 10
    : 0;

  // Format date
  const memberDate = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          currentPassword: newPassword ? currentPassword : undefined,
          newPassword: newPassword || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t('account.error_generic'));
      }

      setMessage({ type: "success", text: t('account.success_update') });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || t('account.error_generic') });
    } finally {
      setLoading(false);
    }
  };

  const handleResetStats = async () => {
    setLoading(true);
    setMessage(null);
    setShowResetConfirm(false);

    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" })
      });

      if (!res.ok) {
        throw new Error(t('account.error_generic'));
      }

      setMessage({ type: "success", text: t('account.success_reset') });
      // Reload page to clear local states and show empty graphs
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || t('account.error_generic') });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setMessage(null);
    setShowDeleteConfirm(false);

    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete" })
      });

      if (!res.ok) {
        throw new Error(t('account.error_generic'));
      }

      // Sign out and redirect to home
      signOut({ callbackUrl: "/" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || t('account.error_generic') });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black text-white py-10 px-4 relative overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        .neon-title-account {
          background: linear-gradient(90deg, #8b5cf6 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(139,92,246,0.6)) drop-shadow(0 0 25px rgba(16,185,129,0.4));
        }
        .account-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
      `}} />

      {/* Cyberpunk background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,50,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,10,50,0.3)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-violet-300/70 hover:text-emerald-400 transition-colors gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('exam.dashboard_btn')}
          </Link>
          
          <div className="text-right">
            <h1 className={`text-4xl md:text-5xl font-black ${rockSalt.className} neon-title-account mb-2`} style={{ letterSpacing: '-0.08em' }}>
              {t('account.title')}
            </h1>
            <p className="text-gray-400 font-medium">
              {t('account.subtitle')}
            </p>
          </div>
        </header>

        {/* Status Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                message.type === "success" 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" 
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-bold">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Info, Stats & Overview */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Profile Summary Card */}
            <div className="account-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-2xl"></div>
              
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-500 to-emerald-500 text-white flex items-center justify-center font-bold text-3xl shadow-xl shadow-violet-500/10">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
                  <p className="text-violet-300/60 font-semibold text-sm flex items-center justify-center gap-1.5 mt-1">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 w-full flex items-center justify-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {t('account.member_since')} : {memberDate}
                </div>
              </div>
            </div>

            {/* Statistics Summary Card */}
            <div className="account-card rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Award className="w-5 h-5" />
                {t('account.profile_info')}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Modules Completed */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-500 font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                    Modules
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{completedModules}</span>
                    <span className="text-gray-600 text-sm">/ 12</span>
                  </div>
                </div>

                {/* Avg Quiz Score */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-500 font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Moyenne Quiz
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{avgQuizScore}</span>
                    <span className="text-gray-600 text-sm">/ 5</span>
                  </div>
                </div>

                {/* Exam Results Count */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-500 font-extrabold uppercase tracking-wider mb-2">Examens Blancs</span>
                  <span className="text-3xl font-black">{examResultsCount}</span>
                </div>

                {/* Mini Game Highscores Count */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-xs text-gray-500 font-extrabold uppercase tracking-wider mb-2">Parties d'Arcade</span>
                  <span className="text-3xl font-black">{gameScoresCount}</span>
                </div>

              </div>
            </div>

          </div>

          {/* Column 2 & 3: Settings Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Profile Modification Form */}
            <div className="account-card rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                <Key className="w-5 h-5 text-violet-400" />
                Paramètres de Sécurité
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                
                {/* Username */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                    {t('account.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-semibold"
                  />
                </div>

                {/* Divider for Password updates */}
                <div className="border-t border-white/5 pt-6 space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-wider text-violet-300">
                    {t('account.change_password')}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Laissez les champs vides si vous ne souhaitez pas modifier votre mot de passe.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* New Password */}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                        {t('account.new_password')}
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                        Confirmation
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Current Password - required only if new password specified */}
                  {newPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                        {t('account.current_password')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required={!!newPassword}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(139,92,246,0.3)] text-sm disabled:opacity-50"
                  >
                    {loading ? t('account.loading') : t('account.btn_save')}
                  </motion.button>
                </div>

              </form>
            </div>

            {/* Danger Zone Card */}
            <div className="border border-red-500/30 bg-red-950/5 rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-xl font-black text-red-400 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5" />
                {t('account.danger_zone')}
              </h3>

              <div className="space-y-6 divide-y divide-red-500/10">
                
                {/* Reset Progress Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                  <div className="max-w-md">
                    <h4 className="font-bold text-red-200 text-base">{t('account.reset_stats_title')}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t('account.reset_stats_desc')}</p>
                  </div>
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-5 py-2.5 bg-red-950/40 hover:bg-red-900/30 border border-red-500/30 text-red-200 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {t('account.reset_stats_btn')}
                  </button>
                </div>

                {/* Delete Account Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6">
                  <div className="max-w-md">
                    <h4 className="font-bold text-red-200 text-base">{t('account.delete_account_title')}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t('account.delete_account_desc')}</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-black rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t('account.delete_account_btn')}
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal for Reset stats */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-amber-400">
                <ShieldAlert className="w-8 h-8 flex-shrink-0" />
                <h3 className="text-xl font-black uppercase tracking-tight">Confirmation</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t('account.confirm_reset')}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleResetStats}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-black transition-all"
                >
                  Réinitialiser
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Delete account */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-500">
                <Trash2 className="w-8 h-8 flex-shrink-0" />
                <h3 className="text-xl font-black uppercase tracking-tight">Danger !</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-semibold">
                {t('account.confirm_delete')}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-black transition-all"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
