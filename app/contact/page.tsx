'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "contact@levolantpourtous.fr",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('contact.info_phone') ? "Phone" : "Телефон", // Fallback if specific key missing
      value: "+33 1 23 45 67 89",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Address",
      value: "123 Avenue du Permis, 75000 Paris",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A061E] text-white pt-16 pb-12 px-6 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-300 to-emerald-400"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-violet-100/60 max-w-2xl mx-auto"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-violet-200/50 uppercase tracking-widest ml-1">{t('contact.form_name')}</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-violet-500/40 outline-none transition-all placeholder:text-white/10"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-violet-200/50 uppercase tracking-widest ml-1">{t('contact.form_email')}</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-violet-500/40 outline-none transition-all placeholder:text-white/10"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-violet-200/50 uppercase tracking-widest ml-1">{t('contact.form_subject')}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-violet-500/40 outline-none transition-all placeholder:text-white/10"
                    placeholder={t('contact.form_subject')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-violet-200/50 uppercase tracking-widest ml-1">{t('contact.form_message')}</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-violet-500/40 outline-none transition-all resize-none placeholder:text-white/10"
                    placeholder="..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'sending'}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                    formStatus === 'success' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500'
                  }`}
                >
                  {formStatus === 'idle' && (
                    <>
                      {t('contact.form_submit')}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                  {formStatus === 'sending' && (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  )}
                  {formStatus === 'success' && (
                    <>
                      {t('contact.success')}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Details */}
          <div className="space-y-8">
            <AnimatedSection delay={0.3}>
              <h2 className="text-3xl font-bold mb-8 ml-2">{t('contact.info_title')}</h2>
              <div className="grid gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-6 transition-colors group cursor-default"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/30 uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg font-medium text-white/90">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Social Links or Map Placeholder */}
            <AnimatedSection delay={0.5}>
              <div className="bg-gradient-to-br from-violet-600/20 to-emerald-600/20 border border-white/10 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Suivez-nous sur les réseaux</h3>
                <div className="flex justify-center gap-4 relative z-10">
                  {['IG', 'FB', 'TW', 'LN'].map((social) => (
                    <motion.button
                      key={social}
                      whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                      className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                    >
                      {social}
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
