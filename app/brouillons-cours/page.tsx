'use client';

// ============================================================
// PAGE BROUILLON — AUDIT DES SUPPORTS DE COURS
// URL: /brouillons-cours
// Objectif: Visualiser honnêtement l'état actuel du contenu
// pédagogique pour identifier les lacunes.
// ============================================================

export default function BrouillonsCours() {
  // ──────────────────────────────────────────────────────────
  // BILAN : Ce que l'on utilise ACTUELLEMENT comme "supports"
  // ──────────────────────────────────────────────────────────

  const modulesActuels = [
    {
      id: 1,
      titre: "Signalisation routière",
      nbSections: 15,
      nbQuiz: 3,
      support: ["Texte brut", "2 images PNG statiques (panneau danger, feux)", "Quiz 3 questions seulement"],
      lacunes: [
        "Aucune image réelle pour 13 sections sur 15",
        "Quiz mini (3 questions) → pas représentatif de l'ETG",
        "Zéro schéma interactif des formes/couleurs",
        "Pas de mise en situation visuelle conducteur",
        "Lexique des panneaux = composant SignLexicon non audité ici",
      ],
      couleur: "#3b82f6",
    },
    {
      id: 2,
      titre: "Priorités & Intersections",
      nbSections: 8,
      nbQuiz: 12,
      support: ["Texte brut", "1 image PNG (priorité droite)", "Quiz 12 questions via translations.ts"],
      lacunes: [
        "Image 'priorité droite' = seul visuel de tout le module",
        "Intersections complexes (Stop + Cédez le passage + Feux) → non illustrées",
        "Aucun schéma de carrefour interactif",
        "Pas de cas concret visuel 'vue conducteur'",
      ],
      couleur: "#f59e0b",
    },
    {
      id: 3,
      titre: "Règles de circulation",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts", "Aucune section de cours proprement dit"],
      lacunes: [
        "⚠️ CRITIQUE : Ce module n'a aucune section de cours !",
        "Seulement un quiz sans apprentissage préalable",
        "Pas d'explication sur le dépassement, le placement, les croisements",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 4,
      titre: "Vitesse & Limitations",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de tableau récapitulatif des vitesses (agglomération, hors agglo, autoroute, pluie)",
        "Pas de visuel sur les panneaux de limitation",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 5,
      titre: "Stationnement & Arrêt",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de schéma des zones interdites / autorisées",
        "Pas d'explication stationnement alterné / payant / résidentiel",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 6,
      titre: "Autoroute & Voies rapides",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de schéma insertion / dépassement / sortie d'autoroute",
        "Pas d'explication sur la BAU ou les péages",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 7,
      titre: "Sécurité routière",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de visualisation des distances de freinage",
        "Pas d'animation sur l'énergie cinétique",
        "Pas d'illustration de l'angle mort",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 8,
      titre: "Alcool, drogues & conduite",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de tableau des taux légaux (0,2 / 0,5 / 0,8 g/l)",
        "Pas d'explication visuelle des effets sur les réflexes",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 9,
      titre: "Mécanique & Entretien",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de schéma du tableau de bord / voyants",
        "Pas de guide visuel des niveaux à vérifier",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 10,
      titre: "Éco-conduite",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de schéma des régimes moteur",
        "Pas de comparatif consommation / vitesse",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 11,
      titre: "Premiers Secours",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de schéma PLS (Position Latérale de Sécurité)",
        "Pas de protocole PROTECT / ALERTER / SECOURIR visuel",
      ],
      couleur: "#ef4444",
      critique: true,
    },
    {
      id: 12,
      titre: "Partage de la route",
      nbSections: 0,
      nbQuiz: 12,
      support: ["Quiz 12 questions via translations.ts"],
      lacunes: [
        "⚠️ CRITIQUE : Aucune section de cours",
        "Pas de schéma des angles morts d'un camion",
        "Pas d'explication visuelle sas vélo / zone de rencontre",
      ],
      couleur: "#ef4444",
      critique: true,
    },
  ];

  const statsGlobales = {
    totalModules: 12,
    modulesAvecCours: 2,
    modulesQuizSeulement: 10,
    totalImages: 3,
    totalVideos: 0,
    totalSchemasInteractifs: 0,
    totalMisesEnSituationVisuelles: 0,
    questionsQuizTotal: 12 * 12 + 3, // 144 quiz + 3 sur module 1
  };

  // ──────────────────────────────────────────────────────────
  // CE QU'UN MODULE DE COURS COMPLET DEVRAIT AVOIR (Cible ETG)
  // ──────────────────────────────────────────────────────────
  const cibleModule = [
    { icone: "📖", label: "8 à 15 sections de cours structurées (règle → exemple → cas concret)" },
    { icone: "🖼️", label: "Visuels réalistes : photos, schémas SVG ou PNG des situations réelles" },
    { icone: "📊", label: "Tableaux récapitulatifs (vitesses, taux, distances)" },
    { icone: "🗺️", label: "Schémas d'intersection annotés (priorité, STOP, cédez le passage)" },
    { icone: "🎯", label: "Au moins 12 questions de quiz alignées ETG avec explication" },
    { icone: "🚗", label: "1 mise en situation 'vue conducteur' par module (photo ou rendu 8K)" },
    { icone: "🔁", label: "Résumé mémo-flash en fin de module (flashcards)" },
    { icone: "🌍", label: "Contenu bilingue FR / RU complet et pédagogiquement équivalent" },
  ];

  const proriteActions = [
    {
      priorite: "🔴 URGENT",
      action: "Créer les sections de cours pour les 10 modules vides (M3 → M12)",
      effort: "Élevé",
      impact: "Critique",
    },
    {
      priorite: "🔴 URGENT",
      action: "Enrichir le quiz du Module 1 (3 questions → 12 questions)",
      effort: "Faible",
      impact: "Élevé",
    },
    {
      priorite: "🟠 IMPORTANT",
      action: "Générer les visuels 8K pour M2 (intersections), M7 (distances), M11 (PLS)",
      effort: "Moyen",
      impact: "Élevé",
    },
    {
      priorite: "🟠 IMPORTANT",
      action: "Créer des tableaux SVG/composants React : vitesses, taux alcool, distances de freinage",
      effort: "Moyen",
      impact: "Élevé",
    },
    {
      priorite: "🟡 MOYEN",
      action: "Ajouter les flashcards mémo en fin de chaque module",
      effort: "Moyen",
      impact: "Moyen",
    },
    {
      priorite: "🟡 MOYEN",
      action: "Compléter les traductions russes manquantes pour les nouveaux contenus",
      effort: "Élevé",
      impact: "Moyen",
    },
    {
      priorite: "🟢 NICE-TO-HAVE",
      action: "Mettre en situation immersive 'vue conducteur 8K' pour chaque module",
      effort: "Très élevé",
      impact: "Élevé",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A061E] text-white pb-20">
      {/* Header */}
      <div className="bg-black/60 border-b border-violet-500/20 px-8 py-8 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-red-500/20 border border-red-500 text-red-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-widest">
              BROUILLON INTERNE
            </span>
            <span className="text-violet-400 text-xs font-mono">session/brouillon-audit-cours</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            🔍 Audit des Supports de Cours — État Actuel
          </h1>
          <p className="text-violet-300 mt-1 text-sm">
            Ce document présente honnêtement ce qui existe vs. ce qu&apos;un module ETG complet devrait contenir.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

        {/* ── BLOC 1 : STATISTIQUES GLOBALES ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className="bg-violet-500/20 border border-violet-500 rounded-xl px-4 py-1 text-violet-300 text-sm font-mono">01</span>
            Statistiques Globales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: `${statsGlobales.modulesAvecCours} / ${statsGlobales.totalModules}`, label: "Modules avec un cours réel", color: "text-red-400", bg: "border-red-500/30 bg-red-500/5" },
              { val: statsGlobales.modulesQuizSeulement, label: "Modules quiz uniquement (sans cours)", color: "text-orange-400", bg: "border-orange-500/30 bg-orange-500/5" },
              { val: statsGlobales.totalImages, label: "Images de cours existantes", color: "text-yellow-400", bg: "border-yellow-500/30 bg-yellow-500/5" },
              { val: statsGlobales.totalVideos, label: "Vidéos / Animations", color: "text-gray-400", bg: "border-gray-500/30 bg-gray-500/5" },
              { val: statsGlobales.totalSchemasInteractifs, label: "Schémas interactifs", color: "text-gray-400", bg: "border-gray-500/30 bg-gray-500/5" },
              { val: statsGlobales.totalMisesEnSituationVisuelles, label: "Mises en situation visuelles", color: "text-gray-400", bg: "border-gray-500/30 bg-gray-500/5" },
              { val: statsGlobales.questionsQuizTotal, label: "Questions de quiz au total", color: "text-emerald-400", bg: "border-emerald-500/30 bg-emerald-500/5" },
              { val: "3 735", label: "Lignes dans translations.ts", color: "text-violet-400", bg: "border-violet-500/30 bg-violet-500/5" },
            ].map((s, i) => (
              <div key={i} className={`border ${s.bg} rounded-2xl p-5 text-center`}>
                <div className={`text-4xl font-black ${s.color} mb-1`}>{s.val}</div>
                <div className="text-gray-400 text-xs leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Barre de complétion */}
          <div className="mt-6 bg-black/40 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Complétion pédagogique des modules</span>
              <span className="text-red-400 font-bold">17% seulement</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-4 rounded-full" style={{ width: '17%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              2 modules sur 12 ont du contenu de cours réel. Les 10 autres ont uniquement un quiz.
            </p>
          </div>
        </section>

        {/* ── BLOC 2 : INVENTAIRE MODULE PAR MODULE ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className="bg-violet-500/20 border border-violet-500 rounded-xl px-4 py-1 text-violet-300 text-sm font-mono">02</span>
            Inventaire Module par Module
          </h2>
          <div className="space-y-4">
            {modulesActuels.map((mod) => (
              <div
                key={mod.id}
                className={`border rounded-2xl p-6 ${mod.critique ? 'border-red-500/40 bg-red-500/5' : 'border-violet-500/20 bg-violet-500/5'}`}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono font-black text-2xl"
                      style={{ color: mod.couleur }}
                    >
                      M{mod.id}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">{mod.titre}</h3>
                      <span className={`text-xs font-mono ${mod.critique ? 'text-red-400' : 'text-emerald-400'}`}>
                        {mod.critique ? '⚠️ PAS DE COURS — Quiz uniquement' : `✅ ${mod.nbSections} sections de cours + quiz`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full font-mono">
                      {mod.nbSections} sections
                    </span>
                    <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full font-mono">
                      {mod.nbQuiz} questions quiz
                    </span>
                    <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full font-mono">
                      {mod.support.filter(s => s.toLowerCase().includes('image') || s.toLowerCase().includes('png')).length} image(s)
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Supports existants */}
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Ce qui existe :</p>
                    <ul className="space-y-1">
                      {mod.support.map((s, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">›</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Lacunes */}
                  <div>
                    <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">Lacunes identifiées :</p>
                    <ul className="space-y-1">
                      {mod.lacunes.map((l, i) => (
                        <li key={i} className="text-sm text-red-300 flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">✕</span> {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOC 3 : CIBLE — UN MODULE COMPLET ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className="bg-violet-500/20 border border-violet-500 rounded-xl px-4 py-1 text-violet-300 text-sm font-mono">03</span>
            Ce qu&apos;un Module Complet ETG Devrait Avoir
          </h2>
          <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-8 grid md:grid-cols-2 gap-4">
            {cibleModule.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-2xl">{c.icone}</span>
                <p className="text-gray-200 text-sm leading-relaxed">{c.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOC 4 : PLAN D'ACTION PRIORISÉ ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className="bg-violet-500/20 border border-violet-500 rounded-xl px-4 py-1 text-violet-300 text-sm font-mono">04</span>
            Plan d&apos;Action Priorisé
          </h2>
          <div className="space-y-3">
            {proriteActions.map((a, i) => (
              <div key={i} className="border border-white/10 bg-white/5 rounded-xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-mono shrink-0 mt-0.5">{a.priorite}</span>
                  <p className="text-gray-200 text-sm">{a.action}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400 font-mono">
                    Effort: {a.effort}
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400 font-mono">
                    Impact: {a.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOC 5 : SOURCES PÉDAGOGIQUES À EXPLOITER ── */}
        <section>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className="bg-violet-500/20 border border-violet-500 rounded-xl px-4 py-1 text-violet-300 text-sm font-mono">05</span>
            Sources Pédagogiques Actuellement Utilisées
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 text-lg">✅ Sources existantes</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2"><span>›</span> <span><strong>translations.ts</strong> (3 735 lignes) — Contient 12×12 = 144 questions de quiz avec explications, structurées par module.</span></li>
                <li className="flex gap-2"><span>›</span> <span><strong>mod1_translations.ts</strong> (22 087 octets) — Données complètes du Module 1 avec sections et imagerie.</span></li>
                <li className="flex gap-2"><span>›</span> <span><strong>examData.ts</strong> — Banque de questions type examen ETG.</span></li>
                <li className="flex gap-2"><span>›</span> <span><strong>3 images PNG</strong> dans /public/images/cours/ (panneau danger, interdiction, feux).</span></li>
                <li className="flex gap-2"><span>›</span> <span><strong>Composant SignLexicon</strong> — Lexique visuel des panneaux (Module 1).</span></li>
              </ul>
            </div>
            <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 text-lg">❌ Ce qui manque comme sources</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Référentiel officiel REMC structuré en données exploitables</span></li>
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Banque d&apos;images officielles de panneaux SVG (ONISR / code officiel)</span></li>
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Schémas d&apos;intersections annotés (SVG interactif)</span></li>
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Photos de situations réelles de conduite (vue subjective)</span></li>
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Tableaux de données (vitesses / distances / taux) en composants React</span></li>
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Animations / visualisations interactives (énergie cinétique, distance freinage)</span></li>
                <li className="flex gap-2"><span className="text-red-400">✕</span> <span>Contenu russe complet des 10 modules manquants</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-xs font-mono border-t border-white/5 pt-8">
          Brouillon généré le {new Date().toLocaleDateString('fr-FR')} • session/brouillon-audit-cours • Ne pas publier en production
        </div>

      </div>
    </div>
  );
}
