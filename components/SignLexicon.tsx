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
  { id: 'A1a', category: 'danger', name: 'Virage à droite', meaning: 'Annonce un virage dangereux vers la droite à 50m (ville) ou 150m (hors ville). Ralentissez.', content: <ArrowRight className="w-8 h-8 text-black" style={{ transform: 'rotate(45deg)' }} /> },
  { id: 'A1b', category: 'danger', name: 'Virage à gauche', meaning: 'Annonce un virage dangereux vers la gauche à 50m (ville) ou 150m (hors ville). Ralentissez.', content: <ArrowRight className="w-8 h-8 text-black" style={{ transform: 'rotate(-135deg)' }} /> },
  { id: 'A1c', category: 'danger', name: 'Succession de virages', meaning: 'Succession de virages dont le premier est à droite. Ralentissez.', content: <div className="text-black font-black text-xl translate-y-1">~</div> },
  { id: 'A2a', category: 'danger', name: 'Cassis ou dos-d\'âne', meaning: 'Signale une déformation importante de la chaussée ou un ralentisseur.', content: <div className="flex gap-1"><div className="w-3 h-3 rounded-t-full bg-black"></div><div className="w-3 h-3 rounded-t-full bg-black"></div></div> },
  { id: 'A3', category: 'danger', name: 'Chaussée rétrécie', meaning: 'Rétrécissement de la route. Soyez vigilant quant au croisement des véhicules.', content: <ArrowUp className="w-8 h-8 text-black" style={{ transform: 'scaleX(0.5)' }} /> },
  { id: 'A4', category: 'danger', name: 'Chaussée glissante', meaning: 'Risque accru de dérapage. Réduisez la vitesse, augmentez la distance de sécurité.', content: <Snowflake className="w-8 h-8 text-black" /> },
  { id: 'A7', category: 'danger', name: 'Passage à niveau sans barrière', meaning: 'Traversée de voie ferrée non protégée. Ralentissez et regardez bien des deux côtés.', content: <Train className="w-8 h-8 text-black" /> },
  { id: 'A8', category: 'danger', name: 'Traversée de tramway', meaning: 'Priorité absolue au tramway. Ralentissez et cédez le passage si un tram approche.', content: <span className="text-black font-black text-[10px] leading-none">TRAM</span> },
  { id: 'A13a', category: 'danger', name: 'Endroit fréquenté par les enfants', meaning: 'Proximité d\'école, park ou terrain de jeux. Ralentissez et soyez prêt à vous arrêter.', content: <span className="text-black font-black text-xl translate-y-1">🚸</span> },
  { id: 'A13b', category: 'danger', name: 'Passage piéton', meaning: 'Signale la présence d\'un passage piéton à 50m ou 150m. Piétons prioritaires.', content: <span className="text-black font-black text-xl translate-y-1">🚶</span> },
  { id: 'A14', category: 'danger', name: 'Autre danger', meaning: 'Danger non spécifié par un autre panneau. Redoublez de vigilance.', content: <span className="text-black font-black text-2xl">!</span> },
  { id: 'A18', category: 'danger', name: 'Circulation à double sens', meaning: 'Prend effet IMMÉDIATEMENT à la hauteur du panneau (contrairement aux autres dangers).', content: <ArrowDownUp className="w-8 h-8 text-black" /> },
  { id: 'A21', category: 'danger', name: 'Vent latéral', meaning: 'Risque de déportation du véhicule sous l\'effet du vent. Ralentissez.', content: <Wind className="w-8 h-8 text-black" /> },
  
  // INTERDICTION (Ronds rouges)
  { id: 'B0', category: 'interdiction', name: 'Circulation interdite', meaning: 'Circulation interdite dans les deux sens pour tous les véhicules.', content: null },
  { id: 'B1', category: 'interdiction', name: 'Sens interdit', meaning: 'Interdiction de pénétrer dans cette rue. La circulation peut y être à sens unique de face.', content: <div className="w-12 h-3 bg-white"></div> },
  { id: 'B2a', category: 'interdiction', name: 'Interdiction de tourner à gauche', meaning: 'Au prochain carrefour, il est interdit de virer à gauche.', content: <div className="relative flex items-center justify-center"><ArrowRight className="w-8 h-8 text-black absolute" style={{ transform: 'rotate(-180deg)' }} /><div className="w-14 h-1 bg-red-600 absolute rotate-45"></div></div> },
  { id: 'B2b', category: 'interdiction', name: 'Interdiction de tourner à droite', meaning: 'Au prochain carrefour, il est interdit de virer à droite.', content: <div className="relative flex items-center justify-center"><ArrowRight className="w-8 h-8 text-black absolute" /><div className="w-14 h-1 bg-red-600 absolute rotate-[135deg]"></div></div> },
  { id: 'B2c', category: 'interdiction', name: 'Interdiction de faire demi-tour', meaning: 'Interdit d\'effectuer un demi-tour sur cette route jusqu\'à la prochaine intersection.', content: <span className="text-black font-bold text-xl">↷</span> },
  { id: 'B3', category: 'interdiction', name: 'Dépassement interdit', meaning: 'Interdiction de dépasser tous les véhicules à moteur (sauf deux-roues sans side-car).', content: <div className="flex gap-1"><Car className="w-6 h-6 text-red-600" /><Car className="w-6 h-6 text-black" /></div> },
  { id: 'B6a1', category: 'interdiction', name: 'Stationnement interdit', meaning: 'Stationnement interdit à partir du panneau jusqu\'à la prochaine intersection.', content: null },
  { id: 'B6d', category: 'interdiction', name: 'Arrêt et stationnement interdits', meaning: 'Interdiction absolue d\'arrêter ou de garer son véhicule à partir du panneau.', content: null },
  { id: 'B14_30', category: 'interdiction', name: 'Vitesse limitée à 30', meaning: 'Vitesse maximale autorisée : 30 km/h.', content: <span className="text-black font-black text-3xl">30</span> },
  { id: 'B14_50', category: 'interdiction', name: 'Vitesse limitée à 50', meaning: 'Vitesse maximale autorisée : 50 km/h (limitation par défaut en ville).', content: <span className="text-black font-black text-3xl">50</span> },
  { id: 'B14_80', category: 'interdiction', name: 'Vitesse limitée à 80', meaning: 'Vitesse maximale autorisée : 80 km/h (limitation par défaut hors ville).', content: <span className="text-black font-black text-3xl">80</span> },
  { id: 'B14_110', category: 'interdiction', name: 'Vitesse limitée à 110', meaning: 'Vitesse maximale autorisée : 110 km/h (sur voie rapide ou pluie autoroute).', content: <span className="text-black font-black text-3xl">110</span> },
  { id: 'B14_130', category: 'interdiction', name: 'Vitesse limitée à 130', meaning: 'Vitesse maximale autorisée : 130 km/h (sur autoroute).', content: <span className="text-black font-black text-3xl">130</span> },
  { id: 'B31', category: 'interdiction', name: 'Fin de toutes les interdictions', meaning: 'Fin de toutes les interdictions précédemment signalées pour les véhicules en mouvement.', content: null },
  { id: 'B33', category: 'interdiction', name: 'Fin d\'interdiction de dépasser', meaning: 'Autorisation de dépasser à nouveau sous réserve de sécurité.', content: <div className="flex gap-1 relative opacity-50"><Car className="w-6 h-6 text-black" /><Car className="w-6 h-6 text-black" /><div className="absolute inset-0 border-t-2 border-black rotate-45"></div></div> },
  { id: 'B34_50', category: 'interdiction', name: 'Fin de limitation à 50', meaning: 'Fin de la limitation de vitesse à 50 km/h.', content: '50' },
  { id: 'B34_80', category: 'interdiction', name: 'Fin de limitation à 80', meaning: 'Fin de la limitation de vitesse à 80 km/h.', content: '80' },

  // OBLIGATION (Ronds bleus)
  { id: 'B21-1', category: 'obligation', name: 'Obligation de tourner à droite', meaning: 'Au prochain carrefour, vous devez tourner à droite.', content: <ArrowRight className="w-10 h-10 text-white" /> },
  { id: 'B21-2', category: 'obligation', name: 'Obligation de tourner à gauche', meaning: 'Au prochain carrefour, vous devez tourner à gauche.', content: <ArrowRight className="w-10 h-10 text-white" style={{ transform: 'rotate(180deg)' }} /> },
  { id: 'B21b', category: 'obligation', name: 'Contournement obligatoire', meaning: 'Obligation de contourner l\'obstacle par la droite.', content: <ArrowRight className="w-10 h-10 text-white" style={{ transform: 'rotate(45deg)' }} /> },
  { id: 'B22a', category: 'obligation', name: 'Piste cyclable obligatoire', meaning: 'Voie réservée et obligatoire pour les cyclistes.', content: <Bike className="w-8 h-8 text-white" /> },
  { id: 'B25', category: 'obligation', name: 'Vitesse minimale obligatoire', meaning: 'Interdiction de rouler à une vitesse inférieure à 30 km/h.', content: <span className="text-white font-black text-3xl">30</span> },
  { id: 'B27a', category: 'obligation', name: 'Voie réservée aux bus', meaning: 'Voie réservée aux transports en commun. Interdit aux autres véhicules.', content: <span className="text-white font-black text-sm">BUS</span> },
  { id: 'B29', category: 'obligation', name: 'Fin de piste cyclable', meaning: 'Fin de la piste ou bande cyclable obligatoire.', content: <Bike className="w-8 h-8 text-white" /> },

  // INDICATION (Carrés bleus)
  { id: 'C1a', category: 'indication', name: 'Parking', meaning: 'Indique un espace de stationnement autorisé.', content: <span className="text-white font-black text-4xl">P</span> },
  { id: 'C4a', category: 'indication', name: 'Vitesse conseillée', meaning: 'Vitesse conseillée pour optimiser le flux de trafic (ici 70 km/h).', content: <span className="text-white font-black text-3xl">70</span> },
  { id: 'C12', category: 'indication', name: 'Sens unique', meaning: 'Toutes les voies de circulation sont dans le même sens.', content: <ArrowUp className="w-10 h-10 text-white" /> },
  { id: 'C20a', category: 'indication', name: 'Passage piéton', meaning: 'Indique la position physique d\'un passage pour piétons.', content: <div className="flex flex-col items-center gap-1"><div className="w-6 h-1 bg-white"></div><div className="w-6 h-1 bg-white"></div><div className="w-6 h-1 bg-white"></div></div> },
  { id: 'C50', category: 'indication', name: 'Zone piétonne', meaning: 'Entrée d\'une zone réservée aux piétons, véhicules autorisés uniquement au pas.', content: <span className="text-white font-black text-xs">ZONE 🚶</span> },
  { id: 'C107', category: 'indication', name: 'Route à accès réglementé', meaning: 'Début d\'une voie rapide. Vitesse limitée généralement à 110 km/h. Interdit aux vélos et piétons.', content: <Car className="w-10 h-10 text-white" /> },
  { id: 'C207', category: 'indication', name: 'Autoroute', meaning: 'Début d\'une autoroute. Vitesse limitée à 130 km/h.', content: <div className="flex gap-2"><div className="w-1 h-8 bg-white"></div><div className="w-1 h-8 bg-white"></div></div> },
  { id: 'C107_end', category: 'indication', name: 'Fin de voie rapide', meaning: 'Fin d\'une route à accès réglementé.', content: <Car className="w-10 h-10 text-white" /> },
  { id: 'C207_end', category: 'indication', name: 'Fin d\'autoroute', meaning: 'Fin d\'une section d\'autoroute.', content: <div className="flex gap-2"><div className="w-1 h-8 bg-white"></div><div className="w-1 h-8 bg-white"></div></div> },

  // PRIORITÉ (Formes spéciales)
  { id: 'AB1', category: 'priorite', name: 'Priorité à droite', meaning: 'Cédez le passage aux véhicules venant de droite à la prochaine intersection.', content: 'croix' },
  { id: 'AB2', category: 'priorite', name: 'Priorité ponctuelle', meaning: 'Vous avez la priorité à la prochaine intersection seulement.', content: 'ponctuelle' },
  { id: 'AB3a', category: 'priorite', name: 'Cédez le passage', meaning: 'Ralentir et céder le passage à gauche et à droite sans obligation de s\'arrêter si la voie est libre.', content: 'cedez' },
  { id: 'AB4', category: 'priorite', name: 'Stop', meaning: 'Arrêt complet OBLIGATOIRE à la ligne. Cédez le passage à gauche et à droite.', content: 'stop' },
  { id: 'AB6', category: 'priorite', name: 'Route prioritaire', meaning: 'Vous êtes prioritaire à toutes les intersections de cette route jusqu\'au panneau de fin.', content: 'losange' },
  { id: 'AB7', category: 'priorite', name: 'Fin de route prioritaire', meaning: 'Fin de la priorité à toutes les intersections.', content: 'losange_end' },
  { id: 'B15', category: 'priorite', name: 'Priorité au sens inverse', meaning: 'Vous devez céder le passage aux usagers venant en sens inverse dans ce passage étroit.', content: 'sens_inverse' },
  { id: 'C18', category: 'priorite', name: 'Priorité face au sens inverse', meaning: 'Vous avez la priorité de passage face aux usagers venant en sens inverse.', content: 'priorite_face' },
];

