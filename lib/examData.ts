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
}

export const examQuestions: ExamQuestion[] = [
  // Signalisation (8)
  { id: 1, module: 'signalisation', correctAnswer: 2 },
  { id: 2, module: 'signalisation', correctAnswer: 0 },
  { id: 3, module: 'signalisation', correctAnswer: 1 },
  { id: 4, module: 'signalisation', correctAnswer: 3 },
  { id: 5, module: 'signalisation', correctAnswer: 1 },
  { id: 6, module: 'signalisation', correctAnswer: 2 },
  { id: 7, module: 'signalisation', correctAnswer: 0 },
  { id: 8, module: 'signalisation', correctAnswer: 1 },
  
  // Priorités (8)
  { id: 9, module: 'priorites', correctAnswer: 1 },
  { id: 10, module: 'priorites', correctAnswer: 2 },
  { id: 11, module: 'priorites', correctAnswer: 0 },
  { id: 12, module: 'priorites', correctAnswer: 3 },
  { id: 13, module: 'priorites', correctAnswer: 1 },
  { id: 14, module: 'priorites', correctAnswer: 2 },
  { id: 15, module: 'priorites', correctAnswer: 0 },
  { id: 16, module: 'priorites', correctAnswer: 1 },
  
  // Vitesse (4)
  { id: 17, module: 'vitesse', correctAnswer: 2 },
  { id: 18, module: 'vitesse', correctAnswer: 0 },
  { id: 19, module: 'vitesse', correctAnswer: 1 },
  { id: 20, module: 'vitesse', correctAnswer: 3 },
  
  // Circulation (4)
  { id: 21, module: 'circulation', correctAnswer: 1 },
  { id: 22, module: 'circulation', correctAnswer: 2 },
  { id: 23, module: 'circulation', correctAnswer: 0 },
  { id: 24, module: 'circulation', correctAnswer: 1 },
  
  // Sécurité / Conducteur (4)
  { id: 25, module: 'securite', correctAnswer: 3 },
  { id: 26, module: 'securite', correctAnswer: 1 },
  { id: 27, module: 'securite', correctAnswer: 2 },
  { id: 28, module: 'securite', correctAnswer: 0 },
  
  // Alcool / Drogues (3)
  { id: 29, module: 'alcool', correctAnswer: 1 },
  { id: 30, module: 'alcool', correctAnswer: 3 },
  { id: 31, module: 'alcool', correctAnswer: 0 },
  
  // Mécanique (3)
  { id: 32, module: 'mecanique', correctAnswer: 2 },
  { id: 33, module: 'mecanique', correctAnswer: 1 },
  { id: 34, module: 'mecanique', correctAnswer: 0 },
  
  // Éco-conduite (2)
  { id: 35, module: 'eco_conduite', correctAnswer: 3 },
  { id: 36, module: 'eco_conduite', correctAnswer: 1 },
  
  // Premiers Secours (2)
  { id: 37, module: 'premiers_secours', correctAnswer: 0 },
  { id: 38, module: 'premiers_secours', correctAnswer: 2 },
  
  // Partage de la route (2)
  { id: 39, module: 'partage_route', correctAnswer: 1 },
  { id: 40, module: 'partage_route', correctAnswer: 3 },
];
