import React from 'react';
import { 
  AlertTriangle, 
  Car, 
  ArrowRight, 
  ArrowUp, 
  ArrowDownUp, 
  Bike, 
  Truck, 
  ParkingCircle,
  HelpCircle,
  Construction,
  Train,
  Wind,
  Snowflake,
  Crosshair
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type SignCategory = 'danger' | 'interdiction' | 'obligation' | 'indication' | 'priorite';

interface SignData {
  id: string;
  category: SignCategory;
  name: string;
  meaning: string;
  content?: React.ReactNode;
}

const SIGNS: SignData[] = [
  // DANGER (Triangles)
  { id: 'A1a', category: 'danger', name: 'Virage à droite', meaning: 'Ralentissez, virage dangereux à droite à 150m (hors agglomération).', content: <ArrowRight className="w-8 h-8 text-black" style={{ transform: 'rotate(45deg)' }} /> },
  { id: 'A1b', category: 'danger', name: 'Virage à gauche', meaning: 'Ralentissez, virage dangereux à gauche à 150m.', content: <ArrowRight className="w-8 h-8 text-black" style={{ transform: 'rotate(-135deg)' }} /> },
  { id: 'A2a', category: 'danger', name: 'Cassis ou dos-d\'âne', meaning: 'Déformation de la chaussée.', content: <div className="flex gap-1"><div className="w-3 h-3 rounded-t-full bg-black"></div><div className="w-3 h-3 rounded-t-full bg-black"></div></div> },
  { id: 'A3', category: 'danger', name: 'Chaussée rétrécie', meaning: 'La route devient plus étroite.', content: <ArrowUp className="w-8 h-8 text-black" style={{ transform: 'scaleX(0.5)' }} /> },
  { id: 'A4', category: 'danger', name: 'Chaussée glissante', meaning: 'Risque de dérapage.', content: <Snowflake className="w-8 h-8 text-black" /> },
  { id: 'A14', category: 'danger', name: 'Autre danger', meaning: 'Danger non spécifié, soyez extrêmement vigilant.', content: <span className="text-black font-black text-2xl">!</span> },
  { id: 'A18', category: 'danger', name: 'Circulation à double sens', meaning: 'Attention, prise d\'effet immédiate.', content: <ArrowDownUp className="w-8 h-8 text-black" /> },
  { id: 'A21', category: 'danger', name: 'Vent latéral', meaning: 'Risque d\'écart de trajectoire.', content: <Wind className="w-8 h-8 text-black" /> },
  
  // INTERDICTION (Ronds rouges)
  { id: 'B1', category: 'interdiction', name: 'Sens interdit', meaning: 'Interdiction de pénétrer dans cette rue.', content: <div className="w-12 h-3 bg-white"></div> },
  { id: 'B2a', category: 'interdiction', name: 'Interdiction de tourner à gauche', meaning: 'Au prochain carrefour, virage à gauche interdit.', content: <div className="relative flex items-center justify-center"><ArrowRight className="w-8 h-8 text-black absolute" style={{ transform: 'rotate(-180deg)' }} /><div className="w-14 h-1 bg-red-600 absolute rotate-45"></div></div> },
  { id: 'B3', category: 'interdiction', name: 'Dépassement interdit', meaning: 'Interdiction de dépasser tous véhicules à moteur.', content: <div className="flex gap-1"><Car className="w-6 h-6 text-red-600" /><Car className="w-6 h-6 text-black" /></div> },
  { id: 'B14_50', category: 'interdiction', name: 'Vitesse limitée à 50', meaning: 'Vitesse maximum autorisée : 50 km/h.', content: <span className="text-black font-black text-3xl">50</span> },
  { id: 'B14_80', category: 'interdiction', name: 'Vitesse limitée à 80', meaning: 'Vitesse maximum autorisée : 80 km/h.', content: <span className="text-black font-black text-3xl">80</span> },
  { id: 'B14_130', category: 'interdiction', name: 'Vitesse limitée à 130', meaning: 'Vitesse maximum autorisée : 130 km/h.', content: <span className="text-black font-black text-3xl">130</span> },
  { id: 'B33', category: 'interdiction', name: 'Fin d\'interdiction de dépasser', meaning: 'Fin de la restriction.', content: <div className="flex gap-1 relative opacity-50"><Car className="w-6 h-6 text-black" /><Car className="w-6 h-6 text-black" /><div className="absolute inset-0 border-t-2 border-black rotate-45"></div></div> },

  // OBLIGATION (Ronds bleus)
  { id: 'B21-1', category: 'obligation', name: 'Obligation de tourner à droite', meaning: 'Au carrefour, virage à droite obligatoire.', content: <ArrowRight className="w-10 h-10 text-white" /> },
  { id: 'B21-2', category: 'obligation', name: 'Obligation de tourner à gauche', meaning: 'Au carrefour, virage à gauche obligatoire.', content: <ArrowRight className="w-10 h-10 text-white" style={{ transform: 'rotate(180deg)' }} /> },
  { id: 'B21b', category: 'obligation', name: 'Contournement obligatoire', meaning: 'Par la droite de l\'obstacle.', content: <ArrowRight className="w-10 h-10 text-white" style={{ transform: 'rotate(45deg)' }} /> },
  { id: 'B22a', category: 'obligation', name: 'Piste cyclable', meaning: 'Obligatoire pour les cyclistes.', content: <Bike className="w-8 h-8 text-white" /> },
  { id: 'B25', category: 'obligation', name: 'Vitesse minimale obligatoire', meaning: 'Vitesse minimum de 30 km/h.', content: <span className="text-white font-black text-3xl">30</span> },

  // INDICATION (Carrés bleus)
  { id: 'C1a', category: 'indication', name: 'Parking', meaning: 'Lieu aménagé pour le stationnement.', content: <span className="text-white font-black text-4xl">P</span> },
  { id: 'C4a', category: 'indication', name: 'Vitesse conseillée', meaning: 'Il est conseillé de rouler à 70 km/h.', content: <span className="text-white font-black text-3xl">70</span> },
  { id: 'C12', category: 'indication', name: 'Sens unique', meaning: 'Circulation à sens unique.', content: <ArrowUp className="w-10 h-10 text-white" /> },
  { id: 'C20a', category: 'indication', name: 'Passage piéton', meaning: 'Indique la position d\'un passage pour piétons.', content: <div className="flex flex-col items-center gap-1"><div className="w-6 h-1 bg-white"></div><div className="w-6 h-1 bg-white"></div><div className="w-6 h-1 bg-white"></div></div> },
  { id: 'C207', category: 'indication', name: 'Autoroute', meaning: 'Début d\'une section d\'autoroute.', content: <div className="flex gap-2"><div className="w-1 h-8 bg-white"></div><div className="w-1 h-8 bg-white"></div></div> },

  // PRIORITÉ (Formes spéciales)
  { id: 'AB4', category: 'priorite', name: 'Stop', meaning: 'Arrêt absolu obligatoire à la ligne de feu.', content: 'stop' },
  { id: 'AB3a', category: 'priorite', name: 'Cédez le passage', meaning: 'Cédez le passage à gauche et à droite.', content: 'cedez' },
  { id: 'AB1', category: 'priorite', name: 'Priorité à droite', meaning: 'Cédez le passage à droite à la prochaine intersection.', content: 'croix' },
  { id: 'AB2', category: 'priorite', name: 'Priorité ponctuelle', meaning: 'Vous avez la priorité à la prochaine intersection.', content: 'ponctuelle' },
  { id: 'AB6', category: 'priorite', name: 'Route prioritaire', meaning: 'Vous avez la priorité à toutes les intersections.', content: 'losange' },
];

const SIGNS_RU: Record<string, { name: string; meaning: string }> = {
  'A1a': { name: 'Опасный поворот направо', meaning: 'Снизьте скорость, опасный поворот направо через 150 м (вне населенного пункта).' },
  'A1b': { name: 'Опасный поворот налево', meaning: 'Снизьте скорость, опасный поворот налево через 150 м.' },
  'A2a': { name: 'Неровная дорога (бугор или впадина)', meaning: 'Деформация дорожного покрытия.' },
  'A3': { name: 'Сужение дороги', meaning: 'Дорога сужается перед вами.' },
  'A4': { name: 'Скользкая дорога', meaning: 'Опасность заноса.' },
  'A14': { name: 'Прочие опасности', meaning: 'Неуказанная опасность, будьте предельно внимательны.' },
  'A18': { name: 'Двустороннее движение', meaning: 'Внимание, двустороннее движение начинается сразу после знака.' },
  'A21': { name: 'Боковой ветер', meaning: 'Опасность отклонения от траектории из-за сильного ветра.' },
  
  'B1': { name: 'Въезд запрещен (Сенс интерди)', meaning: 'Запрещается въезд в этом направлении (Одностороннее движение).' },
  'B2a': { name: 'Поворот налево запрещен', meaning: 'На следующем перекрестке поворот налево запрещен.' },
  'B3': { name: 'Обгон запрещен', meaning: 'Запрещается обгон всех моторных транспортных средств.' },
  'B14_50': { name: 'Ограничение скорости 50', meaning: 'Максимально разрешенная скорость: 50 км/ч.' },
  'B14_80': { name: 'Ограничение скорости 80', meaning: 'Максимально разрешенная скорость: 80 км/ч.' },
  'B14_130': { name: 'Ограничение скорости 130', meaning: 'Максимально разрешенная скорость: 130 км/ч.' },
  'B33': { name: 'Конец зоны запрещения обгона', meaning: 'Снятие ограничения на обгон.' },

  'B21-1': { name: 'Обязательный поворот направо', meaning: 'На перекрестке обязателен поворот направо.' },
  'B21-2': { name: 'Обязательный поворот налево', meaning: 'На перекрестке обязателен поворот налево.' },
  'B21b': { name: 'Обязательный объезд препятствия', meaning: 'Обязательный объезд препятствия справа.' },
  'B22a': { name: 'Велосипедная дорожка', meaning: 'Дорожка, предназначенная исключительно для велосипедистов.' },
  'B25': { name: 'Ограничение минимальной скорости', meaning: 'Минимальная скорость движения 30 км/ч.' },

  'C1a': { name: 'Парковка', meaning: 'Место, предназначенное для стоянки автомобилей.' },
  'C4a': { name: 'Рекомендуемая скорость', meaning: 'Рекомендуется двигаться со скоростью 70 км/ч.' },
  'C12': { name: 'Одностороннее движение', meaning: 'Движение по дороге с односторонним движением.' },
  'C20a': { name: 'Пешеходный переход', meaning: 'Указывает точное расположение пешеходного перехода.' },
  'C207': { name: 'Автомагистраль', meaning: 'Начало участка автомагистрали (автострады).' },

  'AB4': { name: 'Стоп', meaning: 'Обязательная полная остановка у стоп-линии или края перекрестка.' },
  'AB3a': { name: 'Уступите дорогу', meaning: 'Уступите дорогу транспортным средствам на пересекаемой дороге.' },
  'AB1': { name: 'Помеха справа', meaning: 'Уступите дорогу транспортным средствам, приближающимся справа.' },
  'AB2': { name: 'Пересечение со второстепенной дорогой', meaning: 'Вы имеете преимущество проезда на следующем перекрестке.' },
  'AB6': { name: 'Главная дорога', meaning: 'Вы имеете преимущество на всех перекрестках этой дороги.' },
};

export default function SignLexicon() {
  const { language } = useLanguage();

  const renderSignShape = (sign: SignData) => {
    switch(sign.category) {
      case 'danger':
        return (
          <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-red-600 relative group-hover:scale-110 transition-transform">
            <div className="absolute top-[8px] left-[-31px] w-0 h-0 border-l-[31px] border-l-transparent border-r-[31px] border-r-transparent border-b-[54px] border-b-white flex items-end justify-center pb-2">
              <div className="translate-y-4">
                {sign.content}
              </div>
            </div>
          </div>
        );
      case 'interdiction':
        if (sign.id === 'B1') {
          return (
             <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
               {sign.content}
             </div>
          );
        }
        if (sign.id === 'B33') {
           return (
             <div className="w-20 h-20 rounded-full border-[6px] border-gray-400 bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm relative overflow-hidden">
               {sign.content}
             </div>
           )
        }
        return (
          <div className="w-20 h-20 rounded-full border-[8px] border-red-600 bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            {sign.content}
          </div>
        );
      case 'obligation':
        return (
          <div className="w-20 h-20 rounded-full bg-blue-600 border-[3px] border-white ring-2 ring-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            {sign.content}
          </div>
        );
      case 'indication':
        return (
          <div className="w-20 h-20 rounded-xl bg-blue-600 border-[3px] border-white ring-2 ring-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            {sign.content}
          </div>
        );
      case 'priorite':
        if (sign.content === 'stop') {
          return (
            <div className="w-20 h-20 bg-red-600 flex items-center justify-center relative group-hover:scale-110 transition-transform shadow-sm" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
              <div className="absolute inset-1 border-[3px] border-white" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
              <span className="text-white font-black text-sm uppercase relative z-10">STOP</span>
            </div>
          );
        }
        if (sign.content === 'cedez') {
          return (
            <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[70px] border-t-red-600 relative group-hover:scale-110 transition-transform">
              <div className="absolute bottom-[8px] left-[-31px] w-0 h-0 border-l-[31px] border-l-transparent border-r-[31px] border-r-transparent border-t-[54px] border-t-white"></div>
            </div>
          );
        }
        if (sign.content === 'croix') {
           return (
            <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-red-600 relative group-hover:scale-110 transition-transform">
              <div className="absolute top-[8px] left-[-31px] w-0 h-0 border-l-[31px] border-l-transparent border-r-[31px] border-r-transparent border-b-[54px] border-b-white flex items-end justify-center pb-2">
                <div className="translate-y-2 font-black text-3xl">X</div>
              </div>
            </div>
          );
        }
        if (sign.content === 'ponctuelle') {
          return (
            <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-red-600 relative group-hover:scale-110 transition-transform">
              <div className="absolute top-[8px] left-[-31px] w-0 h-0 border-l-[31px] border-l-transparent border-r-[31px] border-r-transparent border-b-[54px] border-b-white flex items-end justify-center pb-2">
                <div className="w-2 h-6 bg-gray-900 flex items-center justify-center translate-y-[2px]">
                  <div className="w-6 h-2 bg-gray-900 absolute"></div>
                </div>
              </div>
            </div>
          );
        }
        if (sign.content === 'losange') {
          return (
            <div className="w-14 h-14 bg-yellow-400 rotate-45 border-[6px] border-white ring-4 ring-yellow-400 group-hover:scale-110 transition-transform mt-2"></div>
          );
        }
        return null;
      default:
        return null;
    }
  }

  const translatedSigns = SIGNS.map(sign => {
    if (language === 'ru' && SIGNS_RU[sign.id]) {
      return {
        ...sign,
        name: SIGNS_RU[sign.id].name,
        meaning: SIGNS_RU[sign.id].meaning
      };
    }
    return sign;
  });

  const groupedSigns = translatedSigns.reduce((acc, sign) => {
    if (!acc[sign.category]) acc[sign.category] = [];
    acc[sign.category].push(sign);
    return acc;
  }, {} as Record<SignCategory, SignData[]>);

  const categoryTitles: Record<SignCategory, string> = {
    danger: language === 'fr' ? "Panneaux de Danger" : "Предупреждающие знаки",
    interdiction: language === 'fr' ? "Panneaux de Prescription (Interdiction)" : "Запрещающие знаки",
    obligation: language === 'fr' ? "Panneaux de Prescription (Obligation)" : "Предписывающие знаки",
    indication: language === 'fr' ? "Panneaux d'Indication" : "Информационные знаки",
    priorite: language === 'fr' ? "Panneaux de Priorité" : "Знаки приоритета"
  };

  const categoryColors: Record<SignCategory, string> = {
    danger: "text-red-600 border-red-200 bg-red-50",
    interdiction: "text-rose-600 border-rose-200 bg-rose-50",
    obligation: "text-blue-600 border-blue-200 bg-blue-50",
    indication: "text-blue-700 border-blue-200 bg-blue-50",
    priorite: "text-amber-600 border-amber-200 bg-amber-50"
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-gray-100 relative mt-8 mb-8">
      <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight text-center">
        {language === 'fr' ? "La Bible des Panneaux" : "Библия дорожных знаков"}
      </h2>
      <p className="text-xl text-gray-600 font-medium text-center mb-12 max-w-3xl mx-auto">
        {language === 'fr' 
          ? "Découvrez l'intégralité des panneaux officiels à connaître pour le code de la route, classés par famille." 
          : "Откройте для себя все официальные дорожные знаки, которые необходимо знать для сдачи на права, распределенные по категориям."}
      </p>

      <div className="space-y-16">
        {(Object.keys(groupedSigns) as SignCategory[]).map(category => (
          <div key={category} className="space-y-6">
            <h3 className={`text-2xl font-black px-6 py-3 rounded-2xl inline-block border ${categoryColors[category]}`}>
              {categoryTitles[category]}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedSigns[category].map((sign, index) => (
                <div key={index} className="flex flex-col items-center text-center group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300 transition-colors shadow-sm hover:shadow-md">
                  <div className="h-24 flex items-center justify-center mb-4">
                    {renderSignShape(sign)}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">{sign.name}</h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{sign.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
