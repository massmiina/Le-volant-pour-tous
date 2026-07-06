'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Game Constants
const LANE_COUNT = 3;
const GAME_SPEED = 5; // Pixels per frame
const SPAWN_RATE = 1000; // ms

interface Obstacle {
  id: number;
  lane: number;
  y: number;
}

export default function MiniGame() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [carLane, setCarLane] = useState(1); // 0: Left, 1: Middle, 2: Right
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const lastSpawnRef = useRef<number>(0);
  
  // Game Loop Ref to avoid circular dependency / access-before-declaration in hooks
  const gameLoopRef = useRef<(time: number) => void | null>(null);

  // Update game loop logic when dependencies change
  useEffect(() => {
    gameLoopRef.current = (time: number) => {
      if (!isPlaying || gameOver) {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }

      // Spawn new obstacles
      if (time - lastSpawnRef.current > SPAWN_RATE) {
        setObstacles(prev => [
          ...prev, 
          { id: time, lane: Math.floor(Math.random() * LANE_COUNT), y: -50 }
        ]);
        lastSpawnRef.current = time;
      }

      setObstacles(prev => {
        let isColliding = false;
        
        const newObstacles = prev.map(obs => {
          const newY = obs.y + GAME_SPEED;
          
          // Collision threshold (car is at bottom, around 80% to 100% of height)
          const carYStart = 400;
          const carYEnd = 480;
          
          if (newY > carYStart && newY < carYEnd && obs.lane === carLane) {
            isColliding = true;
          }
          
          return { ...obs, y: newY };
        }).filter(obs => obs.y < 600); // Remove if out of bounds

        if (isColliding) {
          setGameOver(true);
          setIsPlaying(false);
        }

        return newObstacles;
      });

      setScore(prev => prev + 1);

      requestRef.current = requestAnimationFrame(gameLoopRef.current!);
    };
  }, [isPlaying, gameOver, carLane]);

  useEffect(() => {
    if (isPlaying && gameLoopRef.current) {
      requestRef.current = requestAnimationFrame(gameLoopRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  // Keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft') {
        setCarLane(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCarLane(prev => Math.min(LANE_COUNT - 1, prev + 1));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setObstacles([]);
    setCarLane(1);
    setGameOver(false);
    setIsPlaying(true);
    lastSpawnRef.current = performance.now();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-gray-800" style={{ height: '500px' }}>
      
      {/* Game Information */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between z-10 font-black text-white pointer-events-none">
        <div className="bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
          {t('jeu.esquive_route.distance').replace('{score}', String(Math.floor(score / 10)))}
        </div>
      </div>

      {/* Lanes Background */}
      <div className="absolute inset-0 flex justify-between px-10 pointer-events-none opacity-20">
        <div className="h-full w-2 bg-dashed border-r-4 border-dashed border-white"></div>
        <div className="h-full w-2 bg-dashed border-r-4 border-dashed border-white"></div>
      </div>

      {/* Menu Overlays */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 p-8 text-center"
          >
            <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
              {gameOver ? t('jeu.esquive_route.crash') : t('jeu.esquive_route.driving')}
            </h2>
            {gameOver && <p className="text-gray-300 font-bold mb-6">{t('jeu.esquive_route.final_score').replace('{score}', String(Math.floor(score / 10)))}</p>}
            
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-white text-gray-900 rounded-xl font-black uppercase text-lg hover:bg-orange-400 hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(251,146,60,0.8)]"
            >
              {gameOver ? t('jeu.esquive_route.replay') : t('jeu.play')}
            </button>
            <p className="text-gray-500 text-sm mt-6 font-bold">{t('jeu.esquive_route.controls_instruction')}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Area */}
      <div className="absolute inset-0" ref={gameAreaRef}>
        
        {/* Obstacles */}
        {obstacles.map(obs => (
          <div 
            key={obs.id}
            className="absolute w-16 h-16 bg-gradient-to-b from-red-500 to-rose-600 rounded-xl shadow-[0_10px_20px_rgba(225,29,72,0.4)] border-2 border-red-400 flex items-center justify-center"
            style={{ 
              top: `${obs.y}px`, 
              left: `calc(${(obs.lane + 0.5) * (100 / LANE_COUNT)}% - 32px)` 
            }}
          >
            <span className="text-2xl">⚠️</span>
          </div>
        ))}

        {/* Player Car */}
        <motion.div 
          className="absolute bottom-8 w-16 h-24 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-2xl shadow-[0_10px_20px_rgba(8,145,178,0.5)] border-2 border-cyan-300 flex items-center justify-center z-20"
          animate={{ left: `calc(${(carLane + 0.5) * (100 / LANE_COUNT)}% - 32px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-10 h-12 bg-gray-900 rounded-lg absolute top-4 opacity-50"></div> {/* Windshield */}
          <div className="w-4 h-4 bg-yellow-400 rounded-full absolute -top-1 left-2 shadow-[0_0_10px_#facc15]"></div> {/* Headlight */}
          <div className="w-4 h-4 bg-yellow-400 rounded-full absolute -top-1 right-2 shadow-[0_0_10px_#facc15]"></div> {/* Headlight */}
        </motion.div>

      </div>

      {/* Mobile Controls */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between z-20 md:hidden">
        <button 
          onPointerDown={() => setCarLane(prev => Math.max(0, prev - 1))}
          className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full text-white font-black text-2xl flex items-center justify-center active:bg-white/40"
        >
          ←
        </button>
        <button 
          onPointerDown={() => setCarLane(prev => Math.min(LANE_COUNT - 1, prev + 1))}
          className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full text-white font-black text-2xl flex items-center justify-center active:bg-white/40"
        >
          →
        </button>
      </div>

    </div>
  );
}
