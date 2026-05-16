import React from 'react';
import ExamEngineClient from '@/components/ExamEngineClient';

export const metadata = {
  title: 'Examen Blanc | Le Volant Pour Tous',
  description: 'Simulateur officiel de l\'examen du code de la route français en conditions réelles.',
};

export default function ExamenPage() {
  return <ExamEngineClient />;
}
