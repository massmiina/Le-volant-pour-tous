'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModuleQuiz } from '@/components/ModuleQuiz';

const renderRuleVisual = (sectionId: string, ruleTitle: string) => {
  const cleanTitle = ruleTitle.toLowerCase();
  
  // Section 7: Hierarchy (Hierarchy of Priorites)
  if (sectionId === 'hierarchie') {
    if (cleanTitle.includes('polic') || cleanTitle.includes('agent')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200 shadow-sm">
          <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14V20" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('feu')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-900 rounded-2xl flex flex-col items-center justify-center p-1.5 gap-1 border-2 border-gray-800 shadow-sm">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
        </div>
      );
    }
    if (cleanTitle.includes('panneau')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB4.svg" 
            alt="STOP" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('sol') || cleanTitle.includes('marquage')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex flex-col justify-between p-3 border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <div className="h-0.5 w-full bg-white opacity-40"></div>
          <div className="h-1.5 w-full bg-white rounded-sm"></div>
          <div className="h-0.5 w-full bg-white opacity-40"></div>
        </div>
      );
    }
    if (cleanTitle.includes('droite')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB1.svg" 
            alt="Priorité à droite" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
  }

  // Section 1: Priorité à droite
  if (sectionId === 'prio_droite') {
    if (cleanTitle.includes('fondamental') || cleanTitle.includes('s\'applique')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB1.svg" 
            alt="Priorité à droite" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('exception')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB6.svg" 
            alt="Route prioritaire" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('piège')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-yellow-50 rounded-2xl flex items-center justify-center border-2 border-yellow-200">
          <svg className="w-9 h-9 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      );
    }
  }

  // Section 2: STOP
  if (sectionId === 'stop') {
    if (cleanTitle.includes('obligation') || cleanTitle.includes('après')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB4.svg" 
            alt="STOP" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('ligne')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex flex-col justify-end p-2 border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <div className="h-3 w-full bg-white"></div>
        </div>
      );
    }
    if (cleanTitle.includes('sanction')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-red-50 rounded-2xl flex flex-col items-center justify-center border-2 border-red-200 text-red-600 font-bold font-mono">
          <span className="text-[10px] uppercase tracking-wider">Points</span>
          <span className="text-xl leading-none">-4</span>
        </div>
      );
    }
  }

  // Section 3: Cédez le passage
  if (sectionId === 'cedez') {
    if (cleanTitle.includes('obligation') || cleanTitle.includes('différence')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB3a.svg" 
            alt="Cédez le passage" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('ligne')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex flex-col justify-end p-2 border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <div className="h-3 w-full flex gap-1 justify-center">
            <div className="w-3 h-full bg-white"></div>
            <div className="w-3 h-full bg-white"></div>
            <div className="w-3 h-full bg-white"></div>
          </div>
        </div>
      );
    }
    if (cleanTitle.includes('rond-point')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200">
          <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6.342M12 8v4l3 3" />
          </svg>
        </div>
      );
    }
  }

  // Section 4: Route prioritaire
  if (sectionId === 'route_prioritaire') {
    if (cleanTitle.includes('validité') || cleanTitle.includes('usagers')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB6.svg" 
            alt="Route prioritaire" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('fin')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_AB7.svg" 
            alt="Fin de route prioritaire" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('abuser')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-green-50 rounded-2xl flex items-center justify-center border-2 border-green-200">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      );
    }
  }

  // Section 5: Le Rond-Point
  if (sectionId === 'rond_point') {
    if (cleanTitle.includes('principale') || cleanTitle.includes('exception') || cleanTitle.includes('placement')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200">
          <svg className="w-10 h-10 text-blue-600 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6.342M12 8v4l3 3" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('clignotant')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-amber-50 rounded-2xl flex items-center justify-center border-2 border-amber-200">
          <svg className="w-9 h-9 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>
      );
    }
  }

  // Section 6: Piétons & Tramways
  if (sectionId === 'pietons_tram') {
    if (cleanTitle.includes('engagé') || cleanTitle.includes('hors')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_A13b.svg" 
            alt="Passage piétons" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('tramway')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_A8.svg" 
            alt="Tramway" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('urgence')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
          <svg className="w-10 h-10 text-red-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      );
    }
  }

  // Default fallback icon
  return (
    <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-gray-200">
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
};

export default function CoursPriorites() {
  const { t } = useLanguage();

  const moduleData = (t('cours.priorites', { returnObjects: true }) as any);
  
  const sections = moduleData.sections || [];
  const quizData = moduleData.quiz_section || { title: "", intro: "", questions: [] };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <section className="bg-white border-b border-gray-200 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/cours" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('ui.back_to_modules')}
          </Link>
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-600 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm uppercase tracking-tighter shadow-sm">
                {moduleData.badge}
              </span>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                {moduleData.label}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {moduleData.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {moduleData.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-16">
        {sections.map((section: any, index: number) => (
          <AnimatedSection key={section.id} delay={index * 0.05}>
            <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-sm border-2 ${section.color} relative overflow-hidden`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${section.bgBadge} shadow-lg`}>
                  {index + 1}
                </div>

                <div className="flex-1 w-full">
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{section.title}</h2>
                  <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                    {section.desc}
                  </p>

                  <div className={section.imageUrl ? "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-center" : "mb-10"}>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('ui.key_rules')}
                      </h3>
                      
                      <div className="space-y-4">
                        {section.rules.map((rule: any, idx: number) => (
                          <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 transition-colors flex items-start gap-5">
                            {renderRuleVisual(section.id, rule.title)}
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{rule.title}</h4>
                              <p className="text-gray-600 leading-relaxed font-medium">{rule.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {section.imageUrl && (
                      <div className="w-full">
                        <div className={`relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl border-4 ${section.color.replace('border-', 'border-').replace('500', '200').replace('600', '200')} bg-gray-50 group`}>
                          <img 
                            src={section.imageUrl} 
                            alt={section.title} 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`rounded-2xl p-6 border ${section.color.replace('500', '200').replace('600', '200')} ${section.bgLight}`}>
                    <h3 className={`text-sm tracking-widest uppercase font-black mb-4 ${section.bgBadge.split(' ')[0].replace('bg-', 'text-')}`}>
                      💡 {t('ui.practical_cases')}
                    </h3>
                    <ul className="space-y-3">
                      {section.examples.map((ex: string, exIdx: number) => (
                        <li key={exIdx} className="flex items-start text-gray-800 font-medium">
                          <span className="mr-3 mt-1">
                            <span className="flex w-2 h-2 rounded-full bg-current"></span>
                          </span>
                          <span className="leading-snug">{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection>
           <ModuleQuiz moduleId={2} questions={quizData.questions} title={quizData.title} intro={quizData.intro} />
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-gray-900 rounded-3xl p-10 md:p-14 text-center shadow-xl mt-8">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{moduleData.footer_title}</h2>
            <p className="text-gray-400 font-bold mb-8 text-xl">
              {moduleData.footer_desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/cours/1" className="w-full sm:w-auto px-10 py-5 bg-gray-800 hover:bg-gray-700 text-white font-black rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2 border border-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {t('ui.prev_module', { number: 1 })}
              </Link>
              <Link href="/cours/3" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-blue-900/40 text-lg flex items-center justify-center gap-2">
                {t('ui.next_module', { number: 3 })}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
