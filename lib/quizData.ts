export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type QuizModuleKey = 'signalisation' | 'priorites' | 'regles' | 'vitesse' | 'stationnement' | 'autoroute' | 'securite' | 'alcool' | 'mecanique' | 'eco_conduite' | 'premiers_secours' | 'partage_route';


export const getQuizByModule = (moduleKey: QuizModuleKey, t: any): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  
  // We fetch 12 questions per module from the translation files
  for (let i = 0; i < 12; i++) {
    questions.push({
      question: t(`quiz.modules.${moduleKey}.${i}.q`),
      options: [
        t(`quiz.modules.${moduleKey}.${i}.o1`),
        t(`quiz.modules.${moduleKey}.${i}.o2`),
        t(`quiz.modules.${moduleKey}.${i}.o3`),
        t(`quiz.modules.${moduleKey}.${i}.o4`)
      ],
      answer: parseInt(t(`quiz.modules.${moduleKey}.${i}.ans`)),
      explanation: t(`quiz.modules.${moduleKey}.${i}.exp`)
    });
  }
  
  return questions;
};

// Legacy support for single quiz if needed, but the new system is module-based
export const getLegacyQuiz = (t: any): QuizQuestion[] => {
  return [
    {
      question: t('quiz.q1.q'),
      options: [t('quiz.q1.o1'), t('quiz.q1.o2'), t('quiz.q1.o3'), t('quiz.q1.o4')],
      answer: 0,
      explanation: "Distance de sécurité : 2 traits de la bande d'arrêt d'urgence."
    },
    {
      question: t('quiz.q2.q'),
      options: [t('quiz.q2.o1'), t('quiz.q2.o2'), t('quiz.q2.o3'), t('quiz.q2.o4')],
      answer: 2,
      explanation: "Zéro tolérance : Sens interdit."
    },
    {
      question: t('quiz.q3.q'),
      options: [t('quiz.q3.o1'), t('quiz.q3.o2'), t('quiz.q3.o3'), t('quiz.q3.o4')],
      answer: 0,
      explanation: "Limite alcool novice : 0.2 g/l."
    },
    {
      question: t('quiz.q4.q'),
      options: [t('quiz.q4.o1'), t('quiz.q4.o2'), t('quiz.q4.o3'), t('quiz.q4.o4')],
      answer: 2,
      explanation: "Priorité piéton : Arrêt obligatoire."
    }
  ];
};
