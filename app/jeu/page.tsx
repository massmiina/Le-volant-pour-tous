'use client';

import MiniGame from '@/components/MiniGame';

export default function JeuPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24 px-4 flex flex-col items-center">
      <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Mini-Jeu</h1>
      <p className="text-gray-500 font-medium mb-12 text-center">Esquivez les obstacles et allez le plus loin possible !</p>
      <MiniGame />
    </div>
  );
}
