'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-[2rem] flex flex-col items-center justify-center border-4 border-white shadow-xl">
      <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      <span className="text-gray-400 font-bold">Chargement de la carte des auto-écoles...</span>
    </div>
  )
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

  return (
    <div className="bg-gray-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <header className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
              {t('auto_ecole.title')}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {t('auto_ecole.subtitle')}
            </p>
          </header>
        </AnimatedSection>

        {/* Search Bar - Animated */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 mb-16 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 transition-all duration-500 group-focus-within:w-4"></div>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder={t('auto_ecole.placeholder')}
                  className="block w-full pl-6 pr-4 py-5 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-medium"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSearching}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 flex items-center justify-center min-w-[200px]"
              >
                {isSearching ? (
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : t('auto_ecole.search')}
              </motion.button>
            </form>
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
              <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">{t('auto_ecole.suggestions')}</span>
              {['Paris', 'Lyon', 'Marseille'].map(city => (
                <button 
                  key={city} 
                  onClick={() => setSearchCity(city)} 
                  className="text-sm text-blue-600 font-black hover:text-blue-800 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Interactive Map Section */}
        <AnimatedSection delay={0.2}>
          <div className="mb-16 relative z-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">{t('auto_ecole.map_title') || 'Écoles à proximité'}</h2>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('auto_ecole.detailed_view') || "Vue détaillée"}</span>
            </div>
            <MapClient />
          </div>
        </AnimatedSection>

        {/* Results with AnimatePresence */}
        <div className="space-y-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {results === null ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white rounded-[2.5rem] border-4 border-dashed border-gray-100"
              >
                 <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                   <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 mb-2">{t('auto_ecole.ready_find')}</h3>
                 <p className="text-lg text-gray-500 font-medium">{t('auto_ecole.ready_desc')}</p>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    {results.length} {t('auto_ecole.found')} <span className="text-blue-600 italic">"{searchCity}"</span>
                  </h2>
                   <div className="flex-grow h-1 bg-gray-100 rounded-full"></div>
                </div>

                {results.map((ae, index) => (
                  <motion.div 
                    key={ae.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, rotate: 0.5 }}
                    className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all border-l-8 border-l-blue-500 overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                       <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                       </svg>
                    </div>

                    <div className="md:w-1/3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{ae.name}</h3>
                        <p className="text-lg text-gray-500 font-medium mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {ae.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl inline-flex w-fit">
                        <span className="font-black text-yellow-700 text-xl">{ae.rating}</span>
                        <div className="flex text-yellow-500">
                          {[1,2,3,4,5].map(s => <span key={s} className="text-xs">★</span>)}
                        </div>
                        <span className="text-gray-400 text-sm font-bold ml-2">({ae.reviews})</span>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-3 mb-8">
                        {ae.features.map(f => (
                          <span key={f} className="px-5 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-black uppercase tracking-widest border border-gray-100">
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100/50">
                        <div>
                          <span className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">{t('auto_ecole.price_label')}</span>
                          <p className="text-4xl font-black text-blue-700 tracking-tighter">{ae.price}</p>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-lg shadow-lg shadow-blue-100 transition-all border-2 border-transparent hover:border-blue-500"
                        >
                          {t('auto_ecole.details')}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="notfound"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[2.5rem]"
              >
                <p className="text-2xl text-gray-500 font-black mb-8">{t('auto_ecole.not_found')} <span className="text-red-500">"{searchCity}"</span></p>
                <button 
                  onClick={() => {setSearchCity(''); setResults(null);}} 
                  className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all"
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
