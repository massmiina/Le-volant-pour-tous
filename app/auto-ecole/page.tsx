'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import dynamic from 'next/dynamic';
import { Rock_Salt } from 'next/font/google';
import { Search, MapPin, Star, Heart, Navigation, X, Phone, Mail, Compass } from 'lucide-react';
import Link from 'next/link';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

// Localized translations for the operational map elements
const localT = {
  fr: {
    geolocate: "Me géolocaliser",
    geolocating: "Localisation...",
    distance: "À {d} km de vous",
    promo_title: "Créer un compte gratuit",
    promo_desc: "Rejoignez l'aventure pour sauvegarder vos auto-écoles favorites, suivre votre progression et vous entraîner en conditions réelles !",
    promo_login: "Se connecter",
    promo_register: "S'inscrire",
    promo_close: "Continuer en invité",
    sidebar_phone: "Appeler",
    sidebar_email: "Envoyer un e-mail",
    sidebar_features: "Prestations proposées",
    sidebar_direction: "Itinéraire Google Maps",
    sidebar_contact: "Contact direct",
    sidebar_reviews: "avis élèves",
    geolocated_success: "Position trouvée ! Tri par proximité activé.",
  },
  ru: {
    geolocate: "Найти меня",
    geolocating: "Поиск...",
    distance: "В {d} км от вас",
    promo_title: "Создать бесплатный аккаунт",
    promo_desc: "Присоединяйтесь, чтобы сохранять избранные автошколы, следить за своим прогрессом и тренироваться к экзаменам!",
    promo_login: "Войти",
    promo_register: "Регистрация",
    promo_close: "Продолжить как гость",
    sidebar_phone: "Позвонить",
    sidebar_email: "Написать письмо",
    sidebar_features: "Предоставляемые услуги",
    sidebar_direction: "Маршрут Google Maps",
    sidebar_contact: "Связаться напрямую",
    sidebar_reviews: "отзывов",
    geolocated_success: "Позиция найдена! Включена сортировка по близости.",
  }
};

interface AutoEcole {
  id: number;
  name: string;
  address: string;
  city: string;
  price: string;
  rating: number;
  reviews: number;
  features: string[];
  lat: number;
  lng: number;
  phone: string;
  email: string;
  distance?: number;
}

const mockAutoEcoles: AutoEcole[] = [
  {
    id: 1,
    name: "Auto-École du Centre",
    address: "15 Rue de la République",
    city: "Paris",
    price: "750€",
    rating: 4.8,
    reviews: 124,
    features: ["Permis B", "Conduite accompagnée", "Boîte auto"],
    lat: 48.8566,
    lng: 2.3522,
    phone: "+33 1 42 76 80 00",
    email: "contact@aecentre.fr"
  },
  {
    id: 2,
    name: "Le Volant d'Or",
    address: "8 Avenue Foch",
    city: "Paris",
    price: "690€",
    rating: 4.5,
    reviews: 89,
    features: ["Permis B", "Code accéléré"],
    lat: 48.8738,
    lng: 2.2950,
    phone: "+33 1 45 00 12 34",
    email: "contact@volantdor.fr"
  },
  {
    id: 3,
    name: "Pass Permis",
    address: "42 Boulevard Haussmann",
    city: "Paris",
    price: "820€",
    rating: 4.9,
    reviews: 210,
    features: ["Permis B", "Moto", "Stage de récupération"],
    lat: 48.8735,
    lng: 2.3323,
    phone: "+33 1 44 55 66 77",
    email: "info@passpermis.fr"
  },
  {
    id: 4,
    name: "Top Conduite",
    address: "5 Rue des Fleurs",
    city: "Lyon",
    price: "650€",
    rating: 4.6,
    reviews: 56,
    features: ["Permis B", "Boîte auto"],
    lat: 45.7640,
    lng: 4.8357,
    phone: "+33 4 72 00 11 22",
    email: "lyon@topconduite.fr"
  },
  {
    id: 5,
    name: "Espace Conduite 69",
    address: "20 Quai Victor Hugo",
    city: "Lyon",
    price: "710€",
    rating: 4.7,
    reviews: 112,
    features: ["Permis B", "Conduite supervisée"],
    lat: 45.7500,
    lng: 4.8500,
    phone: "+33 4 78 99 88 77",
    email: "contact@ec69.fr"
  },
  {
    id: 6,
    name: "Phocéenne Conduite",
    address: "88 Rue Paradis",
    city: "Marseille",
    price: "680€",
    rating: 4.7,
    reviews: 95,
    features: ["Permis B", "Permis A (Moto)", "Boîte auto"],
    lat: 43.2965,
    lng: 5.3698,
    phone: "+33 4 91 12 34 56",
    email: "info@phoceenneconduite.fr"
  },
  {
    id: 7,
    name: "Azur Auto-École",
    address: "12 Promenade des Anglais",
    city: "Nice",
    price: "790€",
    rating: 4.6,
    reviews: 74,
    features: ["Permis B", "Conduite accélérée"],
    lat: 43.7102,
    lng: 7.2620,
    phone: "+33 4 93 44 55 66",
    email: "nice@azurconduite.fr"
  },
  {
    id: 8,
    name: "Flandres Conduite",
    address: "24 Rue de Béthune",
    city: "Lille",
    price: "640€",
    rating: 4.8,
    reviews: 130,
    features: ["Permis B", "Boîte manuelle", "Code en ligne"],
    lat: 50.6292,
    lng: 3.0573,
    phone: "+33 3 20 12 34 56",
    email: "lille@flandresconduite.fr"
  }
];

