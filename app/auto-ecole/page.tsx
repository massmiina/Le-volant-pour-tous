"use client";

import React, { useState, FormEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Rock_Salt } from "next/font/google";
import {
  Search,
  Compass,
  MapPin,
  Star,
  Phone,
  Globe,
  Navigation,
  X,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import type { SimpleDrivingSchool } from "@/components/GoogleMapComponent";

const rockSalt = Rock_Salt({ weight: "400", subsets: ["latin"] });

const localT = {
  fr: {
    title: "Auto-Écoles",
    subtitle: "Trouvez les meilleures auto-écoles à proximité pour votre formation.",
    placeholder: "Entrez une ville (ex: Lyon, Marseille)...",
    search: "Rechercher",
    searching: "Recherche des auto-écoles...",
    geolocating: "Localisation...",
    empty: "Aucune auto-école trouvée. Essayez une autre ville.",
    error: "Impossible de récupérer les auto-écoles. Réessayez dans quelques instants.",
    map_unavailable: "La carte n'est pas disponible.",
    phone: "Appeler",
    website: "Site Web",
    directions: "Itinéraire",
    details: "Détails",
    no_rating: "Note non disponible",
    select_prompt: "Entrez une ville ou utilisez la géolocalisation pour afficher les auto-écoles.",
    dashboard_back: "← Retourner au Tableau de Bord",
    reviews: "avis"
  },
  ru: {
    title: "Автошколы",
    subtitle: "Найдите лучшие автошколы поблизости для вашего обучения.",
    placeholder: "Введите город (например: Лион, Марсель)...",
    search: "Искать",
    searching: "Поиск автошкол...",
    geolocating: "Определение...",
    empty: "Автошколы не найдены. Попробуйте другой город.",
    error: "Не удалось загрузить автошколы. Пожалуйста, попробуйте позже.",
    map_unavailable: "Карта недоступна.",
    phone: "Позвонить",
    website: "Сайт",
    directions: "Маршрут",
    details: "Подробнее",
    no_rating: "Нет оценок",
    select_prompt: "Введите город или используйте геолокацию, чтобы отобразить автошколы.",
    dashboard_back: "← Вернуться в личный кабинет",
    reviews: "отзывов"
  }
};

const GoogleMap = dynamic(() => import("@/components/GoogleMapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] sm:h-[350px] w-full bg-neutral-900 animate-pulse rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-white/5 shadow-2xl">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
      <span className="text-gray-500 font-bold tracking-widest uppercase text-xs">
        Radar en cours...
      </span>
    </div>
  ),
});

