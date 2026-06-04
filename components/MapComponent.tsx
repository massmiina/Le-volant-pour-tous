'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface AutoEcole {
  id: number;
  name: string;
  price: string;
  rating: number;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: AutoEcole[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  center: [number, number];
  zoom: number;
  userLocation: [number, number] | null;
}

// Controller component to smoothly move Leaflet map camera
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({
  locations,
  selectedId,
  onSelect,
  center,
  zoom,
  userLocation,
}: MapComponentProps) {

  // Custom styling for User Location marker (Neon Cyan dot with ripple effect)
  const userLocationIcon = L.divIcon({
    className: 'user-location-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 bg-cyan-400/20 rounded-full animate-ping"></div>
        <div class="w-4 h-4 bg-cyan-400 border-2 border-white rounded-full shadow-[0_0_12px_#22d3ee]"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // Custom styling for Driving Schools markers (Cyberpunk boxes with neon violet or emerald glow)
  const createSchoolIcon = (id: number) => {
    const isSelected = selectedId === id;
    return L.divIcon({
      className: `school-marker-${id} ${isSelected ? 'school-marker-selected' : ''}`,
      html: `
        <div class="relative flex items-center justify-center transition-all duration-300 transform ${isSelected ? 'scale-125' : 'hover:scale-110'}">
          <div class="absolute w-8 h-8 rounded-full blur-md ${isSelected ? 'bg-emerald-400/40 animate-pulse' : 'bg-violet-600/20'}"></div>
          <div class="w-6 h-6 rounded-xl flex items-center justify-center text-sm shadow-lg ${
            isSelected 
              ? 'bg-emerald-500 text-black border border-emerald-400 shadow-[0_0_15px_#10b981]' 
              : 'bg-violet-600 text-white border border-violet-500 shadow-[0_0_10px_#8b5cf6]'
          }">
            🚗
          </div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  return (
    <div className="h-[300px] sm:h-[350px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.15)] border-4 border-white/5 z-0 relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', minHeight: '100%' }}
      >
        <ChangeView center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* User Current Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="text-center font-sans p-1.5 bg-neutral-950 text-white rounded-lg">
                <span className="font-bold text-xs text-cyan-400">Vous êtes ici 📍</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Driving Schools Markers */}
        {locations.map((school) => (
          <Marker 
            key={school.id} 
            position={[school.lat, school.lng]} 
            icon={createSchoolIcon(school.id)}
            eventHandlers={{
              click: () => onSelect(school.id),
            }}
          >
            <Popup className="cyber-popup">
              <div className="text-center font-sans p-2 bg-neutral-950 text-white rounded-lg min-w-[150px]">
                <h3 className="font-bold text-emerald-400 text-sm mb-1 leading-tight">{school.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-violet-400 font-extrabold text-xs">{school.price}</span>
                  <span className="text-yellow-400 text-[10px] flex items-center gap-0.5">
                    {school.rating} ★
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Cyberpunk grid / overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay"></div>
    </div>
  );
}
