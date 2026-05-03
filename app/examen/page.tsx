import React from 'react';
import Exam from '@/components/Exam';

export const metadata = {
  title: 'Examen Blanc | Le Volant Pour Tous',
  description: 'Simulateur officiel de l\'examen du code de la route français en conditions réelles.',
};

export default function ExamenPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB]">
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Exam />
        </div>
      </div>
    </main>
  );
}