const SIGNS_RU: Record<string, { name: string; meaning: string }> = {
  'A1a': { name: 'Опасный поворот направо', meaning: 'Снизьте скорость, опасный поворот направо через 150 м (вне населенного пункта).' },
  'A1b': { name: 'Опасный поворот налево', meaning: 'Снизьте скорость, опасный поворот налево через 150 м.' },
  'A1c': { name: 'Опасные повороты', meaning: 'Опасные повороты, первый направо. Снизьте скорость.' },
  'A2a': { name: 'Неровная дорога (бугор или впадина)', meaning: 'Деформация дорожного покрытия или искусственная неровность.' },
  'A3': { name: 'Сужение дороги', meaning: 'Дорога сужается перед вами. Будьте осторожны при разъезде.' },
  'A4': { name: 'Скользкая дорога', meaning: 'Опасность заноса. Снизьте скорость и увеличьте дистанцию.' },
  'A7': { name: 'Переезд без шлагбаума', meaning: 'Нерегулируемый железнодорожный переезд. Будьте предельно внимательны.' },
  'A8': { name: 'Пересечение с трамвайной линией', meaning: 'Абсолютный приоритет трамвая. Уступите дорогу при приближении трамвая.' },
  'A13a': { name: 'Дети', meaning: 'Близость школы или игровой площадки. Снизьте скорость.' },
  'A13b': { name: 'Пешеходный переход', meaning: 'Пешеходный переход через 50/150м. Пешеходы имеют преимущество.' },
  'A14': { name: 'Прочие опасности', meaning: 'Неуказанная опасность, будьте предельно внимательны.' },
  'A18': { name: 'Двустороннее движение', meaning: 'Внимание, двустороннее движение начинается сразу после знака.' },
  'A21': { name: 'Боковой ветер', meaning: 'Опасность отклонения от траектории из-за сильного бокового ветра.' },
  
  'B0': { name: 'Движение запрещено', meaning: 'Движение запрещено в обоих направлениях для всех транспортных средств.' },
  'B1': { name: 'Въезд запрещен', meaning: 'Запрещается въезд в этом направлении (Одностороннее движение).' },
  'B2a': { name: 'Поворот налево запрещен', meaning: 'На следующем перекрестке поворот налево запрещен.' },
  'B2b': { name: 'Поворот направо запрещен', meaning: 'На следующем перекрестке поворот направо запрещен.' },
  'B2c': { name: 'Разворот запрещен', meaning: 'Разворот запрещен до следующего перекрестка.' },
  'B3': { name: 'Обгон запрещен', meaning: 'Запрещается обгон всех моторных транспортных средств.' },
  'B6a1': { name: 'Стоянка запрещена', meaning: 'Стоянка запрещена от знака до следующего перекрестка.' },
  'B6d': { name: 'Остановка и стоянка запрещены', meaning: 'Абсолютный запрет на остановку и стоянку автомобиля.' },
  'B14_30': { name: 'Ограничение скорости 30', meaning: 'Максимально разрешенная скорость: 30 км/ч.' },
  'B14_50': { name: 'Ограничение скорости 50', meaning: 'Максимально разрешенная скорость: 50 км/ч.' },
  'B14_80': { name: 'Ограничение скорости 80', meaning: 'Максимально разрешенная скорость: 80 км/ч.' },
  'B14_110': { name: 'Ограничение скорости 110', meaning: 'Максимально разрешенная скорость: 110 км/ч.' },
  'B14_130': { name: 'Ограничение скорости 130', meaning: 'Максимально разрешенная скорость: 130 км/ч.' },
  'B31': { name: 'Конец всех ограничений', meaning: 'Конец действия всех ранее установленных знаками ограничений.' },
  'B33': { name: 'Конец зоны запрещения обгона', meaning: 'Разрешается обгон при соблюдении безопасности.' },
  'B34_50': { name: 'Конец ограничения скорости 50', meaning: 'Конец действия ограничения скорости 50 км/ч.' },
  'B34_80': { name: 'Конец ограничения скорости 80', meaning: 'Конец действия ограничения скорости 80 км/ч.' },

  'B21-1': { name: 'Обязательный поворот направо', meaning: 'На перекрестке обязателен поворот направо.' },
  'B21-2': { name: 'Обязательный поворот налево', meaning: 'На перекрестке обязателен поворот налево.' },
  'B21b': { name: 'Обязательный объезд препятствия', meaning: 'Обязательный объезд препятствия справа.' },
  'B22a': { name: 'Велосипедная дорожка', meaning: 'Дорожка, предназначенная исключительно для велосипедистов.' },
  'B25': { name: 'Ограничение минимальной скорости', meaning: 'Минимальная скорость движения 30 км/ч.' },
  'B27a': { name: 'Полоса для автобусов', meaning: 'Полоса движения, предназначенная только для общественного транспорта.' },
  'B29': { name: 'Конец велосипедной дорожки', meaning: 'Конец дорожки для велосипедистов.' },

  'C1a': { name: 'Парковка', meaning: 'Место, предназначенное для стоянки автомобилей.' },
  'C4a': { name: 'Рекомендуемая скорость', meaning: 'Рекомендуется двигаться со скоростью 70 км/ч.' },
  'C12': { name: 'Одностороннее движение', meaning: 'Движение по дороге с односторонним движением.' },
  'C20a': { name: 'Пешеходный переход', meaning: 'Указывает точное расположение пешеходного перехода.' },
  'C50': { name: 'Пешеходная зона', meaning: 'Вход в пешеходную зону.' },
  'C107': { name: 'Дорога для автомобилей', meaning: 'Начало скоростной дороги для автомобилей.' },
  'C207': { name: 'Автомагистраль', meaning: 'Начало участка автомагистрали.' },
  'C107_end': { name: 'Конец дороги для автомобилей', meaning: 'Конец действия скоростной дороги.' },
  'C207_end': { name: 'Конец автомагистрали', meaning: 'Конец действия автомагистрали.' },

  'AB4': { name: 'Стоп', meaning: 'Обязательная полная остановка у стоп-линии или края перекрестка.' },
  'AB3a': { name: 'Уступите дорогу', meaning: 'Уступите дорогу транспортным средствам на пересекаемой дороге.' },
  'AB1': { name: 'Помеха справа', meaning: 'Уступите дорогу транспортным средствам, приближающимся справа.' },
  'AB2': { name: 'Преимущество на перекрестке', meaning: 'Вы имеете преимущество проезда на следующем перекрестке.' },
  'AB6': { name: 'Главная дорога', meaning: 'Вы имеете преимущество на всех перекрестках этой дороги.' },
  'AB7': { name: 'Конец главной дороги', meaning: 'Конец преимущества проезда перекрестков.' },
  'B15': { name: 'Преимущество встречного движения', meaning: 'Необходимо уступить дорогу встречным транспортным средствам.' },
  'C18': { name: 'Преимущество перед встречным движением', meaning: 'Вы имеете преимущество проезда узкого участка.' },
};

