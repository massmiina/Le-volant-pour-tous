export type ExamModule = 
  | 'signalisation' 
  | 'priorites' 
  | 'circulation' 
  | 'vitesse' 
  | 'securite' 
  | 'alcool' 
  | 'mecanique' 
  | 'eco_conduite' 
  | 'premiers_secours' 
  | 'partage_route';

export interface ExamQuestion {
  id: number;
  module: ExamModule;
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  image?: string;
}

export const examQuestions: ExamQuestion[] = [
  // Signalisation (8)
  { id: 1, module: 'signalisation', correctAnswer: 1, image: '/images/exam/q1.png' }, // Danger ville
  { id: 2, module: 'signalisation', correctAnswer: 0, image: '/images/exam/q2.png' }, // Double sens
  { id: 3, module: 'signalisation', correctAnswer: 1, image: '/images/exam/q3.png' }, // Interdiction
  { id: 4, module: 'signalisation', correctAnswer: 3, image: '/images/exam/q4.png' }, // STOP
  { id: 5, module: 'signalisation', correctAnswer: 2, image: '/images/exam/q5.png' }, // Ligne jaune
  { id: 6, module: 'signalisation', correctAnswer: 1, image: '/images/exam/q6.png' }, // Balises bleues
  { id: 7, module: 'signalisation', correctAnswer: 2, image: '/images/exam/q7.png' }, // Indication carrée
  { id: 8, module: 'signalisation', correctAnswer: 1, image: '/images/exam/q8.png' }, // Panonceau
  
  // Priorités (8)
  { id: 9, module: 'priorites', correctAnswer: 1, image: '/images/exam/q9.png' }, // Priorité droite
  { id: 10, module: 'priorites', correctAnswer: 1, image: '/images/exam/q10.png' }, // Cédez passage
  { id: 11, module: 'priorites', correctAnswer: 2, image: '/images/exam/q11.png' }, // Urgence gyrophare
  { id: 12, module: 'priorites', correctAnswer: 1, image: '/images/exam/q12.png' }, // Rond-point
  { id: 13, module: 'priorites', correctAnswer: 2, image: '/images/exam/q13.png' }, // Feu jaune
  { id: 14, module: 'priorites', correctAnswer: 1, image: '/images/exam/q14.png' }, // Agent police
  { id: 15, module: 'priorites', correctAnswer: 2, image: '/images/exam/q15.png' }, // Roues figées STOP
  { id: 16, module: 'priorites', correctAnswer: 2, image: '/images/exam/q16.png' }, // Sortie garage
  
  // Vitesse (4)
  { id: 17, module: 'vitesse', correctAnswer: 1, image: '/images/exam/q17.png' }, // 80 km/h
  { id: 18, module: 'vitesse', correctAnswer: 2, image: '/images/exam/situation2.png' }, // Entrée ville
  { id: 19, module: 'vitesse', correctAnswer: 1, image: '/images/exam/situation6.png' }, // Pluie autoroute
  { id: 20, module: 'vitesse', correctAnswer: 0, image: '/images/exam/situation5.png' }, // Brouillard
  
  // Circulation (4)
  { id: 21, module: 'circulation', correctAnswer: 1, image: '/images/exam/situation1.png' },
  { id: 22, module: 'circulation', correctAnswer: 1, image: '/images/exam/situation7.png' }, // Montagne
  { id: 23, module: 'circulation', correctAnswer: 1, image: '/images/exam/situation1.png' },
  { id: 24, module: 'circulation', correctAnswer: 1, image: '/images/exam/situation2.png' },
  
  // Sécurité / Conducteur (4)
  { id: 25, module: 'securite', correctAnswer: 2, image: '/images/exam/situation1.png' },
  { id: 26, module: 'securite', correctAnswer: 2, image: '/images/exam/situation2.png' },
  { id: 27, module: 'securite', correctAnswer: 1, image: '/images/exam/situation1.png' },
  { id: 28, module: 'securite', correctAnswer: 1, image: '/images/exam/situation1.png' },
  
  // Alcool / Drogues (3)
  { id: 29, module: 'alcool', correctAnswer: 1, image: '/images/exam/situation4.png' }, // Nuit
  { id: 30, module: 'alcool', correctAnswer: 3, image: '/images/exam/situation4.png' },
  { id: 31, module: 'alcool', correctAnswer: 2, image: '/images/exam/situation4.png' },
  
  // Mécanique (3)
  { id: 32, module: 'mecanique', correctAnswer: 2, image: '/images/exam/situation1.png' },
  { id: 33, module: 'mecanique', correctAnswer: 1, image: '/images/exam/situation3.png' },
  { id: 34, module: 'mecanique', correctAnswer: 1, image: '/images/exam/situation2.png' },
  
  // Éco-conduite (2)
  { id: 35, module: 'eco_conduite', correctAnswer: 1, image: '/images/exam/situation1.png' },
  { id: 36, module: 'eco_conduite', correctAnswer: 1, image: '/images/exam/situation3.png' },
  
  // Premiers Secours (2)
  { id: 37, module: 'premiers_secours', correctAnswer: 2, image: '/images/exam/situation3.png' },
  { id: 38, module: 'premiers_secours', correctAnswer: 3, image: '/images/exam/situation3.png' },
  
  // Partage de la route (2)
  { id: 39, module: 'partage_route', correctAnswer: 2, image: '/images/exam/situation3.png' },
  { id: 40, module: 'partage_route', correctAnswer: 1, image: '/images/exam/situation8.png' }, // Tramway
];
