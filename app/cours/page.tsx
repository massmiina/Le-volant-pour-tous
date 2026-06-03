'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Cours() {
  const { t } = useLanguage();

  const modules = [
    {
      id: 1,
      title: t('cours.modules_list.m1_title'),
      description: t('cours.modules_list.m1_desc'),
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: t('cours.modules_list.m2_title'),
      description: t('cours.modules_list.m2_desc'),
      color: "from-amber-500 to-yellow-400"
    },
    {
      id: 3,
      title: t('cours.modules_list.m3_title'),
      description: t('cours.modules_list.m3_desc'),
      color: "from-emerald-500 to-teal-400"
    },
    {
      id: 4,
      title: t('cours.modules_list.m4_title'),
      description: t('cours.modules_list.m4_desc'),
      color: "from-indigo-500 to-blue-400"
    },
    {
      id: 5,
      title: t('cours.modules_list.m5_title'),
      description: t('cours.modules_list.m5_desc'),
      color: "from-fuchsia-500 to-pink-400"
    },
    {
      id: 6,
      title: t('cours.modules_list.m6_title'),
      description: t('cours.modules_list.m6_desc'),
      color: "from-sky-500 to-cyan-400"
    },
    {
      id: 7,
      title: t('cours.modules_list.m7_title'),
      description: t('cours.modules_list.m7_desc'),
      color: "from-rose-500 to-red-400"
    },
    {
      id: 8,
      title: t('cours.modules_list.m8_title'),
      description: t('cours.modules_list.m8_desc'),
      color: "from-purple-500 to-violet-400"
    },
    {
      id: 9,
      title: t('cours.modules_list.m9_title'),
      description: t('cours.modules_list.m9_desc'),
      color: "from-slate-500 to-gray-400"
    },
    {
      id: 10,
      title: t('cours.modules_list.m10_title'),
      description: t('cours.modules_list.m10_desc'),
      color: "from-green-500 to-lime-400"
    },
    {
      id: 11,
      title: t('cours.modules_list.m11_title'),
      description: t('cours.modules_list.m11_desc'),
      color: "from-red-500 to-orange-400"
    },
    {
      id: 12,
      title: t('cours.modules_list.m12_title'),
      description: t('cours.modules_list.m12_desc'),
      color: "from-yellow-500 to-amber-400"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <header className="mb-24 text-center">
            <h1 className="text-5xl font-black text-gray-900 sm:text-6xl tracking-tighter mb-6">
              {t('cours.global_title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('cours.global_subtitle')}
            </p>
          </header>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-32">
          {modules.map((module, index) => (
            <AnimatedSection key={module.id} delay={index * 0.05}>
              <motion.div 
                whileHover={{ scale: 1.03, y: -5 }}
                className="group h-full flex flex-col bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${module.color}`}></div>
                
                <span className="text-5xl font-black text-gray-100 font-mono absolute top-4 right-4 opacity-5 z-0 select-none">
                  {module.id < 10 ? `0${module.id}` : module.id}
                </span>

                <div className="relative z-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight mt-4">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-600 font-medium leading-relaxed mb-8 flex-grow">
                    {module.description}
                  </p>
                  
                  <Link href={`/cours/${module.id}`} className="mt-auto group-hover:bg-blue-50 inline-flex items-center justify-center w-full py-4 rounded-xl text-sm font-black text-blue-600 uppercase tracking-widest transition-colors border border-gray-100 group-hover:border-blue-100">
                    {t('cours.btn_view')}
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <h2 className="text-4xl font-black mb-6 tracking-tighter">{t('quiz.finished')}</h2>
              <p className="text-xl text-blue-50 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                {t('home.advanced_desc')}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/quiz" className="inline-block px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-white/20">
                  {t('quiz.restart')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
