'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import dynamic from 'next/dynamic';
import { Rock_Salt } from 'next/font/google';
import {
  Compass,
  ExternalLink,
  Globe,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import Link from 'next/link';
import type { DrivingSchoolSearchResult, FavoriteSchoolRef } from '@/lib/driving-schools/types';
import { getDistanceKmLabel } from '@/lib/driving-schools/geo';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

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
    sidebar_website: "Site web",
    sidebar_direction: "Itinéraire Google Maps",
    sidebar_contact: "Contact direct",
    sidebar_reviews: "avis",
    featured: "Recommandée",
    google_result: "Résultat Google",
    missing_key: "Configurez les clés Google Maps dans .env.local pour activer la recherche réelle.",
    search_error: "Impossible de charger les auto-écoles pour le moment.",
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
    sidebar_website: "Сайт",
    sidebar_direction: "Маршрут Google Maps",
    sidebar_contact: "Связаться напрямую",
    sidebar_reviews: "отзывов",
    featured: "Рекомендовано",
    google_result: "Google результат",
    missing_key: "Добавьте ключи Google Maps в .env.local, чтобы включить настоящий поиск.",
    search_error: "Сейчас не удалось загрузить автошколы.",
  },
};

interface SearchResponse {
  results?: DrivingSchoolSearchResult[];
  error?: string;
}

interface DetailsResponse {
  school?: DrivingSchoolSearchResult;
  error?: string;
}

interface FavoritesResponse {
  favorites?: FavoriteSchoolRef[];
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

const MapClient = dynamic(() => import('@/components/GoogleMapComponent'), {
  ssr: false,
  loading: () => <MapLoadingSpinner />,
});

export default function AutoEcole() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const lt = localT[language as 'fr' | 'ru'] || localT.fr;

