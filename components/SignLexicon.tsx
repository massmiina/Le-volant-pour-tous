import React, { useState } from 'react';
import { 
  Search,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type SignCategory = 'danger' | 'interdiction' | 'obligation' | 'indication' | 'priorite' | 'services';

interface SignData {
  id: string;
  category: SignCategory;
  name: string;
  meaning: string;
}

const SIGNS: SignData[] = [
  // ================= DANGER (Triangles) =================
  { id: 'A1b', category: 'danger', name: 'Virage à gauche', meaning: 'Annonce un virage dangereux vers la gauche. Ralentissez à l\'approche.' },
  { id: 'A1a', category: 'danger', name: 'Virage à droite', meaning: 'Annonce un virage dangereux vers la droite. Ralentissez à l\'approche.' },
  { id: 'A1c', category: 'danger', name: 'Succession de virages, 1er à droite', meaning: 'Succession de virages dangereux dont le premier est vers la droite. Réduisez votre vitesse.' },
  { id: 'A1d', category: 'danger', name: 'Succession de virages, 1er à gauche', meaning: 'Succession de virages dangereux dont le premier est vers la gauche. Réduisez votre vitesse.' },
  { id: 'A2a', category: 'danger', name: 'Cassis ou dos-d\'âne', meaning: 'Signale une déformation importante de la chaussée ou un cassis (creux/bosse) pouvant déséquilibrer le véhicule.' },
  { id: 'A2b', category: 'danger', name: 'Ralentisseur', meaning: 'Annonce un ralentisseur de type dos-d\'âne pour forcer la réduction de la vitesse en zone urbaine.' },
  { id: 'A3', category: 'danger', name: 'Chaussée rétrécie', meaning: 'Rétrécissement de la chaussée des deux côtés. Croisement difficile avec les usagers d\'en face.' },
  { id: 'A3a', category: 'danger', name: 'Chaussée rétrécie par la droite', meaning: 'Rétrécissement de la chaussée sur le côté droit uniquement.' },
  { id: 'A3b', category: 'danger', name: 'Chaussée rétrécie par la gauche', meaning: 'Rétrécissement de la chaussée sur le côté gauche uniquement.' },
  { id: 'A4', category: 'danger', name: 'Chaussée particulièrement glissante', meaning: 'Chaussée glissante (pluie, verglas, boue). Risque élevé de perte d\'adhérence.' },
  { id: 'A5', category: 'danger', name: 'Pont mobile', meaning: 'Annonce un pont mobile pouvant s\'élever. Arrêt obligatoire si les feux rouges clignotent.' },
  { id: 'A13b', category: 'danger', name: 'Passage pour piétons', meaning: 'Signale la présence d\'un passage pour piétons. Priorité absolue aux piétons engagés ou ayant l\'intention de s\'engager.' },
  { id: 'A13b_raised', category: 'danger', name: 'Passage pour piétons surélevé', meaning: 'Signale un passage piéton implanté sur un ralentisseur dos-d\'âne. Vigilance accrue.' },
  { id: 'A13a', category: 'danger', name: 'Endroit fréquenté par les enfants', meaning: 'Proximité d\'une école, d\'une aire de jeux ou d\'un parc. Ralentissez fortement.' },
  { id: 'A15b', category: 'danger', name: 'Passage d\'animaux domestiques', meaning: 'Risque de rencontre avec du bétail (vaches, moutons) pouvant traverser la chaussée.' },
  { id: 'A15a1', category: 'danger', name: 'Passage d\'animaux sauvages', meaning: 'Risque de traversée de grand gigier (cerfs, sangliers) en forêt. Vigilance accrue.' },
  { id: 'A15c', category: 'danger', name: 'Passage de cavaliers', meaning: 'Présence fréquente de chevaux et cavaliers traversant ou longeant la route.' },
  { id: 'A16', category: 'danger', name: 'Descente dangereuse', meaning: 'Annonce une descente à forte inclinaison (10%). Utiliser le frein moteur pour ne pas surchauffer les freins.' },
  { id: 'A17', category: 'danger', name: 'Annonce de feux tricolores', meaning: 'Signale des feux de circulation, souvent isolés ou inattendus (entrée de ville).' },
  { id: 'A18', category: 'danger', name: 'Circulation dans les deux sens', meaning: 'Règle d\'exception : s\'applique IMMÉDIATEMENT à hauteur du panneau. Fin du sens unique.' },
  { id: 'A19', category: 'danger', name: 'Chute de pierres', meaning: 'Risque de chutes de pierres ou de présence d\'éboulements sur la chaussée.' },
  { id: 'A20', category: 'danger', name: 'Débouché sur un quai ou une berge', meaning: 'La route se termine sur un quai ou un cours d\'eau. Risque de chute dans l\'eau.' },
  { id: 'A21', category: 'danger', name: 'Débouché de cyclistes', meaning: 'Attention aux cyclistes débouchant de pistes cyclables ou traversant la chaussée.' },
  { id: 'A23', category: 'danger', name: 'Danger aérien', meaning: 'Survol d\'avions à basse altitude (proximité d\'aérodrome). Risque de bruit soudain.' },
  { id: 'A24', category: 'danger', name: 'Risque de fort vent latéral', meaning: 'Manche à air indiquant un vent violent pouvant déporter la trajectoire du véhicule.' },
  { id: 'A8', category: 'danger', name: 'Traversée de voies de tramways', meaning: 'Traversée de voies ferrées de tramway. Priorité absolue au tramway.' },
  { id: 'A9', category: 'danger', name: 'Traversée de voie de bus', meaning: 'Intersection avec une voie réservée aux transports en commun.' },
  { id: 'A14', category: 'danger', name: 'Danger non spécifié', meaning: 'Danger pour lequel il n\'existe pas de symbole. Précisé parfois par un panonceau explicatif.' },

  // ================= INTERDICTION (Ronds rouges) =================
  { id: 'B0', category: 'interdiction', name: 'Circulation interdite', meaning: 'Interdiction d\'accès à tout véhicule dans les deux sens de circulation.' },
  { id: 'B1', category: 'interdiction', name: 'Sens interdit', meaning: 'Interdiction de s\'engager dans cette rue. Le trafic s\'effectue en sens inverse.' },
  { id: 'B2a', category: 'interdiction', name: 'Interdiction de tourner à gauche', meaning: 'Au prochain carrefour, interdiction de tourner à gauche pour toutes les voies.' },
  { id: 'B2b', category: 'interdiction', name: 'Interdiction de tourner à droite', meaning: 'Au prochain carrefour, interdiction de tourner à droite pour toutes les voies.' },
  { id: 'B2c', category: 'interdiction', name: 'Interdiction de faire demi-tour', meaning: 'Interdiction de faire demi-tour sur la route jusqu\'au prochain carrefour.' },
  { id: 'B3', category: 'interdiction', name: 'Dépassement interdit', meaning: 'Interdiction de dépasser tous les véhicules à moteur (sauf deux-roues sans side-car).' },
  { id: 'B3a', category: 'interdiction', name: 'Dépassement interdit aux poids lourds', meaning: 'Interdiction de dépasser pour les véhicules de transport de marchandises > 3,5t.' },
  { id: 'B4', category: 'interdiction', name: 'Halte Douane', meaning: 'Obligation de marquer l\'arrêt au poste de douane. Ne repartir que sur ordre.' },
  { id: 'B5a', category: 'interdiction', name: 'Halte Gendarmerie', meaning: 'Obligation de s\'arrêter au poste de contrôle de la Gendarmerie.' },
  { id: 'B5b', category: 'interdiction', name: 'Halte Police', meaning: 'Obligation de s\'arrêter au poste de contrôle de la Police.' },
  { id: 'B5c', category: 'interdiction', name: 'Halte Péage', meaning: 'Obligation de s\'arrêter pour s\'acquitter du péage de l\'autoroute.' },
  { id: 'B6a1', category: 'interdiction', name: 'Stationnement interdit', meaning: 'Stationnement interdit à partir du panneau jusqu\'à la prochaine intersection.' },
  { id: 'B6a2', category: 'interdiction', name: 'Stationnement alterné (1-15 du mois)', meaning: 'Stationnement interdit du côté du panneau du 1er au 15 du mois.' },
  { id: 'B6a3', category: 'interdiction', name: 'Stationnement alterné (16-31 du mois)', meaning: 'Stationnement interdit du côté du panneau du 16 au 31 du mois.' },
  { id: 'B6d', category: 'interdiction', name: 'Arrêt et stationnement interdits', meaning: 'Interdiction absolue d\'arrêter ou de stationner son véhicule sur la chaussée.' },
  { id: 'B7b', category: 'interdiction', name: 'Accès interdit aux motorisés', meaning: 'Accès interdit à tous les véhicules à moteur (sauf cyclomoteurs).' },
  { id: 'B8', category: 'interdiction', name: 'Accès interdit aux motocycles', meaning: 'Accès interdit aux motos de toutes cylindrées.' },
  { id: 'B9a', category: 'interdiction', name: 'Accès interdit aux piétons', meaning: 'Interdiction d\'accès pour tous les piétons sur cette portion de voie.' },
  { id: 'B9b', category: 'interdiction', name: 'Accès interdit aux cycles', meaning: 'Accès interdit aux bicyclettes et vélos électriques.' },
  { id: 'B9g', category: 'interdiction', name: 'Accès interdit aux bus', meaning: 'Accès interdit aux autocars et autobus.' },
  { id: 'B9h', category: 'interdiction', name: 'Accès interdit aux cyclomoteurs', meaning: 'Accès interdit aux deux-roues de moins de 50 cm³.' },
  { id: 'B11', category: 'interdiction', name: 'Hauteur limitée à 3,5m', meaning: 'Accès interdit aux véhicules dont la hauteur dépasse 3,5 mètres.' },
  { id: 'B12', category: 'interdiction', name: 'Largeur limitée à 2,5m', meaning: 'Accès interdit aux véhicules dont la largeur dépasse 2,5 mètres.' },
  { id: 'B13', category: 'interdiction', name: 'Poids limité à 5,5t', meaning: 'Accès interdit aux véhicules dont le P.T.A.C dépasse 5,5 tonnes.' },
  { id: 'B14_30', category: 'interdiction', name: 'Vitesse limitée à 30', meaning: 'Vitesse maximale autorisée de 30 km/h.' },
  { id: 'B14_50', category: 'interdiction', name: 'Vitesse limitée à 50', meaning: 'Vitesse maximale autorisée de 50 km/h.' },
  { id: 'B14_80', category: 'interdiction', name: 'Vitesse limitée à 80', meaning: 'Vitesse maximale autorisée de 80 km/h.' },
  { id: 'B14_110', category: 'interdiction', name: 'Vitesse limitée à 110', meaning: 'Vitesse maximale autorisée de 110 km/h.' },
  { id: 'B14_130', category: 'interdiction', name: 'Vitesse limitée à 130', meaning: 'Vitesse maximale autorisée de 130 km/h.' },
  { id: 'B31', category: 'interdiction', name: 'Fin de toutes les interdictions', meaning: 'Fin de toutes les interdictions précédemment signalées pour les véhicules en mouvement.' },
  { id: 'B33', category: 'interdiction', name: 'Fin d\'interdiction de dépasser', meaning: 'Autorisation de dépasser à nouveau sous réserve de sécurité.' },
  { id: 'B34_50', category: 'interdiction', name: 'Fin de limitation à 50', meaning: 'Fin de la limitation de vitesse à 50 km/h.' },
  { id: 'B34_80', category: 'interdiction', name: 'Fin de limitation à 80', meaning: 'Fin de la limitation de vitesse à 80 km/h.' },

  // ================= OBLIGATION (Ronds bleus) =================
  { id: 'B21-1', category: 'obligation', name: 'Obligation de tourner à droite', meaning: 'Au carrefour, virage à droite obligatoire.' },
  { id: 'B21-2', category: 'obligation', name: 'Obligation de tourner à gauche', meaning: 'Au carrefour, virage à gauche obligatoire.' },
  { id: 'B21b', category: 'obligation', name: 'Contournement obligatoire', meaning: 'Obligation de contourner l\'obstacle ou le refuge par le côté droit.' },
  { id: 'B21c1', category: 'obligation', name: 'Direction obligatoire tout droit', meaning: 'Obligation de continuer tout droit à la prochaine intersection.' },
  { id: 'B21c2', category: 'obligation', name: 'Direction obligatoire à droite', meaning: 'Obligation de tourner à droite à la prochaine intersection.' },
  { id: 'B21d1', category: 'obligation', name: 'Direction obligatoire à gauche ou à droite', meaning: 'Obligation de tourner à gauche ou à droite à la prochaine intersection.' },
  { id: 'B21e', category: 'obligation', name: 'Direction obligatoire tout droit ou à droite', meaning: 'Obligation de continuer tout droit ou de tourner à droite à la prochaine intersection.' },
  { id: 'B22a', category: 'obligation', name: 'Piste cyclable', meaning: 'Voie obligatoire pour les cyclistes (interdite aux piétons et motorisés).' },
  { id: 'B22b', category: 'obligation', name: 'Chemin obligatoire pour piétons', meaning: 'Voie réservée exclusivement à la circulation des piétons. Interdit à tout véhicule.' },
  { id: 'B22c', category: 'obligation', name: 'Chemin obligatoire pour cavaliers', meaning: 'Voie réservée exclusivement aux personnes circulant à cheval.' },
  { id: 'B25', category: 'obligation', name: 'Vitesse minimale obligatoire (30)', meaning: 'Interdiction de circuler à une vitesse inférieure à 30 km/h (sauf encombrement).' },
  { id: 'B26', category: 'obligation', name: 'Chaînes à neige obligatoires', meaning: 'Obligation de circuler avec des chaînes à neige sur au moins deux roues motrices.' },
  { id: 'B27a', category: 'obligation', name: 'Voie réservée aux bus', meaning: 'Voie réservée exclusivement aux transports en commun de passagers.' },
  { id: 'B27b', category: 'obligation', name: 'Voie réservée aux tramways', meaning: 'Voie réservée exclusivement à la circulation des tramways.' },
  { id: 'B29', category: 'obligation', name: 'Allumez vos feux', meaning: 'Obligation d\'allumer les feux de croisement (ex: entrée de tunnel).' },
  { id: 'B45a', category: 'obligation', name: 'Fin d\'obligation d\'allumer les feux', meaning: 'Indique la fin de l\'obligation d\'allumer les feux de croisement.' },

  // ================= INDICATION (Carrés bleus) =================
  { id: 'C1a', category: 'indication', name: 'Parking', meaning: 'Lieu aménagement pour le stationnement des véhicules.' },
  { id: 'C1b', category: 'indication', name: 'Parking payant', meaning: 'Lieu de stationnement payant réglementé par horodateur.' },
  { id: 'C1c', category: 'indication', name: 'Parking zone bleue', meaning: 'Stationnement gratuit mais limité en temps, nécessitant l\'utilisation d\'un disque.' },
  { id: 'C4a', category: 'indication', name: 'Vitesse conseillée (50)', meaning: 'Il est conseillé de rouler à 50 km/h sous de bonnes conditions.' },
  { id: 'C4b_50', category: 'indication', name: 'Fin de vitesse conseillée (50)', meaning: 'Indique la fin de la vitesse conseillée de 50 km/h.' },
  { id: 'C8', category: 'indication', name: 'Hôpital', meaning: 'Indique la proximité d\'un hôpital. Évitez les bruits et klaxons inutiles.' },
  { id: 'C12', category: 'indication', name: 'Sens unique', meaning: 'Circulation à sens unique. Interdiction de faire demi-tour ou de rouler à contre-sens.' },
  { id: 'C13a', category: 'indication', name: 'Impasse', meaning: 'Indique une rue sans issue pour les véhicules automobiles.' },
  { id: 'C13c', category: 'indication', name: 'Impasse avec issue piéton / cycle', meaning: 'Impasse pour les voitures, mais débouchant sur un cheminement piétons et cyclistes.' },
  { id: 'C20a', category: 'indication', name: 'Passage piéton', meaning: 'Indique l\'emplacement d\'un passage pour piétons.' },
  { id: 'C50', category: 'indication', name: 'Zone piétonne', meaning: 'Entrée d\'une zone réservée aux piétons. Véhicules exceptionnels admis au pas.' },
  { id: 'C107', category: 'indication', name: 'Route à accès réglementé', meaning: 'Début d\'une voie rapide (110 km/h). Interdit aux piétons, vélos, et usagers lents.' },
  { id: 'C207', category: 'indication', name: 'Autoroute', meaning: 'Début d\'une section d\'autoroute (130 km/h). Règles de sécurité strictes.' },
  { id: 'C107_end', category: 'indication', name: 'Fin de voie rapide', meaning: 'Fin d\'une route à accès réglementé.' },
  { id: 'C207_end', category: 'indication', name: 'Fin d\'autoroute', meaning: 'Fin de la section d\'autoroute.' },
  { id: 'C111', category: 'indication', name: 'Entrée de tunnel', meaning: 'Début d\'une section de route traversant un tunnel. Allumage des feux obligatoire.' },
  { id: 'C112', category: 'indication', name: 'Sortie de tunnel', meaning: 'Fin de la section de tunnel.' },
  { id: 'C115', category: 'indication', name: 'Début de voie verte', meaning: 'Début d\'une voie réservée exclusivement aux piétons et cyclistes.' },
  { id: 'C116', category: 'indication', name: 'Fin de voie verte', meaning: 'Indique la fin de la voie verte réservée aux piétons et cyclistes.' },
  { id: 'C24a', category: 'indication', name: 'Début de zone de rencontre', meaning: 'Entrée d\'une zone de rencontre. Vitesse limitée à 20 km/h, priorité aux piétons.' },
  { id: 'C24b', category: 'indication', name: 'Fin de zone de rencontre', meaning: 'Indique la fin de la zone de rencontre.' },

  // ================= PRIORITÉ (Formes spéciales) =================
  { id: 'AB1', category: 'priorite', name: 'Priorité à droite', meaning: 'Intersection où s\'applique la règle de priorité à droite par défaut.' },
  { id: 'AB2', category: 'priorite', name: 'Priorité ponctuelle', meaning: 'Vous avez la priorité de passage à la prochaine intersection seulement.' },
  { id: 'AB3a', category: 'priorite', name: 'Cédez le passage', meaning: 'Cédez le passage aux usagers à gauche et à droite. Arrêt non requis si la voie est libre.' },
  { id: 'AB4', category: 'priorite', name: 'Stop', meaning: 'Arrêt absolu OBLIGATOIRE à la ligne. Cédez le passage à tous les usagers de l\'axe rencontré.' },
  { id: 'AB6', category: 'priorite', name: 'Route prioritaire', meaning: 'Vous êtes prioritaire à toutes les intersections sur cet axe jusqu\'à sa fin.' },
  { id: 'AB7', category: 'priorite', name: 'Fin de route prioritaire', meaning: 'Fin de la route prioritaire. La priorité à droite redevient la règle par défaut.' },
  { id: 'B15', category: 'priorite', name: 'Priorité au sens inverse', meaning: 'Vous devez céder le passage aux usagers venant en face dans ce passage étroit.' },
  { id: 'C18', category: 'priorite', name: 'Priorité face au sens inverse', meaning: 'Vous avez la priorité de passage face aux usagers venant en sens inverse dans le passage étroit.' },

  // ================= SERVICES (Carrés à listel bleu) =================
  { id: 'CE1', category: 'services', name: 'Poste de secours', meaning: 'Indique la présence d\'un poste de secours de premier secours à proximité.' },
  { id: 'CE2a', category: 'services', name: 'Appel d\'urgence (SOS)', meaning: 'Poste d\'appel d\'urgence relié directement aux services de secours.' },
  { id: 'CE2b', category: 'services', name: 'Cabine téléphonique', meaning: 'Indique la présence d\'une cabine téléphonique publique.' },
  { id: 'CE3a', category: 'services', name: 'Distributeur de billets', meaning: 'Indique la présence d\'un distributeur automatique de billets de banque (DAB).' },
  { id: 'CE3b', category: 'services', name: 'Toilettes publiques', meaning: 'Présence de toilettes publiques ouvertes au public.' },
  { id: 'CE4a', category: 'services', name: 'Risque d\'incendie', meaning: 'Indique une zone particulièrement sensible au risque d\'incendie de forêt.' },
  { id: 'CE12', category: 'services', name: 'Station de gonflage', meaning: 'Indique la présence d\'un point de gonflage gratuit pour pneumatiques.' },
  { id: 'CE14', category: 'services', name: 'Camping pour tentes', meaning: 'Terrain de camping aménagé pour les tentes.' },
  { id: 'CE15a', category: 'services', name: 'Camping pour caravanes', meaning: 'Terrain de camping et de stationnement pour caravanes et camping-cars.' },
  { id: 'CE16', category: 'services', name: 'Restaurant', meaning: 'Présence d\'un restaurant ou lieu de restauration.' },
  { id: 'CE18', category: 'services', name: 'Station-service / Recharge', meaning: 'Poste de distribution de carburant et de recharge de véhicules électriques.' },
  { id: 'CE22', category: 'services', name: 'Accès handicapés', meaning: 'Installations et services accessibles aux personnes à mobilité réduite (PMR).' },
  { id: 'CE23', category: 'services', name: 'Aire de covoiturage', meaning: 'Lieu aménagé spécifiquement pour le rendez-vous des usagers pratiquant le covoiturage.' },
];

const SIGNS_RU: Record<string, { name: string; meaning: string }> = {
  'A1b': { name: 'Опасный поворот налево', meaning: 'Снизьте скорость, опасный поворот налево через 150 м (вне населенного пункта).' },
  'A1a': { name: 'Опасный поворот направо', meaning: 'Снизьте скорость, опасный поворот направо через 150 м.' },
  'A1c': { name: 'Опасные повороты', meaning: 'Опасные повороты, первый направо. Снизьте скорость.' },
  'A1d': { name: 'Опасные повороты', meaning: 'Опасные повороты, первый налево. Снизьте скорость.' },
  'A2a': { name: 'Неровная дорога (бугор или впадина)', meaning: 'Деформация дорожного покрытия или искусственная неровность.' },
  'A2b': { name: 'Искусственная неровность', meaning: 'Предупреждение о лежачем полицейском.' },
  'A3': { name: 'Сужение дороги', meaning: 'Дорога сужается с обеих сторон. Будьте осторожны при разъезде.' },
  'A3a': { name: 'Сужение дороги справа', meaning: 'Дорога сужается с правой стороны.' },
  'A3b': { name: 'Сужение дороги слева', meaning: 'Дорога сужается с левой стороны.' },
  'A4': { name: 'Скользкая дорога', meaning: 'Опасность заноса. Снизьте скорость и увеличьте дистанцию.' },
  'A5': { name: 'Разводной мост', meaning: 'Предупреждение о разводном мосте. Остановка при запрещающем сигнале.' },
  'A13b': { name: 'Пешеходный переход', meaning: 'Пешеходный переход через 50/150м. Пешеходы имеют преимущество.' },
  'A13b_raised': { name: 'Приподнятый пешеходный переход', meaning: 'Пешеходный переход на искусственной неровности.' },
  'A13a': { name: 'Дети', meaning: 'Близость школы или игровой площадки. Снизьте скорость.' },
  'A15b': { name: 'Домашние животные', meaning: 'Возможен выход домашних животных на проезжую часть.' },
  'A15a1': { name: 'Дикие животные', meaning: 'Предупреждение о возможном появлении крупных диких животных.' },
  'A15c': { name: 'Всадники', meaning: 'Возможно появление наездников на лошадях.' },
  'A16': { name: 'Крутой спуск', meaning: 'Предупреждение о крутом спуске (10%). Используйте торможение двигателем.' },
  'A17': { name: 'Светофорное регулирование', meaning: 'Предупреждение о приближении к светофору.' },
  'A18': { name: 'Двустороннее движение', meaning: 'Внимание, двустороннее движение начинается сразу после знака.' },
  'A19': { name: 'Падение камней', meaning: 'Опасность камнепада или обвалов.' },
  'A20': { name: 'Выезд на набережную', meaning: 'Дорога ведет к набережной или берегу водоема.' },
  'A21': { name: 'Велосипедисты', meaning: 'Возможно появление велосипедистов на дороге.' },
  'A23': { name: 'Низколетящие самолеты', meaning: 'Возможен внезапный шум от низколетящих самолетов.' },
  'A24': { name: 'Боковой ветер', meaning: 'Опасность отклонения от траектории из-за сильного бокового ветра.' },
  'A8': { name: 'Трамвайная линия', meaning: 'Пересечение с трамвайными путями. Уступите дорогу трамваю.' },
  'A9': { name: 'Полоса для автобусов', meaning: 'Пересечение с полосой общественного транспорта.' },
  'A14': { name: 'Прочие опасности', meaning: 'Неуказанная опасность, будьте предельно внимательны.' },

  'B0': { name: 'Движение запрещено', meaning: 'Движение запрещено в обоих направлениях для всех транспортных средств.' },
  'B1': { name: 'Въезд запрещен', meaning: 'Запрещается въезд в этом направлении (Одностороннее движение).' },
  'B2a': { name: 'Поворот налево запрещен', meaning: 'На следующем перекрестке поворот налево запрещен.' },
  'B2b': { name: 'Поворот направо запрещен', meaning: 'На следующем перекрестке поворот направо запрещен.' },
  'B2c': { name: 'Разворот запрещен', meaning: 'Разворот запрещен до следующего перекрестка.' },
  'B3': { name: 'Обгон запрещен', meaning: 'Запрещается обгон всех моторных транспортных средств.' },
  'B3a': { name: 'Обгон грузовым автомобилям запрещен', meaning: 'Запрещается обгон грузовикам массой более 3,5т.' },
  'B4': { name: 'Таможня', meaning: 'Обязательная остановка у таможенного поста.' },
  'B5a': { name: 'Жандармерия', meaning: 'Обязательная остановка у контрольного поста Жандармерии.' },
  'B5b': { name: 'Полиция', meaning: 'Обязательная остановка у контрольного поста .полиции.' },
  'B5c': { name: 'Плата за проезд (Пеаж)', meaning: 'Обязательная остановка для оплаты дорожной пошлины на автомагистрали.' },
  'B6a1': { name: 'Стоянка запрещена', meaning: 'Стоянка запрещена от знака до следующего перекрестка.' },
  'B6a2': { name: 'Стоянка запрещена по нечетным числам (1-15)', meaning: 'Стоянка запрещена с 1 по 15 число каждого месяца.' },
  'B6a3': { name: 'Стоянка запрещена по четным числам (16-31)', meaning: 'Стоянка запрещена с 16 по 31 число каждого месяца.' },
  'B6d': { name: 'Остановка и стоянка запрещены', meaning: 'Абсолютный запрет на остановку и стоянку автомобиля.' },
  'B7b': { name: 'Движение моторных ТС запрещено', meaning: 'Запрещено движение всех ТС с двигателем (кроме мопедов).' },
  'B8': { name: 'Движение мотоциклов запрещено', meaning: 'Запрещено движение мотоциклов.' },
  'B9a': { name: 'Движение пешеходов запрещено', meaning: 'Движение пешеходов по этому участку запрещено.' },
  'B9b': { name: 'Движение велосипедов запрещено', meaning: 'Запрещено движение велосипедов.' },
  'B9g': { name: 'Движение автобусов запрещено', meaning: 'Запрещено движение автобусов.' },
  'B9h': { name: 'Движение мопедов запрещено', meaning: 'Движение мопедов и скутеров до 50 куб.см.' },
  'B11': { name: 'Ограничение высоты 3,5м', meaning: 'Запрещен проезд ТС выше 3,5 метров.' },
  'B12': { name: 'Ограничение ширины 2,5m', meaning: 'Запрещен проезд ТС шире 2,5 метров.' },
  'B13': { name: 'Ограничение массы 5,5т', meaning: 'Запрещен проезд ТС массой более 5,5 тонн.' },
  'B14_30': { name: 'Ограничение скорости 30', meaning: 'Максимально разрешенная скорость: 30 км/ч.' },
  'B14_50': { name: 'Ограничение скорости 50', meaning: 'Максимально разрешенная скорость: 50 км/ч.' },
  'B14_80': { name: 'Ограничение скорости 80', meaning: 'Максимально разрешенная скорость: 80 км/ч.' },
  'B14_110': { name: 'Ограничение скорости 110', meaning: 'Максимально разрешенная скорость: 110 км/ч.' },
  'B14_130': { name: 'Ограничение скорости 130', meaning: 'Максимально разрешенная скорость: 130 км/ч.' },
  'B31': { name: 'Конец всех ограничений', meaning: 'Конец действия всех ранее установленных знаками ограничений.' },
  'B33': { name: 'Конец зоны запрещения обгона', meaning: 'Разрешается обгон при соблюдении безопасности.' },
  'B34_50': { name: 'Конец ограничения скорости 50', meaning: 'Конец действия ограничения скорости 50 км/ч.' },
  'B34_80': { name: 'Конец ограничения скорости 80', meaning: 'Конец действия ограничения скорости 80 km/h.' },

  'B21-1': { name: 'Обязательный поворот направо', meaning: 'На перекрестке обязателен поворот направо.' },
  'B21-2': { name: 'Обязательный поворот налево', meaning: 'На перекрестке обязателен поворот налево.' },
  'B21b': { name: 'Обязательный объезд препятствия', meaning: 'Обязательный объезд препятствия справа.' },
  'B21c1': { name: 'Обязательное направление: прямо', meaning: 'Обязательное движение прямо на следующем перекрестке.' },
  'B21c2': { name: 'Обязательное направление: направо', meaning: 'Обязательный поворот направо на следующем перекрестке.' },
  'B21d1': { name: 'Обязательное направление: налево/направо', meaning: 'Обязательный поворот налево или направо на следующем перекрестке.' },
  'B21e': { name: 'Обязательное направление: прямо/направо', meaning: 'Обязательное движение прямо или направо на следующем перекрестке.' },
  'B22a': { name: 'Велосипедная дорожка', meaning: 'Дорожка, предназначенная исключительно для велосипедистов.' },
  'B22b': { name: 'Обязательная дорожка для пешеходов', meaning: 'Дорожка, предназначенная исключительно для движения пешеходов.' },
  'B22c': { name: 'Обязательная дорожка для всадников', meaning: 'Дорожка, предназначенная исключительно для наездников на лошадях.' },
  'B25': { name: 'Ограничение минимальной скорости', meaning: 'Минимальная скорость движения 30 км/ч.' },
  'B26': { name: 'Цепи противоскольжения обязательны', meaning: 'Обязательное использование цепей противоскольжения как минимум на двух ведущих колесах.' },
  'B27a': { name: 'Полоса для автобусов', meaning: 'Полоса движения, предназначенная только для общественного транспорта.' },
  'B27b': { name: 'Полоса для трамвая', meaning: 'Полоса движения, предназначенная только для трамваев.' },
  'B29': { name: 'Обязательное включение фар', meaning: 'Обязательное включение ближнего света фар (например, при въезде в тоннель).' },
  'B45a': { name: 'Конец обязательного включения фар', meaning: 'Указывает на конец зоны обязательного включения ближнего света фар.' },

  'C1a': { name: 'Парковка', meaning: 'Место, предназначенное для стоянки автомобилей.' },
  'C1b': { name: 'Платная парковка', meaning: 'Зона платной парковки, регулируемая паркоматом.' },
  'C1c': { name: 'Парковка с синей зоной', meaning: 'Бесплатная парковка с ограничением по времени (требуется парковочный диск).' },
  'C4a': { name: 'Рекомендуемая скорость', meaning: 'Рекомендуется двигаться со скоростью 50 км/ч.' },
  'C4b_50': { name: 'Конец рекомендуемой скорости', meaning: 'Указывает на конец рекомендуемой скорости 50 км/ч.' },
  'C8': { name: 'Больница', meaning: 'Близость лечебного учреждения. Избегайте лишнего шума.' },
  'C12': { name: 'Одностороннее движение', meaning: 'Движение по дороге с односторонним движением.' },
  'C13a': { name: 'Тупик', meaning: 'Указывает на дорогу без сквозного проезда для автомобилей.' },
  'C13c': { name: 'Тупик с проходом для пешеходов/велосипедов', meaning: 'Тупик для автомобилей, но с проходом для пешеходов и проездом для велосипедов.' },
  'C20a': { name: 'Пешеходный переход', meaning: 'Указывает точное расположение пешеходного перехода.' },
  'C50': { name: 'Пешеходная зона', meaning: 'Вход в пешеходную зону.' },
  'C107': { name: 'Дорога для автомобилей', meaning: 'Начало скоростной дороги для автомобилей.' },
  'C207': { name: 'Автомагистраль', meaning: 'Начало участка автомагистрали.' },
  'C107_end': { name: 'Конец дороги для автомобилей', meaning: 'Конец действия скоростной дороги.' },
  'C207_end': { name: 'Конец автомагистрали', meaning: 'Конец действия автомагистрали.' },
  'C111': { name: 'Въезд в тоннель', meaning: 'Начало участка дороги в тоннеле. Обязательно включение фар.' },
  'C112': { name: 'Выезд из тоннеля', meaning: 'Конец проезда по тоннелю.' },
  'C115': { name: 'Начало зеленой зоны', meaning: 'Начало дорожки для пешеходов и велосипедистов.' },
  'C116': { name: 'Конец зеленой зоны', meaning: 'Конец действия дорожки для пешеходов и велосипедистов.' },
  'C24a': { name: 'Начало жилой зоны', meaning: 'Жилая зона со скоростью до 20 км/ч. Пешеходы имеют приоритет.' },
  'C24b': { name: 'Конец жилой зоны', meaning: 'Конец действия жилой зоны.' },

  'AB4': { name: 'Стоп', meaning: 'Обязательная полная остановка у стоп-линии или края перекрестка.' },
  'AB3a': { name: 'Уступите дорогу', meaning: 'Уступите дорогу транспортным средствам на пересекаемой дороге.' },
  'AB1': { name: 'Помеха справа', meaning: 'Уступите дорогу транспортным средствам, приближающимся справа.' },
  'AB2': { name: 'Преимущество на перекрестке', meaning: 'Вы имеете преимущество проезда на следующем перекрестке.' },
  'AB6': { name: 'Главная дорога', meaning: 'Вы имеете преимущество на всех перекрестках этой дороги.' },
  'AB7': { name: 'Конец главной дороги', meaning: 'Конец преимущества проезда перекрестков.' },
  'B15': { name: 'Преимущество встречного движения', meaning: 'Необходимо уступить дорогу встречным транспортным средствам.' },
  'C18': { name: 'Преимущество перед встречным движением', meaning: 'Вы имеете преимущество проезда узкого участка.' },

  'CE1': { name: 'Пункт первой помощи', meaning: 'Указывает на наличие пункта первой медицинской помощи.' },
  'CE2a': { name: 'Экстренный вызов (SOS)', meaning: 'Пункт экстренной связи, подключенный напрямую к спасательным службам.' },
  'CE2b': { name: 'Таксофон', meaning: 'Наличие общественного телефона-автомата.' },
  'CE3a': { name: 'Банкомат', meaning: 'Наличие банкомата для снятия наличных денег.' },
  'CE3b': { name: 'Общественные туалеты', meaning: 'Наличие общественных туалетов, открытых для всех.' },
  'CE4a': { name: 'Пожароопасность', meaning: 'Зона с повышенным риском возникновения лесных пожаров.' },
  'CE12': { name: 'Подкачка шин', meaning: 'Бесплатный пункт подкачки автомобильных шин.' },
  'CE14': { name: 'Кемпинг для палаток', meaning: 'Место, предназначенное для установки палаток.' },
  'CE15a': { name: 'Кемпинг для автодомов', meaning: 'Место для стоянки и кемпинга автодомов и жилых прицепов.' },
  'CE16': { name: 'Ресторан', meaning: 'Наличие ресторана или кафе.' },
  'CE18': { name: 'Заправка / Зарядка электромобилей', meaning: 'Заправочная станция и пункт зарядки электрических транспортных средств.' },
  'CE22': { name: 'Доступ для инвалидов', meaning: 'Услуги и объекты, адаптированные для лиц с ограниченными физическими возможностями.' },
  'CE23': { name: 'Зона карпулинга', meaning: 'Специально оборудованное место встречи участников совместных поездок.' },
};

const getSignSvgUrl = (id: string) => {
  const mapping: Record<string, string> = {
    // Dangers
    "A1a": "France_road_sign_A1a.svg",
    "A1b": "France_road_sign_A1b.svg",
    "A1c": "France_road_sign_A1c.svg",
    "A1d": "France_road_sign_A1d.svg",
    "A2a": "France_road_sign_A2a.svg",
    "A2b": "France_road_sign_A2b.svg",
    "A3": "France_road_sign_A3.svg",
    "A3a": "France_road_sign_A3a.svg",
    "A3b": "France_road_sign_A3b.svg",
    "A4": "France_road_sign_A4.svg",
    "A5": "France_road_sign_A6.svg", // Pont mobile is A6
    "A13a": "France_road_sign_A13a.svg",
    "A13b": "France_road_sign_A13b.svg",
    "A13b_raised": "France_road_sign_A13b.svg",
    "A15a1": "France_road_sign_A15a1.svg",
    "A15b": "France_road_sign_A15b.svg",
    "A15c": "France_road_sign_A15c.svg",
    "A16": "France_road_sign_A16.svg",
    "A17": "France_road_sign_A17.svg",
    "A18": "France_road_sign_A18.svg",
    "A19": "France_road_sign_A19.svg",
    "A20": "France_road_sign_A20.svg",
    "A21": "France_road_sign_A21.svg",
    "A23": "France_road_sign_A23.svg",
    "A24": "France_road_sign_A24.svg",
    "A8": "France_road_sign_A8.svg",
    "A9": "France_road_sign_A9.svg",
    "A14": "France_road_sign_A14.svg",
    
    // Interdictions
    "B0": "France_road_sign_B0.svg",
    "B1": "France_road_sign_B1.svg",
    "B2a": "France_road_sign_B2a.svg",
    "B2b": "France_road_sign_B2b.svg",
    "B2c": "France_road_sign_B2c.svg",
    "B3": "France_road_sign_B3.svg",
    "B3a": "France_road_sign_B3a.svg",
    "B4": "France_road_sign_B4.svg",
    "B5a": "France_road_sign_B5a.svg",
    "B5b": "France_road_sign_B5b.svg",
    "B5c": "France_road_sign_B5c.svg",
    "B6a1": "France_road_sign_B6a1.svg",
    "B6a2": "France_road_sign_B6a2.svg",
    "B6a3": "France_road_sign_B6a3.svg",
    "B6d": "France_road_sign_B6d.svg",
    "B7b": "France_road_sign_B7b.svg",
    "B8": "France_road_sign_B8.svg",
    "B9a": "France_road_sign_B9a.svg",
    "B9b": "France_road_sign_B9b.svg",
    "B9g": "France_road_sign_B9g.svg",
    "B9h": "France_road_sign_B9h.svg",
    "B11": "France_road_sign_B11.svg",
    "B12": "France_road_sign_B12.svg",
    "B13": "France_road_sign_B13.svg",
    "B14_30": "France_road_sign_B14_%2830%29.svg",
    "B14_50": "France_road_sign_B14_%2850%29.svg",
    "B14_80": "France_road_sign_B14_%2880%29.svg",
    "B14_110": "France_road_sign_B14_%28110%29.svg",
    "B14_130": "France_road_sign_B14_%28130%29.svg",
    "B31": "France_road_sign_B31.svg",
    "B33": "France_road_sign_B34.svg",
    "B34_50": "France_road_sign_B33_%2850%29.svg",
    "B34_80": "France_road_sign_B33_%2890%29.svg",
    
    // Obligations
    "B21-1": "France_road_sign_B21-1.svg",
    "B21-2": "France_road_sign_B21-2.svg",
    "B21b": "France_road_sign_B21b.svg",
    "B21c1": "France_road_sign_B21c1.svg",
    "B21c2": "France_road_sign_B21c2.svg",
    "B21d1": "France_road_sign_B21d1.svg",
    "B21e": "France_road_sign_B21e.svg",
    "B22a": "France_road_sign_B22a.svg",
    "B22b": "France_road_sign_B22b.svg",
    "B22c": "France_road_sign_B22c.svg",
    "B25": "France_road_sign_B25_%2830%29.svg",
    "B26": "France_road_sign_B26.svg",
    "B27a": "France_road_sign_B27a.svg",
    "B27b": "France_road_sign_B27b.svg",
    "B29": "France_road_sign_B29.svg",
    "B45a": "France_road_sign_B45a.svg",
    
    // Indications
    "C1a": "France_road_sign_C1a.svg",
    "C1b": "France_road_sign_C1b.svg",
    "C1c": "France_road_sign_C1c.svg",
    "C4a": "France_road_sign_C4a_%2850%29.svg",
    "C4b_50": "France_road_sign_C4b_%2850%29.svg",
    "C8": "France_road_sign_C8.svg",
    "C12": "France_road_sign_C12.svg",
    "C13a": "France_road_sign_C13a.svg",
    "C13c": "France_road_sign_C13c.svg",
    "C20a": "France_road_sign_C20a.svg",
    "C50": "France_road_sign_C50.svg",
    "C107": "France_road_sign_C107.svg",
    "C207": "France_road_sign_C207.svg",
    "C107_end": "France_road_sign_C108.svg",
    "C207_end": "France_road_sign_C208.svg",
    "C111": "France_road_sign_C111.svg",
    "C112": "France_road_sign_C112.svg",
    "C115": "France_road_sign_C115.svg",
    "C116": "France_road_sign_C116.svg",
    "C24a": "France_road_sign_C24a.svg",
    "C24b": "France_road_sign_C24b.svg",
    
    // Priorités
    "AB1": "France_road_sign_AB1.svg",
    "AB2": "France_road_sign_AB2.svg",
    "AB3a": "France_road_sign_AB3a.svg",
    "AB4": "France_road_sign_AB4.svg",
    "AB6": "France_road_sign_AB6.svg",
    "AB7": "France_road_sign_AB7.svg",
    "B15": "France_road_sign_B15.svg",
    "C18": "France_road_sign_C18.svg",

    // Services
    "CE1": "France_road_sign_CE1.svg",
    "CE2a": "France_road_sign_CE2a.svg",
    "CE2b": "France_road_sign_CE2b.svg",
    "CE3a": "France_road_sign_CE3a.svg",
    "CE3b": "France_road_sign_CE3b.svg",
    "CE4a": "France_road_sign_CE4a.svg",
    "CE12": "France_road_sign_CE12.svg",
    "CE14": "France_road_sign_CE14.svg",
    "CE15a": "France_road_sign_CE15a.svg",
    "CE16": "France_road_sign_CE16.svg",
    "CE18": "France_road_sign_CE18.svg",
    "CE22": "France_road_sign_CE22.svg",
    "CE23": "France_road_sign_CE23.svg",
  };
  
  const filename = mapping[id] || `France_road_sign_${id}.svg`;
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${filename}`;
};

export default function SignLexicon() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SignCategory | 'all'>('all');

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

  const filteredSigns = translatedSigns.filter(sign => {
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sign.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sign.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || sign.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500/10 p-3 rounded-full border border-red-500/20">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white mb-4">
            {language === 'ru' ? 'Справочник Дорожных Знаков' : 'Répertoire des Panneaux de Signalisation'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            {language === 'ru' 
              ? 'Полный каталог официальных дорожных знаков Франции с описаниями и требованиями.' 
              : 'Un inventaire complet et précis de tous les panneaux du code de la route français.'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder={language === 'ru' ? 'Поиск знака...' : 'Rechercher un panneau...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-xl bg-gray-950 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {(['all', 'danger', 'interdiction', 'obligation', 'indication', 'priorite', 'services'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20'
                    : 'bg-gray-800/40 text-gray-400 border-gray-700/50 hover:bg-gray-800/80'
                }`}
              >
                {cat === 'all' && (language === 'ru' ? 'Все' : 'Tous')}
                {cat === 'danger' && (language === 'ru' ? 'Опасность' : 'Danger')}
                {cat === 'interdiction' && (language === 'ru' ? 'Запрет' : 'Interdiction')}
                {cat === 'obligation' && (language === 'ru' ? 'Предписание' : 'Obligation')}
                {cat === 'indication' && (language === 'ru' ? 'Указание' : 'Indication')}
                {cat === 'priorite' && (language === 'ru' ? 'Приоритет' : 'Priorité')}
                {cat === 'services' && (language === 'ru' ? 'Сервис' : 'Services')}
              </button>
            ))}
          </div>
        </div>

        {/* Signs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSigns.map((sign) => (
            <div 
              key={sign.id} 
              className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-gray-900/80 hover:border-gray-700/60 transition-all duration-300 group"
            >
              <div className="mb-4 relative w-24 h-24 flex items-center justify-center bg-gray-950/40 rounded-xl p-2 border border-gray-850">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getSignSvgUrl(sign.id)} 
                  alt={sign.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                />
                <span className="absolute -top-2 -right-2 bg-gray-950 border border-gray-800 text-[10px] text-gray-500 px-2 py-0.5 rounded-full font-mono">
                  {sign.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{sign.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mt-auto">{sign.meaning}</p>
            </div>
          ))}
        </div>

        {filteredSigns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {language === 'ru' ? 'Ничего не найдено' : 'Aucun panneau trouvé pour votre recherche.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
