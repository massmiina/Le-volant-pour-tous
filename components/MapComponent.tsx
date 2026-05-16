'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js/Leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface AutoEcole {
  id: number;
  name: string;
  price: string;
  rating: number;
  lat: number;
  lng: number;
}

const mockLocations: AutoEcole[] = [
  { id: 1, name: "Auto-École du Centre", price: "750€", rating: 4.8, lat: 48.8566, lng: 2.3522 },
  { id: 2, name: "Le Volant d'Or", price: "690€", rating: 4.5, lat: 48.8738, lng: 2.2950 },
  { id: 3, name: "Pass Permis", price: "820€", rating: 4.9, lat: 48.8735, lng: 2.3323 },
  { id: 4, name: "Top Conduite", price: "650€", rating: 4.6, lat: 45.7640, lng: 4.8357 },
  { id: 5, name: "Espace Conduite 69", price: "710€", rating: 4.7, lat: 45.7500, lng: 4.8500 }
];

export default function MapComponent() {
  return (
    <div className="h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)] border-4 border-white/5 z-0 relative">
      <MapContainer 
        center={[46.603354, 1.888334]} 
        zoom={6} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', minHeight: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {mockLocations.map((school) => (
          <Marker key={school.id} position={[school.lat, school.lng]} icon={icon}>
            <Popup className="cyber-popup">
              <div className="text-center font-sans p-2 bg-neutral-900 text-white rounded-lg">
                <h3 className="font-bold text-emerald-400 text-base mb-1 leading-tight">{school.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-violet-400 font-bold">{school.price}</span>
                  <span className="text-yellow-400 text-xs flex items-center">
                    {school.rating} ★
                  </span>
                </div>
                <button className="bg-emerald-500 text-black font-black px-3 py-2 rounded-lg text-[10px] w-full hover:bg-emerald-400 transition-all shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  VOIR DÉTAILS
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay de grain Cyberpunk */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    </div>
  );
}
