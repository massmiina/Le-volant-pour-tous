'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';

interface Review {
  id: number;
  author: string;
  text: string;
  date: string;
  rating: number;
}

const initialReviews: Review[] = [
  {
    id: 1,
    author: "Jean Dupont",
    text: "Super plateforme ! J'ai obtenu mon code du premier coup grâce aux fiches de signalisation. Je recommande vivement.",
    date: "Il y a 2 jours",
    rating: 5
  },
  {
    id: 2,
    author: "Marie Curie",
    text: "Les cours sur les priorités sont très clairs. Dommage qu'il n'y ait pas plus de quiz, mais l'essentiel est là.",
    date: "Il y a 1 semaine",
    rating: 4
  }
];

export default function Avis() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || !authorName.trim()) return;

    const review: Review = {
      id: Date.now(),
      author: authorName,
      text: newReview,
      date: t('avis.just_now'),
      rating: rating
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setAuthorName('');
    setRating(5);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <header className="text-center mb-20">
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
              {t('avis.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {t('avis.subtitle')}
            </p>
          </header>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Submission Form - Animated */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.1}>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 sticky top-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16"></div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-3 tracking-tight">
                  <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  {t('avis.leave_review')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('avis.name')}</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-orange-500 focus:ring-0 outline-none transition-all font-bold text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('avis.rating')}</label>
                    <div className="flex gap-2">
                       {[1,2,3,4,5].map(n => (
                         <button 
                           key={n}
                           type="button"
                           onClick={() => setRating(n)}
                           className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${rating >= n ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 opacity-50'}`}
                         >
                           ★
                         </button>
                       ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('avis.message')}</label>
                    <textarea
                      required
                      rows={5}
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder={t('avis.placeholder')}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-orange-500 focus:ring-0 outline-none transition-all resize-none font-medium text-lg leading-relaxed"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-orange-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-orange-700 transition-colors shadow-2xl shadow-orange-100"
                  >
                    {t('avis.send')}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>

          {/* Reviews List - Animated */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.2}>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  {t('avis.latest')}
                </h2>
                <div className="flex items-center gap-3 bg-blue-50 px-6 py-2 rounded-2xl">
                   <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                   <span className="text-blue-700 font-black text-sm uppercase tracking-widest">
                     {reviews.length} {t('nav.reviews')}
                   </span>
                </div>
              </div>
            </AnimatedSection>
            
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {reviews.map((review, index) => (
                  <motion.div 
                    key={review.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                       <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01701V13.5H12.017C14.4938 13.5 16.517 11.4768 16.517 9V6C16.517 4.89543 15.6216 4 14.517 4H9.51701C8.41244 4 7.51701 4.89543 7.51701 6V16C7.51701 18.7614 9.75559 21 12.517 21H14.017Z" />
                       </svg>
                    </div>

                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl">
                          {review.author[0]}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 tracking-tight">{review.author}</h3>
                          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 text-orange-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xl ${i < review.rating ? 'opacity-100' : 'opacity-20'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 leading-relaxed italic font-medium relative z-10 border-l-4 border-orange-100 pl-8">
                      “{review.text}”
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
