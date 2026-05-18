'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import dynamic from 'next/dynamic';
import { Rock_Salt } from 'next/font/google';
import { Search, MapPin, Star, Heart, Navigation } from 'lucide-react';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

function MapLoadingSpinner() {
  const { t } = useLanguage();
  return (
    <div className="h-[500px] w-full bg-neutral-900 animate-pulse rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-white/5 shadow-2xl">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
      <span className="text-gray-500 font-bold tracking-widest uppercase text-xs">
        {t('auto_ecole.loading') || "Initialisation du radar..."}
      </span>
    </div>
  );
}

const MapClient = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <MapLoadingSpinner />
});

const mockAutoEcoles = [
  {
    id: 1,
    name: "Auto-École du Centre",
    address: "15 Rue de la République",
    city: "Paris",
    price: "750€",
    rating: 4.8,
    reviews: 124,
    features: ["Permis B", "Conduite accompagnée", "Boîte auto"]
  },
  {
    id: 2,
    name: "Le Volant d'Or",
    address: "8 Avenue Foch",
    city: "Paris",
    price: "690€",
    rating: 4.5,
    reviews: 89,
    features: ["Permis B", "Code accéléré"]
  },
  {
    id: 3,
    name: "Pass Permis",
    address: "42 Boulevard Haussmann",
    city: "Paris",
    price: "820€",
    rating: 4.9,
    reviews: 210,
    features: ["Permis B", "Moto", "Stage de récupération"]
  },
  {
    id: 4,
    name: "Top Conduite",
    address: "5 Rue des Fleurs",
    city: "Lyon",
    price: "650€",
    rating: 4.6,
    reviews: 56,
    features: ["Permis B", "Boîte auto"]
  },
  {
    id: 5,
    name: "Espace Conduite 69",
    address: "20 Quai Victor Hugo",
    city: "Lyon",
    price: "710€",
    rating: 4.7,
    reviews: 112,
    features: ["Permis B", "Conduite supervisée"]
  }
];

export default function AutoEcole() {
  const [searchCity, setSearchCity] = useState('');
  const [results, setResults] = useState<typeof mockAutoEcoles | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setIsSearching(true);
    
    setTimeout(() => {
      const filtered = mockAutoEcoles.filter(ae => 
        ae.city.toLowerCase().includes(searchCity.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
    }, 800);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-black min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <header className="text-center mb-16">
            <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 mb-6 ${rockSalt.className}`}>
              {t('auto_ecole.title')}
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
              {t('auto_ecole.subtitle')}
            </p>
          </header>
        </AnimatedSection>

        {/* Search Bar - Cyberpunk Style */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white/5 backdrop-blur-2xl p-2 rounded-3xl border border-white/10 mb-16 shadow-2xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="flex-grow relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder={t('auto_ecole.placeholder')}
                  className="block w-full pl-16 pr-6 py-6 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 focus:ring-0 outline-none transition-all text-white text-xl placeholder:text-gray-600"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSearching}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-6 bg-emerald-500 text-black rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center min-w-[220px] uppercase tracking-tighter"
              >
                {isSearching ? (
                  <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : t('auto_ecole.search')}
              </motion.button>
            </form>
          </div>
        </AnimatedSection>

        {/* Interactive Map Section */}
        <AnimatedSection delay={0.2}>
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/30">
                  <Navigation className="w-5 h-5" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">{t('auto_ecole.map_title')}</h2>
              </div>
              <div className="hidden md:flex items-center gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Signal Live</span>
                 </div>
              </div>
            </div>
            <MapClient />
          </div>
        </AnimatedSection>

        {/* Results Container */}
        <div className="space-y-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {results === null ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5"
              >
                 <div className="bg-violet-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                   <Search className="w-10 h-10 text-violet-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-3">{t('auto_ecole.ready_find')}</h3>
                 <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">{t('auto_ecole.ready_desc')}</p>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {results.map((ae, index) => (
                  <motion.div 
                    key={ae.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{ae.name}</h3>
                        <p className="text-gray-400 text-sm flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-violet-400" />
                          {ae.address}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleFavorite(ae.id)}
                        className={`p-3 rounded-2xl transition-all ${favorites.includes(ae.id) ? 'bg-rose-500/20 text-rose-500 border-rose-500/30' : 'bg-white/5 text-gray-500 border-white/10 hover:text-rose-400'} border`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(ae.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {ae.features.map(f => (
                        <span key={f} className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-bold">{ae.rating}</span>
                          <span className="text-gray-600 text-xs font-medium">({ae.reviews} {t('reviews')?.toLowerCase() || 'avis'})</span>
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{t('auto_ecole.price_label')}</p>
                        <p className="text-3xl font-black text-white tracking-tighter">{ae.price}</p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white/10 hover:bg-emerald-500 hover:text-black text-white rounded-xl font-bold text-sm transition-all border border-white/10"
                      >
                        {t('auto_ecole.details')}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="notfound"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/5 rounded-[3rem]"
              >
                <p className="text-xl text-gray-400 font-bold mb-8">
                  {t('auto_ecole.not_found')} <span className="text-emerald-400 italic">"{searchCity}"</span>
                </p>
                <button 
                  onClick={() => {setSearchCity(''); setResults(null);}} 
                  className="px-10 py-4 bg-emerald-500 text-black rounded-xl font-black text-lg hover:bg-emerald-400 transition-all shadow-lg"
                >
                  {t('auto_ecole.reset')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
