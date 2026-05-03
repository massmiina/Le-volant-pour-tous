'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Music, Users, Camera, Palette, Mic2, Scissors, PlayCircle, Heart, Star, Sparkles, Printer } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function ProjetMarionnettes() {
  const objectives = [
    { icon: <Sparkles className="w-6 h-6" />, title: "Imagination", text: "Développer l'imagination et la créativité des élèves." },
    { icon: <Mic2 className="w-6 h-6" />, title: "Expression", text: "Favoriser l'expression orale et l'aisance devant la caméra." },
    { icon: <Users className="w-6 h-6" />, title: "Coopération", text: "Travailler la coopération entre les CP et les CM2." },
    { icon: <Heart className="w-6 h-6" />, title: "Respect", text: "Encourager l'écoute et le respect des idées de chacun." },
    { icon: <Camera className="w-6 h-6" />, title: "Mise en scène", text: "Découvrir les bases de la réalisation audiovisuelle." },
    { icon: <Star className="w-6 h-6" />, title: "Talents", text: "Valoriser les talents artistiques et musicaux." },
  ];

  const steps = [
    { 
      number: "01", 
      title: "L'Entrée en Scène", 
      desc: "Un premier élève arrive avec sa marionnette et commence à chanter sa chanson préférée.",
      duration: "Refrain : quelques secondes"
    },
    { 
      number: "02", 
      title: "Le Coup de Théâtre", 
      desc: "Un deuxième élève arrive soudainement, pousse la première marionnette (effet comique) et dit : « Non, c’est nul… écoute ça ! »",
      quote: "« Non, c’est nul… écoute ça ! »"
    },
    { 
      number: "03", 
      title: "Métamorphose", 
      desc: "Le décor change brusquement pour correspondre à la nouvelle chanson et ambiance.",
      effect: "Changement de décor instantané"
    },
    { 
      number: "04", 
      title: "Le Défi Musical", 
      desc: "La scène se répète avec plusieurs élèves, chacun présentant son univers musical unique."
    },
    { 
      number: "05", 
      title: "L'Harmonie Finale", 
      desc: "Un élève propose : « Au pire… on chante ensemble ? »",
      quote: "« Au pire… on chante ensemble ? »"
    },
    { 
      number: "06", 
      title: "Le Grand Final", 
      desc: "Tous les élèves apparaissent dans le décor final pour chanter ensemble.",
      song: "“Ne parlons pas de Bruno” (Encanto)"
    },
  ];

  const materials = [
    "Chaussettes propres (la base !)",
    "Feutrine, laine, boutons, gommettes, colle",
    "Cartons et papiers pour les décors",
    "Enceinte pour la musique",
    "Téléphone ou tablette pour filmer",
    "Scène en carton avec fond défilant"
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0A061E] text-white font-sans selection:bg-violet-500/30 print:bg-white print:text-black">
      {/* Navigation Shortcut - Hidden on Print */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 print:hidden">
        <Link href="/" className="group flex items-center gap-2 text-violet-300 font-bold hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span>Le Volant</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#projet" className="hover:text-violet-400 transition-colors">Le Projet</a>
            <a href="#scenario" className="hover:text-violet-400 transition-colors">Scénario</a>
            <a href="#objectifs" className="hover:text-violet-400 transition-colors">Objectifs</a>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Imprimer
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] print:h-auto flex items-center justify-center overflow-hidden pt-20 print:pt-0 print:pb-12">
        {/* Background Image with Overlay - Hidden on Print */}
        <div className="absolute inset-0 z-0 print:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0A061E]/80 to-[#0A061E] z-10"></div>
          <img 
            src="/images/puppet-theater.png" 
            alt="Puppet Theater" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-40"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.1)_0%,_transparent_50%)]"></div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-bold tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(139,92,246,0.1)] print:border-black print:text-black print:bg-transparent"
          >
            <Sparkles className="w-4 h-4" />
            Projet Pédagogique CP & CM2
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight print:text-4xl print:mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 drop-shadow-2xl print:text-black print:bg-none">
              La Bataille des Chansons...
            </span>
            <br />
            <span className="text-white print:text-black">puis l’harmonie !</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed print:text-lg print:text-gray-700"
          >
            Réalisation d’un mini film musical avec marionnettes-chaussettes.
          </motion.p>
        </div>
      </section>

      {/* Presentation Section */}
      <section id="projet" className="py-20 px-6 print:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center print:grid-cols-1 print:gap-8">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight print:text-2xl print:mb-4">
                Le Concept
              </h2>
              <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8 print:text-sm print:text-gray-800 print:mb-4">
                Dans le cadre d’un projet artistique et collaboratif, les élèves participeront à la création d’un mini film musical et humoristique. 
                Chaque élève décore sa propre marionnette et interprète une scène où elle "chante" un extrait choisi.
              </p>
              <p className="text-lg text-gray-500 print:text-sm print:text-gray-700">
                Le scénario repose sur une mise en scène drôle : chaque personnage pense avoir “la meilleure chanson”, jusqu’à ce qu’ils réalisent qu’il est plus agréable de chanter ensemble.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6 print:grid-cols-1 print:gap-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 print:border-gray-200 print:bg-white">
                  <Palette className="w-8 h-8 text-pink-500 mb-4 print:text-black" />
                  <h3 className="font-bold text-lg mb-2 print:text-sm">Arts Plastiques</h3>
                  <p className="text-sm text-gray-500 print:text-xs">Création des marionnettes et décors.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 print:border-gray-200 print:bg-white">
                  <Music className="w-8 h-8 text-emerald-500 mb-4 print:text-black" />
                  <h3 className="font-bold text-lg mb-2 print:text-sm">Éducation Musicale</h3>
                  <p className="text-sm text-gray-500 print:text-xs">Chant, rythme et interprétation.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Scenario / Script Section */}
      <section id="scenario" className="py-24 bg-white/5 border-y border-white/10 print:bg-white print:border-gray-200 print:py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 tracking-tight print:text-2xl print:mb-6">Déroulement du Film</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 print:grid-cols-1">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start print:gap-4">
                <span className="text-3xl font-black text-violet-500/50 print:text-black print:text-lg">{step.number}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 print:text-sm">{step.title}</h3>
                  <p className="text-gray-400 font-medium print:text-xs print:text-gray-800">{step.desc}</p>
                  {step.quote && <p className="mt-2 text-violet-400 font-bold print:text-black print:italic">« {step.quote} »</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectifs" className="py-24 px-6 print:py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 tracking-tight print:text-2xl print:mb-6">Objectifs Pédagogiques</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-1 print:gap-4">
            {objectives.map((obj, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl print:border-gray-200 print:p-4">
                <h3 className="text-lg font-bold mb-2 print:text-sm">{obj.title}</h3>
                <p className="text-gray-500 text-sm print:text-xs print:text-gray-700">{obj.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-24 px-6 bg-violet-600 print:bg-white print:text-black print:py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-10 print:text-2xl print:mb-4">Matériel Nécessaire</h2>
          <div className="grid md:grid-cols-2 gap-8 print:grid-cols-1">
            <ul className="space-y-4">
              {materials.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 font-bold print:font-normal print:text-xs">
                  <div className="w-2 h-2 rounded-full bg-white print:bg-black shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-white/10 p-8 rounded-3xl print:border print:border-gray-200 print:p-4">
              <h3 className="text-xl font-bold mb-4 print:text-sm">Activités</h3>
              <p className="text-sm opacity-80 print:text-xs">
                Fabrication des marionnettes, réflexion sur les personnages, répétitions, tournage et visionnage final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 text-center print:py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-6 print:text-xl">Production Finale</h2>
          <p className="text-xl text-gray-400 mb-12 print:text-sm print:text-gray-700 print:mb-4">
            Un court-métrage musical humoristique réalisé par les élèves.
          </p>
          <button 
            onClick={handlePrint}
            className="px-10 py-4 bg-violet-600 text-white font-black rounded-2xl hover:scale-105 transition-all print:hidden"
          >
            Imprimer maintenant
          </button>
        </div>
      </footer>
      
      <style jsx global>{`
        @media print {
          @page { margin: 2cm; }
          body { background: white !important; color: black !important; }
          .print\:hidden { display: none !important; }
        }
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