export default function AutoEcolePage() {
  const { language } = useLanguage();
  const lt = localT[language as "fr" | "ru"] || localT.fr;

  const [searchCity, setSearchCity] = useState("");
  const [results, setResults] = useState<SimpleDrivingSchool[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<SimpleDrivingSchool | null>(null);
  
  // Default centered on France
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.603354, 1.888334]);
  const [mapZoom, setMapZoom] = useState(6);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;
  const isKeyInvalid = !apiKey || apiKey === "VOTRE_CLE_API_NAVIGATEUR_GOOGLE_ICI";

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults(null);
    setSelectedSchool(null);

    try {
      const res = await fetch(`/api/driving-schools/search?query=${encodeURIComponent(searchCity.trim())}`);
      if (!res.ok) {
        throw new Error("Search API failed");
      }
      const data: SimpleDrivingSchool[] = await res.json();
      setResults(data);

      if (data.length > 0) {
        setMapCenter([data[0].lat, data[0].lng]);
        setMapZoom(12);
      }
    } catch (err) {
      console.error(err);
      setError(lt.error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      // Quiet fallback: center on Paris, no alert
      setMapCenter([48.8566, 2.3522]);
      setMapZoom(12);
      return;
    }

    setIsGeolocating(true);
    setIsSearching(true);
    setError(null);
    setResults(null);
    setSelectedSchool(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation([lat, lng]);
        setMapCenter([lat, lng]);
        setMapZoom(12);

        fetch(`/api/driving-schools/nearby?lat=${lat}&lng=${lng}`)
          .then((res) => {
            if (!res.ok) throw new Error("Nearby API failed");
            return res.json();
          })
          .then((data: SimpleDrivingSchool[]) => {
            setResults(data);
            setIsSearching(false);
            setIsGeolocating(false);
          })
          .catch((err) => {
            console.error(err);
            setError(lt.error);
            setResults([]);
            setIsSearching(false);
            setIsGeolocating(false);
          });
      },
      (err) => {
        console.warn("Geolocation refused or error:", err);
        // Quiet fallback: center on Paris
        setMapCenter([48.8566, 2.3522]);
        setMapZoom(12);
        setIsSearching(false);
        setIsGeolocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="bg-[#0A061E] min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      {/* Glow Effects */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Header */}
        <header className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${rockSalt.className} text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 mb-4`}
          >
            {lt.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto"
          >
            {lt.subtitle}
          </motion.p>
        </header>

        {/* Search Bar & Geolocation Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-2xl p-3 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-3"
        >
          <form onSubmit={handleSearch} className="flex-grow flex flex-col sm:flex-row gap-2">
            <div className="flex-grow relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder={lt.placeholder}
                className="block w-full pl-14 pr-4 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-emerald-500/50 focus:ring-0 outline-none transition-all text-white text-base placeholder:text-gray-600"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSearching}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-emerald-500 text-black rounded-2xl font-black text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center min-w-[150px] uppercase tracking-wider"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                lt.search
              )}
            </motion.button>
          </form>

          <motion.button
            onClick={handleGeolocate}
            disabled={isGeolocating || isSearching}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black text-sm border border-violet-500/30 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(139,92,246,0.2)] disabled:opacity-50"
          >
            <Compass className={`w-5 h-5 ${isGeolocating ? 'animate-spin' : ''}`} />
            <span className="uppercase tracking-wider text-xs">
              {isGeolocating ? lt.geolocating : "📍"}
            </span>
          </motion.button>
        </motion.div>

        {/* Map Container */}
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
          {isKeyInvalid ? (
            <div className="h-[300px] sm:h-[350px] w-full rounded-[2.5rem] border-4 border-white/5 bg-neutral-950 flex items-center justify-center px-6 text-center">
              <p className="text-sm font-bold text-amber-300 max-w-md">
                {lt.map_unavailable}
              </p>
            </div>
          ) : (
            <GoogleMap
              locations={results ?? []}
              selectedId={selectedSchool?.placeId ?? null}
              onSelect={setSelectedSchool}
              center={mapCenter}
              zoom={mapZoom}
              userLocation={userLocation}
            />
          )}
        </div>

        {/* Search State Indicator */}
        <div className="space-y-6 min-h-[150px]">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 bg-white/5 rounded-[2.5rem] border border-white/5"
              >
                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 font-bold tracking-widest text-sm uppercase">
                  {lt.searching}
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 bg-rose-500/10 rounded-[2.5rem] border border-rose-500/20"
              >
                <p className="text-rose-400 font-bold text-sm">
                  {error}
                </p>
              </motion.div>
            ) : results === null ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 bg-white/5 rounded-[2.5rem] border border-white/5"
              >
                <p className="text-gray-500 text-sm font-medium">
                  {lt.select_prompt}
                </p>
              </motion.div>
            ) : results.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 bg-white/5 rounded-[2.5rem] border border-white/5"
              >
                <p className="text-amber-300 font-bold text-sm">
                  {lt.empty}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {results.map((school, index) => (
                  <SchoolCard
                    key={school.placeId}
                    school={school}
                    index={index}
                    isSelected={selectedSchool?.placeId === school.placeId}
                    onSelect={() => {
                      setSelectedSchool(school);
                      setMapCenter([school.lat, school.lng]);
                      setMapZoom(14);
                    }}
                    lt={lt}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors tracking-wide underline decoration-violet-500/40 underline-offset-8"
          >
            {lt.dashboard_back}
          </Link>
        </div>

      </div>

      {/* Sidebar Details Panel */}
      <AnimatePresence>
        {selectedSchool && (
          <SchoolDetailsSidebar
            school={selectedSchool}
            lt={lt}
            onClose={() => setSelectedSchool(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SchoolCard({
  school,
  index,
  isSelected,
  onSelect,
  lt,
}: {
  school: SimpleDrivingSchool;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  lt: (typeof localT)["fr"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border transition-all duration-300 relative overflow-hidden group ${
        isSelected
          ? "border-emerald-400 bg-emerald-950/5 shadow-[0_0_25px_rgba(16,185,129,0.1)]"
          : "border-white/10 hover:border-emerald-500/25"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-1 h-full transition-all ${
          isSelected ? "bg-emerald-500" : "bg-emerald-500/0 group-hover:bg-emerald-500/40"
        }`}
      />

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
            {school.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            {school.address}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          {school.rating !== undefined ? (
            <div className="flex items-center gap-1.5 text-xs text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-white font-bold">{school.rating}</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500 font-semibold">{lt.no_rating}</span>
          )}
        </div>

        <motion.button
          onClick={onSelect}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all border ${
            isSelected
              ? "bg-emerald-500 text-black border-emerald-400"
              : "bg-white/5 hover:bg-emerald-500 hover:text-black text-white border-white/10"
          }`}
        >
          {lt.details}
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
  school: SimpleDrivingSchool;
  lt: (typeof localT)["fr"];
  onClose: () => void;
}) {
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
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-neutral-950/95 backdrop-blur-2xl border-l border-white/10 z-50 p-6 sm:p-8 flex flex-col shadow-2xl overflow-y-auto text-white animate-drawer"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-black text-white pr-4 leading-tight">{school.name}</h2>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Address Box */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-200">{school.address}</p>
          </div>

          {/* Rating */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Note Google</span>
            {school.rating !== undefined ? (
              <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-white font-extrabold">{school.rating}</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500 font-semibold">{lt.no_rating}</span>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            {school.phone && (
              <a
                href={`tel:${school.phone}`}
                className="p-4 bg-white/5 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/30 rounded-2xl flex items-center gap-3 transition-all group"
              >
                <Phone className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-black">{lt.phone}</p>
                  <p className="text-sm font-semibold text-gray-300">{school.phone}</p>
                </div>
              </a>
            )}

            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white/5 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/30 rounded-2xl flex items-center gap-3 transition-all group"
              >
                <Globe className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-black">{lt.website}</p>
                  <p className="text-sm font-semibold text-gray-300 truncate max-w-[200px]">
                    {school.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
              </a>
            )}
          </div>
        </div>

        {/* Directions Button at the bottom */}
        <div className="mt-auto pt-6">
          <motion.button
            onClick={() => window.open(directionsUrl, '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            {lt.directions}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

