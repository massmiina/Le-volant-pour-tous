'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CoursAutoroute() {
  const { t } = useLanguage();

  const sections = [
    {
      id: "entree-sortie",
      title: t('cours.autoroute.entree_sortie.title'),
      description: t('cours.autoroute.entree_sortie.desc'),
      rules: [
        { title: t('cours.autoroute.entree_sortie.r1_t'), text: t('cours.autoroute.entree_sortie.r1_txt') },
        { title: t('cours.autoroute.entree_sortie.r2_t'), text: t('cours.autoroute.entree_sortie.r2_txt') },
        { title: t('cours.autoroute.entree_sortie.r3_t'), text: t('cours.autoroute.entree_sortie.r3_txt') },
        { title: t('cours.autoroute.entree_sortie.r4_t'), text: t('cours.autoroute.entree_sortie.r4_txt') }
      ],
      examples: [
        t('cours.autoroute.entree_sortie.ex1'),
        t('cours.autoroute.entree_sortie.ex2')
      ],
      color: "border-sky-500",
      bgBadge: "bg-sky-500 text-white",
      bgLight: "bg-sky-50"
    },
    {
      id: "voies",
      title: t('cours.autoroute.voies.title'),
      description: t('cours.autoroute.voies.desc'),
      rules: [
        { title: t('cours.autoroute.voies.r1_t'), text: t('cours.autoroute.voies.r1_txt') },
        { title: t('cours.autoroute.voies.r2_t'), text: t('cours.autoroute.voies.r2_txt') },
        { title: t('cours.autoroute.voies.r3_t'), text: t('cours.autoroute.voies.r3_txt') },
        { title: t('cours.autoroute.voies.r4_t'), text: t('cours.autoroute.voies.r4_txt') }
      ],
      examples: [
        t('cours.autoroute.voies.ex1'),
        t('cours.autoroute.voies.ex2')
      ],
      color: "border-blue-600",
      bgBadge: "bg-blue-600 text-white",
      bgLight: "bg-blue-50"
    },
    {
      id: "distances",
      title: t('cours.autoroute.securite.title'),
      description: t('cours.autoroute.securite.desc'),
      rules: [
        { title: t('cours.autoroute.securite.r1_t'), text: t('cours.autoroute.securite.r1_txt') },
        { title: t('cours.autoroute.securite.r2_t'), text: t('cours.autoroute.securite.r2_txt') },
        { title: t('cours.autoroute.securite.r3_t'), text: t('cours.autoroute.securite.r3_txt') },
        { title: t('cours.autoroute.securite.r4_t'), text: t('cours.autoroute.securite.r4_txt') }
      ],
      examples: [
        t('cours.autoroute.securite.ex1'),
        t('cours.autoroute.securite.ex2')
      ],
      color: "border-cyan-500",
      bgBadge: "bg-cyan-500 text-white",
      bgLight: "bg-cyan-50"
    }
  ];

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
              <span className="bg-sky-500 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm">{t('cours.autoroute.badge')}</span>
              <span className="text-sky-600 font-bold uppercase tracking-wider text-sm">{t('cours.autoroute.label')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('cours.autoroute.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {t('cours.autoroute.description')}
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
                    {t('ui.resolution_schema')}
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
                      💡 {t('ui.practical_cases')}
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

        <AnimatedSection>
          <div className="bg-gray-900 rounded-3xl p-10 text-center shadow-xl mt-8">
            <h2 className="text-3xl font-black text-white mb-4">{t('cours.autoroute.footer_title')}</h2>
            <p className="text-gray-400 font-medium mb-8">
              {t('cours.autoroute.footer_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/cours/5" className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-colors">
                {t('ui.prev_module', { number: 5 })}
              </Link>
              <Link href="/quiz" className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-xl transition-colors shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                {t('cours.autoroute.btn_test')}
              </Link>
              <Link href="/cours/7" className="px-6 py-3 rounded-xl border border-gray-700 text-white font-bold hover:bg-gray-800 transition-colors">
                {t('ui.next_module', { number: 7 })}
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
