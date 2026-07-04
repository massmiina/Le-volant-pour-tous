"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rock_Salt } from "next/font/google";
import Link from "next/link";

const rockSalt = Rock_Salt({ weight: "400", subsets: ["latin"] });

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "resolved";
  createdAt: string;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [messages, setMessages] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "read" | "resolved">("all");

  useEffect(() => {
    // Si l'utilisateur n'est plus en cours de chargement et n'est pas connecté, redirect
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      fetchMessages();
    }
  }, [user, authLoading]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        setError("Impossible de charger les messages.");
      }
    } catch (err) {
      setError("Erreur réseau lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setMessages(prev =>
          prev.map(msg => (msg.id === id ? { ...msg, status: status as any } : msg))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;

    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === "all") return true;
    return msg.status === filter;
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A061E] flex items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A061E] text-white py-12 px-6 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className={`${rockSalt.className} text-3xl font-black tracking-wider text-violet-400`}>
              PANEL ADMIN
            </h1>
            <p className="text-white/40 mt-2 text-sm tracking-wide">
              Gestion des messages et demandes de contact utilisateur.
            </p>
          </div>
          <Link href="/dashboard" className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm font-semibold tracking-wide self-start">
            ← Dashboard Éléve
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center shadow-lg">
            <h3 className="text-sm font-semibold text-white/30 uppercase tracking-widest">Total</h3>
            <p className="text-3xl font-bold mt-2 text-white">{messages.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center shadow-lg border-l-amber-500/50">
            <h3 className="text-sm font-semibold text-white/30 uppercase tracking-widest text-amber-400">En attente</h3>
            <p className="text-3xl font-bold mt-2 text-amber-400">
              {messages.filter(m => m.status === "pending").length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center shadow-lg border-l-blue-500/50">
            <h3 className="text-sm font-semibold text-white/30 uppercase tracking-widest text-blue-400">Lus</h3>
            <p className="text-3xl font-bold mt-2 text-blue-400">
              {messages.filter(m => m.status === "read").length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center shadow-lg border-l-emerald-500/50">
            <h3 className="text-sm font-semibold text-white/30 uppercase tracking-widest text-emerald-400">Résolus</h3>
            <p className="text-3xl font-bold mt-2 text-emerald-400">
              {messages.filter(m => m.status === "resolved").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {(["all", "pending", "read", "resolved"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                filter === tab
                  ? "bg-violet-600 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-white/5 border-white/10 text-white/55 hover:bg-white/10"
              }`}
            >
              {tab === "all" ? "Tous" : tab === "pending" ? "En attente" : tab === "read" ? "Lu" : "Résolu"}
            </button>
          ))}
        </div>

        {/* Messages List */}
        {error && <div className="p-4 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-2xl">{error}</div>}

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredMessages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white/5 border border-white/10 rounded-[2.5rem]"
              >
                <p className="text-lg text-white/40">Aucun message trouvé.</p>
              </motion.div>
            ) : (
              filteredMessages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start transition-all hover:bg-white/10"
                >
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-semibold tracking-wide text-violet-400 bg-violet-500/10 px-3 py-1 rounded-lg">
                        {msg.subject}
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        msg.status === "pending"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : msg.status === "read"
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      }`}>
                        {msg.status === "pending" ? "En attente" : msg.status === "read" ? "Lu" : "Résolu"}
                      </span>
                      <span className="text-xs text-white/30 ml-auto md:ml-0">
                        {new Date(msg.createdAt).toLocaleString("fr-FR")}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg font-bold text-white/90">{msg.name}</p>
                      <a href={`mailto:${msg.email}`} className="text-sm text-violet-300/80 hover:underline block">
                        📩 {msg.email}
                      </a>
                    </div>

                    <p className="text-white/70 text-sm whitespace-pre-wrap leading-relaxed pt-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex md:flex-col gap-2 w-full md:w-auto pt-4 md:pt-0 border-t border-white/10 md:border-t-0 justify-end">
                    {msg.status !== "read" && (
                      <button
                        onClick={() => handleUpdateStatus(msg.id, "read")}
                        className="flex-1 md:flex-none px-4 py-2 text-xs font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all"
                      >
                        Marquer lu
                      </button>
                    )}
                    {msg.status !== "resolved" && (
                      <button
                        onClick={() => handleUpdateStatus(msg.id, "resolved")}
                        className="flex-1 md:flex-none px-4 py-2 text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all"
                      >
                        Résolu
                      </button>
                    )}
                    {msg.status !== "pending" && (
                      <button
                        onClick={() => handleUpdateStatus(msg.id, "pending")}
                        className="flex-1 md:flex-none px-4 py-2 text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all"
                      >
                        Remettre en attente
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="px-4 py-2 text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl hover:bg-rose-500/20 transition-all"
                    >
                      Supprimer
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
