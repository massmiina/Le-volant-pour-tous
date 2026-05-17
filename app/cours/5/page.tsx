'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModuleQuiz } from '@/components/ModuleQuiz';

export default function CoursStationnement() {
  const { t } = useLanguage();

  const sections = [
    {
      id: "arret-vs-stationnement",
      title: t('cours.stationnement.definition.title'),
      description: t('cours.stationnement.definition.desc'),
      rules: [
        { title: t('cours.stationnement.definition.r1_t'), text: t('cours.stationnement.definition.r1_txt') },
        { title: t('cours.stationnement.definition.r2_t'), text: t('cours.stationnement.definition.r2_txt') },
        { title: t('cours.stationnement.definition.r3_t'), text: t('cours.stationnement.definition.r3_txt') }
      ],
      examples: [
        t('cours.stationnement.definition.ex1'),
        t('cours.stationnement.definition.ex2')
      ],
      color: "border-fuchsia-500",
      bgBadge: "bg-fuchsia-500 text-white",
      bgLight: "bg-fuchsia-50"
    },
    {
      id: "regles-autorisations",
      title: t('cours.stationnement.regles.title'),
      description: t('cours.stationnement.regles.desc'),
      rules: [
        { title: t('cours.stationnement.regles.r1_t'), text: t('cours.stationnement.regles.r1_txt') },
        { title: t('cours.stationnement.regles.r2_t'), text: t('cours.stationnement.regles.r2_txt') },
        { title: t('cours.stationnement.regles.r3_t'), text: t('cours.stationnement.regles.r3_txt') },
        { title: t('cours.stationnement.regles.r4_t'), text: t('cours.stationnement.regles.r4_txt') }
      ],
      examples: [
        t('cours.stationnement.regles.ex1')
      ],
      color: "border-purple-600",
      bgBadge: "bg-purple-600 text-white",
      bgLight: "bg-purple-50"
    },
    {
      id: "lignes-interdites",
      title: t('cours.stationnement.interdictions.title'),
      description: t('cours.stationnement.interdictions.desc'),
      rules: [
        { title: t('cours.stationnement.interdictions.r1_t'), text: t('cours.stationnement.interdictions.r1_txt') },
        { title: t('cours.stationnement.interdictions.r2_t'), text: t('cours.stationnement.interdictions.r2_txt') },
        { title: t('cours.stationnement.interdictions.r3_t'), text: t('cours.stationnement.interdictions.r3_txt') },
        { title: t('cours.stationnement.interdictions.r4_t'), text: t('cours.stationnement.interdictions.r4_txt') }
      ],
      examples: [
        t('cours.stationnement.interdictions.ex1')
      ],
      color: "border-pink-500",
      bgBadge: "bg-pink-500 text-white",
      bgLight: "bg-pink-50"
    },
    {
      id: "zones-specifiques",
      title: t('cours.stationnement.dangereux.title'),
      description: t('cours.stationnement.dangereux.desc'),
      rules: [
        { title: t('cours.stationnement.dangereux.r1_t'), text: t('cours.stationnement.dangereux.r1_txt') },
        { title: t('cours.stationnement.dangereux.r2_t'), text: t('cours.stationnement.dangereux.r2_txt') },
        { title: t('cours.stationnement.dangereux.r3_t'), text: t('cours.stationnement.dangereux.r3_txt') },
        { title: t('cours.stationnement.dangereux.r4_t'), text: t('cours.stationnement.dangereux.r4_txt') }
      ],
      examples: [
        t('cours.stationnement.dangereux.ex1'),
        t('cours.stationnement.dangereux.ex2')
      ],
      color: "border-rose-500",
      bgBadge: "bg-rose-500 text-white",
      bgLight: "bg-rose-50"
    }
  ];

  const moduleData = (t('cours.stationnement', { returnObjects: true }) as any);
  const quizData = moduleData.quiz_section || { title: "", intro: "", questions: [] };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header / Hero Section */}
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
              <span className="bg-fuchsia-600 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm">{t('cours.stationnement.badge')}</span>
              <span className="text-fuchsia-600 font-bold uppercase tracking-wider text-sm">{t('cours.stationnement.label')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('cours.stationnement.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {t('cours.stationnement.description')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-16">
        {sections.map((section, index) => (
          <AnimatedSection key={section.id} delay={index * 0.1}>
            <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-sm border-2 ${section.color} relative overflow-hidden`}>
              
              <div className="flex items-start gap-6">
                {/* Number Badge */}
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${section.bgBadge} shadow-lg`}>
                  {index + 1}
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-black text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                    {section.description}
                  </p>

                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('ui.key_rules')}
                  </h3>
                  
                  <div className="space-y-4 mb-10">
                    {section.rules.map((rule, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-1">{rule.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{rule.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Concrete Examples Box */}
                  <div className={`rounded-2xl p-6 border ${section.color.replace('border-', 'border-').replace('500', '200').replace('600', '200')} ${section.bgLight}`}>
                    <h3 className={`text-sm tracking-widest uppercase font-black mb-4 ${section.bgBadge.split(' ')[0].replace('bg-', 'text-')}`}>
                      💡 {t('ui.concrete_examples')}
                    </h3>
                    <ul className="space-y-3">
                      {section.examples.map((ex, exIdx) => (
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

        {quizData.questions && quizData.questions.length > 0 && (
          <AnimatedSection>
             <ModuleQuiz moduleId={5} questions={quizData.questions} title={quizData.title} intro={quizData.intro} />
          </AnimatedSection>
        )}

        <AnimatedSection>
          <div className="bg-gray-900 rounded-3xl p-10 text-center shadow-xl mt-8">
            <h2 className="text-3xl font-black text-white mb-4">{t('cours.stationnement.footer_title')}</h2>
            <p className="text-gray-400 font-medium mb-8">
              {t('cours.stationnement.footer_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/cours/4" className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-colors">
                {t('ui.prev_module', { number: 4 })}
              </Link>
              <Link href="/quiz" className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black rounded-xl transition-colors shadow-[0_0_20px_rgba(192,38,211,0.4)]">
                {t('cours.stationnement.btn_test')}
              </Link>
              <Link href="/cours/6" className="px-6 py-3 rounded-xl border border-gray-700 text-white font-bold hover:bg-gray-800 transition-colors">
                {t('ui.next_module', { number: 6 })}
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
