'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export interface SimpleDrivingSchool {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating?: number;
  phone?: string;
  website?: string;
  googleMapsUri?: string;
}

type LatLngLiteral = { lat: number; lng: number };

type GoogleMapStyle = {
  elementType?: string;
  featureType?: string;
  stylers: Array<{ color: string }>;
};

type GoogleMapOptions = {
  center: LatLngLiteral;
  zoom: number;
  disableDefaultUI: boolean;
  mapTypeControl: boolean;
  fullscreenControl: boolean;
  streetViewControl: boolean;
  styles: GoogleMapStyle[];
};

type GoogleMapInstance = {
  setCenter: (center: LatLngLiteral) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: GoogleLatLngBounds, padding?: number) => void;
};

type GoogleMarkerIcon = {
  url: string;
  scaledSize: unknown;
};

type GoogleMarkerOptions = {
  position: LatLngLiteral;
  map: GoogleMapInstance;
  title: string;
  icon: GoogleMarkerIcon;
  zIndex: number;
};

type GoogleMarker = {
  setMap: (map: GoogleMapInstance | null) => void;
  addListener: (eventName: 'click', handler: () => void) => void;
  getPosition: () => unknown;
};

type GoogleLatLngBounds = {
  extend: (position: unknown) => void;
};

type GoogleMapsNamespace = {
  maps: {
    Map: new (element: HTMLElement, options: GoogleMapOptions) => GoogleMapInstance;
    Marker: new (options: GoogleMarkerOptions) => GoogleMarker;
    Size: new (width: number, height: number) => unknown;
    LatLngBounds: new () => GoogleLatLngBounds;
  };
};

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
  }
}

interface GoogleMapComponentProps {
  locations: SimpleDrivingSchool[];
  selectedId: string | null;
  onSelect: (school: SimpleDrivingSchool) => void;
  center: [number, number];
  zoom: number;
  userLocation: [number, number] | null;
}

let googleMapsPromise: Promise<GoogleMapsNamespace> | null = null;

export default function GoogleMapComponent({
  locations,
  selectedId,
  onSelect,
  center,
  zoom,
  userLocation,
}: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<GoogleMapInstance | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);
  const userMarkerRef = useRef<GoogleMarker | null>(null);
  const [googleMaps, setGoogleMaps] = useState<GoogleMapsNamespace | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;
  const isKeyInvalid = !apiKey || apiKey === 'VOTRE_CLE_API_NAVIGATEUR_GOOGLE_ICI';
  const displayedLoadError = loadError ?? (isKeyInvalid ? "La carte n'est pas disponible." : null);

  const mapStyles = useMemo(
    () => [
      { elementType: 'geometry', stylers: [{ color: '#111827' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#d1d5db' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#111827' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1f2937' }] },
      { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#374151' }] },
      { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#172033' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
    ],
    [],
  );

  useEffect(() => {
    if (isKeyInvalid || !apiKey) return;

    loadGoogleMaps(apiKey)
      .then((google) => setGoogleMaps(google))
      .catch((error) => {
        console.error('Google Maps load error:', error);
        setLoadError("La carte n'est pas disponible.");
      });
  }, [apiKey, isKeyInvalid]);

  useEffect(() => {
    if (!googleMaps || !mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = new googleMaps.maps.Map(mapRef.current, {
      center: { lat: center[0], lng: center[1] },
      zoom,
      disableDefaultUI: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: mapStyles,
    });
  }, [center, googleMaps, mapStyles, zoom]);

  useEffect(() => {
    if (!googleMaps || !mapInstanceRef.current) return;
    mapInstanceRef.current.setCenter({ lat: center[0], lng: center[1] });
    mapInstanceRef.current.setZoom(zoom);
  }, [center, googleMaps, zoom]);

  useEffect(() => {
    if (!googleMaps || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const bounds = new googleMaps.maps.LatLngBounds();

    locations.forEach((school) => {
      const marker = new googleMaps.maps.Marker({
        position: { lat: school.lat, lng: school.lng },
        map,
        title: school.name,
        icon: createMarkerIcon(googleMaps, selectedId === school.placeId),
        zIndex: 10,
      });

      marker.addListener('click', () => onSelect(school));
      markersRef.current.push(marker);
      const position = marker.getPosition();
      if (position) bounds.extend(position);
    });

    if (locations.length > 1 && !selectedId) {
      map.fitBounds(bounds, 60);
    }
  }, [googleMaps, locations, onSelect, selectedId]);

  useEffect(() => {
    if (!googleMaps || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }

    if (!userLocation) return;

    userMarkerRef.current = new googleMaps.maps.Marker({
      position: { lat: userLocation[0], lng: userLocation[1] },
      map,
      title: 'Vous êtes ici',
      icon: createUserLocationIcon(googleMaps),
      zIndex: 30,
    });
  }, [googleMaps, userLocation]);

  if (displayedLoadError) {
    return (
      <div className="h-[300px] sm:h-[350px] w-full rounded-[2.5rem] border-4 border-white/5 bg-neutral-950 flex items-center justify-center px-6 text-center">
        <p className="text-sm font-bold text-amber-300 max-w-md">{displayedLoadError}</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] sm:h-[350px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.15)] border-4 border-white/5 z-0 relative">
      <div ref={mapRef} className="h-full w-full" />
      {!googleMaps && (
        <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps) return Promise.resolve(window.google);
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-maps="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.google) {
          resolve(window.google);
        } else {
          reject(new Error('Google Maps loaded without window.google'));
        }
      });
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.onload = () => {
      if (window.google) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps loaded without window.google'));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

function createMarkerIcon(googleMaps: GoogleMapsNamespace, isSelected: boolean) {
  const fill = '#7c3aed';
  const stroke = isSelected ? '#ffffff' : '#c4b5fd';
  const symbol = '●';
  const size = isSelected ? 44 : 36;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 4}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="14" font-family="Arial" font-weight="900" fill="#ffffff">${symbol}</text>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new googleMaps.maps.Size(size, size),
  };
}

function createUserLocationIcon(googleMaps: GoogleMapsNamespace) {
  const svg = `
    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="12" fill="#22d3ee" fill-opacity="0.25"/>
      <circle cx="14" cy="14" r="6" fill="#22d3ee" stroke="#ffffff" stroke-width="2"/>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new googleMaps.maps.Size(28, 28),
  };
}

