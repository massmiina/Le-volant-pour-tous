'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CoursAlcool() {
  const { t } = useLanguage();

  const sections = [
    {
      id: "alcool",
      title: t('cours.alcool.limites.title'),
      description: t('cours.alcool.limites.desc'),
      rules: [
        { title: t('cours.alcool.limites.r1_t'), text: t('cours.alcool.limites.r1_txt') },
        { title: t('cours.alcool.limites.r2_t'), text: t('cours.alcool.limites.r2_txt') },
        { title: t('cours.alcool.limites.r3_t'), text: t('cours.alcool.limites.r3_txt') },
        { title: t('cours.alcool.limites.r4_t'), text: t('cours.alcool.limites.r4_txt') }
      ],
      examples: [
        t('cours.alcool.limites.ex1'),
        t('cours.alcool.limites.ex2')
      ],
      color: "border-purple-500",
      bgBadge: "bg-purple-500 text-white",
      bgLight: "bg-purple-50"
    },
    {
      id: "sanctions",
      title: t('cours.alcool.sanctions.title'),
      description: t('cours.alcool.sanctions.desc'),
      rules: [
        { title: t('cours.alcool.sanctions.r1_t'), text: t('cours.alcool.sanctions.r1_txt') },
        { title: t('cours.alcool.sanctions.r2_t'), text: t('cours.alcool.sanctions.r2_txt') },
        { title: t('cours.alcool.sanctions.r3_t'), text: t('cours.alcool.sanctions.r3_txt') },
        { title: t('cours.alcool.sanctions.r4_t'), text: t('cours.alcool.sanctions.r4_txt') }
      ],
      examples: [
        t('cours.alcool.sanctions.ex1')
      ],
      color: "border-indigo-600",
      bgBadge: "bg-indigo-600 text-white",
      bgLight: "bg-indigo-50"
    },
    {
      id: "stupefiants",
      title: t('cours.alcool.stupefiants.title'),
      description: t('cours.alcool.stupefiants.desc'),
      rules: [
        { title: t('cours.alcool.stupefiants.r1_t'), text: t('cours.alcool.stupefiants.r1_txt') },
        { title: t('cours.alcool.stupefiants.r2_t'), text: t('cours.alcool.stupefiants.r2_txt') },
        { title: t('cours.alcool.stupefiants.r3_t'), text: t('cours.alcool.stupefiants.r3_txt') },
        { title: t('cours.alcool.stupefiants.r4_t'), text: t('cours.alcool.stupefiants.r4_txt') }
      ],
      examples: [
        t('cours.alcool.stupefiants.ex1')
      ],
      color: "border-violet-600",
      bgBadge: "bg-violet-600 text-white",
      bgLight: "bg-violet-50"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      {/* Header / Hero Section */}
      <section className="bg-white border-b border-gray-200 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/cours" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('ui.back_to_modules')}
          </Link>
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-purple-600 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm uppercase tracking-tighter shadow-sm">
                {t('cours.alcool.badge')}
              </span>
              <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">
                {t('cours.alcool.label')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('cours.alcool.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {t('cours.alcool.description')}
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
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{section.title}</h2>
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
                        <p className="text-gray-600 leading-relaxed font-medium">{rule.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Concrete Examples Box */}
                  <div className={`rounded-2xl p-6 border ${section.color.replace('500', '200').replace('600', '200')} ${section.bgLight}`}>
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
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{t('cours.alcool.footer_title')}</h2>
            <p className="text-gray-400 font-bold mb-8 text-xl">
              {t('cours.alcool.footer_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/cours/7" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {t('ui.prev_module', { number: 7 })}
              </Link>
              <Link href="/quiz" className="w-full sm:w-auto px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-purple-900/40 text-lg">
                {t('cours.alcool.btn_test')}
              </Link>
              <Link href="/cours/9" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-700 text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                {t('ui.next_module', { number: 9 })}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