// Haversine formula to compute distance in km
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return parseFloat(d.toFixed(1));
}

function MapLoadingSpinner() {
  const { t } = useLanguage();
  return (
    <div className="h-[300px] sm:h-[350px] w-full bg-neutral-900 animate-pulse rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-white/5 shadow-2xl">
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

export default function AutoEcole() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const lt = localT[language as 'fr' | 'ru'] || localT.fr;

  const [searchCity, setSearchCity] = useState('');
  const [results, setResults] = useState<AutoEcole[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // Interactive Map State
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]); // Center of France
  const [mapZoom, setMapZoom] = useState(6);
  const [selectedSchool, setSelectedSchool] = useState<AutoEcole | null>(null);
  
  // Geolocation & Favorites State
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Load database favorites on login
  useEffect(() => {
    if (user) {
      fetch('/api/user/favorites')
        .then(res => res.json())
        .then(data => {
          if (data.favorites) {
            setFavorites(data.favorites);
          }
        })
        .catch(err => console.error("Error loading favorites:", err));
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Synchronize dynamic search results to filter matching schools
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setIsSearching(true);
    setSelectedSchool(null);
    
    setTimeout(() => {
      const filtered = mockAutoEcoles.filter(ae => 
        ae.city.toLowerCase().includes(searchCity.toLowerCase()) ||
        ae.name.toLowerCase().includes(searchCity.toLowerCase()) ||
        ae.address.toLowerCase().includes(searchCity.toLowerCase())
      );

      // If user location exists, calculate distances to the matching results
      const finalResults = userLocation 
        ? filtered.map(ae => ({
            ...ae,
            distance: getDistance(userLocation[0], userLocation[1], ae.lat, ae.lng)
          })).sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
        : filtered;

      setResults(finalResults);
      setIsSearching(false);

      // Center camera to first matching school if available
      if (finalResults.length > 0) {
        setMapCenter([finalResults[0].lat, finalResults[0].lng]);
        setMapZoom(12);
      }
    }, 600);
  };

  // Toggle favorite school in database or trigger promotional modal
  const toggleFavorite = async (id: number) => {
    if (!user) {
      setShowPromoModal(true);
      return;
    }

    const updatedFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];

    setFavorites(updatedFavorites);

    try {
      await fetch('/api/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites: updatedFavorites })
      });
    } catch (e) {
      console.error("Error updating favorites:", e);
    }
  };

  // Handle Geolocation API
  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert(language === 'fr' ? "La géolocalisation n'est pas supportée." : "Геолокация не поддерживается.");
      return;
    }

    setIsGeolocating(true);
    setSelectedSchool(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setMapCenter([latitude, longitude]);
        setMapZoom(12);
        setIsGeolocating(false);

        // Sort all mock schools by proximity to user
        const sorted = mockAutoEcoles.map(ae => ({
          ...ae,
          distance: getDistance(latitude, longitude, ae.lat, ae.lng)
        })).sort((a, b) => a.distance - b.distance);

        setResults(sorted);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(language === 'fr' ? "Impossible de récupérer votre position." : "Не удалось определить ваше местоположение.");
        setIsGeolocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Selection callback when user clicks card details or map markers
  const selectSchool = (school: AutoEcole) => {
    setSelectedSchool(school);
    setMapCenter([school.lat, school.lng]);
    setMapZoom(14);
  };

  return (
    <div className="bg-black min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <header className="text-center mb-12">
            <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 mb-6 ${rockSalt.className}`}>
              {t('auto_ecole.title')}
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
              {t('auto_ecole.subtitle')}
            </p>
          </header>
        </AnimatedSection>

        {/* Search & Geolocate panel */}
        <AnimatedSection delay={0.1}>
          <div className="bg-white/5 backdrop-blur-2xl p-3 rounded-3xl border border-white/10 mb-12 shadow-2xl flex flex-col md:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-grow flex flex-col sm:flex-row gap-2">
              <div className="flex-grow relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder={t('auto_ecole.placeholder')}
                  className="block w-full pl-14 pr-4 py-5 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 focus:ring-0 outline-none transition-all text-white text-lg placeholder:text-gray-600"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSearching}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 bg-emerald-500 text-black rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center min-w-[160px] uppercase tracking-tighter"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : t('auto_ecole.search')}
              </motion.button>
            </form>
            
            <motion.button
              onClick={handleGeolocate}
              disabled={isGeolocating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black text-lg border border-violet-500/30 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(139,92,246,0.2)] disabled:opacity-50"
            >
              <Compass className={`w-5 h-5 ${isGeolocating ? 'animate-spin' : ''}`} />
              <span className="uppercase tracking-tighter text-sm">
                {isGeolocating ? lt.geolocating : lt.geolocate}
              </span>
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Interactive Map */}
        <AnimatedSection delay={0.2}>
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/30">
                  <Navigation className="w-5 h-5 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{t('auto_ecole.map_title')}</h2>
              </div>
            </div>
            
            <MapClient 
              locations={results || mockAutoEcoles}
              selectedId={selectedSchool?.id || null}
              onSelect={(id) => {
                const found = mockAutoEcoles.find(ae => ae.id === id);
                if (found) selectSchool(found);
              }}
              center={mapCenter}
              zoom={mapZoom}
              userLocation={userLocation}
            />
          </div>
        </AnimatedSection>

        {/* Results Listings */}
        <div className="space-y-6 min-h-[350px]">
          <AnimatePresence mode="wait">
            {results === null ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-white/5 rounded-[2.5rem] border border-white/5"
              >
                 <div className="bg-violet-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                   <Search className="w-8 h-8 text-violet-400 animate-pulse" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">{t('auto_ecole.ready_find')}</h3>
                 <p className="text-gray-500 max-w-sm mx-auto leading-relaxed text-sm">{t('auto_ecole.ready_desc')}</p>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {results.map((ae, index) => {
                  const isFav = favorites.includes(ae.id);
                  const isSelected = selectedSchool?.id === ae.id;
                  
                  return (
                    <motion.div 
                      key={ae.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 }}
                      className={`bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border transition-all duration-300 relative overflow-hidden group ${
                        isSelected ? 'border-emerald-400 bg-emerald-950/5 shadow-[0_0_25px_rgba(16,185,129,0.1)]' : 'border-white/10 hover:border-emerald-500/20'
                      }`}
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full transition-all ${
                        isSelected ? 'bg-emerald-500' : 'bg-emerald-500/0 group-hover:bg-emerald-500/40'
                      }`}></div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow pr-2">
                          <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-emerald-400 transition-colors">{ae.name}</h3>
                          
                          <div className="flex flex-wrap gap-x-3 gap-y-1 items-center text-xs">
                            <span className="text-gray-400 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-violet-400" />
                              {ae.address}
                            </span>
                            
                            {ae.distance !== undefined && (
                              <span className="text-cyan-400 font-extrabold flex items-center gap-1">
                                <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                                {lt.distance.replace("{d}", String(ae.distance))}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => toggleFavorite(ae.id)}
                          className={`p-2.5 rounded-xl border transition-all ${
                            isFav ? 'bg-rose-500/20 text-rose-500 border-rose-500/40' : 'bg-white/5 text-gray-500 border-white/5 hover:text-rose-400 hover:bg-rose-950/20'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current animate-bounce' : ''}`} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {ae.features.map(f => (
                          <span key={f} className="px-2.5 py-0.5 bg-white/5 text-gray-400 rounded-md text-[9px] font-bold uppercase tracking-widest border border-white/5">
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1 text-xs">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            <span className="text-white font-bold">{ae.rating}</span>
                            <span className="text-gray-500 font-medium">({ae.reviews} {lt.sidebar_reviews})</span>
                          </div>
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black mb-0.5">{t('auto_ecole.price_label')}</p>
                          <p className="text-2xl font-black text-white tracking-tighter">{ae.price}</p>
                        </div>
                        
                        <motion.button 
                          onClick={() => selectSchool(ae)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all border ${
                            isSelected 
                              ? 'bg-emerald-500 text-black border-emerald-400' 
                              : 'bg-white/5 hover:bg-emerald-500 hover:text-black text-white border-white/10'
                          }`}
                        >
                          {t('auto_ecole.details')}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                key="notfound"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/5 rounded-[2.5rem]"
              >
                <p className="text-lg text-gray-400 font-bold mb-6">
                  {t('auto_ecole.not_found')} <span className="text-emerald-400 italic">"{searchCity}"</span>
                </p>
                <button 
                  onClick={() => {setSearchCity(''); setResults(null);}} 
                  className="px-8 py-3.5 bg-emerald-500 text-black rounded-xl font-black hover:bg-emerald-400 transition-all shadow-lg"
                >
                  {t('auto_ecole.reset')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cyberpunk Detailed Slide Sidebar Panel */}
      <AnimatePresence>
        {selectedSchool && (
          <>
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSchool(null)}
              className="fixed inset-0 bg-black z-40"
            />
            
            {/* Slide Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-neutral-950/95 backdrop-blur-2xl border-l border-white/10 z-50 p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-grow pr-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] uppercase tracking-wider font-extrabold">Partenaire Officiel</span>
                  </div>
                  <h2 className="text-2xl font-black text-white leading-tight">{selectedSchool.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedSchool(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location Detail & Distance */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-gray-200">{selectedSchool.address}</p>
                      <p className="text-xs text-gray-500">{selectedSchool.city}, France</p>
                    </div>
                  </div>
                  
                  {selectedSchool.distance !== undefined && (
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-black border-t border-white/5 pt-2 mt-2">
                      <Compass className="w-4 h-4 animate-pulse" />
                      <span>{lt.distance.replace("{d}", String(selectedSchool.distance))}</span>
                    </div>
                  )}
                </div>

                {/* Rating Info */}
                <div className="flex gap-4">
                  <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-yellow-400 mb-0.5">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white font-extrabold text-sm">{selectedSchool.rating}</span>
                    </div>
                    <span className="text-[9px] text-gray-500 uppercase font-black">{selectedSchool.reviews} {lt.sidebar_reviews}</span>
                  </div>
                  
                  <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-sm">{selectedSchool.price}</span>
                    <span className="text-[9px] text-gray-500 uppercase font-black">{t('auto_ecole.price_label')}</span>
                  </div>
                </div>
              </div>

              {/* Prestations */}
              <div className="mb-8">
                <h3 className="text-xs font-black text-violet-400 uppercase tracking-widest mb-3">{lt.sidebar_features}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSchool.features.map(f => (
                    <span key={f} className="px-3 py-1 bg-violet-500/10 text-violet-300 rounded-lg text-xs font-bold border border-violet-500/20">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct contacts */}
              <div className="mt-auto space-y-4">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">{lt.sidebar_contact}</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={`tel:${selectedSchool.phone}`} 
                    className="p-4 bg-white/5 hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/30 rounded-2xl flex flex-col items-center gap-2 transition-all group"
                  >
                    <Phone className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-black text-gray-300">{lt.sidebar_phone}</span>
                  </a>
                  
                  <a 
                    href={`mailto:${selectedSchool.email}`} 
                    className="p-4 bg-white/5 hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/30 rounded-2xl flex flex-col items-center gap-2 transition-all group"
                  >
                    <Mail className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-black text-gray-300">{lt.sidebar_email}</span>
                  </a>
                </div>

                <motion.button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedSchool.lat},${selectedSchool.lng}`, '_blank')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black uppercase tracking-wider text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  {lt.sidebar_direction}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Guest Login Promotion Modal */}
      <AnimatePresence>
        {showPromoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromoModal(false)}
              className="absolute inset-0 bg-black"
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-neutral-900 border border-violet-500/30 rounded-3xl p-8 max-w-md w-full relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] text-center z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
              
              <div className="w-16 h-16 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                ⭐
              </div>

              <h3 className={`text-2xl font-bold text-white mb-3 ${rockSalt.className}`}>{lt.promo_title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">{lt.promo_desc}</p>

              <div className="space-y-3">
                <Link href="/register">
                  <button 
                    onClick={() => setShowPromoModal(false)}
                    className="w-full py-4 bg-gradient-to-r from-violet-400 to-emerald-400 hover:from-violet-300 hover:to-emerald-300 text-black font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] text-xs"
                  >
                    {lt.promo_register}
                  </button>
                </Link>
                
                <Link href="/login">
                  <button 
                    onClick={() => setShowPromoModal(false)}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-wider rounded-xl transition-colors text-xs"
                  >
                    {lt.promo_login}
                  </button>
                </Link>

                <button 
                  onClick={() => setShowPromoModal(false)}
                  className="w-full pt-4 text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
                >
                  {lt.promo_close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