  const [searchCity, setSearchCity] = useState('');
  const [results, setResults] = useState<DrivingSchoolSearchResult[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]);
  const [mapZoom, setMapZoom] = useState(6);
  const [selectedSchool, setSelectedSchool] = useState<DrivingSchoolSearchResult | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [favoriteRefs, setFavoriteRefs] = useState<FavoriteSchoolRef[]>([]);
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavoriteRefs([]);
      return;
    }

    fetch('/api/user/favorites')
      .then((res) => res.json())
      .then((data: FavoritesResponse) => {
        setFavoriteRefs(data.favorites ?? []);
      })
      .catch((err) => console.error("Error loading favorites:", err));
  }, [user]);

  const applyFavoriteState = useCallback(
    (schools: DrivingSchoolSearchResult[]) =>
      schools.map((school) => ({
        ...school,
        isUserFavorite: isFavoriteSchool(school, favoriteRefs),
      })),
    [favoriteRefs],
  );

  useEffect(() => {
    setResults((current) => (current ? applyFavoriteState(current) : current));
    setSelectedSchool((current) =>
      current
        ? {
            ...current,
            isUserFavorite: isFavoriteSchool(current, favoriteRefs),
          }
        : current,
    );
  }, [applyFavoriteState, favoriteRefs]);

  const runSearch = async (query: string, location?: [number, number]) => {
    const params = new URLSearchParams({ query });
    if (location) {
      params.set('lat', String(location[0]));
      params.set('lng', String(location[1]));
    }

    setIsSearching(true);
    setSearchError(null);
    setSelectedSchool(null);

    try {
      const response = await fetch(`/api/driving-schools/search?${params.toString()}`);
      const data = (await response.json()) as SearchResponse;

      if (!response.ok) {
        throw new Error(data.error ?? 'Search failed');
      }

      const nextResults = applyFavoriteState(data.results ?? []);
      setResults(nextResults);

      if (nextResults.length > 0) {
        setMapCenter([nextResults[0].lat, nextResults[0].lng]);
        setMapZoom(12);
      }
    } catch (error) {
      console.error('Driving school search failed:', error);
      setSearchError(lt.search_error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const runNearbySearch = async (lat: number, lng: number) => {
    setIsSearching(true);
    setSearchError(null);
    setSelectedSchool(null);

    try {
      const params = new URLSearchParams({
        lat: String(lat),
        lng: String(lng),
        radius: '10000',
      });
      const response = await fetch(`/api/driving-schools/nearby?${params.toString()}`);
      const data = (await response.json()) as SearchResponse;

      if (!response.ok) {
        throw new Error(data.error ?? 'Nearby search failed');
      }

      const nextResults = applyFavoriteState(data.results ?? []);
      setResults(nextResults);
      setMapCenter([lat, lng]);
      setMapZoom(12);
    } catch (error) {
      console.error('Nearby driving school search failed:', error);
      setSearchError(lt.search_error);
      setResults([]);
    } finally {
      setIsSearching(false);
      setIsGeolocating(false);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    void runSearch(searchCity.trim(), userLocation ?? undefined);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert(language === 'fr' ? "La géolocalisation n'est pas supportée." : "Геолокация не поддерживается.");
      return;
    }

    setIsGeolocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(location);
        void runNearbySearch(location[0], location[1]);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(language === 'fr' ? "Impossible de récupérer votre position." : "Не удалось определить ваше местоположение.");
        setIsGeolocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const selectSchool = useCallback((school: DrivingSchoolSearchResult) => {
    const nextSchool = {
      ...school,
      isUserFavorite: isFavoriteSchool(school, favoriteRefs),
    };
    setSelectedSchool(nextSchool);
    setMapCenter([school.lat, school.lng]);
    setMapZoom(14);

    if (school.googlePlaceId) {
      void fetch(`/api/driving-schools/details?placeId=${encodeURIComponent(school.googlePlaceId)}`)
        .then((res) => res.json())
        .then((data: DetailsResponse) => {
          if (!data.school) return;
          const detailed = {
            ...nextSchool,
            ...data.school,
            isUserFavorite: isFavoriteSchool(data.school, favoriteRefs),
          };
          setSelectedSchool(detailed);
          setResults((current) =>
            current
              ? current.map((item) => (item.id === detailed.id ? { ...item, ...detailed } : item))
              : current,
          );
        })
        .catch((error) => console.error('Driving school details failed:', error));
    }
  }, [favoriteRefs]);

  const toggleFavorite = async (school: DrivingSchoolSearchResult) => {
    if (!user) {
      setShowPromoModal(true);
      return;
    }

    const nextIsFavorite = !school.isUserFavorite;
    updateFavoriteState(school, nextIsFavorite);

    try {
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: nextIsFavorite ? 'add' : 'remove',
          googlePlaceId: school.googlePlaceId,
          partnerId: school.partnerId,
        }),
      });
      const data = (await response.json()) as FavoritesResponse;

      if (!response.ok) {
        throw new Error('Favorite update failed');
      }

      setFavoriteRefs(data.favorites ?? []);
    } catch (error) {
      console.error("Error updating favorites:", error);
      updateFavoriteState(school, !nextIsFavorite);
    }
  };

  const updateFavoriteState = (school: DrivingSchoolSearchResult, isUserFavorite: boolean) => {
    setResults((current) =>
      current
        ? current.map((item) =>
            sameSchoolRef(item, school) ? { ...item, isUserFavorite } : item,
          )
        : current,
    );
    setSelectedSchool((current) =>
      current && sameSchoolRef(current, school) ? { ...current, isUserFavorite } : current,
    );
  };

  const resetSearch = () => {
    setSearchCity('');
    setResults(null);
    setSearchError(null);
    setSelectedSchool(null);
    setMapCenter([46.603354, 1.888334]);
    setMapZoom(6);
  };

  return (
    <div className="bg-black min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
              disabled={isGeolocating || isSearching}
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

        {searchError && (
          <div className="mb-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm font-bold text-amber-200">
            {searchError}
          </div>
        )}

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
              locations={results ?? []}
              selectedId={selectedSchool?.id ?? null}
              onSelect={selectSchool}
              center={mapCenter}
              zoom={mapZoom}
              userLocation={userLocation}
            />
          </div>
        </AnimatedSection>

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
                {results.map((school, index) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    index={index}
                    isSelected={selectedSchool?.id === school.id}
                    lt={lt}
                    onSelect={selectSchool}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="notfound"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/5 rounded-[2.5rem]"
              >
                <p className="text-lg text-gray-400 font-bold mb-6">
                  {searchError ?? t('auto_ecole.not_found')} {searchCity && <span className="text-emerald-400 italic">&quot;{searchCity}&quot;</span>}
                </p>
                <button
                  onClick={resetSearch}
                  className="px-8 py-3.5 bg-emerald-500 text-black rounded-xl font-black hover:bg-emerald-400 transition-all shadow-lg"
                >
                  {t('auto_ecole.reset')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedSchool && (
          <SchoolDetailsSidebar
            school={selectedSchool}
            lt={lt}
            onClose={() => setSelectedSchool(null)}
          />
        )}
      </AnimatePresence>

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

function SchoolCard({
  school,
  index,
  isSelected,
  lt,
  onSelect,
  onToggleFavorite,
}: {
  school: DrivingSchoolSearchResult;
  index: number;
  isSelected: boolean;
  lt: (typeof localT)['fr'];
  onSelect: (school: DrivingSchoolSearchResult) => void;
  onToggleFavorite: (school: DrivingSchoolSearchResult) => void;
}) {
  const distanceLabel = getDistanceKmLabel(school.distanceMeters);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className={`bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border transition-all duration-300 relative overflow-hidden group ${
        isSelected ? 'border-emerald-400 bg-emerald-950/5 shadow-[0_0_25px_rgba(16,185,129,0.1)]' : 'border-white/10 hover:border-emerald-500/20'
      }`}
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full transition-all ${
        isSelected ? 'bg-emerald-500' : school.isFeatured ? 'bg-emerald-500/70' : 'bg-emerald-500/0 group-hover:bg-emerald-500/40'
      }`}></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow pr-2">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {school.isFeatured ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 rounded text-[9px] uppercase tracking-wider font-extrabold">
                <ShieldCheck className="w-3 h-3" />
                {school.featuredLabel ?? lt.featured}
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded text-[9px] uppercase tracking-wider font-extrabold">
                {lt.google_result}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-emerald-400 transition-colors">{school.name}</h3>

          <div className="flex flex-wrap gap-x-3 gap-y-1 items-center text-xs">
            <span className="text-gray-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-400" />
              {school.address || 'Adresse Google Maps'}
            </span>

            {distanceLabel && (
              <span className="text-cyan-400 font-extrabold flex items-center gap-1">
                <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                {lt.distance.replace('{d}', distanceLabel)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onToggleFavorite(school)}
          className={`p-2.5 rounded-xl border transition-all ${
            school.isUserFavorite ? 'bg-rose-500/20 text-rose-500 border-rose-500/40' : 'bg-white/5 text-gray-500 border-white/5 hover:text-rose-400 hover:bg-rose-950/20'
          }`}
        >
          <Heart className={`w-4 h-4 ${school.isUserFavorite ? 'fill-current animate-bounce' : ''}`} />
        </button>
      </div>

      <div className="flex justify-between items-end">
        <div>
          {school.rating !== undefined ? (
            <div className="flex items-center gap-1.5 mb-1 text-xs">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span className="text-white font-bold">{school.rating}</span>
              {school.reviews !== undefined && (
                <span className="text-gray-500 font-medium">({school.reviews} {lt.sidebar_reviews})</span>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-500 font-bold mb-1">Note non disponible</p>
          )}
          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Google Places</p>
        </div>

        <motion.button
          onClick={() => onSelect(school)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all border ${
            isSelected
              ? 'bg-emerald-500 text-black border-emerald-400'
              : 'bg-white/5 hover:bg-emerald-500 hover:text-black text-white border-white/10'
          }`}
        >
          Détails
        </motion.button>
      </div>
    </motion.div>
  );
}

function SchoolDetailsSidebar({
  school,
  lt,
  onClose,
}: {
  school: DrivingSchoolSearchResult;
  lt: (typeof localT)['fr'];
  onClose: () => void;
}) {
  const distanceLabel = getDistanceKmLabel(school.distanceMeters);
  const directionsUrl =
    school.googleMapsUri ??
    `https://www.google.com/maps/dir/?api=1&destination=${school.lat},${school.lng}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black z-40"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-neutral-950/95 backdrop-blur-2xl border-l border-white/10 z-50 p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex-grow pr-2">
            <div className="flex items-center gap-2 mb-2">
              {school.isFeatured ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] uppercase tracking-wider font-extrabold">
                  <ShieldCheck className="w-3 h-3" />
                  {school.featuredLabel ?? lt.featured}
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-violet-500/10 text-violet-300 border border-violet-500/20 rounded text-[9px] uppercase tracking-wider font-extrabold">
                  {lt.google_result}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">{school.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-200">{school.address || 'Adresse Google Maps'}</p>
                {school.city && <p className="text-xs text-gray-500">{school.city}</p>}
              </div>
            </div>

            {distanceLabel && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-black border-t border-white/5 pt-2 mt-2">
                <Compass className="w-4 h-4 animate-pulse" />
                <span>{lt.distance.replace('{d}', distanceLabel)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
              {school.rating !== undefined ? (
                <div className="flex items-center gap-1.5 text-yellow-400 mb-0.5">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-extrabold text-sm">{school.rating}</span>
                </div>
              ) : (
                <span className="text-white font-extrabold text-sm">N/A</span>
              )}
              <span className="text-[9px] text-gray-500 uppercase font-black">
                {school.reviews !== undefined ? `${school.reviews} ${lt.sidebar_reviews}` : 'Google Places'}
              </span>
            </div>

            <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
              <span className="text-white font-black text-sm">{school.isFeatured ? lt.featured : 'Public'}</span>
              <span className="text-[9px] text-gray-500 uppercase font-black">Statut</span>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">{lt.sidebar_contact}</h3>

          <div className="grid grid-cols-2 gap-3">
            {school.phone ? (
              <a
                href={`tel:${school.phone}`}
                className="p-4 bg-white/5 hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/30 rounded-2xl flex flex-col items-center gap-2 transition-all group"
              >
                <Phone className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-black text-gray-300">{lt.sidebar_phone}</span>
              </a>
            ) : (
              <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col items-center gap-2 opacity-40">
                <Phone className="w-5 h-5 text-gray-500" />
                <span className="text-[10px] uppercase font-black text-gray-500">{lt.sidebar_phone}</span>
              </div>
            )}

            {school.website ? (
              <a
                href={school.website}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white/5 hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/30 rounded-2xl flex flex-col items-center gap-2 transition-all group"
              >
                <Globe className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-black text-gray-300">{lt.sidebar_website}</span>
              </a>
            ) : (
              <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col items-center gap-2 opacity-40">
                <Globe className="w-5 h-5 text-gray-500" />
                <span className="text-[10px] uppercase font-black text-gray-500">{lt.sidebar_website}</span>
              </div>
            )}
          </div>

          <motion.button
            onClick={() => window.open(directionsUrl, '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black uppercase tracking-wider text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            {lt.sidebar_direction}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

function isFavoriteSchool(school: DrivingSchoolSearchResult, favorites: FavoriteSchoolRef[]) {
  return favorites.some((favorite) => {
    if (favorite.partnerId && school.partnerId) return favorite.partnerId === school.partnerId;
    if (favorite.googlePlaceId && school.googlePlaceId) {
      return favorite.googlePlaceId === school.googlePlaceId;
    }
    return false;
  });
}

function sameSchoolRef(a: DrivingSchoolSearchResult, b: DrivingSchoolSearchResult) {
  if (a.partnerId && b.partnerId) return a.partnerId === b.partnerId;
  if (a.googlePlaceId && b.googlePlaceId) return a.googlePlaceId === b.googlePlaceId;
  return a.id === b.id;
}
