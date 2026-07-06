'use client';

import Image from 'next/image';
import { Rock_Salt } from 'next/font/google';

const rock = Rock_Salt({ subsets: ['latin'], weight: ['400'] });

export default function Brouillons() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center overflow-y-auto bg-[#0A061E] py-10">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/home-bg-v5.png"
          alt="Refined retro neon car background"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* Overlapping text effect */
        .tangled-letters {
          letter-spacing: -0.15em;
        }
        
        /* Neon Theme 1: Violet & Emerald (Current Platform Theme) */
        .neon-t1-violet {
          color: #ddd6fe;
          text-shadow: 0 0 5px #c4b5fd, 0 0 15px #8b5cf6, 0 0 30px #7c3aed, 0 0 50px #6d28d9;
        }
        .neon-t1-emerald {
          color: #a7f3d0;
          text-shadow: 0 0 5px #6ee7b7, 0 0 15px #10b981, 0 0 30px #059669, 0 0 50px #047857;
        }

        /* Neon Theme 2: Pink & Cyan (Classic Cyberpunk) */
        .neon-t2-pink {
          color: #fbcfe8;
          text-shadow: 0 0 5px #f472b6, 0 0 15px #ec4899, 0 0 30px #db2777, 0 0 50px #be185d;
        }
        .neon-t2-cyan {
          color: #cffafe;
          text-shadow: 0 0 5px #67e8f9, 0 0 15px #06b6d4, 0 0 30px #0891b2, 0 0 50px #0e7490;
        }

        /* Neon Theme 3: Electric Yellow & Orange (Fast & Furious) */
        .neon-t3-yellow {
          color: #fef08a;
          text-shadow: 0 0 5px #fde047, 0 0 15px #eab308, 0 0 30px #ca8a04, 0 0 50px #a16207;
        }
        .neon-t3-orange {
          color: #fed7aa;
          text-shadow: 0 0 5px #fb923c, 0 0 15px #f97316, 0 0 30px #ea580c, 0 0 50px #c2410c;
        }

        /* Neon Theme 4: Pure White Core with Deep Violet Glow (Elegant Neon) */
        .neon-t4-elegant {
          color: #ffffff;
          text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 40px #6d28d9, 0 0 80px #6d28d9;
        }
      `}} />

      <div className="relative z-10 w-full max-w-6xl px-8 space-y-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Graffiti &quot;Rock Salt&quot; en Mode Néon 💡</h1>
          <p className="text-violet-300 text-lg">La police Rock Salt (tassée) avec de vrais tubes néon virtuels.</p>
        </div>

        {/* Theme 1 */}
        <div className="bg-black/60 backdrop-blur-md border border-violet-500/30 p-12 rounded-3xl text-left space-y-6 overflow-hidden">
          <h2 className="text-emerald-400 font-mono text-xl mb-4 border-b border-emerald-400/30 pb-2">
            Couleur 1 : Violet & Émeraude (S&apos;intègre parfaitement au site)
          </h2>
          <h1 className={`text-5xl md:text-7xl tracking-tight leading-[1.4] pb-8 ${rock.className}`}>
            <span className="neon-t1-violet tangled-letters block">Le Volant</span>
            <span className="neon-t1-emerald tangled-letters block">Pour Tous</span>
          </h1>
        </div>

        {/* Theme 2 */}
        <div className="bg-black/60 backdrop-blur-md border border-pink-500/30 p-12 rounded-3xl text-left space-y-6 overflow-hidden">
          <h2 className="text-pink-400 font-mono text-xl mb-4 border-b border-pink-400/30 pb-2">
            Couleur 2 : Rose & Cyan (Ambiance GTA Vice City / Synthwave pure)
          </h2>
          <h1 className={`text-5xl md:text-7xl tracking-tight leading-[1.4] pb-8 ${rock.className}`}>
            <span className="neon-t2-pink tangled-letters block">Le Volant</span>
            <span className="neon-t2-cyan tangled-letters block">Pour Tous</span>
          </h1>
        </div>

        {/* Theme 3 */}
        <div className="bg-black/60 backdrop-blur-md border border-yellow-500/30 p-12 rounded-3xl text-left space-y-6 overflow-hidden">
          <h2 className="text-yellow-400 font-mono text-xl mb-4 border-b border-yellow-400/30 pb-2">
            Couleur 3 : Jaune & Orange (Ambiance Course de Rue / Drift)
          </h2>
          <h1 className={`text-5xl md:text-7xl tracking-tight leading-[1.4] pb-8 ${rock.className}`}>
            <span className="neon-t3-yellow tangled-letters block">Le Volant</span>
            <span className="neon-t3-orange tangled-letters block">Pour Tous</span>
          </h1>
        </div>

        {/* Theme 4 */}
        <div className="bg-black/60 backdrop-blur-md border border-white/30 p-12 rounded-3xl text-left space-y-6 overflow-hidden">
          <h2 className="text-white font-mono text-xl mb-4 border-b border-white/30 pb-2">
            Couleur 4 : Blanc pur avec Halo Violet (Plus élégant et lisible)
          </h2>
          <h1 className={`text-5xl md:text-7xl tracking-tight leading-[1.4] pb-8 ${rock.className}`}>
            <span className="neon-t4-elegant tangled-letters block">Le Volant</span>
            <span className="neon-t4-elegant tangled-letters block">Pour Tous</span>
          </h1>
        </div>

      </div>
    </div>
  );
}
