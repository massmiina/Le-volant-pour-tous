'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModuleQuiz } from '@/components/ModuleQuiz';
import { FactBox } from '@/components/FactBox';

const renderRuleVisual = (sectionId: string, ruleTitle: string) => {
  const cleanTitle = ruleTitle.toLowerCase();

  // Section 1: Placement sur la Chaussée
  if (sectionId === 'position') {
    if (cleanTitle.includes('base')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex flex-col justify-center items-center p-2 border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <div className="w-full h-1 bg-white opacity-40 absolute top-1/2 left-0 -translate-y-1/2"></div>
          {/* Car on the right lane */}
          <div className="w-6 h-4 bg-blue-500 rounded-sm absolute bottom-2 right-2 border border-blue-400"></div>
        </div>
      );
    }
    if (cleanTitle.includes('virage')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-850 rounded-2xl flex items-center justify-center p-2 border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none">
            {/* Curved road */}
            <path d="M10 90 Q 90 90 90 10" stroke="white" strokeWidth="15" strokeLinecap="round"/>
            <path d="M10 90 Q 90 90 90 10" stroke="gray" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round"/>
            {/* Car hugging the inside of the curve */}
            <circle cx="65" cy="70" r="5" fill="#EF4444"/>
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('voie') || cleanTitle.includes('changement')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('cycliste') || cleanTitle.includes('vulnérable')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex flex-col items-center justify-center border-2 border-blue-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_B22a.svg" 
            alt="Cycliste" 
            className="w-12 h-12 object-contain"
          />
        </div>
      );
    }
  }

  // Section 2: Le Dépassement
  if (sectionId === 'depassement') {
    if (cleanTitle.includes('gauche')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none">
            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="4" strokeDasharray="8,8"/>
            {/* Car being overtaken */}
            <rect x="60" y="45" width="15" height="25" rx="3" fill="#6B7280"/>
            {/* Overtaking car on the left */}
            <rect x="25" y="25" width="15" height="25" rx="3" fill="#3B82F6"/>
            {/* Arrow indicating path */}
            <path d="M70 80 Q 25 70 32.5 55" stroke="#3B82F6" strokeWidth="3" fill="none"/>
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('droite')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none">
            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="4" strokeDasharray="8,8"/>
            {/* Front car signaling turning left */}
            <rect x="25" y="20" width="15" height="25" rx="3" fill="#EF4444"/>
            <polygon points="15,25 22,20 22,30" fill="#F59E0B" className="animate-pulse"/>
            {/* Overtaking car passing right */}
            <rect x="60" y="55" width="15" height="25" rx="3" fill="#3B82F6"/>
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('condition')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-green-50 rounded-2xl flex items-center justify-center border-2 border-green-200">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('interdiction')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_B3.svg" 
            alt="Dépassement interdit" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('rca')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-200 text-slate-700 font-bold font-mono">
          <span className="text-xs uppercase tracking-tighter">Séquence</span>
          <span className="text-lg leading-none text-blue-600">R-C-A</span>
        </div>
      );
    }
  }

  // Section 3: Le Croisement
  if (sectionId === 'croisement') {
    if (cleanTitle.includes('base')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <svg className="w-12 h-12 text-white" viewBox="0 0 100 100" fill="none">
            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="4"/>
            {/* Two opposing cars crossing */}
            <rect x="65" y="15" width="15" height="25" rx="3" fill="#EF4444"/>
            <rect x="20" y="60" width="15" height="25" rx="3" fill="#3B82F6"/>
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('recule')) {
      return (
        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/France_road_sign_B15.svg" 
            alt="Céder le passage en face" 
            className="w-12 h-12 object-contain drop-shadow-md"
          />
        </div>
      );
    }
    if (cleanTitle.includes('nuit')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-800 shadow-inner">
          <svg className="w-10 h-10 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('lourd')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-slate-200">
          <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16v-5a1 1 0 00-1-1h-7" />
          </svg>
        </div>
      );
    }
  }

  // Section 4: Les Clignotants et Avertisseurs
  if (sectionId === 'clignotants') {
    if (cleanTitle.includes('quand')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-gray-850 rounded-2xl flex items-center justify-center p-2 border-2 border-gray-700 relative overflow-hidden shadow-inner">
          <svg className="w-12 h-12 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('priorité')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
          <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m0-6a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('avertisseur') || cleanTitle.includes('klaxon')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200">
          <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
          </svg>
        </div>
      );
    }
    if (cleanTitle.includes('détresse') || cleanTitle.includes('warning')) {
      return (
        <div className="w-16 h-16 shrink-0 bg-red-100 rounded-2xl flex items-center justify-center border-2 border-red-200 shadow-sm animate-pulse">
          <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      );
    }
  }

  // Default fallback
  return (
    <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-gray-200">
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
};

export default function CoursCirculation() {
  const { t } = useLanguage();

  const moduleData = (t('cours.circulation', { returnObjects: true }) as any);
  
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

                      {section.factBox && (
                        <FactBox 
                          type={section.factBox.type}
                          title={section.factBox.title}
                          text={section.factBox.text}
                        />
                      )}
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
           <ModuleQuiz moduleId={3} questions={quizData.questions} title={quizData.title} intro={quizData.intro} />
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-gray-900 rounded-3xl p-10 md:p-14 text-center shadow-xl mt-8">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{moduleData.footer_title}</h2>
            <p className="text-gray-400 font-bold mb-8 text-xl">
              {moduleData.footer_desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/cours/2" className="w-full sm:w-auto px-10 py-5 bg-gray-800 hover:bg-gray-700 text-white font-black rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2 border border-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {t('ui.prev_module', { number: 2 })}
              </Link>
              <Link href="/cours/4" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-blue-900/40 text-lg flex items-center justify-center gap-2">
                {t('ui.next_module', { number: 4 })}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
