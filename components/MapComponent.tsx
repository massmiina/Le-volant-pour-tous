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
    <div className="h-[500px] w-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-0 relative">
      <MapContainer center={[46.603354, 1.888334]} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%', minHeight: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mockLocations.map((school) => (
          <Marker key={school.id} position={[school.lat, school.lng]} icon={icon}>
            <Popup className="rounded-xl overflow-hidden">
              <div className="text-center font-sans p-1">
                <h3 className="font-black text-gray-900 text-lg mb-1 leading-tight">{school.name}</h3>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-blue-600 font-black text-lg">{school.price}</span>
                  <span className="text-yellow-600 font-bold flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                    {school.rating} <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </span>
                </div>
                <button className="bg-gray-900 text-white font-bold px-4 py-2 rounded-xl text-sm w-full hover:bg-black transition-colors shadow-md">
                  Voir en détails
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