export default function SignLexicon() {
  const { language } = useLanguage();

  const renderSignShape = (sign: SignData) => {
    switch(sign.category) {
      case 'danger':
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            <polygon 
              points="40,6 74,70 6,70" 
              fill="white" 
              stroke="#dc2626" 
              strokeWidth="7" 
              strokeLinejoin="round" 
            />
            <foreignObject x="20" y="27" width="40" height="40">
              <div className="w-full h-full flex items-center justify-center text-gray-900 scale-90">
                {sign.content}
              </div>
            </foreignObject>
          </svg>
        );
      case 'interdiction':
        if (sign.id === 'B0') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="white" stroke="#dc2626" strokeWidth="8" />
            </svg>
          );
        }
        if (sign.id === 'B1') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="35" fill="#dc2626" />
              <rect x="18" y="34" width="44" height="12" fill="white" rx="2" />
            </svg>
          );
        }
        if (sign.id === 'B6a1') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="#2563eb" stroke="#dc2626" strokeWidth="8" />
              <line x1="22" y1="22" x2="58" y2="58" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
            </svg>
          );
        }
        if (sign.id === 'B6d') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="#2563eb" stroke="#dc2626" strokeWidth="8" />
              <line x1="22" y1="22" x2="58" y2="58" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
              <line x1="58" y1="22" x2="22" y2="58" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
            </svg>
          );
        }
        if (sign.id === 'B31') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="white" stroke="#9ca3af" strokeWidth="6" />
              <line x1="22" y1="22" x2="58" y2="58" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round" />
            </svg>
          );
        }
        if (sign.id.startsWith('B34')) {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="white" stroke="#9ca3af" strokeWidth="6" />
              <line x1="22" y1="22" x2="58" y2="58" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round" />
              <foreignObject x="15" y="15" width="50" height="50">
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-black text-2xl relative z-10">
                  {sign.content}
                </div>
              </foreignObject>
            </svg>
          );
        }
        if (sign.id === 'B33') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="white" stroke="#9ca3af" strokeWidth="6" />
              <line x1="22" y1="22" x2="58" y2="58" stroke="#9ca3af" strokeWidth="5" strokeLinecap="round" />
              <foreignObject x="15" y="15" width="50" height="50">
                <div className="w-full h-full flex items-center justify-center text-black opacity-30">
                  {sign.content}
                </div>
              </foreignObject>
            </svg>
          );
        }
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            <circle cx="40" cy="40" r="34" fill="white" stroke="#dc2626" strokeWidth="8" />
            <foreignObject x="15" y="15" width="50" height="50">
              <div className="w-full h-full flex items-center justify-center text-gray-900">
                {sign.content}
              </div>
            </foreignObject>
          </svg>
        );
      case 'obligation':
        if (sign.id === 'B29') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="35" fill="#2563eb" stroke="white" strokeWidth="3" />
              <line x1="20" y1="20" x2="60" y2="60" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
              <foreignObject x="15" y="15" width="50" height="50">
                <div className="w-full h-full flex items-center justify-center text-white opacity-70">
                  {sign.content}
                </div>
              </foreignObject>
            </svg>
          );
        }
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            <circle cx="40" cy="40" r="35" fill="#2563eb" stroke="white" strokeWidth="3" />
            <foreignObject x="15" y="15" width="50" height="50">
              <div className="w-full h-full flex items-center justify-center text-white">
                {sign.content}
              </div>
            </foreignObject>
          </svg>
        );
      case 'indication':
        if (sign.id.endsWith('_end')) {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <rect x="5" y="5" width="70" height="70" rx="10" fill="#2563eb" stroke="white" strokeWidth="3" />
              <line x1="10" y1="10" x2="70" y2="70" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
              <foreignObject x="10" y="10" width="60" height="60">
                <div className="w-full h-full flex items-center justify-center text-white">
                  {sign.content}
                </div>
              </foreignObject>
            </svg>
          );
        }
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            <rect x="5" y="5" width="70" height="70" rx="10" fill="#2563eb" stroke="white" strokeWidth="3" />
            <foreignObject x="10" y="10" width="60" height="60">
              <div className="w-full h-full flex items-center justify-center text-white">
                {sign.content}
              </div>
            </foreignObject>
          </svg>
        );
      case 'priorite':
        if (sign.content === 'stop') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <polygon 
                points="24,6 56,6 74,24 74,56 56,74 24,74 6,56 6,24" 
                fill="#dc2626" 
                stroke="white" 
                strokeWidth="3" 
              />
              <text x="40" y="47" textAnchor="middle" fill="white" className="font-black text-sm uppercase tracking-wider" style={{ fontFamily: 'sans-serif' }}>STOP</text>
            </svg>
          );
        }
        if (sign.content === 'cedez') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <polygon 
                points="6,10 74,10 40,74" 
                fill="white" 
                stroke="#dc2626" 
                strokeWidth="7" 
                strokeLinejoin="round" 
              />
            </svg>
          );
        }
        if (sign.content === 'croix') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <polygon 
                points="40,6 74,70 6,70" 
                fill="white" 
                stroke="#dc2626" 
                strokeWidth="7" 
                strokeLinejoin="round" 
              />
              <line x1="33" y1="42" x2="47" y2="56" stroke="black" strokeWidth="5" strokeLinecap="round" />
              <line x1="47" y1="42" x2="33" y2="56" stroke="black" strokeWidth="5" strokeLinecap="round" />
            </svg>
          );
        }
        if (sign.content === 'ponctuelle') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <polygon 
                points="40,6 74,70 6,70" 
                fill="white" 
                stroke="#dc2626" 
                strokeWidth="7" 
                strokeLinejoin="round" 
              />
              <line x1="30" y1="48" x2="50" y2="48" stroke="black" strokeWidth="4" strokeLinecap="round" />
              <path d="M40,32 L46,42 L34,42 Z" fill="black" />
              <rect x="37" y="42" width="6" height="12" fill="black" />
            </svg>
          );
        }
        if (sign.content === 'losange') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <polygon points="40,6 74,40 40,74 6,40" fill="#facc15" stroke="white" strokeWidth="6" />
              <polygon points="40,11 69,40 40,69 11,40" fill="#facc15" stroke="#facc15" strokeWidth="2" />
            </svg>
          );
        }
        if (sign.content === 'losange_end') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <polygon points="40,6 74,40 40,74 6,40" fill="#facc15" stroke="white" strokeWidth="6" />
              <line x1="15" y1="65" x2="65" y2="15" stroke="black" strokeWidth="7" strokeLinecap="round" />
            </svg>
          );
        }
        if (sign.content === 'sens_inverse') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <circle cx="40" cy="40" r="34" fill="white" stroke="#dc2626" strokeWidth="8" />
              <path d="M30,52 L30,28 M26,35 L30,28 L34,35" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M50,28 L50,52 M46,45 L50,52 L54,45" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        }
        if (sign.content === 'priorite_face') {
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              <rect x="5" y="5" width="70" height="70" rx="10" fill="#2563eb" stroke="white" strokeWidth="3" />
              <path d="M30,28 L30,52 M26,45 L30,52 L34,45" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M50,52 L50,28 M46,35 L50,28 L54,35" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
