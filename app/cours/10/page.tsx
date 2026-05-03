'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CoursEcoConduite() {
  const { t } = useLanguage();

  const sections = [
    {
      id: "souple",
      title: t('cours.eco_conduite.souple.title'),
      description: t('cours.eco_conduite.souple.desc'),
      rules: [
        { title: t('cours.eco_conduite.souple.r1_t'), text: t('cours.eco_conduite.souple.r1_txt') },
        { title: t('cours.eco_conduite.souple.r2_t'), text: t('cours.eco_conduite.souple.r2_txt') },
        { title: t('cours.eco_conduite.souple.r3_t'), text: t('cours.eco_conduite.souple.r3_txt') },
        { title: t('cours.eco_conduite.souple.r4_t'), text: t('cours.eco_conduite.souple.r4_txt') }
      ],
      examples: [
        t('cours.eco_conduite.souple.ex1'),
        t('cours.eco_conduite.souple.ex2')
      ],
      color: "border-green-500",
      bgBadge: "bg-green-500 text-white",
      bgLight: "bg-green-50"
    },
    {
      id: "facteurs",
      title: t('cours.eco_conduite.facteurs.title'),
      description: t('cours.eco_conduite.facteurs.desc'),
      rules: [
        { title: t('cours.eco_conduite.facteurs.r1_t'), text: t('cours.eco_conduite.facteurs.r1_txt') },
        { title: t('cours.eco_conduite.facteurs.r2_t'), text: t('cours.eco_conduite.facteurs.r2_txt') },
        { title: t('cours.eco_conduite.facteurs.r3_t'), text: t('cours.eco_conduite.facteurs.r3_txt') },
        { title: t('cours.eco_conduite.facteurs.r4_t'), text: t('cours.eco_conduite.facteurs.r4_txt') }
      ],
      examples: [
        t('cours.eco_conduite.facteurs.ex1')
      ],
      color: "border-lime-500",
      bgBadge: "bg-lime-500 text-gray-900",
      bgLight: "bg-lime-50"
    },
    {
      id: "entretien",
      title: t('cours.eco_conduite.entretien_eco.title'),
      description: t('cours.eco_conduite.entretien_eco.desc'),
      rules: [
        { title: t('cours.eco_conduite.entretien_eco.r1_t'), text: t('cours.eco_conduite.entretien_eco.r1_txt') },
        { title: t('cours.eco_conduite.entretien_eco.r2_t'), text: t('cours.eco_conduite.entretien_eco.r2_txt') },
        { title: t('cours.eco_conduite.entretien_eco.r3_t'), text: t('cours.eco_conduite.entretien_eco.r3_txt') }
      ],
      examples: [
        t('cours.eco_conduite.entretien_eco.ex1')
      ],
      color: "border-emerald-600",
      bgBadge: "bg-emerald-600 text-white",
      bgLight: "bg-emerald-50"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans focus:outline-none" tabIndex={-1}>
      {/* Header / Hero Section */}
      <section className="bg-white border-b border-gray-200 pt-32 pb-16 px-4 text-center sm:text-left">
        <div className="max-w-4xl mx-auto">
          <Link href="/cours" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-green-600 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('ui.back_to_modules')}
          </Link>
          <AnimatedSection>
            <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
              <span className="bg-green-600 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm uppercase tracking-tighter shadow-sm">
                {t('cours.eco_conduite.badge')}
              </span>
              <span className="text-green-600 font-bold uppercase tracking-wider text-sm">
                {t('cours.eco_conduite.label')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('cours.eco_conduite.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {t('cours.eco_conduite.description')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-16">
        {sections.map((section, index) => (
          <AnimatedSection key={section.id} delay={index * 0.1}>
            <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-sm border-2 ${section.color} relative overflow-hidden`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Number Badge */}
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${section.bgBadge} shadow-lg mb-4 sm:mb-0`}>
                  {index + 1}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{section.title}</h2>
                  <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed italic border-l-0 sm:border-l-4 sm:pl-6 border-gray-100">
                    {section.description}
                  </p>

                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('ui.key_rules')}
                  </h3>
                  
                  <div className="space-y-4 mb-10 text-left">
                    {section.rules.map((rule, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-1">{rule.title}</h4>
                        <p className="text-gray-600 leading-relaxed font-medium">{rule.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Concrete Examples Box */}
                  <div className={`rounded-2xl p-6 border ${section.color.replace('500', '200').replace('600', '200')} ${section.bgLight} text-left`}>
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

        {/* Footer Navigation */}
        <AnimatedSection>
          <div className="bg-gray-900 rounded-3xl p-10 md:p-14 text-center shadow-xl mt-8">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{t('cours.eco_conduite.footer_title')}</h2>
            <p className="text-gray-400 font-bold mb-8 text-xl">
              {t('cours.eco_conduite.footer_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/cours/9" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {t('ui.prev_module', { number: 9 })}
              </Link>
              <Link href="/quiz" className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-green-900/40 text-lg">
                {t('cours.eco_conduite.btn_test')}
              </Link>
              <Link href="/cours/11" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-700 text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                {t('ui.next_module', { number: 11 })}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
