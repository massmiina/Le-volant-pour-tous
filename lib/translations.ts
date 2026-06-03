export type Language = 'fr' | 'ru';

export const translations: Record<Language | string, any> = {
  fr: {
    nav: {
      home: "Accueil",
      courses: "Cours",
      schools: "Auto-écoles",
      reviews: "Avis",
      contact: "Contact",
      quiz: "Quiz",
      exam: "Examen Blanc",
      situations: "Mises en Situation",
      more: "Plus",
    },
    ui: {
      welcome: "Bienvenue",
      contact: "Contact",
      search: "Rechercher",
      back_to_modules: "Retour aux modules",
      next_module: "Module {number}",
      prev_module: "Module {number}",
      key_rules: "Règles Pédagogiques Clés",
      concrete_examples: "Exemples Concrets",
      practical_cases: "Dans la pratique",
      resolution_schema: "Schéma de Résolution",
    },
    home: {
      title: "Le Volant pour Tous",
      title_1: "Le Volant",
      title_2: "Pour Tous",
      subtitle: "Nouvelle Génération",
      beginner: "Débutant",
      beginner_desc: "Vous n'avez jamais conduit ou commencez tout juste votre apprentissage.",
      intermediate: "Intermédiaire",
      intermediate_desc: "Vous maîtrisez les bases et souhaitez vous perfectionner sur la signalisation.",
      advanced: "Avancé",
      advanced_desc: "Vous êtes prêt pour l'examen et cherchez à réviser les situations complexes.",
      welcome_badge: "Bienvenue dans l'ère moderne",
      cta_start: "Commencer l'Aventure",
      cta_more: "En savoir plus",
      choose_level: "Choisissez votre niveau",
      level_subtitle: "Nous adaptons nos cours et nos conseils en fonction de votre expérience.",
      selected: "Sélectionné",
      access_courses: "Accéder aux cours",
      why_us: "Pourquoi Nous ?",
      simple_learning: "L'apprentissage rendu simple",
      interactive_courses: "Cours Interactifs",
      interactive_desc: "Plongez dans des situations 3D et des quizs immersifs pour valider votre code facilement.",
      school_loc: "Trouvez votre Auto-école",
      school_desc: "Une carte interactive avec les meilleures auto-écoles de la région.",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Une question ? Notre équipe est là pour vous accompagner vers la réussite.",
      form_name: "Nom complet",
      form_email: "Adresse Email",
      form_subject: "Sujet",
      form_message: "Votre message",
      form_submit: "Envoyer le message",
      info_title: "Nos coordonnées",
      info_address: "123 Avenue du Permis, 75000 Paris",
      info_phone: "+33 1 23 45 67 89",
      info_email: "contact@levolantpourtous.fr",
      success: "Message envoyé avec succès !",
      error: "Une erreur est survenue. Veuillez réessayer."
    },
    auto_ecole: {
      title: "Trouvez l'Auto-école parfaite",
      subtitle: "Recherchez, comparez et contactez les meilleures auto-écoles...",
      placeholder: "Lieu (ex: Paris, Lyon...)",
      search: "Rechercher",
      suggestions: "Suggestions populaires :",
      map_title: "Écoles à proximité",
      detailed_view: "Vue détaillée",
      ready_find: "Prêt à trouver l'auto-école parfaite ?",
      ready_desc: "Entrez le nom d'une ville ci-dessus pour découvrir les options disponibles.",
      found: "auto-écoles trouvées à",
      price_label: "À PARTIR DE",
      details: "Voir les détails",
      not_found: "Aucune auto-école trouvée pour",
      reset: "Nouvelle recherche",
      loading: "Chargement de la carte des auto-écoles..."
    },
    quiz: {
      question_progress: "Question",
      see_score: "Voir le score",
      next_question: "Question Suivante",
      finished: "Quiz Terminé !",
      perfect: "Félicitations ! Un sans-faute !",
      good: "Bravo ! Continuez vos révisions pour vous améliorer.",
      restart: "Recommencer le Quiz",
      correct: "Correct",
      wrong: "Faux",
      save_progress_title: "Sauvegardez votre progression",
      save_progress_desc: "Créez un compte gratuit pour enregistrer vos scores et débloquer l'examen blanc dans des conditions réelles.",
      create_account: "Créer mon compte",
      score_label: "Score",
      wrong_answer: "Mauvaise réponse",
      explication_label: "Explication",
      correction_label: "Correction",
      title: "Testez vos connaissances",
      subtitle: "Choisissez un module pour commencer votre entraînement intensif.",
      start: "Commencer",
      quit: "Quitter le quiz",
      q1: {
        q: "Quelle est la distance de sécurité minimale sur autoroute à 130 km/h ?",
        o1: "2 traits de la bande d'arrêt d'urgence",
        o2: "1 trait de la bande d'arrêt d'urgence",
        o3: "50 mètres",
        o4: "100 mètres"
      },
      q2: {
        q: "Face à un panneau de signalisation rouge et circulaire avec une barre blanche horizontale :",
        o1: "M'arrêter",
        o2: "Céder le passage",
        o3: "Ne pas entrer (Sens interdit)",
        o4: "Tourner à droite"
      },
      q3: {
        q: "Quel est le taux d'alcoolémie limite pour un conducteur novice ?",
        o1: "0.2 g/l",
        o2: "0.5 g/l",
        o3: "0.8 g/l",
        o4: "0.1 g/l"
      },
      q4: {
        q: "Un piéton est engagé sur un passage clouté, je dois :",
        o1: "Klaxonner pour l'avertir",
        o2: "Accélérer pour passer avant lui",
        o3: "M'arrêter pour le laisser passer",
        o4: "L'ignorer s'il est loin"
      },
      modules: {
        signalisation: [
          { q: "Quelle est la forme d'un panneau de danger ?", o1: "Ronde", o2: "Carrée", o3: "Triangulaire", o4: "Octogonale", ans: 2, exp: "Les panneaux de danger sont triangulaires avec une bordure rouge." },
          { q: "Que signifie un panneau rond à bordure rouge ?", o1: "Danger", o2: "Interdiction", o3: "Obligation", o4: "Indication", ans: 1, exp: "Le cercle rouge indique une interdiction immédiate." },
          { q: "Un panneau de chantier est de quelle couleur ?", o1: "Blanc", o2: "Bleu", o3: "Jaune", o4: "Vert", ans: 2, exp: "Le jaune est utilisé pour la signalisation temporaire de chantier." },
          { q: "Que signifie un panneau bleu rond ?", o1: "Obligation", o2: "Indication", o3: "Information", o4: "Priorité", ans: 0, exp: "Le cercle bleu impose une obligation aux usagers." },
          { q: "Où s'implante un panneau de danger hors agglomération ?", o1: "50m avant", o2: "100m avant", o3: "150m avant", o4: "À l'endroit même", ans: 2, exp: "Hors ville, on prévient 150m à l'avance à cause de la vitesse." },
          { q: "Le panneau 'Sens Interdit' est de quelle couleur ?", o1: "Bleu et Blanc", o2: "Rouge et Blanc", o3: "Jaune", o4: "Rouge et Noir", ans: 1, exp: "Il est rond, rouge avec une barre horizontale blanche." },
          { q: "Que signifie un panneau carré bleu ?", o1: "Obligation", o2: "Indication/Service", o3: "Danger", o4: "Interdiction", ans: 1, exp: "Les formes carrées indiquent des services ou des informations utiles." },
          { q: "Le panneau STOP a combien de côtés ?", o1: "4", o2: "6", o3: "8", o4: "10", ans: 2, exp: "Il est octogonal (8 côtés) pour être reconnu même de dos ou enneigé." },
          { q: "Une ligne de rive jaune continue signifie :", o1: "Arrêt autorisé", o2: "Stationnement autorisé", o3: "Arrêt et stationnement interdits", o4: "Zone de travaux", ans: 2, exp: "Le jaune continu interdit toute immobilisation du véhicule." },
          { q: "Le panneau 'Fin de toutes interdictions' est :", o1: "Rouge barré", o2: "Bleu barré", o3: "Blanc avec une barre noire", o4: "Vert", ans: 2, exp: "C'est un disque blanc barré d'une ligne noire diagonale." },
          { q: "Un panneau de priorité (losange jaune) barré signifie :", o1: "Fin de priorité", o2: "Priorité absolue", o3: "Intersection dangereuse", o4: "Virage", ans: 0, exp: "Le trait noir marque la fin du caractère prioritaire de la route." },
          { q: "Les panonceaux sont placés :", o1: "Au-dessus du panneau", o2: "À côté du panneau", o3: "Sous le panneau", o4: "10m avant le panneau", ans: 2, exp: "Ils précisent ou limitent la portée du panneau principal situé au-dessus." },
        ],
        priorites: [
          { q: "Sans signalisation à une intersection, qui est prioritaire ?", o1: "Celui de gauche", o2: "Celui de droite", o3: "Le plus rapide", o4: "Celui qui va tout droit", ans: 1, exp: "La priorité à droite est la règle par défaut en l'absence de panneaux." },
          { q: "Au 'Cédez le Passage', l'arrêt est-il obligatoire ?", o1: "Oui, toujours", o2: "Non, si la voie est libre", o3: "Seulement la nuit", o4: "Seulement s'il y a un policier", ans: 1, exp: "On ne s'arrête que si d'autres usagers arrivent." },
          { q: "Un véhicule prioritaire est en mission s'il a :", o1: "Ses phares allumés", o2: "Son clignotant", o3: "Sirène et gyrophare bleu", o4: "Une couleur rouge", ans: 2, exp: "Les deux signaux (sonore et lumineux) doivent être activés." },
          { q: "Dans un rond-point (giratoire), qui est prioritaire ?", o1: "Celui qui entre", o2: "Celui déjà engagé", o3: "Le plus gros véhicule", o4: "Personne", ans: 1, exp: "On doit céder le passage aux usagers venant de gauche déjà sur l'anneau." },
          { q: "Face à un feu jaune fixe, je dois :", o1: "Accélérer", o2: "M'arrêter", o3: "Passer prudemment", o4: "Klaxonner", ans: 1, exp: "Le feu jaune impose l'arrêt, sauf si on est trop près pour s'arrêter en sécurité." },
          { q: "Un agent de police de dos signifie :", o1: "Je peux passer", o2: "Je dois ralentir", o3: "Je dois m'arrêter", o4: "Priorité à droite", ans: 2, exp: "Le dos ou le buste du policier équivaut à un feu rouge." },
          { q: "À un STOP, combien de temps minimum faut-il s'arrêter ?", o1: "On ne s'arrête pas", o2: "Le temps de vérifier", o3: "Au moins 3 secondes", o4: "L'immobilisation doit être totale", ans: 3, exp: "La loi impose une immobilisation complète des roues avant de repartir." },
          { q: "Je sors d'un chemin de terre, je dois :", o1: "Passer vite", o2: "Céder le passage à tous", o3: "Appliquer la priorité à droite", o4: "Klaxonner", ans: 1, exp: "Les usagers quittant un lieu privé ou chemin non carrossable n'ont jamais la priorité." },
          { q: "Deux voitures arrivent face à face et tournent à gauche :", o1: "Elles se contournent par l'arrière", o2: "Elles passent l'une devant l'autre", o3: "La plus rapide passe", o4: "Elles s'arrêtent", ans: 1, exp: "C'est le croisement 'à l'Indonésienne' pour plus de visibilité." },
          { q: "Le clignotant donne-t-il la priorité ?", o1: "Oui", o2: "Non", o3: "Seulement sur autoroute", o4: "Seulement en ville", ans: 1, exp: "C'est un indicateur d'intention, il ne dispense pas de vérifier et céder le passage." },
          { q: "En montagne, qui recule si le croisement est impossible ?", o1: "Le plus lourd", o2: "Le plus léger", o3: "Celui qui monte", o4: "Le véhicule seul face à un groupe", ans: 1, exp: "Le véhicule le plus maniable (léger) doit faciliter la manœuvre du plus lourd." },
          { q: "Un feu vert clignotant signifie :", o1: "Accélérer", o2: "Inexistant en France", o3: "Panne du feu", o4: "Passage aux piétons", ans: 1, exp: "En France, les feux verts ne clignotent pas (contrairement à d'autres pays)." },
        ],
        regles: [
          { q: "La vitesse maximale sur autoroute par beau temps est :", o1: "110 km/h", o2: "120 km/h", o3: "130 km/h", o4: "150 km/h", ans: 2, exp: "C'est la limite légale standard pour les permis confirmés." },
          { q: "L'alcoolémie limite pour un jeune conducteur est de :", o1: "0,2 g/l", o2: "0,5 g/l", o3: "0,8 g/l", o4: "0,0 g/l", ans: 0, exp: "Un seul verre peut suffire à atteindre ce seuil de tolérance quasi-nulle." },
          { q: "La distance de sécurité doit être d'au moins :", o1: "1 seconde", o2: "2 secondes", o3: "3 secondes", o4: "10 mètres", ans: 1, exp: "On utilise la règle des 2 secondes pour avoir le temps de réagir." },
          { q: "Utiliser son téléphone tenu en main coûte :", o1: "1 point", o2: "2 points", o3: "3 points", o4: "6 points", ans: 2, exp: "C'est une infraction grave qui retire 3 points et coûte 135 euros." },
          { q: "Sur autoroute, on roule :", o1: "Au milieu", o2: "À gauche", o3: "À droite", o4: "Où on veut", ans: 2, exp: "L'obligation est de circuler sur la voie la plus à droite possible." },
          { q: "La ceinture est obligatoire :", o1: "À l'avant seulement", o2: "À l'arrière seulement", o3: "Pour tous les passagers", o4: "Seulement hors ville", ans: 2, exp: "Tout occupant d'un véhicule doit être attaché sous peine d'amende." },
          { q: "Le contrôle technique d'une voiture neuve se fait au bout de :", o1: "2 ans", o2: "4 ans", o3: "5 ans", o4: "10 ans", ans: 1, exp: "Le premier doit avoir lieu dans les 6 mois précédant le 4ème anniversaire." },
          { q: "Un voyant rouge au tableau de bord impose :", o1: "De ralentir", o2: "L'arrêt immédiat", o3: "D'aller au garage plus tard", o4: "De vérifier les pneus", ans: 1, exp: "Le rouge signale une alarme de sécurité ou une panne grave." },
          { q: "Par temps de pluie, la limite de 130 km/h devient :", o1: "120 km/h", o2: "110 km/h", o3: "100 km/h", o4: "90 km/h", ans: 1, exp: "Toutes les limites supérieures baissent en cas d'intempéries." },
          { q: "Je peux dépasser par la droite si :", o1: "La voiture devant tourne à gauche", o2: "Je suis pressé", o3: "Il y a 3 voies", o4: "Sur autoroute", ans: 0, exp: "C'est la seule exception autorisée au dépassement par la gauche." },
          { q: "La nuit, en ville éclairée, je circule en feux de :", o1: "Route", o2: "Position seulement", o3: "Croisement", o4: "Brouillard", ans: 2, exp: "De croisement (ou position si très bien éclairé) pour voir et être vu sans éblouir." },
          { q: "Eco-conduire permet de réduire sa consommation de :", o1: "5%", o2: "15%", o3: "50%", o4: "0%", ans: 1, exp: "Une conduite souple et anticipée réduit nettement l'usage de carburant." },
        ],
        vitesse: [
          { q: "Vitesse max sur route à double sens sans séparateur central ?", o1: "90 km/h", o2: "80 km/h", o3: "70 km/h", o4: "100 km/h", ans: 1, exp: "La règle générale est de 80 km/h depuis 2018 pour réduire la mortalité routière." },
          { q: "En agglomération, la vitesse est limitée par défaut à :", o1: "30 km/h", o2: "40 km/h", o3: "50 km/h", o4: "70 km/h", ans: 2, exp: "C'est la limite standard en ville, sauf signalisation contraire (Zone 30)." },
          { q: "Sur autoroute, par temps de pluie, la limite passe à :", o1: "130 km/h", o2: "110 km/h", o3: "100 km/h", o4: "90 km/h", ans: 1, exp: "Les limites sont abaissées par temps d'intempéries sur l'ensemble du réseau." },
          { q: "L'excès de vitesse de plus de 50 km/h est considéré comme :", o1: "Une simple contravention", o2: "Un délit", o3: "Pas grave", o4: "Un rappel à la loi", ans: 1, exp: "C'est une infraction grave passible de suspension de permis et de forte amende." },
          { q: "Dans une zone de rencontre, la vitesse est limitée à :", o1: "10 km/h", o2: "20 km/h", o3: "30 km/h", o4: "50 km/h", ans: 1, exp: "Les piétons y sont prioritaires et peuvent circuler sur toute la chaussée." },
          { q: "Sur route sèche, la limite pour un jeune conducteur est de :", o1: "80 km/h", o2: "90 km/h", o3: "100 km/h", o4: "110 km/h", ans: 0, exp: "Les conducteurs en période probatoire ont des limites de vitesse réduites." },
          { q: "Un radar automatique peut flasher :", o1: "Uniquement par l'avant", o2: "Uniquement par l'arrière", o3: "Par l'avant ou l'arrière selon le modèle", o4: "Uniquement les camions", ans: 2, exp: "La technologie permet de contrôler dans les deux sens de circulation." },
          { q: "Plus la vitesse augmente, plus le champ visuel :", o1: "Augmente", o2: "Diminue", o3: "Reste identique", o4: "Devient plus net", ans: 1, exp: "C'est l'effet tunnel : le cerveau se concentre sur le centre de la route." },
          { q: "Doubler sa vitesse signifie quadrupler sa distance de :", o1: "Réaction", o2: "Freinage", o3: "Sécurité", o4: "Visibilité", ans: 1, exp: "L'énergie cinétique augmente with le carré de la vitesse." },
          { q: "En cas de brouillard (visibilité < 50m), la vitesse max est :", o1: "50 km/h", o2: "70 km/h", o3: "80 km/h", o4: "90 km/h", ans: 0, exp: "Cette limite de sécurité s'applique alors sur toutes les routes." },
          { q: "Sur une route à accès réglementé, la limite est de :", o1: "110 km/h", o2: "130 km/h", o3: "90 km/h", o4: "100 km/h", ans: 0, exp: "C'est 110 km/h par beau temps, 100 km/h s'il pleut." },
          { q: "Un limiteur de vitesse :", o1: "Maintient la vitesse choisie", o2: "Empêche de dépasser une vitesse", o3: "Ralentit tout seul", o4: "Est obligatoire en ville", ans: 1, exp: "Il aide à ne pas dépasser la vitesse de consigne programmée." },
        ],
        stationnement: [
          { q: "Un marquage bleu au sol indique :", o1: "Un parking gratuit", o2: "Un parking payant", o3: "Une zone bleue (disque)", o4: "Un stationnement interdit", ans: 2, exp: "Il faut utiliser un disque de stationnement pour limiter sa durée." },
          { q: "S'arrêter sur un emplacement handicapé sans carte est :", o1: "Autorisé pour 5 min", o2: "Uniquement la nuit", o3: "Une infraction grave", o4: "Toléré si on reste au volant", ans: 2, exp: "C'est un stationnement très gênant passible d'une amende de 135€." },
          { q: "Le stationnement en double file est :", o1: "Toujours autorisé", o2: "Autorisé pour charger", o3: "Interdit et gênant", o4: "Toléré avec les warnings", ans: 2, exp: "Il gêne la fluidité et la sécurité des autres usagers." },
          { q: "Sur une chaussée à double sens, on stationne :", o1: "À droite obligatoirement", o2: "À gauche", o3: "De n'importe quel côté", o4: "Uniquement en épi", ans: 0, exp: "On doit stationner dans le sens de la circulation." },
          { q: "Une ligne jaune continue au bord du trottoir signifie :", o1: "Arrêt autorisé", o2: "Stationnement autorisé", o3: "Arrêt et stationnement interdits", o4: "Zone de livraison", ans: 2, exp: "Le jaune continu interdit toute immobilisation du véhicule." },
          { q: "Pour stationner en pente, il est conseillé de :", o1: "Enclencher une vitesse", o2: "Braquer les roues vers le trottoir", o3: "Faire les deux (vitesse + roues)", o4: "Mettre les warnings", ans: 2, exp: "C'est une sécurité indispensable en cas de défaillance du frein à main." },
          { q: "L'arrêt minute permet de :", o1: "Dormir un peu", o2: "Déposer un passager rapidement", o3: "Faire ses courses", o4: "Se garer toute la journée", ans: 1, exp: "C'est une immobilisation temporaire pour une action courte." },
          { q: "Stationner devant une bouche d'incendie est :", o1: "Autorisé", o2: "Gênant", o3: "Interdit seulement en ville", o4: "Pas grave", ans: 1, exp: "C'est interdit car cela peut empêcher l'accès aux secours." },
          { q: "Le stationnement unilatéral alterné se fait du 1 au 15 :", o1: "Côté numéros pairs", o2: "Côté numéros impairs", o3: "Du côté gauche", o4: "Du côté droit", ans: 1, exp: "On se base sur les dates pour changer de côté de rue." },
          { q: "À cheval sur un trottoir, le stationnement est :", o1: "Toujours interdit sauf marquage", o2: "Toléré si on laisse 1m", o3: "Autorisé en ville", o4: "Autorisé la nuit", ans: 0, exp: "Le trottoir est réservé aux piétons, pas aux voitures." },
          { q: "Un horodateur sert à :", o1: "Calculer la vitesse", o2: "Payer son stationnement", o3: "Demander de l'aide", o4: "Charger sa batterie", ans: 1, exp: "C'est l'appareil qui gère le stationnement payant en ville." },
          { q: "Stationner sur un pont est considéré comme :", o1: "Autorisé", o2: "Gênant", o3: "Dangereux", o4: "Indispensable en panne", ans: 2, exp: "C'est dangereux car cela réduit fortement la visibilité et l'espace." },
        ],
        autoroute: [
          { q: "Sur la voie d'insertion, je dois :", o1: "M'arrêter au bout", o2: "Accélérer pour égaler le flux", o3: "Passer en force", o4: "Klaxonner", ans: 1, exp: "Il faut utiliser la longueur de la voie pour atteindre la vitesse de croisière." },
          { q: "La vitesse minimale sur la voie de gauche est de :", o1: "60 km/h", o2: "70 km/h", o3: "80 km/h", o4: "90 km/h", ans: 2, exp: "Sur autoroute fluide, on ne doit pas descendre sous 80 km/h à gauche." },
          { q: "En cas de panne sur autoroute, j'utilise :", o1: "La borne d'appel d'urgence", o2: "Mon portable uniquement", o3: "Le stop", o4: "La marche arrière", ans: 0, exp: "Les bornes orange permettent aux secours de vous localiser précisément." },
          { q: "Faire marche arrière sur autoroute est :", o1: "Autorisé si on rate la sortie", o2: "Interdit et très dangereux", o3: "Toléré sur la bande d'urgence", o4: "Possible la nuit", ans: 1, exp: "C'est une cause majeure d'accidents mortels sur autoroute." },
          { q: "La bande d'arrêt d'urgence (BAU) sert à :", o1: "Téléphoner", o2: "Se reposer", o3: "Une panne ou urgence médicale", o4: "Doubler par la droite", ans: 2, exp: "Elle est strictement réservée aux cas de force majeure." },
          { q: "Le symbole 'T' bleu au péage est réservé :", o1: "Aux camions", o2: "Aux abonnés Télépéage", o3: "Aux taxis", o4: "À tout le monde", ans: 1, exp: "Il permet un passage rapide sans sortir sa carte bancaire." },
          { q: "Espace de sécurité conseillé entre 2 voitures :", o1: "Un trait de la BAU", o2: "Deux traits de la BAU", o3: "10 mètres", o4: "50 mètres", ans: 1, exp: "On utilise souvent le repère visuel des lignes de la zone d'urgence." },
          { q: "Une flèche lumineuse verte sur un portique indique :", o1: "Route fermée", o2: "Voie ouverte", o3: "Radar proche", o4: "Sortie obligatoire", ans: 1, exp: "Elle signale que la circulation est autorisée sur cette voie." },
          { q: "La voie de gauche doit être utilisée :", o1: "Tout le temps pour rouler vite", o2: "Exclusivement pour le dépassement", o3: "Uniquement par les bus", o4: "En cas de bouchon", ans: 1, exp: "Le code impose de rouler le plus à droite possible." },
          { q: "Avant de sortir, je dois freiner :", o1: "Sur la voie principale", o2: "Sur la voie de décélération", o3: "Avec le frein à main", o4: "Juste au virage", ans: 1, exp: "On ne freine pas sur l'autoroute mais une fois engagé dans la sortie." },
          { q: "En cas de ralentissement brutal, je dois :", o1: "Utiliser la BAU", o2: "Faire demi-tour", o3: "Actionner les feux de detresse", o4: "Klaxonner fort", ans: 2, exp: "Cela prévient les usagers derrière d'un danger imminent." },
          { q: "Les aires de repos sont situées tous les :", o1: "10 km environ", o2: "20 km environ", o3: "50 km environ", o4: "100 km environ", ans: 1, exp: "La pause de 15 min toutes les 2 heures est essentielle pour la vigilance." },
        ],
        securite: [
          { q: "Quel est le temps de réaction moyen d'un conducteur vigilant ?", o1: "0,5 seconde", o2: "1 seconde", o3: "2 secondes", o4: "3 secondes", ans: 1, exp: "Le temps de réaction moyen est d'une seconde. Il peut augmenter avec la fatigue ou l'alcool." },
          { q: "À 90 km/h, quelle distance est parcourue pendant le temps de réaction (1s) ?", o1: "15 mètres", o2: "27 mètres", o3: "45 mètres", o4: "90 mètres", ans: 1, exp: "Astuce : Multipliez le chiffre des dizaines par 3 (9x3 = 27)." },
          { q: "En ville, l'intervalle de sécurité latéral minimum avec un cycliste est de :", o1: "0,5 mètre", o2: "1 mètre", o3: "1,5 mètre", o4: "2 mètres", ans: 1, exp: "En agglomération, on doit laisser au moins 1 mètre." },
          { q: "L'énergie cinétique est multipliée par combien si la vitesse double ?", o1: "2", o2: "3", o3: "4", o4: "8", ans: 2, exp: "L'énergie cinétique augmente avec le carré de la vitesse (2x2 = 4)." },
          { q: "Un conducteur fatigué voit son champ de vison :", o1: "S'élargir", o2: "Rester identique", o3: "Se rétrécir", o4: "Devenir plus net", ans: 2, exp: "La fatigue réduit la vigilance et rétrécit la perception latérale." },
          { q: "L'ABS permet principalement de :", o1: "Freiner plus court", o2: "Éviter le blocage des roues", o3: "Accélérer plus vite", o4: "Réduire la consommation", ans: 1, exp: "L'ABS permet de garder le contrôle de la direction pendant un freinage d'urgence." },
          { q: "À 130 km/h sur autoroute, le champ de vision est de environ :", o1: "180°", o2: "100°", o3: "30°", o4: "10°", ans: 2, exp: "Plus on va vite, plus le regard se fixe loin devant, réduisant la vision périphérique (effet tunnel)." },
          { q: "Sur sol mouillé, la distance de freinage est :", o1: "Identique", o2: "Réduite de moitié", o3: "Doublée", o4: "Triplée", ans: 2, exp: "L'adhérence est divisée par deux, donc la distance de freinage double." },
          { q: "La ceinture de sécurité est obligatoire :", o1: "Seulement à l'avant", o2: "Seulement hors agglomération", o3: "Pour tous les passagers", o4: "Sauf pour les petits trajets", ans: 2, exp: "Le port de la ceinture est obligatoire pour tous les occupants du véhicule." },
          { q: "L'angle mort est une zone :", o1: "Éclairée par les phares", o2: "Visible dans le rétroviseur", o3: "Non couverte par les rétroviseurs", o4: "Interdite aux piétons", ans: 2, exp: "Il faut tourner la tête pour vérifier les angles morts avant de changer de voie." },
          { q: "Un enfant de moins de 10 ans doit voyager :", o1: "Sur les genoux d'un adulte", o2: "À l'avant obligatoirement", o3: "Dans un siège homologué à l'arrière", o4: "Sans ceinture en ville", ans: 2, exp: "La sécurité des enfants nécessite un dispositif de retenue adapté à leur morphologie." },
          { q: "Les deux traits de la bande d'arrêt d'urgence servent à :", o1: "Décorer la route", o2: "Garder la bonne vitesse", o3: "Maintenir la distance de sécurité", o4: "Aider au stationnement", ans: 2, exp: "C'est un repère visuel : à 130 km/h, on doit laisser 2 traits d'intervalle." },
        ],
        alcool: [
          { q: "Le taux d'alcool maximum autorisé pour un jeune conducteur est de :", o1: "0,2 g/l de sang", o2: "0,5 g/l de sang", o3: "0,8 g/l de sang", o4: "0 g/l de sang", ans: 0, exp: "Pour les permis probatoires, la limite est de 0,2 g/l (soit 0 verre)." },
          { q: "Un verre d'alcool standard augmente le taux d'alcoolémie de environ :", o1: "0,10 g/l", o2: "0,20 à 0,25 g/l", o3: "0,50 g/l", o4: "0,80 g/l", ans: 1, exp: "Un verre 'bar' représente environ 0,20 à 0,25 g/l dans le sang." },
          { q: "L'alcool est éliminé par l'organisme à une vitesse moyenne de :", o1: "0,10 à 0,15 g/l par heure", o2: "0,50 g/l par heure", o3: "1 g/l par heure", o4: "Immédiatement", ans: 0, exp: "Le foie élimine l'alcool lentement. Rien ne permet d'accélérer ce processus (ni café, ni eau)." },
          { q: "La consommation de drogues (cannabis, etc.) est :", o1: "Autorisée si on roule doucement", o2: "Tolérée le weekend", o3: "Strictement interdite au volant", o4: "Légale pour les passagers", ans: 2, exp: "Le dépistage de stupéfiants est systématique en cas d'accident ou d'infraction grave." },
          { q: "Le mélange alcool et stupéfiants multiplie le risque d'accident par :", o1: "2", o2: "5", o3: "10", o4: "29", ans: 3, exp: "Le cocktail alcool + cannabis est extrêmement dangereux et démultiplie les risques." },
          { q: "Un médicament avec un pictogramme rouge (niveau 3) signifie :", o1: "Prudence", o2: "Demander l'avis d'un médecin", o3: "Conduite dangereuse : ne pas conduire", o4: "Médicament sans danger", ans: 2, exp: "Le niveau 3 interdit formellement la conduite pendant le traitement." },
          { q: "L'alcool provoque principalement :", o1: "Une meilleure vue", o2: "Un excès de confiance et une prise de risque", o3: "Une fatigue immédiate", o4: "Une soif intense", ans: 1, exp: "L'alcool altère le jugement : on se croit plus fort alors qu'on est moins capable." },
          { q: "Le refus de se soumettre à un test d'alcoolémie entraîne :", o1: "Aucune sanction", o2: "Une simple amende", o3: "Les mêmes sanctions qu'un taux délictuel", o4: "Un avertissement", ans: 2, exp: "Refuser le test est un délit passible de retrait de points, suspension de permis et amende." },
          { q: "Après une nuit blanche, conduire est aussi dangereux qu'avec :", o1: "0,5 g/l d'alcool", o2: "0,2 g/l d'alcool", o3: "1,5 g/l d'alcool", o4: "Rien du tout", ans: 0, exp: "Le manque de sommeil a des effets similaires à l'alcool on le temps de réaction." },
          { q: "L'éthylotest est obligatoire dans chaque véhicule (recommandé) :", o1: "Vrai", o2: "Faux", o3: "Seulement pour les camions", o4: "Seulement la nuit", ans: 0, exp: "Bien que la sanction ait été supprimée, il est fortement conseillé d'en avoir un pour s'auto-tester." },
          { q: "Un conducteur en état d'ivresse voit les lumières :", o1: "Plus nettes", o2: "Plus petites", o3: "Éblouissantes et floues", o4: "Disparaître", ans: 2, exp: "L'alcool perturbe la perception visuelle et la gestion des contrastes." },
          { q: "À 0,5 g/l (limite légale normale), le risque d'accident est :", o1: "Divisé par 2", o2: "Identique", o3: "Doublé", o4: "Décuplé", ans: 2, exp: "Dès le premier seuil légal, les facultés sont déjà altérées et le risque augmente." },
        ],
        mecanique: [
          { q: "Le témoin d'alerte de couleur rouge sur le tableau de bord impose :", o1: "De ralentir", o2: "De s'arrêter immédiatement dès que possible", o3: "D'aller au garage dans la semaine", o4: "De mettre les pleins phares", ans: 1, exp: "Généralement, le rouge indique un danger grave pour le moteur ou la sécurité." },
          { q: "La pression des pneumatiques se vérifie de préférence :", o1: "À chaud (après 50km)", o2: "À froid (ou moins de 3km)", o3: "Une fois par an", o4: "Seulement en cas de crevaison", ans: 1, exp: "On vérifie la pression à froid pour avoir une mesure exacte (l'air se dilate à chaud)." },
          { q: "Le niveau d'huile moteur se vérifie :", o1: "Moteur tournant", o2: "Moteur froid et sur terrain plat", o3: "Une fois tous les 10 ans", o4: "En roulant", ans: 1, exp: "Il faut que l'huile soit redescendue dans le carter et que la voiture soit bien à plat." },
          { q: "La limite d'usure légale des pneus est de :", o1: "0,5 mm", o2: "1,6 mm", o3: "3 mm", o4: "5 mm", ans: 1, exp: "En dessous de 1,6 mm de gomme au dessus des témoins, le pneu est hors-la-loi." },
          { q: "Où doit-on placer les pneus neufs de préférence ?", o1: "À l'avant", o2: "À l'arrière", o3: "À droite", o4: "À gauche", ans: 1, exp: "Placer les pneus neufs à l'arrière garantit une meilleure stabilité en cas de freinage ou virage." },
          { q: "Le liquide de refroidissement ne doit jamais être ouvert à chaud :", o1: "Vrai, risque de brûlures graves", o2: "Faux, c'est sans danger", o3: "Seulement en hiver", o4: "Seulement sur les vieilles voitures", ans: 0, exp: "Le circuit est sous pression et très chaud ; l'ouverture peut projeter de la vapeur brûlante." },
          { q: "L'alternateur sert à :", o1: "Faire rouler la voiture", o2: "Recharger la batterie pendant la conduite", o3: "Refroidir le moteur", o4: "Changer les vitesses", ans: 1, exp: "Il transforme l'énergie du moteur en électricité pour la batterie et les accessoires." },
          { q: "Pour contrôler le niveau de liquide de freins, je regarde :", o1: "Sous la voiture", o2: "Le bocal transparent dans le moteur", o3: "À l'intérieur des pneus", o4: "Le pot d'échappement", ans: 1, exp: "Le niveau doit se situer entre le 'Mini' et le 'Maxi'." },
          { q: "L'ESP est un système qui permet de :", o1: "Freiner plus fort", o2: "Contrôler la trajectoire en cas de dérapage", o3: "Limiter la pollution", o4: "Augmenter la vitesse", ans: 1, exp: "Il aide le conducteur à garder le contrôle du véhicule lors d'une perte d'adhérence." },
          { q: "En cas de crevaison, je dois utiliser :", o1: "Une bombe anti-crevaison ou la roue de secours", o2: "Du ruban adhésif", o3: "Rien, je peux rouler sur la jante", o4: "De l'eau tiède", ans: 0, exp: "Il est impératif de changer ou réparer provisoirement pour se mettre en sécurité." },
          { q: "Le lave-glace en hiver doit contenir :", o1: "De l'eau gazeuse", o2: "De l'antigel", o3: "De l'huile d'olive", o4: "Du savon de Marseille", ans: 1, exp: "L'antigel évite que le liquide ne gèle et n'endommage la pompe ou les tuyaux." },
          { q: "Un voyant orange indique généralement :", o1: "Un danger immédiat", o2: "Une anomalie à vérifier rapidement", o3: "Que tout va bien", o4: "Que les phares sont allumés", ans: 1, exp: "L'orange est un avertissement, le rouge est une alerte critique." },
        ],
        eco_conduite: [
          { q: "Quelle est la meilleure façon de démarrer pour économiser du carburant ?", o1: "Faire chauffer le moteur 5 min à l'arrêt", o2: "Démarrer et rouler immédiatement à allure modérée", o3: "Donner des grands coups d'accélérateur", o4: "Attendre que le voyant bleu s'éteigne", ans: 1, exp: "Le moteur chauffe mieux et plus vite en roulant doucement qu'au ralenti." },
          { q: "À quel régime moteur est-il conseillé de passer la vitesse supérieure (Essence) ?", o1: "1500 tr/min", o2: "2500 tr/min", o3: "4000 tr/min", o4: "Au rupteur", ans: 1, exp: "Pour un moteur essence, 2500 tr/min est le point optimal. Pour un Diesel, c'est environ 2000 tr/min." },
          { q: "Utiliser le frein moteur permet de consommer :", o1: "0 litre aux 100 km", o2: "2 litres aux 100 km", o3: "Autant qu'au ralenti", o4: "Plus qu'en freinant", ans: 0, exp: "En lâchant l'accélérateur avec une vitesse enclenchée, l'injection se coupe totalement." },
          { q: "Réduire sa vitesse de 130 à 120 km/h sur autoroute permet d'économiser environ :", o1: "0,1 L/100 km", o2: "1 L/100 km", o3: "5 L/100 km", o4: "Rien du tout", ans: 1, exp: "C'est une économie substantielle pour une perte de temps minime." },
          { q: "Des pneus sous-gonflés entraînent une surconsommation de :", o1: "2%", o2: "10%", o3: "25%", o4: "50%", ans: 1, exp: "La résistance au roulement augmente, forçant le moteur à travailler davantage." },
          { q: "Sur autoroute à 130 km/h, il vaut mieux :", o1: "Ouvrir les fenêtres", o2: "Mettre la climatisation", o3: "Éteindre les phares", o4: "Rouler au point mort", ans: 1, exp: "L'impact aérodynamique des fenêtres ouvertes consomme plus que le compresseur de clim à haute vitesse." },
          { q: "Un coffre de toit vide laissé sur le véhicule :", o1: "N'a aucun impact", o2: "Augmente la consommation de 10-15%", o3: "Améliore l'aérodynamisme", o4: "Économise du carburant", ans: 1, exp: "Il faut démonter les galeries et coffres de toit dès qu'ils ne servent plus." },
          { q: "En ville, l'utilisation de la climatisation augmente la consommation de :", o1: "5%", o2: "10%", o3: "20 à 25%", o4: "50%", ans: 2, exp: "Le moteur est très sollicité à basse vitesse par le compresseur de clim." },
          { q: "Le système Stop & Start est utile pour un arrêt supérieur à :", o1: "1 seconde", o2: "20 secondes", o3: "2 minutes", o4: "Uniquement le soir", ans: 1, exp: "L'énergie économisée dépasse celle nécessaire au redémarrage après 20 secondes." },
          { q: "Passer les rapports rapidement vers la 5e ou 6e vitesse :", o1: "Abîme le moteur", o2: "Augmente la pollution", o3: "Réduit la consommation", o4: "Est interdit", ans: 2, exp: "Plus le rapport est élevé, plus le régime moteur est bas, moins on consomme." },
          { q: "Une voiture chargée de 100 kg de bagages inutiles consomme :", o1: "Pareil", o2: "Moins", o3: "Plus", o4: "Seulement en montée", ans: 2, exp: "Le poids est l'ennemi de l'économie, surtout lors des phases d'accélération." },
          { q: "L'éco-conduite permet également de réduire :", o1: "Les frais d'entretien (pneus, freins)", o2: "La durée du trajet", o3: "Le prix de l'assurance", o4: "Le nombre de points", ans: 0, exp: "Une conduite souple use moins les plaquettes de freins et la gomme des pneus." },
        ],
        premiers_secours: [
          { q: "Quelle est la toute première action à faire en arrivant sur un accident ?", o1: "Appeler les secours", o2: "Protéger les lieux", o3: "Sortir les victimes", o4: "Prendre une photo", ans: 1, exp: "Il faut éviter le sur-accident en signalant la zone (feux de détresse, gilet, triangle)." },
          { q: "Le triangle de pré-signalisation doit être placé à environ :", o1: "10 mètres", o2: "30 mètres", o3: "100 mètres", o4: "500 mètres", ans: 1, exp: "30 mètres minimum pour être visible des autres usagers." },
          { q: "Quel est le numéro d'urgence unique européen ?", o1: "15", o2: "17", o3: "18", o4: "112", ans: 3, exp: "Le 112 fonctionne partout en Europe, même sur un téléphone verrouillé." },
          { q: "Une victime est inconsciente mais respire, je la place en :", o1: "Position assise", o2: "Position Latérale de Sécurité (PLS)", o3: "Sur le ventre", o4: "Je ne la touche pas", ans: 1, exp: "La PLS permet de garder les voies aériennes libres et éviter l'étouffement." },
          { q: "Face à une hémorragie externe abondante, je dois :", o1: "Donner à boire", o2: "Appliquer une compression directe sur la plaie", o3: "Faire un garrot immédiatement", o4: "Laver à l'eau", ans: 1, exp: "On appuie fort avec la main ou un linge propre sur la source du saignement." },
          { q: "Doit-on retirer le casque d'un motard accidenté ?", o1: "Oui, pour qu'il respire", o2: "Non, sauf urgence absolue", o3: "Seulement s'il le demande", o4: "Toujours", ans: 1, exp: "Retirer le casque peut aggraver une lésion de la colonne vertébrale." },
          { q: "Une victime présente une brûlure grave, je dois :", o1: "Mettre du beurre", o2: "Arroser à l'eau tempérée pendant longtemps", o3: "Percer les cloches", o4: "Mettre un pansement serré", ans: 1, exp: "L'eau permet de refroidir la zone et d'arrêter la progression de la brûlure." },
          { q: "Le massage cardiaque doit être effectué à une fréquence de :", o1: "30 compressions par minute", o2: "60 compressions par minute", o3: "100 à 120 compressions par minute", o4: "500 compressions par minute", ans: 2, exp: "C'est le rythme nécessaire pour simuler la circulation sanguine." },
          { q: "Peut-on donner à boire à une victime d'accident ?", o1: "Oui, si elle a soif", o2: "Seulement de l'eau", o3: "Jamais", o4: "Si elle est consciente", ans: 2, exp: "Cela peut compliquer une future intervention chirurgicale ou provoquer des vomissements." },
          { q: "L'utilisation d'un DAE (Défibrillateur) est réservée :", o1: "Aux médecins", o2: "Aux pompiers", o3: "À toute personne témoin d'un arrêt cardiaque", o4: "Aux policiers", ans: 2, exp: "L'appareil est automatique et guide l'utilisateur vocalement." },
          { q: "Quelle information est CRUCIALE lors de l'appel aux secours ?", o1: "La couleur des voitures", o2: "La localisation précise", o3: "Mon nom de famille", o4: "L'heure de mon rendez-vous", ans: 1, exp: "Sans localisation exacte, les secours ne peuvent pas intervenir." },
          { q: "Une victime est en état de choc, je dois :", o1: "L'aider à marcher", o2: "La couvrir et la rassurer", o3: "La secouer", o4: "L'ignorer", ans: 1, exp: "Il faut éviter l'hypothermie et maintenir un contact psychologique." },
        ],
        partage_route: [
          { q: "Hors agglomération, quelle distance latérale laisser pour dépasser un cycliste ?", o1: "0,5 mètre", o2: "1 mètre", o3: "1,5 mètre", o4: "3 mètres", ans: 2, exp: "C'est 1m en ville et 1,5m hors agglomération à cause de l'effet de souffle." },
          { q: "Le 'sas vélo' devant un feu rouge est réservé :", o1: "Aux voitures pressées", o2: "Aux cyclistes uniquement", o3: "Aux motos", o4: "Aux bus", ans: 1, exp: "Il permet aux cyclistes de se placer devant pour être vus et ne pas respirer les gaz." },
          { q: "Un piéton manifeste l'intention de traverser hors d'un passage :", o1: "Je force le passage", o2: "Je klaxonne", o3: "Je dois lui céder le passage", o4: "Je l'ignore", ans: 2, exp: "Le conducteur doit céder le passage à un piéton engagé ou manifestant l'intention de le faire." },
          { q: "Les angles morts d'un poids lourd se situent :", o1: "Uniquement derrière", o2: "Devant, derrière et sur les côtés", o3: "Uniquement à gauche", o4: "Il n'en a pas", ans: 1, exp: "Le chauffeur a de grandes zones d'invisibilité, il est vital de ne pas яться там." },
          { q: "Dans une 'zone de rencontre', la vitesse est limitée à :", o1: "10 km/h", o2: "20 km/h", o3: "30 km/h", o4: "50 km/h", ans: 1, exp: "Les piétons y sont prioritaires partout (sauf sur tramway)." },
          { q: "À l'ouverture de ma portière, je dois :", o1: "Ouvrir d'un coup", o2: "Vérifier mon rétro et l'angle mort", o3: "Klaxonner avant", o4: "Regarder le trottoir", ans: 1, exp: "C'est crucial pour ne pas percuter un cycliste arrivant par l'arrière." },
          { q: "Un cycliste a-t-il le droit de rouler à gauche de sa voie en ville ?", o1: "Jamais", o2: "Oui, pour s'éloigner des portières", o3: "Seulement s'il va vite", o4: "Non, c'est interdit", ans: 1, exp: "C'est autorisé (et conseillé) pour éviter 'l'emportiérage'." },
          { q: "Les enfants sont considérés comme des usagers vulnérables car :", o1: "Ils courent vite", o2: "Ils sont petits et imprévisibles", o3: "Ils ont des cartables", o4: "Ils font du bruit", ans: 1, exp: "Leur champ visuel est réduit et ils n'analysent pas bien les distances." },
          { q: "Un bus qui quitte son arrêt en agglomération :", o1: "Je passe avant lui", o2: "Je lui facilite le passage", o3: "Je klaxonne", o4: "Je l'ignore", ans: 1, exp: "On doit faciliter la sortie d'arrêt des transports en commun en ville." },
          { q: "Les trottinettes électriques (EDPM) ont le droit de rouler :", o1: "Sur les trottoirs", o2: "Sur les pistes cyclables et la chaussée", o3: "Uniquement dans les parcs", o4: "Partout", ans: 1, exp: "Il est formellement interdit de rouler sur les trottoirs avec un engin motorisé." },
          { q: "Face à un tramway, je dois :", o1: "Avoir la priorité", o2: "Lui céder le passage en toutes circonstances", o3: "Le doubler par la droite", o4: "Accélérer", ans: 1, exp: "Le tramway est toujours prioritaire à cause de son poids et sa faible distance de freinage." },
          { q: "La nuit, un cycliste doit obligatoirement avoir :", o1: "Un gilet jaune hors agglomération", o2: "Un casque intégral", o3: "Une clochette dorée", o4: "Un phare antibrouillard", ans: 0, exp: "Le gilet est obligatoire la nuit (ou visibilité réduite) hors agglomération." },
        ]

      }
    },
    cours: {
      global_title: "Nos Modules de Cours",
      global_subtitle: "Apprenez le code avec pédagogie",
      btn_view: "Voir le cours",
      footer_ready: "Prêt à valider ?",
      modules_list: {
        m1_title: "Signalisation routière", m1_desc: "Comprendre les panneaux, le marquage au sol, et les signaux.",
        m2_title: "Priorités et intersections", m2_desc: "Maîtriser les règles fondamentales (Prio droite, Stop, Stop).",
        m3_title: "Règles de circulation", m3_desc: "Tout savoir sur le placement, les croisements et dépassements.",
        m4_title: "Vitesse et limitations", m4_desc: "Apprendre à adapter son allure selon les zones.",
        m5_title: "Stationnement et arrêt", m5_desc: "Les règles pour s'arrêter ou se garer.",
        m6_title: "Autoroute et voies rapides", m6_desc: "L'insertion, la circulation et les sorties.",
        m7_title: "Sécurité routière", m7_desc: "Les distances de sécurité et le temps de réaction.",
        m8_title: "Alcool, drogues et conduite", m8_desc: "Les effets, les limites légales et les sanctions.",
        m9_title: "Mécanique et entretien", m9_desc: "Vérifications courantes et tableau de bord.",
        m10_title: "Éco-conduite", m10_desc: "Conduire de manière plus économique et écologique.",
        m11_title: "Premiers secours", m11_desc: "Protéger, alerter et secourir.",
        m12_title: "Partage de la route", m12_desc: "Coexister avec les cyclistes et piétons."
      },
      signalisation: {
        badge: "Module 1",
        label: "Signalisation",
        title: "La signalisation routière",
        description: "Comprendre et respecter les codes visuels de la route pour une conduite sûre.",
        footer_title: "Maîtrisez les signes",
        footer_desc: "Vous avez complété la base de la signalisation. Prêt pour la suite ?",
        btn_test: "Quiz Signalisation",
        sections: [
          {
            id: "objectif",
            title: "🎯 OBJECTIF",
            desc: "La signalisation routière permet d'organiser l'espace public.",
            rules: [
              { title: "Rôles", text: "Informer les usagers, prévenir les dangers, organiser la circulation et imposer des règles." },
              { title: "Règle d'or", text: "Elle est OBLIGATOIRE à respecter sans exception." }
            ],
            examples: ["Informer", "Prévenir", "Organiser", "Imposer"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "danger",
            title: "1. Les panneaux de danger",
            desc: "Ils annoncent un danger à venir pour permettre au conducteur d'anticiper.",
            imageUrl: "/images/cours/panneau_danger.png",
            rules: [
              { title: "Caractéristiques", text: "Forme triangulaire, bord rouge, fond blanc." },
              { title: "Comportement", text: "Adapter sa vitesse et être prêt à réagir immédiatement." }
            ],
            examples: ["Virage dangereux", "Chaussée glissante", "Passage piéton", "Travaux", "Intersection dangereuse"],
            color: "border-red-500",
            bgBadge: "bg-red-500 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "obligation",
            title: "2. Les panneaux d’obligation",
            desc: "Ils imposent un comportement précis à adopter obligatoirement.",
            rules: [
              { title: "Caractéristiques", text: "Forme ronde, fond bleu." },
              { title: "Consigne", text: "Vous DEVEZ suivre l’indication sous peine de sanction." }
            ],
            examples: ["Tourner à droite", "Piste cyclable", "Chaînes neige"],
            color: "border-blue-600",
            bgBadge: "bg-blue-600 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "interdiction",
            title: "3. Les panneaux d’interdiction",
            desc: "Ils signalent ce qui est défendu de faire à partir du panneau.",
            imageUrl: "/images/cours/panneau_interdiction.png",
            rules: [
              { title: "Caractéristiques", text: "Forme ronde, bord rouge, fond blanc." },
              { title: "Règle", text: "Toute infraction est sanctionnée (amende, points)." }
            ],
            examples: ["Sens interdit", "Limitation de vitesse", "Interdiction de dépasser"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "indication",
            title: "4. Les panneaux d’indication",
            desc: "Ils servent à donner des informations utiles pour la conduite.",
            rules: [
              { title: "Caractéristiques", text: "Forme carrée ou rectangulaire, fond bleu." },
              { title: "Rôle", text: "Faciliter le trajet et repérer les services." }
            ],
            examples: ["Parking", "Hôpital", "Autoroute", "Station-service"],
            color: "border-sky-500",
            bgBadge: "bg-sky-500 text-white",
            bgLight: "bg-sky-50"
          },
          {
            id: "direction",
            title: "5. Les panneaux de direction",
            desc: "Ils guident les conducteurs vers leur destination.",
            rules: [
              { title: "Couleurs", text: "Bleu (autoroute), Vert (grandes villes), Blanc (local)." },
              { title: "Utilité", text: "Préparer ses changements de direction (itinéraires, sorties)." }
            ],
            examples: ["Directions villes", "Itinéraires", "Sorties"],
            color: "border-emerald-500",
            bgBadge: "bg-emerald-500 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "touristique",
            title: "6. Les panneaux touristiques",
            desc: "Ils signalent des lieux d'intérêt culturel ou naturel.",
            rules: [
              { title: "Caractéristiques", text: "Fond marron, forme rectangulaire." }
            ],
            examples: ["Monuments historiques", "Parcs naturels", "Sites touristiques"],
            color: "border-amber-700",
            bgBadge: "bg-amber-700 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "temporaire",
            title: "7. Les panneaux temporaires",
            desc: "Ils signalent des modifications provisoires de la route.",
            rules: [
              { title: "Caractéristiques", text: "Fond jaune." },
              { title: "Priorité", text: "Ils sont PRIORITAIRES sur les panneaux permanents." }
            ],
            examples: ["Travaux", "Déviation", "Chantier"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-gray-900",
            bgLight: "bg-yellow-50"
          },
          {
            id: "marquage",
            title: "8. Les marquages au sol",
            desc: "La signalisation horizontale a la même valeur que les panneaux.",
            rules: [
              { title: "Types", text: "Lignes continues (interdit), discontinues (autorisé), flèches, passages piétons." },
              { title: "Sanction", text: "Les franchir indûment est une infraction grave." }
            ],
            examples: ["Ligne continue", "Zebra", "Flèche directionnelle"],
            color: "border-gray-400",
            bgBadge: "bg-gray-400 text-white",
            bgLight: "bg-gray-50"
          },
          {
            id: "feux",
            title: "9. Les feux tricolores",
            desc: "Ils régulent la circulation aux carrefours.",
            imageUrl: "/images/cours/feux_tricolores.png",
            rules: [
              { title: "Rouge", text: "Arrêt absolu et obligatoire." },
              { title: "Orange", text: "Arrêt requis sauf danger immédiat par l'arrière." },
              { title: "Vert", text: "Passage autorisé si la voie est dégagée." }
            ],
            examples: ["Feu Rouge", "Feu Orange", "Feu Vert"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "pietons",
            title: "10. Signalisation Piétons",
            desc: "La sécurité des usagers vulnérables est prioritaire.",
            rules: [
              { title: "Priorité", text: "Toujours céder le passage aux piétons engagés." },
              { title: "Zones", text: "Zone piétonne, passage protégé." }
            ],
            examples: ["Passage piéton", "Zone de rencontre"],
            color: "border-teal-500",
            bgBadge: "bg-teal-500 text-white",
            bgLight: "bg-teal-50"
          },
          {
            id: "hierarchie",
            title: "11. Hiérarchie des Signes",
            desc: "À connaître absolument pour l'examen !",
            rules: [
              { title: "Ordre de priorité", text: "1. Agent 👮, 2. Feux 🚦, 3. Panneaux 🚧, 4. Marquage 🛣️." }
            ],
            examples: ["Agent de police", "Feux tricolores", "Panneaux"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "erreurs",
            title: "12. Erreurs Fréquentes",
            desc: "Attention aux pièges classiques.",
            rules: [
              { title: "Confusions", text: "Confondre obligation (rond bleu) et indication (carré bleu)." },
              { title: "Oublis", text: "Ignorer un panneau temporaire (jaune) ou mal interpréter une priorité." }
            ],
            examples: ["Panneau Stop ignoré", "Mauvaise priorité"],
            color: "border-red-700",
            bgBadge: "bg-red-700 text-white",
            bgLight: "bg-red-100"
          },
          {
            id: "cas_concrets",
            title: "13. Cas Concrets",
            desc: "Analysons des situations réelles de conduite.",
            rules: [
              { title: "Situation 1", text: "Panneau STOP : Arrêt obligatoire même si la route semble vide." },
              { title: "Situation 2", text: "Ligne Continue : Interdiction absolue de dépasser." },
              { title: "Situation 3", text: "Feu Orange : Arrêt obligatoire sauf si cela présente un danger immédiat pour celui qui suit." }
            ],
            examples: ["Stop", "Ligne continue", "Feu orange"],
            color: "border-orange-600",
            bgBadge: "bg-orange-600 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "astuces",
            title: "14. Astuces Mémo",
            desc: "Retenir les formes et couleurs simplement.",
            rules: [
              { title: "Formes", text: "Triangle = Danger ⚠️, Rond = Ordre (Interdit 🚫 ou Obligatoire 🔵)." },
              { title: "Couleurs", text: "Rouge = Alerte, Bleu = Obligation/Info, Jaune = Travaux." }
            ],
            examples: ["Mnémonique", "Codification visuelle"],
            color: "border-purple-600",
            bgBadge: "bg-purple-600 text-white",
            bgLight: "bg-purple-50"
          },
          {
            id: "conclusion",
            title: "15. Conclusion",
            desc: "La signalisation est la base d'une conduite sûre et sereine.",
            rules: [
              { title: "Essentiel", text: "Elle permet d'éviter les accidents et est cruciale pour réussir l'examen." },
              { title: "Engagement", text: "Elle doit être connue parfaitement pour assurer la sécurité de tous." }
            ],
            examples: ["Sécurité", "Accidents évités", "Examen réussi"],
            color: "border-emerald-700",
            bgBadge: "bg-emerald-700 text-white",
            bgLight: "bg-emerald-50"
          }
        ],
        quiz_section: {
          title: "🧪 16. Questions type examen",
          intro: "Testez vos connaissances sur la signalisation avant de passer au module suivant.",
          questions: [
            {
              question: "Un panneau triangulaire indique :",
              options: ["Une obligation", "Une interdiction", "Un danger", "Une direction"],
              answer: 2,
              explanation: "Les triangles à bord rouge indiquent toujours un danger.",
              imageUrl: "/images/exam/q1.png"
            },
            {
              question: "Un panneau bleu rond signifie :",
              options: ["Information", "Obligation", "Danger", "Interdiction"],
              answer: 1,
              explanation: "Les ronds bleus sont des panneaux d'obligation."
            },
            {
              question: "Un panneau jaune signifie :",
              options: ["Permanent", "Temporaire", "Danger", "Direction"],
              answer: 1,
              explanation: "La couleur jaune est réservée à la signalisation temporaire (travaux)."
            }
          ]
        }
      },
      priorites: {
        badge: "Module 2",
        label: "Les priorités",
        title: "Les priorités",
        description: "Comprendre qui a la priorité pour éviter les accidents aux intersections.",
        footer_title: "Maîtrisez les priorités",
        footer_desc: "Vous avez complété la base des priorités. Prêt pour la suite ?",
        btn_test: "Quiz Priorités",
        sections: [
          {
            id: "objectif",
            title: "🎯 Objectif",
            desc: "Comprendre qui a la priorité pour éviter les accidents aux intersections.",
            rules: [
              { title: "Définition", text: "La priorité détermine quel usager doit passer en premier." }
            ],
            examples: ["Sécurité", "Règle commune"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "prio_droite",
            title: "1. Priorité à droite",
            desc: "La règle de base s'il n'y a aucune signalisation.",
            imageUrl: "/images/cours/priorite_droite.png",
            rules: [
              { title: "Sans signalisation", text: "Priorité au véhicule venant de droite." }
            ],
            examples: ["Croisement en ville", "Carrefour sans panneau"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-white",
            bgLight: "bg-yellow-50"
          },
          {
            id: "cedez",
            title: "2. Panneau \"Cédez le passage\"",
            desc: "Il faut ralentir et laisser passer.",
            rules: [
              { title: "Action", text: "Ralentir et céder la priorité aux autres." }
            ],
            examples: ["Entrée sur voie rapide", "Rond-point"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "stop",
            title: "3. Panneau STOP",
            desc: "Arrêt strict exigé.",
            rules: [
              { title: "Action", text: "Arrêt OBLIGATOIRE puis céder le passage." }
            ],
            examples: ["Carrefour dangereux", "Ligne d'arrêt"],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "route_prio",
            title: "4. Route prioritaire",
            desc: "Vous avez l'avantage.",
            rules: [
              { title: "Règle", text: "Vous avez la priorité à l'intersection." }
            ],
            examples: ["Route nationale", "Axe principal"],
            color: "border-green-600",
            bgBadge: "bg-green-600 text-white",
            bgLight: "bg-green-50"
          },
          {
            id: "rond_point",
            title: "5. Rond-point",
            desc: "Priorité à ceux engagés.",
            imageUrl: "/images/cours/rond_point.png",
            rules: [
              { title: "Engagement", text: "Priorité aux véhicules déjà engagés." }
            ],
            examples: ["Carrefour à sens giratoire"],
            color: "border-purple-600",
            bgBadge: "bg-purple-600 text-white",
            bgLight: "bg-purple-50"
          },
          {
            id: "cas_dangereux",
            title: "⚠️ Cas dangereux",
            desc: "Soyez particulièrement attentifs.",
            rules: [
              { title: "Attention", text: "Mauvaise visibilité, intersections en ville, conducteurs rapides." }
            ],
            examples: ["Nuit", "Pluie forte", "Vitesse"],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "erreurs",
            title: "❌ Erreurs fréquentes",
            desc: "Les fautes à ne pas faire.",
            rules: [
              { title: "Fautes", text: "Ne pas regarder à droite, croire être prioritaire, ignorer un STOP." }
            ],
            examples: ["Refus de priorité", "Stop glissé"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "cas_concret",
            title: "🚗 Cas concret",
            desc: "Vous arrivez sans panneau :",
            rules: [
              { title: "Action", text: "Une voiture à droite → vous cédez." }
            ],
            examples: ["Rue sans marquage"],
            color: "border-cyan-600",
            bgBadge: "bg-cyan-600 text-white",
            bgLight: "bg-cyan-50"
          },
          {
            id: "astuce",
            title: "🧠 Astuce",
            desc: "Mnémonique.",
            rules: [
              { title: "Règle", text: "\"Pas de panneau = priorité à droite\"." }
            ],
            examples: ["Réflexe"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "conclusion",
            title: "🎯 Conclusion",
            desc: "Toujours analyser la situation avant de passer.",
            rules: [
              { title: "La clé", text: "La priorité dépend de la signalisation et de la situation." }
            ],
            examples: ["Sécurité avant tout"],
            color: "border-teal-600",
            bgBadge: "bg-teal-600 text-white",
            bgLight: "bg-teal-50"
          }
        ],
        quiz_section: {
          title: "🧪 Questions type examen",
          intro: "Testez vos connaissances sur les priorités.",
          questions: [
            {
              question: "Sans panneau, qui est prioritaire ?",
              options: ["Gauche", "Droite", "Moi", "Personne"],
              answer: 1,
              explanation: "Sans signalisation, la règle par défaut est la priorité à droite."
            },
            {
              question: "Au STOP :",
              options: ["Je ralentis", "Je passe", "Je m’arrête", "J’accélère"],
              answer: 2,
              explanation: "Le panneau STOP oblige formellement à marquer un arrêt complet à la ligne."
            },
            {
              question: "Dans un rond-point :",
              options: ["Je suis prioritaire", "Priorité à droite", "Priorité à ceux déjà engagés", "Aucun"],
              answer: 2,
              explanation: "Sauf exception, on doit céder le passage à ceux déjà sur l'anneau."
            }
          ]
        }
      },
      vitesse: {
        badge: "Module 4",
        label: "La Vitesse",
        title: "La Vitesse",
        description: "Adapter sa vitesse pour rouler en sécurité.",
        footer_title: "Maîtrisez la vitesse",
        footer_desc: "Vous avez complété la base de la vitesse. Prêt pour la suite ?",
        btn_test: "Quiz Vitesse",
        sections: [
          {
            id: "objectif",
            title: "🎯 Objectif",
            desc: "Adapter sa vitesse pour rouler en sécurité.",
            rules: [
              { title: "Sécurité", text: "La vitesse détermine le temps de réaction et la force de l'impact." }
            ],
            examples: ["Survie", "Anticipation"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "limitations",
            title: "1. Limitations générales",
            desc: "Règles par défaut.",
            imageUrl: "/images/cours/limitation_vitesse.png",
            rules: [
              { title: "Ville", text: "50 km/h" },
              { title: "Route", text: "80 km/h" },
              { title: "Autoroute", text: "130 km/h" }
            ],
            examples: ["Panneau 50", "Panneau 130"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-white",
            bgLight: "bg-yellow-50"
          },
          {
            id: "adapter",
            title: "2. Adapter la vitesse",
            desc: "La limite légale n'est pas une obligation d'allure.",
            rules: [
              { title: "Météo", text: "Pluie, neige, brouillard." },
              { title: "Contexte", text: "Trafic dense, visibilité réduite." }
            ],
            examples: ["Brouillard = 50 km/h partout"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "distance_secu",
            title: "3. Distance de sécurité",
            desc: "Prévoir l'arrêt.",
            imageUrl: "/images/cours/distance_securite.png",
            rules: [
              { title: "Règle", text: "2 secondes d'intervalle minimum." }
            ],
            examples: ["2 traits sur l'autoroute", "Compter 'un crocodile, deux crocodiles'"],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "erreurs",
            title: "❌ Erreurs fréquentes",
            desc: "Fautes lourdes de sens.",
            rules: [
              { title: "Excès", text: "Rouler trop vite et ne pas adapter son allure aux conditions." }
            ],
            examples: ["Coller la voiture de devant (distances)"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "cas_concret",
            title: "🚗 Cas concret",
            desc: "La route est mouillée :",
            rules: [
              { title: "Action", text: "Pluie = ralentir (ex: 130 -> 110)." }
            ],
            examples: ["Route inondée"],
            color: "border-cyan-600",
            bgBadge: "bg-cyan-600 text-white",
            bgLight: "bg-cyan-50"
          },
          {
            id: "astuce",
            title: "🧠 Astuce",
            desc: "À garder en tête.",
            rules: [
              { title: "Principe", text: "\"Plus vite = plus de danger\"." }
            ],
            examples: ["Augmentation exponentielle du freinage"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "conclusion",
            title: "🎯 Conclusion",
            desc: "Respectez l'énergie cinétique.",
            rules: [
              { title: "Maîtrise", text: "La vitesse doit toujours être adaptée." }
            ],
            examples: ["La vitesse adaptée sauve des vies"],
            color: "border-teal-600",
            bgBadge: "bg-teal-600 text-white",
            bgLight: "bg-teal-50"
          }
        ],
        quiz_section: {
          title: "🧪 Questions",
          intro: "C'est l'heure du quiz concernant la Vitesse.",
          questions: [
            {
              question: "En ville :",
              options: ["30", "50", "80", "100"],
              answer: 1,
              explanation: "Sauf indications contraires (Zone 30), la limite en agglomération est fixée à 50 km/h."
            },
            {
              question: "Distance de sécurité minimum idéale :",
              options: ["1 sec", "2 sec", "5 sec", "10 sec"],
              answer: 1,
              explanation: "Il faut conserver un intervalle d'au moins 2 secondes avec le véhicule qui vous précède."
            },
            {
              question: "Sous la pluie :",
              options: ["Accélérer", "Ralentir", "Klaxonner", "Doubler"],
              answer: 1,
              explanation: "La pluie augmente la distance de freinage et réduit la visibilité. Ralentir est impératif."
            }
          ]
        }
      },
      stationnement: {
        badge: "Module 05",
        label: "Espaces de Repos",
        title: "Stationnement et Arrêt",
        description: "Le partage de l'espace public ne s'arrête pas quand le moteur est éteint. Savoir décrypter les signes est central.",
        definition: {
          title: "1. Arrêt VS Stationnement : La Différence",
          desc: "S'arrêter n'est pas se garer. Cette distinction est fondamentale.",
          r1_t: "L'Arrêt", r1_txt: "Immobilisation MOMENTANÉE pour passagers ou bagages. Le conducteur reste au volant.",
          r2_t: "Le Stationnement", r2_txt: "Si le conducteur s'éloigne (même pour 2 min), le véhicule est en stationnement.",
          r3_t: "Panneaux", r3_txt: "Une ligne rouge = stationnement interdit. Croix rouge = arrêt et stationnement interdits.",
          ex1: "Un ami descend pendant que le moteur tourne : vous êtes en ARRÊT.",
          ex2: "Entrer dans une boulangerie = STATIONNEMENT."
        },
        regles: {
          title: "2. Les Règles du Stationnement Autorisé",
          desc: "Où et comment se garer correctement.",
          r1_t: "Sens de Circulation", r1_txt: "On se gare OBLIGATOIREMENT dans le sens de la circulation (à droite par défaut).",
          r2_t: "Lignes blanches", r2_txt: "Discontinues pour délimiter les places de parking autorisées.",
          r3_t: "Zone Bleue", r3_txt: "Limité dans le temps. Disque Européen obligatoire derrière le pare-brise.",
          r4_t: "Hors agglomération", r4_txt: "Se garer hors de la chaussée, sur l'accotement.",
          ex1: "On ne traverse pas la ligne pour se garer à contresens : il faut faire demi-tour."
        },
        interdictions: {
          title: "3. La Signalisation Horizontale d'Interdiction",
          desc: "Marquages peints sur le trottoir ou la chaussée.",
          r1_t: "Ligne Jaune Continue", r1_txt: "L'arrêt ET le stationnement y sont formellement PROSCRITS.",
          r2_t: "Ligne Jaune Discontinue", r2_txt: "Le stationnement est interdit, mais l'arrêt y est provisoirement toléré.",
          r3_t: "Zigzag Jaunes", r3_txt: "Signale un arrêt de bus. Arrêt et stationnement interdits pour tous les autres.",
          r4_t: "Croix Jaune", r4_txt: "Livraison, réservée au chargement/déchargement.",
          ex1: "Se mettre en 'warning' sur un zigzag jaune est une lourde faute."
        },
        dangereux: {
          title: "4. Le Stationnement Dangereux et Gênant",
          desc: "La justice différencie l'incivisme et la menace réelle.",
          r1_t: "Gênant & Très Gênant", r1_txt: "Trottoirs, pistes cyclables, passages piétons (135€ et fourrière).",
          r2_t: "Dangereux", r2_txt: "Cache la visibilité (virage aveugle) ou passage à niveau. -3 points.",
          r3_t: "Autoroutes", r3_txt: "Bande d'Arrêt d'Urgence uniquement pour panne ou malaise réel.",
          r4_t: "Garage", r4_txt: "Même devant son propre garage, le stationnement est verbalisable.",
          ex1: "Arrêt sur B.A.U pour téléphoner = infraction suicidaire.",
          ex2: "Bloquer une piste cyclable oblige les vélos à se déporter sur la route."
        },
        footer_title: "Moteur coupé, leçon assimilée ?",
        footer_desc: "Avez-vous bien identifié le piège de la zone très gênante à -135€ ?",
        btn_test: "Évaluer mes acquis"
      },
      autoroute: {
        badge: "Module 06",
        label: "Réseau Très Haute Vitesse",
        title: "Autoroute et Voies Rapides",
        description: "Le réseau le plus sûr mais la haute vélocité ne pardonne aucun écart.",
        entree_sortie: {
          title: "1. L'Entrée et la Sortie",
          desc: "Transitions codifiées pour ne pas bloquer les usagers à 130 km/h.",
          r1_t: "Voie d'Insertion", r1_txt: "Utiliser toute sa longueur pour atteindre la vitesse du trafic.",
          r2_t: "S'insérer", r2_txt: "Rétro dès le début. Le clignotant gauche annonce l'intention.",
          r3_t: "Voie de Décélération", r3_txt: "Dès les panneaux bleus. Clignotant et engagement total.",
          r4_t: "Où freiner ?", r4_txt: "JAMAIS sur la voie principale. Freiner uniquement une fois sur la voie de sortie.",
          ex1: "Accélérer à 110 pour s'insérer devant un camion à 90.",
          ex2: "Ne jamais s'arrêter au bout d'une voie d'insertion si le trafic coule."
        },
        voies: {
          title: "2. Le Bon Usage des Voies",
          desc: "Une autoroute possède a minima 2 voies. Le placement est crucial.",
          r1_t: "Repli à Droite", r1_txt: "On DOIT toujours circuler sur la voie la plus à DROITE.",
          r2_t: "Voies de Gauche", r2_txt: "Uniquement pour DÉPASSER. Se rabattre après la manœuvre.",
          r3_t: "Vitesse minimale", r3_txt: "Interdit de rouler à moins de 80 km/h sur la voie de gauche extrême.",
          r4_t: "Aspiration", r4_txt: "Le dépassement d'un Poids Lourd peut déstabiliser la direction.",
          ex1: "Autoroute déserte à 4h ? Roulez à l'extrême droite.",
          ex2: "Croix rouge au-dessus d'une voie = voie neutralisée, rabattez-vous."
        },
        securite: {
          title: "3. Distances de Sécurité et Fatigue",
          desc: "À 130 km/h, on parcourt 36 mètres par seconde.",
          r1_t: "Règle des 2 Traits", r1_txt: "Conserver 2 traits de B.A.U d'écart (~90 mètres).",
          r2_t: "Pluie", r2_txt: "Augmenter la distance car la capacité de freinage diminue (Aquaplaning).",
          r3_t: "La Fatigue", r3_txt: "Premier facteur mortel. Pause de 15 min toutes les 2 HEURES obligatoire.",
          r4_t: "Bande d'Arrêt d'Urgence", r4_txt: "Interdit sauf panne, crevaison ou malaise. Passer derrière les glissières.",
          ex1: "Il pleut = Limite à 110. Antibrouillards arrière interdits.",
          ex2: "Voyant rouge ? Warnings, B.A.U et passer de l'autre côté de la barrière."
        },
        footer_title: "La règle des 2 traits est acquise ?",
        footer_desc: "Mémorisez bien la règle de décélération pour une sortie fluide !",
        btn_test: "Évaluer mes acquis"
      },
      circulation: {
        badge: "Module 3",
        label: "La Circulation",
        title: "Règles de circulation",
        description: "Circuler correctement sur la route en respectant les règles fondamentales de placement et de manœuvre.",
        footer_title: "Maîtrisez la circulation",
        footer_desc: "Vous avez complété la base de la circulation. Prêt pour la suite ?",
        btn_test: "Quiz Circulation",
        sections: [
          {
            id: "position",
            title: "1. Position sur la chaussée",
            desc: "En marche normale, le placement est la base de la sécurité et de la fluidité.",
            rules: [
              { title: "Règle Générale", text: "On doit circuler le plus près possible du bord droit de la chaussée." },
              { title: "Virages", text: "Serrer à droite dans les virages à visibilité réduite pour éviter les chocs frontaux." },
              { title: "Changement de file", text: "Interdit de changer de file sans raison valable (sauf pour tourner ou dépasser)." }
            ],
            factBox: {
              type: "warning",
              title: "Attention aux cyclistes",
              text: "En ville, serrez à droite mais laissez toujours un intervalle suffisant pour les usagers vulnérables."
            },
            examples: ["Voie de droite sur autoroute", "Placement en virage"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "croisement",
            title: "2. Le Croisement",
            desc: "Savoir partager la route quand l'espace se réduit.",
            rules: [
              { title: "Action", text: "Serrer à droite." }
            ],
            examples: ["Route étroite", "Croisement difficile"],
            color: "border-green-600",
            bgBadge: "bg-green-600 text-white",
            bgLight: "bg-green-50"
          },
          {
            id: "cas_dangereux",
            title: "⚠️ Cas dangereux",
            desc: "Situations à haut risque.",
            rules: [
              { title: "Attention", text: "Dépassement sans visibilité, oubli du clignotant." }
            ],
            examples: ["Haut de côte", "Virage aveugle"],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "erreurs",
            title: "❌ Erreurs fréquentes",
            desc: "Les fautes à éviter.",
            rules: [
              { title: "Fautes", text: "Dépasser par la droite, oublier de regarder." }
            ],
            examples: ["Angle mort ignoré", "Dépassement par la voie lente"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "cas_concret",
            title: "🚗 Cas concret",
            desc: "Séquence logique :",
            rules: [
              { title: "Action", text: "Dépasser = vérifier + signaler + dépasser." }
            ],
            examples: ["Dépassement sur nationale"],
            color: "border-cyan-600",
            bgBadge: "bg-cyan-600 text-white",
            bgLight: "bg-cyan-50"
          },
          {
            id: "astuce",
            title: "🧠 Astuce",
            desc: "Règle de base.",
            rules: [
              { title: "À retenir", text: "\"Regarder → signaler → agir\"." }
            ],
            examples: ["Méthode RCA"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "conclusion",
            title: "🎯 Conclusion",
            desc: "La base d'une conduite collective réussie.",
            rules: [
              { title: "La clé", text: "Toujours anticiper les actions des autres." }
            ],
            examples: ["Vigilance constante"],
            color: "border-teal-600",
            bgBadge: "bg-teal-600 text-white",
            bgLight: "bg-teal-50"
          }
        ],
        quiz_section: {
          title: "🧪 Questions",
          intro: "Testez vos connaissances sur la circulation.",
          questions: [
            {
              question: "Le dépassement se fait :",
              options: ["À droite", "À gauche", "Au milieu", "Peu importe"],
              answer: 1,
              explanation: "Le dépassement s'effectue systématiquement par la gauche (sauf rares exceptions)."
            },
            {
              question: "Avant de tourner :",
              options: ["Accélérer", "Freiner fort", "Mettre le clignotant", "Rien"],
              answer: 2,
              explanation: "Le clignotant prévient les autres usagers de vos intentions bien avant de freiner."
            },
            {
              question: "En croisement :",
              options: ["Aller vite", "Klaxonner", "Rester à droite", "Doubler"],
              answer: 2,
              explanation: "Face à un usager en sens inverse, il faut serrer et rester le plus à droite possible."
            }
          ]
        }
      },
      securite: {
        badge: "Module 07",
        label: "Vital & Décisif",
        title: "Sécurité Routière",
        description: "La différence entre un simple choc matériel et une tragédie repose sur la ceinture, les distances et la vigilance.",
        sections: [
          {
            id: "ceinture",
            title: "1. La Ceinture de Sécurité",
            desc: "Élément de sécurité passive fondamental.",
            rules: [
              { title: "Obligation", text: "Obligatoire pour TOUS les occupants, à l'avant comme à l'arrière." },
              { title: "Responsabilité", text: "Le conducteur est responsable des passagers MINEURS (-18 ans). Amende de 135€ et -3 points." },
              { title: "Ajustement", text: "À plat, sur l'épaule et l'os du bassin. L'airbag complète, ne remplace pas." },
              { title: "Grossesse", text: "Obligatoire. Sangle abdominale SOUS l'abdomen." }
            ],
            examples: [
              "Passager majeur non attaché = il paie l'amende lui-même.",
              "Impact à 50 km/h = projectile d'1,5 tonne sans ceinture."
            ],
            color: "border-rose-500",
            bgBadge: "bg-rose-500 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "distance",
            title: "2. Les Distances de Sécurité",
            desc: "Maintenir un intervalle vital avec le véhicule devant.",
            rules: [
              { title: "Règle des 2 secondes", text: "Maintenir au moins 2 secondes d'écart (1s réaction + 1s sécurité)." },
              { title: "Tunnel", text: "Distance d'urgence via 2 diodes bleues, même à l'arrêt." },
              { title: "Mauvais temps", text: "Pluie = distance de freinage accrue de 50%. Augmenter les espaces." },
              { title: "Calcul", text: "Dizaine x 3 = 1 seconde de réaction. x 2 pour la sécurité." }
            ],
            examples: [
              "En tunnel, garder 50m d'écart même en cas d'embouteillage."
            ],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "fatigue",
            title: "3. La Fatigue",
            desc: "Principale cause de décès sur longs trajets.",
            rules: [
              { title: "Signaux", text: "Picotements, nuque raide, gesticulations = arrêt immédiat." },
              { title: "Faux remèdes", text: "Musique forte, café ou vent n'empêchent pas l'endormissement." },
              { title: "Solution", text: "Se garer et faire une micro-sieste de 15-20 min." },
              { title: "Pics de danger", text: "Entre 02h-05h et 13h-15h (post-repas)." }
            ],
            examples: [
              "4 secondes d'absence à 130 km/h = 140 mètres sans contrôle."
            ],
            color: "border-pink-600",
            bgBadge: "bg-pink-600 text-white",
            bgLight: "bg-pink-50"
          }
        ],
        quiz_section: {
          title: "🧪 Quiz de Sécurité",
          intro: "Vérifiez vos réflexes de survie.",
          questions: [
            {
              question: "Le conducteur est responsable des passagers non attachés s'ils ont :",
              options: ["Moins de 18 ans", "Moins de 10 ans", "Pas de permis", "Moins de 12 ans"],
              answer: 0,
              explanation: "Le conducteur est pénalement responsable du port de la ceinture pour tous les mineurs à bord."
            },
            {
              question: "Par temps de pluie, la distance de freinage est :",
              options: ["Identique", "Doublée", "Triplée", "Réduite"],
              answer: 1,
              explanation: "L'adhérence est divisée par deux sur sol mouillé, doublant ainsi la distance nécessaire pour s'arrêter."
            },
            {
              question: "Le pic de fatigue l'après-midi se situe entre :",
              options: ["12h-13h", "13h-15h", "15h-17h", "17h-19h"],
              answer: 1,
              explanation: "La phase de digestion entre 13h et 15h provoque une baisse naturelle de la vigilance."
            }
          ]
        },
        footer_title: "Ces règles sauvent des vies !",
        footer_desc: "Seul l'isolement permet de contrer l'hypovigilance."
      },
      alcool: {
        badge: "Module 08",
        label: "Zéro Tolérance",
        title: "Alcool, Drogues et Conduite",
        description: "L'alcool est le premier facteur destructeur sur la route. Maîtrisez les taux légaux.",
        sections: [
          {
            id: "limites",
            title: "1. Taux et Limites Légales",
            desc: "La justice est extrêmement ferme sur l'altération physique.",
            rules: [
              { title: "Novice (Probatoire)", text: "Limite 0,20 g/L de sang (soit ZÉRO VERRE). Un verre suffit à dépasser." },
              { title: "Expérimenté", text: "Limite 0,50 g/L de sang (~2 verres dose bar)." },
              { title: "Stupéfiants", text: "Tolérance ZÉRO. La moindre trace est un délit." },
              { title: "Élimination", text: "0,10 à 0,15 g/h. Rien n'accélère le processus." }
            ],
            examples: [
              "Jeune conducteur : un seul verre = positif.",
              "Refuser de souffler = délit le plus grave d'office."
            ],
            color: "border-purple-500",
            bgBadge: "bg-purple-500 text-white",
            bgLight: "bg-purple-50"
          },
          {
            id: "effets",
            title: "2. Effets sur la Conduite",
            desc: "Le cerveau perd la perception des risques.",
            rules: [
              { title: "Désinhibition", text: "Confiance illusoire, vitesse accrue, réflexes ralentis." },
              { title: "Champ visuel", text: "Vision 'tunnel' : on ne voit plus les côtés de la chaussée." },
              { title: "Drogues", text: "Désir de sommeil, mauvaise perception des distances." },
              { title: "Médicaments", text: "Vignette rouge (Niveau 3) = interdiction absolue de conduire." }
            ],
            examples: [
              "Alcool + Cannabis = risque mortel multiplié par 29.",
              "L'alcool rend l'œil très sensible à l'éblouissement."
            ],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "sanctions",
            title: "3. Sanctions",
            desc: "Des peines lourdes pour protéger la communauté.",
            rules: [
              { title: "Contravention", text: "0,5 à 0,79 g/L = 135€ et -6 points (permis annulé si novice)." },
              { title: "Délit", text: "Dès 0,80 g/L ou test drogue positif = Tribunal." },
              { title: "Peines pénales", text: "Prison, 4500€ d'amende, suspension/annulation du permis." },
              { title: "Confiscation", text: "Saisie définitive du véhicule possible en cas de récidive." }
            ],
            examples: [
              "Novice avec 6 points testé positif = Permis détruit immédiatement."
            ],
            color: "border-violet-600",
            bgBadge: "bg-violet-600 text-white",
            bgLight: "bg-violet-50"
          }
        ],
        quiz_section: {
          title: "🧪 Quiz Alcool & Drogues",
          intro: "Connaissez-vous les limites ?",
          questions: [
            {
              question: "Le taux limite pour un permis probatoire est de :",
              options: ["0,50 g/L", "0,80 g/L", "0,20 g/L", "0,00 g/L"],
              answer: 2,
              explanation: "Pour les novices, le seuil est fixé à 0,20 g/L, ce qui correspond pratiquement à zéro alcool."
            },
            {
              question: "L'alcool est éliminé par l'organisme à une vitesse de :",
              options: ["0,50 g/h", "0,15 g/h", "1,00 g/h", "0,01 g/h"],
              answer: 1,
              explanation: "Le corps élimine environ 0,10 à 0,15 g/L par heure. Rien ne peut accélérer ce processus."
            },
            {
              question: "Un médicament de niveau 3 (rouge) signifie :",
              options: ["Prudence", "Danger", "Interdiction de conduire", "Effet rapide"],
              answer: 2,
              explanation: "Le pictogramme rouge (Niveau 3) interdit formellement la conduite car les effets sont incompatibles avec la sécurité."
            }
          ]
        },
        footer_title: "Ces infractions sont impitoyables !",
        footer_desc: "Perdre 6 points en probatoire signifie repartir à zéro."
      },
      mecanique: {
        badge: "Module 09",
        label: "Contrôle Machine",
        title: "Mécanique et Entretien",
        description: "Comprendre quand votre machine va rompre et comment la maintenir en sécurité.",
        sections: [
          {
            id: "voyants",
            title: "1. Tableau de Bord et Voyants",
            desc: "Le système nerveux du véhicule via un code couleur.",
            rules: [
              { title: "Voyants Rouges", text: "ARRÊT IMMÉDIAT. Signal d'urgence (huile, freins, batterie)." },
              { title: "Voyants Oranges", text: "Avertissement : inspection rapide nécessaire (carburant, ESP)." },
              { title: "Verts / Bleus", text: "Information : feux allumés, régulateur actif." },
              { title: "Test contact", text: "Tous les voyants s'allument au contact pour vérification." }
            ],
            examples: [
              "Burette d'huile rouge = Couper le contact au plus vite.",
              "Pompe orange = Réserve de carburant (~50km)."
            ],
            color: "border-slate-500",
            bgBadge: "bg-slate-500 text-white",
            bgLight: "bg-slate-50"
          },
          {
            id: "entretien",
            title: "2. Sous le Capot",
            desc: "Vérifications de base pour la fiabilité.",
            rules: [
              { title: "Conditions", text: "À FROID et sur SOL PLAT pour ne pas fausser les jauges." },
              { title: "4 Liquides vitaux", text: "Huile, Frein, Refroidissement, Lave-glace." },
              { title: "Danger radiateur", text: "NE JAMAIS ouvrir à chaud (risque de geyser d'eau bouillante)." },
              { title: "Contrôle Technique", text: "1er contrôle avant les 4 ans, puis tous les 2 ans." }
            ],
            examples: [
              "Interdit de mettre de l'eau simple dans le lave-glace en hiver (gel)."
            ],
            color: "border-gray-600",
            bgBadge: "bg-gray-600 text-white",
            bgLight: "bg-gray-50"
          },
          {
            id: "pneus",
            title: "3. Les Pneus",
            desc: "L'unique contact avec la route.",
            rules: [
              { title: "Pression", text: "Vérifier à FROID tous les mois. Sur-gonfler pour l'autoroute." },
              { title: "Usure (TWI)", text: "Profondeur mini 1,6 mm. Témoin d'usure dans les rainures." },
              { title: "Emplacement", text: "Les pneus neufs se placent toujours à l'ARRIÈRE." },
              { title: "Hiver", text: "Loi Montagne : chaînes ou pneus hiver (3PMSF) obligatoires." }
            ],
            examples: [
              "Aquaplaning = pneu usé ne drainant plus l'eau (perte de contrôle)."
            ],
            color: "border-zinc-600",
            bgBadge: "bg-zinc-600 text-white",
            bgLight: "bg-zinc-50"
          }
        ],
        quiz_section: {
          title: "🧪 Quiz Mécanique",
          intro: "Maîtrisez votre véhicule.",
          questions: [
            {
              question: "Un voyant d'alerte rouge impose :",
              options: ["De continuer doucement", "L'arrêt immédiat", "Une révision annuelle", "De klaxonner"],
              answer: 1,
              explanation: "Le rouge indique une alerte critique mettant en danger la sécurité ou la vie du moteur."
            },
            {
              question: "Où place-t-on les pneus neufs ?",
              options: ["À l'avant", "À l'arrière", "Peu importe", "À droite uniquement"],
              answer: 1,
              explanation: "L'essieu arrière est celui que le conducteur contrôle le moins en cas de dérapage ; les meilleurs pneus y garantissent la stabilité."
            },
            {
              question: "Le témoin d'usure d'un pneu est de :",
              options: ["0,5 mm", "1,6 mm", "2,5 mm", "4,0 mm"],
              answer: 1,
              explanation: "La profondeur minimale légale des rainures est de 1,6 mm sur toute la circonférence."
            }
          ]
        },
        footer_title: "La mécanique est assimilée ?",
        footer_desc: "N'oubliez pas : les pneus neufs vont à l'arrière !"
      },
      eco_conduite: {
        badge: "Module 10",
        label: "Finances & Planète",
        title: "L'Éco-Conduite",
        description: "C'est une compétence lourdement évaluée de nos jours par l'État pour l'obtention du permis de conduire. L'éco-conduite n'est pas le fait de rouler excessivement lentement, mais celui de modifier ses habitudes d'anticipation et de gestion matérielle pour réduire le CO2 émis.",
        sections: [
          {
            id: "souple",
            title: "1. La Conduite Souple et Anticipée",
            desc: "Le style de conduite est responsable à près de 40% des variations de consommation.",
            rules: [
              { title: "Inertie", text: "Démarrage graduel et souple, pas de coups sur la pédale." },
              { title: "Frein Moteur", text: "Lever le pied tôt. L'injection se coupe, consommation 0." },
              { title: "Rapports", text: "Passer les vitesses tôt (2000 tr/min Diesel, 2500 Essence)." },
              { title: "Régulateur", text: "Fixe le régime moteur et évite les Nervous Boosts." }
            ],
            examples: [
              "120 km/h au lieu de 130 km/h = -1 L/100 km.",
              "Arrêt > 20s = Couper le contact."
            ],
            color: "border-green-500",
            bgBadge: "bg-green-500 text-white",
            bgLight: "bg-green-50"
          },
          {
            id: "facteurs",
            title: "2. Les Facteurs Externes",
            desc: "Votre voiture est aussi un mur face au vent.",
            rules: [
              { title: "Climatisation", text: "Surconsomme jusqu'à 20% en ville." },
              { title: "Aérodynamisme", text: "Retirer coffres et galeries dès que possible." },
              { title: "Fenêtres", text: "Fenêtre ouverte à 130 km/h = Parachute. Préférer la clim sur autoroute." },
              { title: "Poids", text: "Ne pas trimbaler de charges inutiles dans le coffre." }
            ],
            examples: [
              "Une galerie vide toute l'année coûte plusieurs pleins."
            ],
            color: "border-emerald-600",
            bgBadge: "bg-emerald-600 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "entretien_eco",
            title: "3. Le Lien avec l'Entretien",
            desc: "Une voiture mal entretenue est une voiture étouffée.",
            rules: [
              { title: "Pneus", text: "Sous-gonflage = friction énorme (+10% conso)." },
              { title: "Filtres", text: "Filtre encrassé = mauvaise explosion, plus d'essence injectée." },
              { title: "Huile", text: "Huile fatiguée = plus de frottements métalliques." }
            ],
            examples: [
              "L'inspecteur sanctionne si on tire trop sur la 1ère vitesse."
            ],
            color: "border-lime-600",
            bgBadge: "bg-lime-600 text-white",
            bgLight: "bg-lime-50"
          }
        ],
        quiz_section: {
          title: "🧪 Quiz Éco-Conduite",
          intro: "Roulez vert, roulez malin.",
          questions: [
            {
              question: "Le frein moteur permet une consommation de :",
              options: ["0 L/100 km", "1 L/100 km", "2 L/100 km", "0,5 L/100 km"],
              answer: 0,
              explanation: "Lorsque vous lâchez l'accélérateur avec une vitesse enclenchée, l'injection de carburant est totalement coupée."
            },
            {
              question: "À 130 km/h, il est plus économique de :",
              options: ["Ouvrir les fenêtres", "Mettre la clim", "Rouler sans phares", "Accélérer fort"],
              answer: 1,
              explanation: "À haute vitesse, la résistance à l'air des fenêtres ouvertes consomme plus que le fonctionnement de la climatisation."
            },
            {
              question: "Changer de rapport tôt (2000-2500 tr/min) permet de :",
              options: ["Abîmer le moteur", "Consommer moins", "Aller plus vite", "Polluer plus"],
              answer: 1,
              explanation: "Passer les vitesses rapidement permet de maintenir le moteur dans une plage de régime où il est le plus efficient."
            }
          ]
        },
        footer_title: "L'écologie en tête !",
        footer_desc: "L'éco-conduite est un point bonus ou malus décisif à l'examen pratique."
      },
      premiers_secours: {
        badge: "Module 11",
        label: "Survie Civile",
        title: "Premiers Secours (P.A.S)",
        description: "Le fameux P.A.S. (Protéger, Alerter, Secourir) est un triptyque civique intégral et obligatoire de formation.",
        sections: [
          {
            id: "proteger",
            title: "1. Protéger",
            desc: "Éviter le sur-accident avant d'approcher un corps.",
            rules: [
              { title: "Gilet Jaune", text: "À enfiler avant d'ouvrir la portière." },
              { title: "Signalisation", text: "Warnings + Triangle à 30m en amont." },
              { title: "Autoroute", text: "Triangle NON obligatoire si danger pour votre vie." },
              { title: "Victime", text: "Ne JAMAIS bouger un blessé (sauf incendie/noyade)." }
            ],
            examples: [
              "Sécuriser le passage AVANT d'approcher quiconque."
            ],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "alerter",
            title: "2. Alerter",
            desc: "Donner les bonnes infos aux bons services.",
            rules: [
              { title: "Bornes BAU", text: "Géo-localisation instantanée sur autoroute." },
              { title: "Numéros", text: "15 (SAMU), 18 (Pompiers), 17 (Police), 112 (Europe)." },
              { title: "Message", text: "Qui, Où précisément, Nature de l'accident, Nombre de victimes." },
              { title: "Raccrocher", text: "C'est l'opérateur qui raccroche en dernier." }
            ],
            examples: [
              "Ne pas couper l'appel brusquement sans certitude du lieu."
            ],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "secourir",
            title: "3. Secourir",
            desc: "Gestes vitaux en attendant les pros.",
            rules: [
              { title: "Parler/Couvrir", text: "Rassurer et lutter contre l'hypothermie (choc)." },
              { title: "Inconscient", text: "PLS (Position Latérale de Sécurité) si respire." },
              { title: "Hémorragie", text: "Compression locale forte et continue." },
              { title: "Interdits", text: "NE JAMAIS donner à boire/manger. Ne JAMAIS ôter le casque d'un motard." }
            ],
            examples: [
              "Refuser la soif à un blessé pour sa sécurité chirurgicale."
            ],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          }
        ],
        quiz_section: {
          title: "🧪 Quiz Premiers Secours",
          intro: "Sachez réagir en cas d'urgence.",
          questions: [
            {
              question: "L'ordre des actions en cas d'accident est :",
              options: ["Alerter, Secourir, Protéger", "Protéger, Alerter, Secourir", "Secourir, Protéger, Alerter", "Alerter, Protéger, Secourir"],
              answer: 1,
              explanation: "P.A.S : Il faut d'abord sécuriser la zone, puis prévenir les secours, et enfin s'occuper des victimes."
            },
            {
              question: "Le numéro d'urgence unique européen est le :",
              options: ["15", "18", "112", "17"],
              answer: 2,
              explanation: "Le 112 est accessible partout en Europe, même depuis un téléphone verrouillé."
            },
            {
              question: "Doit-on retirer le casque d'un motard ?",
              options: ["Oui, toujours", "Non, jamais (sauf urgence vitale)", "Seulement s'il a chaud", "Seulement s'il ne parle pas"],
              answer: 1,
              explanation: "Retirer le casque peut aggraver des lésions de la colonne vertébrale. On ne le fait qu'en cas de nécessité absolue (arrêt respiratoire)."
            }
          ]
        },
        footer_title: "Gestes mémorisés ?",
        footer_desc: "PAS : Protéger, Alerter, Secourir. L'ordre est immuable."
      },
      partage_route: {
        badge: "Module 12",
        label: "Vivre Ensemble",
        title: "Le Partage de la Route",
        description: "Responsabilité de l'automobiliste envers les usagers vulnérables (marcheurs et cyclistes).",
        sections: [
          {
            id: "pietons",
            title: "1. Les Piétons",
            desc: "Priorité juridique ultime face aux machines.",
            rules: [
              { title: "Intention", text: "Priorité dès qu'il manifeste l'intention de traverser (-6 points sinon)." },
              { title: "HORS passage", text: "Même s'il traverse n'importe où, il reste prioritaire." },
              { title: "Enfants", text: "Imprévisibles. Freiner immédiatement si ballon sur route." },
              { title: "Zone rencontre", text: "Vitesse 20 km/h, piétons prioritaires PARTOUT." }
            ],
            examples: [
              "Laisser un senior finir sa traversée, même si le feu repasse au vert."
            ],
            color: "border-blue-400",
            bgBadge: "bg-blue-400 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "cyclistes",
            title: "2. Les Cyclistes",
            desc: "Cohabitation entre bitume et pistes dédiées.",
            rules: [
              { title: "Écartement", text: "1m en ville, 1,5m hors-ville lors d'un dépassement." },
              { title: "Sas Vélo", text: "Interdit aux voitures (35€ d'amende)." },
              { title: "Bandes/Pistes", text: "Stationnement Très Gênant (-135€)." },
              { title: "Double sens", text: "Vélos peuvent arriver de face en Zone 30." }
            ],
            examples: [
              "Rester derrière un vélo si on ne peut pas laisser 1,5m."
            ],
            color: "border-emerald-500",
            bgBadge: "bg-emerald-500 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "deux_roues",
            title: "3. Les Deux-Roues",
            desc: "Invisibles et puissants.",
            rules: [
              { title: "Angle Mort", text: "Contrôle Direct (tourner la tête) indispensable." },
              { title: "Remontée", text: "Faciliter la remontée entre les deux voies de gauche." },
              { title: "Météo", text: "Moto très instable sous la pluie. Doubler la distance." },
              { title: "Feux Allumés", text: "Obligatoire de jour pour être dissocié du paysage." }
            ],
            examples: [
              "Ouverture 'à la Hollandaise' pour repérer un scooter."
            ],
            color: "border-slate-600",
            bgBadge: "bg-slate-600 text-white",
            bgLight: "bg-slate-50"
          }
        ],
        quiz_section: {
          title: "🧪 Quiz Partage de la Route",
          intro: "Respectez les plus vulnérables.",
          questions: [
            {
              question: "L'écart latéral pour dépasser un cycliste hors agglomération est de :",
              options: ["0,5 mètre", "1 mètre", "1,5 mètre", "2 mètres"],
              answer: 2,
              explanation: "Pour compenser l'effet de souffle et la vitesse, on laisse 1,5m hors ville (contre 1m en ville)."
            },
            {
              question: "Un piéton est prioritaire :",
              options: ["Seulement sur les passages", "Dès qu'il manifeste l'intention", "S'il court", "Jamais hors passage"],
              answer: 1,
              explanation: "Dès qu'un piéton montre qu'il veut traverser, le conducteur doit lui céder le passage sous peine de retrait de 6 points."
            },
            {
              question: "Le 'sas vélo' au feu rouge est ouvert aux :",
              options: ["Voitures", "Motos", "Cyclistes uniquement", "Bus"],
              answer: 2,
              explanation: "Le sas vélo est une zone réservée permettant aux cyclistes de démarrer en sécurité devant le flux automobile."
            }
          ]
        },
        footer_title: "Théorie finie !",
        footer_desc: "Vous avez maintenant validé les 12 modules de cours."
      },
    },
    exam: {
      title: "Examen Blanc",
      subtitle: "Conditions réelles - 30 minutes",
      rules_title: "Règles de la simulation",
      rules_1: "40 questions aléatoires",
      rules_2: "20 secondes par question",
      rules_3: "Zéro retour en arrière possible",
      rules_4: "Score de 35/40 requis pour réussir",
      start_btn: "Commencer l'examen",
      previous_btn: "Précédent",
      timer_label: "Temps restant",
      progress_label: "Question {current} sur {total}",
      next_btn: "Valider et continuer",
      finish_btn: "Terminer l'examen",
      confirm_finish: "Êtes-vous sûr de vouloir terminer l'examen ?",
      result_success: "Félicitations ! Examen réussi.",
      result_fail: "Examen échoué. Continuez vos efforts.",
      score_label: "Votre score",
      score_desc: "Pour réussir, il faut au minimum 35 bonnes réponses.",
      correction_title: "Correction détaillée",
      mistakes_title: "Analyse de vos erreurs fréquentes",
      mistake_cat_signalisation: "Signalisation : Révisez les formes et couleurs.",
      mistake_cat_priorites: "Priorités : Attention aux règles en intersection.",
      mistake_cat_vitesse: "Vitesse : Mémoire des limitations et distances.",
      mistake_cat_circulation: "Circulation : Placement et dépassements.",
      mistake_cat_securite: "Sécurité : Vigilance et distances de sécurité.",
      mistake_cat_alcool: "Alcool / Drogues : Les sanctions et limites.",
      mistake_cat_mecanique: "Mécanique : Les voyants et l'entretien.",
      mistake_cat_eco_conduite: "Éco-conduite : Optimisation de la consommation.",
      mistake_cat_premiers_secours: "Premiers Secours : Les gestes qui sauvent.",
      mistake_cat_partage_route: "Partage de la route : Usagers vulnérables.",
      your_answer: "Votre réponse",
      correct_answer: "Bonne réponse",
      explanation: "Explication",
      q_label: "Question {num}",
      questions: {
        q1: { q: "Quelle est la règle d'implantation d'un panneau de danger en agglomération ?", o: ["À l'endroit même du danger", "À environ 50 mètres avant", "À environ 150 mètres avant", "À 200 mètres avant"], exp: "En ville, la vitesse est réduite, donc 50 mètres suffisent pour réagir." },
        q2: { q: "Le panneau 'Circulation à double sens' est une exception car :", o: ["Il prend effet immédiatement", "Il est de forme carrée", "Il est toujours temporaire", "Il n'existe que sur autoroute"], exp: "C'est le seul panneau de danger qui n'est pas avancé de 50 ou 150m." },
        q3: { q: "Un panneau de forme ronde avec une bordure rouge et un fond blanc indique :", o: ["Une obligation", "Une interdiction", "Une indication", "Un danger"], exp: "Le cercle rouge est le symbole universel de l'interdiction au code." },
        q4: { q: "Le panneau STOP est de forme octogonale pour être reconnu :", o: ["Par les personnes daltoniennes", "Uniquement la nuit", "De loin par sa couleur", "Même s'il est recouvert de neige ou vu de dos"], exp: "Sa forme unique au monde permet une identification infaillible." },
        q5: { q: "Une ligne jaune continue sur le bord du trottoir signifie :", o: ["Stationnement autorisé", "Arrêt autorisé mais pas le stationnement", "Arrêt et stationnement interdits", "Zone de livraison uniquement"], exp: "La ligne jaune continue est une interdiction absolue d'immobilisation." },
        q6: { q: "Sur autoroute, les balises de virage sont de couleur :", o: ["Blanche avec un anneau rouge", "Bleue avec un anneau blanc", "Jaune", "Verte"], exp: "Les balises J1 sur autoroute sont bleues pour se détacher du décor." },
        q7: { q: "Que signifie un panneau carré bleu avec un liseré blanc ?", o: ["Une interdiction", "Une obligation", "Une indication ou un service", "Une fin de zone"], exp: "Le carré bleu informe les usagers sans imposer d'ordre strict." },
        q8: { q: "Un panonceau placé sous un panneau principal :", o: ["En annule l'effet", "En précise ou limite la portée", "S'applique uniquement aux camions", "Est facultatif"], exp: "Il donne des détails cruciaux (distance, catégorie de véhicule, etc.)." },
        q9: { q: "À une intersection sans aucune signalisation, la règle est :", o: ["La priorité à gauche", "La priorité à droite", "Le premier arrivé passe", "Celui qui va tout droit est prioritaire"], exp: "La priorité à droite s'applique par défaut dans le silence de la signalisation." },
        10: { q: "Le panneau 'Cédez le passage' impose-t-il l'arrêt s'il n'y a personne ?", o: ["Oui, toujours", "Non, l'arrêt n'est pas obligatoire si la voie est libre", "Seulement si la visibilité est mauvaise", "Seulement pour les conducteurs novices"], exp: "Contrairement au STOP, on peut passer sans s'arrêter si c'est dégagé." },
        q11: { q: "Un véhicule est dit 'prioritaire' seulement si :", o: ["Il est gros", "Il appartient à la police", "Il использует sa sirène ET son gyrophare bleu", "Il roule très vite"], exp: "Les avertisseurs spéciaux doivent être activés pour justifier la priorité." },
        q12: { q: "Dans un carrefour à sens giratoire, la priorité appartient à :", o: ["Ceux qui entrent dans l'anneau", "Ceux qui sont déjà engagés sur l'anneau", "Aux transports en commun", "À celui qui va le plus vite"], exp: "On cède le passage aux usagers venant de gauche déjà présents sur l'anneau." },
        q13: { q: "Face à un feu jaune fixe non clignotant, je dois :", o: ["Accélérer pour passer", "Passer si je suis déjà engagé", "M'arrêter sauf si l'arrêt présente un danger", "Klaxonner pour prévenir"], exp: "Le feu jaune impose l'arrêt, la sécurité prime sur la règle." },
        q14: { q: "Un agent de police vous fait face avec les bras en croix :", o: ["Cela équivaut à un feu vert", "Cela équivaut à un feu rouge", "Vous devez ralentir", "Vous devez faire demi-turn"], exp: "Le buste ou le dos de l'agent signifie l'arrêt pour tous les usagers concernés." },
        q15: { q: "L'immobilisation au panneau STOP doit durer :", o: ["Au moins 3 secondes", "Le temps de vérifier les deux côtés", "Les roues doivent être totalement figées", "Ce n'est pas nécessaire si personne n'arrive"], exp: "Peu importe la durée, c'est l'absence totale de mouvement qui compte." },
        q16: { q: "En sortant d'une allée privée ou d'un parking, je dois :", o: ["Avoir la priorité à droite", "Forcer le passage", "Céder le passage à tous les usagers sur la voie publique", "Passer si je mets mon clignotant"], exp: "Sortir d'un lieu privé ne donne aucun droit de priorité." },
        q17: { q: "Sur une route à double sens sans séparateur central, la limite par défaut est :", o: ["90 km/h", "80 km/h", "70 km/h", "100 km/h"], exp: "Cette mesure vise à réduire la violence des chocs frontaux." },
        q18: { q: "Dès le panneau d'entrée de ville, la vitesse est limitée à :", o: ["30 km/h", "40 km/h", "50 km/h", "70 km/h"], exp: "C'est la règle de base en agglomération pour protéger les piétons." },
        q19: { q: "Sur autoroute par temps de pluie, la limitation de 130 km/h passe à :", o: ["120 km/h", "110 km/h", "100 km/h", "90 km/h"], exp: "La vitesse doit être réduite pour limiter les risques d'aquaplaning." },
        q20: { q: "Par temps de brouillard (visibilité inférieure à 50m), la vitesse max partout est :", o: ["50 km/h", "70 km/h", "80 km/h", "30 km/h"], exp: "Il s'agit d'une limite de sécurité absolue sur tout le réseau routier." },
        q21: { q: "Le dépassement par la droite est exceptionnellement autorisé si :", o: ["Il y a un embouteillage", "Le véhicule devant tourne à gauche et a laissé la place", "Sur autoroute à 3 voies", "Pour les motos uniquement"], exp: "C'est le seul cas légal où l'on peut doubler par la droite." },
        q22: { q: "En montagne sur une route étroite, quel véhicule doit reculer ?", o: ["Le plus rapide", "Le plus léger face à un véhicule lourd", "Celui qui monte", "Celui qui a le plus d'expérience"], exp: "C'est une règle de maniabilité pour faciliter le croisement." },
        q23: { q: "La méthode RCA de changement de voie signifie :", o: ["Regarder, Contrôler, Avancer", "Rétroviseurs, Contrôle angle mort, Avertir", "Ralentir, Couper, Accélérer", "Réguler, Communiquer, Agir"], exp: "Cette séquence garantit que la manœuvre est vue et sécurisée." },
        q24: { q: "Actionner son clignotant donne-t-il la priorité ?", o: ["Oui", "Non, c'est une indication d'intention", "Seulement en ville", "Seulement pour les bus"], exp: "Le clignotant ne dispense jamais de vérifier si la voie est libre." },
        q25: { q: "Un conducteur vigilant met environ 1 seconde pour réagir. À 130 km/h, il parcourt :", o: ["13 mètres", "26 mètres", "39 mètres", "50 mètres"], exp: "Calcul rapide : 13 (dizaines) x 3 = 39 mètres parcourus en 1 seconde." },
        q26: { q: "Qui est pénalement responsable si un passager mineur n'est pas attaché ?", o: ["Le mineur", "Ses parents (même absents)", "Le conducteur du véhicule", "La police"], exp: "Le conducteur doit s'assurer que ses passagers de moins de 18 ans sont sécurisés." },
        q27: { q: "Quels sont les premiers signes de l'hypovigilance (fatigue) ?", o: ["Une envie de manger", "Des picotements dans les yeux et la nuque raide", "Une augmentation de la vitesse", "Une meilleure attention"], exp: "Le corps envoie des signaux physiques de fatigue qui ne doivent pas être ignorés." },
        q28: { q: "Sur autoroute, la distance de sécurité minimale est souvent visualisée par :", o: ["1 trait de la bande d'arrêt d'urgence", "2 traits de la bande d'arrêt d'urgence", "Le véhicule précédent", "3 traits"], exp: "Cette règle simple garantit environ 2 secondes d'espace vital." },
        q29: { q: "Le taux d'alcoolémie limite pour un conducteur en période probatoire est de :", o: ["0,5 g/l", "0,2 g/l", "0,8 g/l", "0,0 g/l"], exp: "C'est une tolérance quasi-nulle, un seul verre peut suffire pour être positif." },
        q30: { q: "Le mélange d'alcool et de cannabis multiplie le risque d'accident mortel par :", o: ["2", "10", "15", "29"], exp: "Le cocktail alcool + drogues est d'une dangerosité extrême par l'accumulation des effets." },
        q31: { q: "L'organisme élimine un verre standard (dose bar) en environ :", o: ["30 minutes", "1 heure", "2 heures", "5 heures"], exp: "L'élimination est lente et rien ne peut l'accélérer (café, eau, etc.)." },
        q32: { q: "Un voyant d'alerte rouge s'allume en roulant. Que faites-vous ?", o: ["Je continue jusqu'au garage", "Je ralentis", "Je m'arrête immédiatement en sécurité et coupe le moteur", "J'attends qu'il s'éteigne"], exp: "Le rouge indique une panne mettant en jeu la sécurité ou la vie du moteur." },
        q33: { q: "La pression des pneus doit être vérifiée idéalement :", o: ["Toutes les semaines", "Une fois par mois et avant un long trajet, à froid", "Tous les ans lors du contrôle technique", "Uniquement s'ils ont l'air dégonflés"], exp: "Un pneu bien gonflé garantit adhérence et économie de carburant." },
        q34: { q: "Où должен-on placer deux pneus neufs sur une voiture ?", o: ["À l'avant pour mieux diriger", "À l'arrière pour une meilleure stabilité", "Un à droite, un à gauche", "Peu importe"], exp: "L'essieu arrière est celui que le conducteur contrôle le moins en dérapage." },
        q35: { q: "En éco-conduite, il est conseillé de passer la vitesse supérieure vers :", o: ["1500 tr/min", "2500 tr/min (essence) / 2000 tr/min (diesel)", "4000 tr/min", "Quand on attend le rupteur"], exp: "Changer de rapport tôt permet de rester dans une zone de consommation minimale." },
        q36: { q: "Utiliser le 'frein moteur' plutôt que la pédale de frein permet :", o: ["De consommer plus", "De consommer 0 litre de carburant", "De polluer davantage", "D'aller plus vite"], exp: "En relâchant l'accélérateur, l'injection de carburant est totalement coupée." },
        q37: { q: "Quelle est la première action à effectuer sur les lieux d'un accident ?", o: ["Appeler le 112", "Secourir les victimes", "Protéger la zone pour éviter un sur-accident", "Prendre les coordonnées des témoins"], exp: "P.A.S : Protéger, Alerter, Secourir. La protection est la priorité absolue." },
        q38: { q: "Quel est le numéro d'appel d'urgence unique européen ?", o: ["15", "17", "18", "112"], exp: "Le 112 est accessible gratuitement partout en Europe, même sans réseau de son opérateur." },
        q39: { q: "Hors agglomération, quel intervalle latéral laisser pour dépasser un vélo ?", o: ["0,5 mètre", "1 mètre", "1,5 mètre", "2 mètres"], exp: "On laisse plus d'espace à cause de la vitesse et des turbulences d'air." },
        q40: { q: "Face à un tramway en circulation en ville, celui-ci :", o: ["Doit respecter la priorité à droite", "Est prioritaire dans la quasi-totalité des cas", "Doit vous laisser passer", "S'arrête toujours aux passages piétons"], exp: "Le tramway, de par sa masse et son inertie, est le roi de la priorité urbaine." }
      },
      saving_results: "Sauvegarde de vos résultats...",
      success_title: "Félicitations !",
      fail_title: "Entraînement Requis",
      retry_btn: "Refaire un test",
      review_errors: "Revoir mes erreurs",
      dashboard_btn: "Mon Espace",
      back_to_results: "Retour aux résultats",
      analysis_title: "Analyse de vos {count} erreurs",
      no_answer: "Aucune (Temps écoulé)",
      media_question_fallback: "Média Question",
      shortcuts_label: "Raccourcis clavier :",
      key_enter: "Entrée",
      validate_btn: "Valider"
    },
    chatbot: {
      welcome: "Bonjour ! Je suis votre assistant \"Le Volant Pour Tous\". Avez-vous des questions sur le permis ou le code de la route ?",
      placeholder: "Posez votre question...",
      assistant_title: "Assistant LVPT",
      online: "En ligne",
      fallback: "Je suis désolé, je n'ai pas bien compris. Pourriez-vous reformuler votre question concernant le code de la route ou le permis ?",
      responses: {
        bonjour: "Bonjour ! Comment puis-je vous aider avec votre apprentissage de la conduite aujourd'hui ?",
        prix: "Nos formules Permis B commencent à partir de 650€. Les stages de code intensifs sont à 250€. Souhaitez-vous voir le détail ?",
        code: "L'examen du code de la route comporte 40 questions. Vous devez obtenir au moins 35 bonnes réponses. Pratiquez avec nos quiz !",
        permis: "La formation pratique légale est d'au moins 20 heures de conduite sur boîte manuelle, ou 13h sur boîte automatique.",
        auto_ecole: "Nous avons plusieurs auto-écoles partenaires. Vous pouvez consulter la page 'Auto-écoles' pour trouver la plus proche de chez vous sur la carte."
      }
    },
    auth: {
      login: "Connexion",
      logout: "Déconnexion",
      email: "Adresse Email",
      password: "Mot de passe",
      name: "Nom ou Pseudo",
      loading_login: "Chargement...",
      loading_register: "Création...",
      btn_login: "Allumer le moteur",
      btn_register: "Rejoindre l'équipage",
      no_account: "Pas encore de compte ?",
      have_account: "Déjà un compte ?",
      register: "S'inscrire",
      error_credentials: "Email ou mot de passe incorrect.",
      error_generic: "Une erreur est survenue.",
      error_network: "Erreur de connexion au serveur."
    },
    dashboard: {
      welcome: "Bonjour, {name} 🚀",
      subtitle: "Prêt pour votre prochaine session d'entraînement ?",
      completed: "Complété",
      resume_title: "Reprendre l'apprentissage",
      resume_btn: "Continuer l'entraînement",
      latest_exams: "Derniers Examens",
      no_exams: "Aucun examen passé pour l'instant.",
      exam_title: "Test Blanc #{number}",
      start_test: "Lancer un test",
      volant_ready: "VolantReady™",
      volant_ready_desc: "Chances de réussite",
      ready_status_learning: "Apprentissage",
      ready_status_medium: "En progression",
      ready_status_excellent: "Feu Vert ! Prêt",
    },
    avis: {
      title: "Avis de nos élèves",
      subtitle: "Découvrez les retours d'expérience et témoignages de nos pilotes.",
      leave_review: "Laisser un avis",
      name: "Votre nom",
      rating: "Note globale",
      message: "Votre message",
      placeholder: "Partagez votre expérience avec nous...",
      send: "Envoyer l'avis",
      latest: "Derniers avis",
      just_now: "À l'instant"
    },
    jeu: {
      back_to_hub: "Retour au Hub",
      choose_training: "Choisissez votre entraînement.",
      play: "Jouer",
      sign_master_desc: "Entraînez vos réflexes visuels sur les panneaux de signalisation. Glissez-déposez le plus vite possible !",
      esquive_route_desc: "Évitez les obstacles sur une autoroute infinie. Entraînez votre anticipation.",
      sign_master: {
        intro: "Testez vos réflexes sur les panneaux de signalisation. Glissez-les sur la bonne réponse. Vous avez 60 secondes !",
        insert_coin: "Insérer un jeton",
        score: "Score",
        combo: "Combo",
        time: "Temps",
        drag_instruction: "Glissez le panneau vers sa définition",
        sign_stop: "Arrêt obligatoire (STOP)",
        sign_no_parking: "Interdiction de stationner",
        quit_game: "Quitter la partie"
      },
      esquive_route: {
        distance: "Distance : {score}m",
        crash: "Crash !",
        driving: "Conduite",
        final_score: "Score final : {score}m",
        replay: "Rejouer",
        controls_instruction: "Utilisez les flèches ← et → ou les boutons"
      }
    },
    situations: {
      title: "Mises en Situation",
      subtitle: "Faites face aux scénarios réels de l'examen comme si vous y étiez !",
      progress: "Scénario {current} sur {total}",
      question_title: "La Situation",
      question_ask: "Votre décision :",
      btn_validate: "Valider la réponse",
      correct: "Bonne réponse ! 🎉",
      incorrect: "Mauvaise réponse... ❌",
      explanation_title: "💡 L'explication de l'examinateur :",
      btn_next: "Scénario Suivant",
      btn_finish: "Recommencer la session",
      score_title: "Bilan des Mises en Situation",
      score_desc: "Vous avez complété tous les scénarios de conduite.",
      score_result: "Votre score final : {score} / {total}",
      feedback_excellent: "Excellent ! Vous maîtrisez parfaitement les situations complexes. 🏆",
      feedback_medium: "Pas mal ! Encore quelques révisions des règles de base pour être prêt. 📚",
      feedback_low: "Attention, plusieurs situations critiques ont été mal gérées. Révisez vos cours ! ⚠️",
      list: [
        {
          situation: "Vous circulez sur une route de nuit sans éclairage public. Vous rattrapez un usager roulant très lentement. Vous souhaitez le dépasser. Un véhicule arrive loin en face.",
          question: "Quelle précaution est absolument indispensable pour ne pas éblouir et garantir la sécurité ?",
          o1: "Je passe immédiatement en feux de route pour mieux voir la route pendant le dépassement.",
          o2: "Je reste en feux de croisement pour ne pas éblouir, et je ne passe en feux de route qu'au moment où je suis à sa hauteur.",
          o3: "Je klaxonne avant d'entamer la manœuvre pour prévenir de mon arrivée.",
          o4: "J'allume mes feux de détresse durant toute la manœuvre de dépassement.",
          exp: "Les feux de route éblouiraient l'usager dépassé dans son rétroviseur s'ils sont mis trop tôt, et l'usager arrivant en face s'il y en a un. On garde les feux de croisement et on repasse en feux de route à hauteur de sa cabine."
        },
        {
          situation: "Vous approchez d'un passage à niveau. Le feu rouge clignote et la barrière commence à descendre, mais le train n'est pas encore visible.",
          question: "Que devez-vous faire immédiatement ?",
          o1: "J'accélère pour passer rapidement avant que la barrière ne se ferme complètement.",
          o2: "Je m'arrête obligatoirement avant le feu rouge clignotant.",
          o3: "Je m'arrête uniquement si la barrière est totalement horizontale.",
          o4: "Je klaxonne pour avertir le train de ma présence.",
          exp: "Le feu rouge clignotant impose l'arrêt ABSOLU et immédiat. Il est formellement interdit de s'engager dès que le signal lumineux s'active, sous peine de sanctions très lourdes (délit de classe 4)."
        },
        {
          situation: "Vous montez à bord du véhicule. Vous devez régler votre poste de conduite avant de démarrer.",
          question: "Dans quel ordre chronologique effectuez-vous ces opérations obligatoirement ?",
          o1: "Rétroviseurs, siège, ceinture de sécurité.",
          o2: "Siège, rétroviseurs, ceinture de sécurité.",
          o3: "Ceinture de sécurité, siège, rétroviseurs.",
          o4: "Rétroviseurs, ceinture de sécurité, siège.",
          exp: "La règle d'or mnémotechnique est Siège, Rétroviseurs, Ceinture. On règle d'abord l'assise et le dossier du Siège, ensuite on ajuste les Rétroviseurs (qui dépendent de la position des yeux), et enfin on met la Ceinture (qui bloque certains mouvements)."
        },
        {
          situation: "Vous circulez dans un tunnel à double sens de circulation. Le véhicule devant vous s'arrête brusquement à cause d'un incident mécanique.",
          question: "Quelle est la règle essentielle de sécurité routière à respecter immédiatement ?",
          o1: "Je me colle le plus près possible du véhicule devant pour libérer de l'espace derrière.",
          o2: "Je m'arrête à au moins 150 mètres du véhicule.",
          o3: "Je m'arrête en laissant un intervalle de sécurité suffisant (les deux diodes bleues de sécurité visibles au sol) et je coupe mon moteur.",
          o4: "Je fais marche arrière immédiatement pour sortir du tunnel.",
          exp: "En tunnel, la distance de sécurité minimale doit être maintenue même à l'arrêt pour éviter la propagation d'incendies. Couper le moteur limite la concentration de gaz toxiques."
        }
      ]
    }
  },
  ru: {
    nav: {
      home: "Главная",
      courses: "Курсы",
      schools: "Автошколы",
      reviews: "Отзывы",
      contact: "Контакты",
      quiz: "Викторина",
      exam: "Экзамен",
      situations: "Ситуации",
      more: "Ещё",
    },
    ui: {
      welcome: "Добро пожаловать",
      contact: "Контакт",
      search: "Поиск",
      back_to_modules: "К модулям",
      next_module: "Модуль {number}",
      prev_module: "Модуль {number}",
      key_rules: "Ключевые правила",
      concrete_examples: "Примеры",
      practical_cases: "На практике",
      resolution_schema: "Схема решения",
    },
    home: {
      title: "Le Volant pour Tous",
      title_1: "Le Volant",
      title_2: "Pour Tous",
      subtitle: "Новое поколение",
      beginner: "Новичок",
      beginner_desc: "Вы никогда не водили или только начинаете обучение.",
      intermediate: "Средний",
      intermediate_desc: "Вы знаете основы и хотите улучшить знания знаков.",
      advanced: "Профи",
      advanced_desc: "Вы готовы к экзамену и хотите разобрать сложные ситуации.",
      welcome_badge: "Добро пожаловать в современную эпоху",
      cta_start: "Начать приключение",
      cta_more: "Узнать больше",
      choose_level: "Выберите ваш уровень",
      level_subtitle: "Мы адаптируем наши курсы под ваш опыт.",
      selected: "Выбрано",
      access_courses: "Перейти к курсам",
      why_us: "Почему мы?",
      simple_learning: "Простое обучение",
      interactive_courses: "Интерактивные курсы",
      interactive_desc: "Погрузитесь в 3D ситуации и квизы для легкой сдачи на права.",
      school_loc: "Найдите вашу автошколу",
      school_desc: "Интерактивная карта с лучшими автошколами региона.",
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Есть вопросы? Наша команда поможет вам на пути к успеху.",
      form_name: "Полное имя",
      form_email: "Email адрес",
      form_subject: "Тема",
      form_message: "Ваше сообщение",
      form_submit: "Отправить сообщение",
      info_title: "Наши контакты",
      info_address: "123 Avenue du Permis, 75000 Paris",
      info_phone: "+33 1 23 45 67 89",
      info_email: "contact@levolantpourtous.fr",
      success: "Сообщение отправлено успешно!",
      error: "Произошла ошибка. Пожалуйста, попробуйте снова."
    },
    auto_ecole: {
      title: "Найдите идеальную автошколу",
      subtitle: "Ищите, сравнивайте и связывайтесь с лучшими...",
      placeholder: "Местоположение (напр: Париж, Лион...)",
      search: "Поиск",
      suggestions: "Популярные варианты:",
      map_title: "Школы поблизости",
      detailed_view: "Подробный вид",
      ready_find: "Готовы найти идеальную автошколу?",
      ready_desc: "Введите название города выше, чтобы увидеть доступные варианты.",
      found: "автошкол найдено в",
      price_label: "ОТ",
      details: "Подробнее",
      not_found: "Автошколы не найдены для",
      reset: "Новый поиск",
      loading: "Загрузка карты автошкол..."
    },
    quiz: {
      question_progress: "Вопрос",
      see_score: "Посмотреть результат",
      next_question: "Следующий вопрос",
      finished: "Викторина завершена!",
      perfect: "Поздравляем! Ни одной ошибки!",
      good: "Отлично! Продолжайте заниматься для закрепления.",
      restart: "Начать заново",
      correct: "Верно",
      wrong: "Неверно",
      save_progress_title: "Сохраните ваш прогресс",
      save_progress_desc: "Создайте бесплатный аккаунт, чтобы сохранять свои результаты и разблокировать пробный экзамен в реальных условиях.",
      create_account: "Создать аккаунт",
      score_label: "Счет",
      wrong_answer: "Неверный ответ",
      explication_label: "Пояснение",
      correction_label: "Исправление",
      title: "Проверьте свои знания",
      subtitle: "Выберите модуль, чтобы начать интенсивную тренировку.",
      start: "Начать",
      quit: "Выйти из викторины",
      q1: {
        q: "Какова минимальная дистанция безопасности на трассе при 130 км/ч?",
        o1: "2 полосы аварийной остановки",
        o2: "1 полоса аварийной остановки",
        o3: "50 метров",
        o4: "100 метров"
      },
      q2: {
        q: "Что означает круглый красный знак с белой горизонтальной полосой?",
        o1: "Остановка",
        o2: "Уступить дорогу",
        o3: "Въезд запрещен",
        o4: "Поворот направо"
      },
      q3: {
        q: "Допустимый уровень алкоголя для начинающего водителя?",
        o1: "0.2 г/л",
        o2: "0.5 г/л",
        o3: "0.8 г/л",
        o4: "0.1 г/л"
      },
      q4: {
        q: "Если пешеход стоит на переходе, я должен:",
        o1: "Посигналить",
        o2: "Ускориться",
        o3: "Остановиться и пропустить",
        o4: "Проехать, если он далеко"
      },
      modules: {
        signalisation: [
          { q: "Какова форма знака опасности?", o1: "Круглая", o2: "Квадратная", o3: "Треугольная", o4: "Восьмиугольная", ans: 2, exp: "Предупреждающие знаки опасности имеют треугольную форму с красной окантовкой." },
          { q: "Что означает круглый знак с красной окантовкой?", o1: "Опасность", o2: "Запрет", o3: "Предписание (обязательство)", o4: "Информационный знак", ans: 1, exp: "Красный круг указывает на немедленный запрет." },
          { q: "Какого цвета временный знак дорожных работ?", o1: "Белый", o2: "Синий", o3: "Желтый", o4: "Зеленый", ans: 2, exp: "Желтый цвет используется для временных знаков на дорожных работах." },
          { q: "Что означает круглый синий знак?", o1: "Предписание (обязательство)", o2: "Указание", o3: "Информация", o4: "Приоритет", ans: 0, exp: "Синий круг навязывает участникам дорожного движения определенное обязательство." },
          { q: "Где устанавливается знак опасности вне населенного пункта?", o1: "за 50м", o2: "за 100м", o3: "за 150м", o4: "На самом месте", ans: 2, exp: "Вне города предупреждение устанавливается за 150 метров из-за более высокой скорости движения." },
          { q: "Какого цвета знак «Въезд запрещен» (кирпич)?", o1: "Синий с белым", o2: "Красный с белым", o3: "Желтый", o4: "Красный с черным", ans: 1, exp: "Он круглый, красный с белой горизонтальной полосой." },
          { q: "Что означает квадратный синий знак?", o1: "Обязательство", o2: "Указание/Сервис", o3: "Опасность", o4: "Запрет", ans: 1, exp: "Квадратная форма указывает на услуги или полезную дорожную информацию." },
          { q: "Сколько сторон у знака СТОП?", o1: "4", o2: "6", o3: "8", o4: "10", ans: 2, exp: "Он восьмиугольный (8 сторон), чтобы его можно было распознать даже с обратной стороны или если он занесен снегом." },
          { q: "Сплошная желтая линия у края тротуара означает:", o1: "Остановка разрешена", o2: "Стоянка разрешена", o3: "Остановка и стоянка запрещены", o4: "Зона дорожных работ", ans: 2, exp: "Сплошная желтая линия запрещает любую остановку или стоянку транспортного средства." },
          { q: "Знак «Конец всех ограничений» представляет собой:", o1: "Круг с красной чертой", o2: "Круг с синей чертой", o3: "Белый круг с черной диагональной полосой", o4: "Зеленый круг", ans: 2, exp: "Это белый диск, перечеркнутый черной диагональной линией." },
          { q: "Перечеркнутый знак приоритета (желтый ромб) означает:", o1: "Конец главной дороги", o2: "Абсолютный приоритет", o3: "Опасный перекресток", o4: "Поворот", ans: 0, exp: "Черная полоса отмечает конец приоритетного характера дороги." },
          { q: "Дополнительные таблички (panonceaux) размещаются:", o1: "Над основным знаком", o2: "Рядом со знаком", o3: "Под основным знаком", o4: "За 10 метров до знака", ans: 2, exp: "Они уточняют или ограничивают действие основного знака, расположенного выше." },
        ],
        priorites: [
            { q: "Кто имеет приоритет на перекрестке без знаков?", o1: "Тот, кто слева", o2: "Тот, кто справа", o3: "Самый быстрый", o4: "Тот, кто едет прямо", ans: 1, exp: "Помеха справа — правило по умолчанию при отсутствии знаков." },
            { q: "Обязательна ли остановка при знаке «Уступи дорогу»?", o1: "Да, всегда", o2: "Нет, если дорога свободна", o3: "Только ночью", o4: "Только при полиции", ans: 1, exp: "Остановка нужна лишь в случае, если приближаются другие машины." },
            { q: "Приоритетный транспорт считается в миссии, если:", o1: "Включены фары", o2: "Включен поворотник", o3: "Сирена и синий маячок", o4: "Машина красного цвета", ans: 2, exp: "Оба сигнала (звуковой и световой) должны быть включены." },
            { q: "На круговом движении (roundabout) приоритет у:", o1: "Въезжающего", o2: "Того, кто уже на кругу", o3: "Крупного транспорта", o4: "Никого", ans: 1, exp: "Нужно уступать тем, кто уже движется по кольцу слева от вас." },
            { q: "При горящем желтом сигнале светофора я должен:", o1: "Ускориться", o2: "Остановиться", o3: "Проехать осторожно", o4: "Посигналить", ans: 1, exp: "Желтый свет требует остановки, если это безопасно." },
            { q: "Полицейский спиной к вам означает:", o1: "Можно ехать", o2: "Замедлиться", o3: "Остановиться", o4: "Приоритет справа", ans: 2, exp: "Спина или грудь регулировщика приравниваются к красному свету." },
            { q: "На знаке STOP минимальное время остановки?", o1: "Не останавливаюсь", o2: "Время проверки", o3: "Минимум 3 секунды", o4: "Полная фиксация колес", ans: 3, exp: "Закон требует полной неподвижности автомобиля перед выездом." },
            { q: "Я выезжаю с грунтовой дороги, я должен:", o1: "Проехать быстро", o2: "Уступить всем", o3: "Помеха справа", o4: "Посигналить", ans: 1, exp: "Выезд с частных территорий или грунта никогда не дает приоритета." },
            { q: "Две машины напротив друг друга поворачивают налево:", o1: "Объезжают друг друга сзади", o2: "Проезжают друг перед другом", o3: "Быстрый первый", o4: "Остановка", ans: 1, exp: "Это «индонезийский» разъезд для лучшей видимости." },
            { q: "Дает ли поворотник право преимущества?", o1: "Да", o2: "Нет", o3: "Только на трассе", o4: "Только в городе", ans: 1, exp: "Это лишь сигнал о намерении, он не изменяет правила приоритета." },
            { q: "В горах, кто сдает назад при невозможности разъезда?", o1: "Тяжелый", o2: "Более легкий", o3: "Тот, кто едет вверх", o4: "Одиночная машина перед группой", ans: 1, exp: "Более маневренное (легкое) авто должно облегчить путь тяжелому." },
            { q: "Мигающий зеленый свет означает:", o1: "Ускориться", o2: "Не существует во Франции", o3: "Поломка", o4: "Для пешеходов", ans: 1, exp: "Во Франции зеленый свет не мигает (в отличие от некоторых других стран)." },
        ],
        regles: [
            { q: "Макс. скорость на трассе в хорошую погоду?", o1: "110 км/ч", o2: "120 км/ч", o3: "130 км/ч", o4: "150 км/ч", ans: 2, exp: "Это стандартный лимит для опытных водителей." },
            { q: "Лимит алкоголя для молодого водителя?", o1: "0,2 г/л", o2: "0,5 г/л", o3: "0,8 г/л", o4: "0,0 г/л", ans: 0, exp: "Одного бокала достаточно, чтобы превысить этот порог." },
            { q: "Дистанция безопасности должна быть минимум:", o1: "1 сек", o2: "2 сек", o3: "3 сек", o4: "10 метров", ans: 1, exp: "Правило 2 секунд дает время среагировать на маневр впереди." },
            { q: "Штраф за использование телефона в руках:", o1: "1 балл", o2: "2 балла", o3: "3 балла", o4: "6 баллов", ans: 2, exp: "Это серьезное нарушение: -3 балла и штраф 135 евро." },
            { q: "На автостраде мы едем:", o1: "Посередине", o2: "Слева", o3: "Справа", o4: "Где хотим", ans: 2, exp: "Обязанность — всегда двигаться в крайней правой полосе." },
            { q: "Ремень безопасности обязателен:", o1: "Только спереди", o2: "Только сзади", o3: "Для всех пассажиров", o4: "Только вне города", ans: 2, exp: "Все в машине должны быть пристегнуты для защиты при столкновении." },
            { q: "Тех. осмотр новой машины через:", o1: "2 года", o2: "4 года", o3: "5 лет", o4: "10 лет", ans: 1, exp: "Первый осмотр в течение полугода до 4-й годовщины покупки." },
            { q: "Красный индикатор на панели означает:", o1: "Замедлиться", o2: "Немедленная остановка", o3: "Заехать в гараж позже", o4: "Проверить шины", ans: 1, exp: "Красный цвет сообщает о критической поломке или угрозе безопасности." },
            { q: "В дождь лимит 130 км/ч снижается до:", o1: "120 км/ч", o2: "110 км/ч", o3: "100 км/ч", o4: "90 км/ч", ans: 1, exp: "Все скоростные лимиты снижаются при осадках." },
            { q: "Опережение справа разрешено, если:", o1: "Машина впереди поворачивает налево", o2: "Я спешу", o3: "3 полосы", o4: "На трассе", ans: 0, exp: "Это единственное легальное исключение из правила обгона слева." },
            { q: "Ночью в освещенном городе едем с:", o1: "Дальним светом", o2: "Габаритами", o3: "Ближним светом", o4: "Противотуманками", ans: 2, exp: "Ближний свет (или габариты, если очень светло) — чтобы видеть и быть видимым." },
            { q: "Эко-вождение снижает расход топлива на:", o1: "5%", o2: "15%", o3: "50%", o4: "0%", ans: 1, exp: "Плавное вождение значительно экономит топливо." },
        ],
        vitesse: [
            { q: "Макс. скорость на дороге без разделителя?", o1: "90 км/ч", o2: "80 км/ч", o3: "70 км/ч", o4: "100 км/ч", ans: 1, exp: "С 2018 года стандарт — 80 км/ч для снижения смертности." },
            { q: "Ограничение скорости в городе по умолчанию:", o1: "30 км/ч", o2: "40 км/ч", o3: "50 км/ч", o4: "70 км/ч", ans: 2, exp: "Это стандарт, если нет знаков 'Зона 30'." },
            { q: "На трассе в дождь лимит снижается до:", o1: "130 км/ч", o2: "110 км/ч", o3: "100 км/ч", o4: "90 км/ч", ans: 1, exp: "В дождь сцепление хуже, поэтому лимит ниже." },
            { q: "Превышение скорости на 50+ км/ч это:", o1: "Мелкий штраф", o2: "Преступление (délit)", o3: "Несерьезно", o4: "Предупреждение", ans: 1, exp: "Это тяжкое нарушение с риском лишения прав." },
            { q: "В жилой зоне (zone de rencontre) скорость:", o1: "10 км/ч", o2: "20 км/ч", o3: "30 км/ч", o4: "50 км/ч", ans: 1, exp: "Пешеходы здесь имеют абсолютный приоритет." },
            { q: "Лимит на трассе для начинающего водителя:", o1: "80 км/ч", o2: "90 км/ч", o3: "100 км/ч", o4: "110 км/ч", ans: 0, exp: "Для новичков действуют более строгие ограничения." },
            { q: "Камера (радар) может фиксировать:", o1: "Только спереди", o2: "Только сзади", o3: "С любой стороны", o4: "Только грузовики", ans: 2, exp: "Современные камеры контролируют оба направления." },
            { q: "С ростом скорости поле зрения:", o1: "Растет", o2: "Сужается", o3: "Не меняется", o4: "Четче", ans: 1, exp: "Эффект туннеля — мозг фокусируется только на центре." },
            { q: "Двойная скорость = тормозной путь больше в:", o1: "2 раза", o2: "4 раза", o3: "3 раза", o4: "8 раз", ans: 1, exp: "Тормозной путь растет пропорционально квадрату скорости." },
            { q: "В тумане (видимость < 50м) макс. скорость:", o1: "50 км/ч", o2: "70 км/ч", o3: "80 км/ч", o4: "90 км/ч", ans: 0, exp: "Это правило безопасности на всех типах дорог." },
            { q: "На скоростной дороге (accès réglementé) лимит:", o1: "110 км/ч", o2: "130 км/ч", o3: "90 км/ч", o4: "100 км/ч", ans: 0, exp: "110 км/ч в хорошую погоду, 100 км/ч в дождь." },
            { q: "Лимитер скорости помогает:", o1: "Поддерживать скорость", o2: "Не превышать заданную скорость", o3: "Тормозить сам", o4: "В городе", ans: 1, exp: "Он не дает нажать газ сильнее установленного предела." },
        ],
        stationnement: [
            { q: "Синяя разметка на земле означает:", o1: "Бесплатная парковка", o2: "Платная парковка", o3: "Синяя зона (диск)", o4: "Стоянка запрещена", ans: 2, exp: "Нужно положить стояночный диск (disque) под стекло." },
            { q: "Стоянка на инвалидном месте без карты это:", o1: "Можно на 5 мин", o2: "Только ночью", o3: "Тяжкое нарушение", o4: "Если водитель внутри", ans: 2, exp: "Штраф 135 евро за «очень мешающую» парковку." },
            { q: "Стоянка вторым рядом:", o1: "Разрешена", o2: "Разрешена для погрузки", o3: "Запрещена и мешает", o4: "С аварийкой можно", ans: 2, exp: "Это мешает движению и создает опасность." },
            { q: "На дороге с двусторонним движением парковка:", o1: "Строго справа", o2: "Слева", o3: "С любой стороны", o4: "Елочкой", ans: 0, exp: "Вы должны ставить машину по направлению движения." },
            { q: "Сплошная желтая линия у бордюра:", o1: "Остановка ок", o2: "Парковка ок", o3: "Все запрещено", o4: "Для доставки", ans: 2, exp: "Сплошная желтая линия — это строгий запрет на остановку." },
            { q: "Для парковки на склоне нужно:", o1: "Включить передачу", o2: "Вывернуть колеса к бордюру", o3: "И передачу, и колеса", o4: "Аварийку", ans: 2, exp: "Это страховка на случай отказа ручного тормоза." },
            { q: "Остановка (arrêt) позволяет:", o1: "Поспать", o2: "Быстро высадить пассажира", o3: "Сходить в магазин", o4: "Весь день стоять", ans: 1, exp: "Это кратковременная иммобилизация без ухода водителя." },
            { q: "Парковка у гидранта:", o1: "Разрешена", o2: "Мешает (gênant)", o3: "Только в городе", o4: "Неважно", ans: 1, exp: "Это запрещено, так как блокирует доступ пожарным." },
            { q: "Стоянка '1-15' числа:", o1: "Четная сторона", o2: "Нечетная сторона", o3: "Слева", o4: "Справа", ans: 1, exp: "Стороны меняются в зависимости от даты." },
            { q: "Парковка на тротуаре:", o1: "Всегда запрещена без разметки", o2: "Если есть 1м", o3: "В городе можно", o4: "Ночью можно", ans: 0, exp: "Тротуары — только для пешеходов." },
            { q: "Паркомат (horodateur) нужен для:", o1: "Замера скорости", o2: "Оплаты парковки", o3: "Вызова помощи", o4: "Зарядки", ans: 1, exp: "Это терминал для оплаты стоянки в городе." },
            { q: "Стоянка на мосту считается:", o1: "Разрешенной", o2: "Мешающей", o3: "Опасной", o4: "При поломке норм", ans: 2, exp: "Это опасно, так как закрывает обзор и сужает проезд." },
        ],
        autoroute: [
            { q: "На полосе разгона (insertion) я должен:", o1: "Остановиться в конце", o2: "Разогнаться до скорости потока", o3: "Вклиниться силой", o4: "Посигналить", ans: 1, exp: "Нужно сравнять скорость с машинами на трассе для безопасного въезда." },
            { q: "Мин. скорость в крайней левой полосе:", o1: "60 км/ч", o2: "70 км/ч", o3: "80 км/ч", o4: "90 км/ч", ans: 2, exp: "На свободной трассе нельзя ехать медленнее 80 км/ч слева." },
            { q: "При поломке на трассе используйте:", o1: "Оранжевый телефон (борн)", o2: "Только мобильный", o3: "Автостоп", o4: "Задний ход", ans: 0, exp: "Борн позволяет спасателям точно найти вас." },
            { q: "Сдавать назад на трассе:", o1: "Можно, если пропустил съезд", o2: "Запрещено и смертельно опасно", o3: "На полосе аварийки можно", o4: "Ночью можно", ans: 1, exp: "Это главная причина аварий на автобанах." },
            { q: "Полоса BAU (аварийка) служит для:", o1: "Звонка по телефону", o2: "Отдыха", o3: "Поломки или срочной мед. помощи", o4: "Обгона справа", ans: 2, exp: "Ее нельзя занимать без веской причины." },
            { q: "Знак 'T' на пункте оплаты (péage) это:", o1: "Грузовики", o2: "Абоненты Télépéage", o3: "Такси", o4: "Все", ans: 1, exp: "Для быстрого проезда со специальным датчиком." },
            { q: "Безопасная дистанция (ориентир):", o1: "1 полоса BAU", o2: "2 полосы BAU", o3: "10 метров", o4: "50 метров", ans: 1, exp: "За городом правило '2 черты' — залог безопасности." },
            { q: "Зеленая стрелка над полосой:", o1: "Дорога закрыта", o2: "Полоса открыта", o3: "Камера рядом", o4: "Съезд скоро", ans: 1, exp: "Она разрешает движение по данной полосе." },
            { q: "Левая полоса используется:", o1: "Всегда для скорости", o2: "Только для обгона", o3: "Только для автобусов", o4: "В пробках", ans: 1, exp: "Запрещено постоянно ехать слева, если правая свободна." },
            { q: "Перед съездом нужно тормозить:", o1: "На основной трассе", o2: "На полосе торможения (décélération)", o3: "Ручником", o4: "В повороте", ans: 1, exp: "Начинайте тормозить только после выезда с основной полосы." },
            { q: "Резкое торможение потока впереди:", o1: "Уйти на BAU", o2: "Разворот", o3: "Включить аварийку", o4: "Гудеть", ans: 2, exp: "Это предупредит едущих сзади о пробке." },
            { q: "Зоны отдыха расположены каждые:", o1: "10 км", o2: "20 км", o3: "50 км", o4: "100 км", ans: 1, exp: "Отдых 15 мин каждые 2 часа — правило выживания." },
        ],
        securite: [
          { q: "Каково среднее время реакции бдительного водителя?", o1: "0,5 секунды", o2: "1 секунда", o3: "2 секунды", o4: "3 секунды", ans: 1, exp: "Среднее время реакции составляет одну секунду. Оно может увеличиваться при усталости или алкогольном опьянении." },
          { q: "Какое расстояние проезжает машина на скорости 90 км/ч за время реакции (1 с)?", o1: "15 метров", o2: "27 метров", o3: "45 метров", o4: "90 метров", ans: 1, exp: "Подсказка: умножьте первую цифру скорости на 3 (9 x 3 = 27 метров)." },
          { q: "В городе минимальный боковой интервал безопасности при обгоне велосипедиста составляет:", o1: "0,5 метра", o2: "1 метр", o3: "1,5 метра", o4: "2 метра", ans: 1, exp: "В населенном пункте необходимо оставлять боковой интервал не менее 1 метра." },
          { q: "Во сколько раз увеличивается кинетическая энергия при удвоении скорости?", o1: "В 2 раза", o2: "В 3 раза", o3: "В 4 раза", o4: "В 8 раз", ans: 2, exp: "Кинетическая энергия увеличивается пропорционально квадрату скорости (2 x 2 = 4)." },
          { q: "У уставшего водителя поле зрения:", o1: "Расширяется", o2: "Остается прежним", o3: "Сужается", o4: "Становится более четким", ans: 2, exp: "Усталость снижает бдительность и сужает боковое восприятие (эффект туннельного зрения)." },
          { q: "Для чего в первую очередь служит система ABS?", o1: "Сократить тормозной путь", o2: "Предотвратить блокировку колес", o3: "Ускоряться быстрее", o4: "Снизить расход топлива", ans: 1, exp: "ABS предотвращает блокировку колес, позволяя сохранять контроль над траекторией при экстренном торможении." },
          { q: "На скорости 130 км/ч на шоссе угол поля зрения составляет примерно:", o1: "180°", o2: "100°", o3: "30°", o4: "10°", ans: 2, exp: "Чем выше скорость, тем дальше концентрируется взгляд, что сильно уменьшает периферийное зрение (эффект туннеля)." },
          { q: "На мокром покрытии тормозной путь автомобиля:", o1: "Остается прежним", o2: "Сокращается вдвое", o3: "Удваивается", o4: "Утраивается", ans: 2, exp: "Сцепление колес с дорогой снижается вдвое, поэтому тормозной путь удваивается." },
          { q: "Ремень безопасности обязателен к использованию:", o1: "Только на передних сиденьях", o2: "Только вне населенных пунктов", o3: "Для всех пассажиров без исключения", o4: "Кроме коротких поездок", ans: 2, exp: "Ремень безопасности обязаны использовать все находящиеся в автомобиле люди на любых дорогах." },
          { q: "Слепая (мертвая) зона — это область:", o1: "Освещаемая фарами", o2: "Видимая в зеркала заднего вида", o3: "Не просматриваемая в зеркала заднего вида", o4: "Запрещенная для пешеходов", ans: 2, exp: "Необходимо повернуть голову для прямой проверки слепых зон перед любым перестроением." },
          { q: "Ребенок в возрасте до 10 лет должен перевозиться:", o1: "На коленях у взрослого", o2: "Обязательно на переднем сиденье", o3: "В специальном сертифицированном детском кресле сзади", o4: "Без ремня в черте города", ans: 2, exp: "Для безопасности детей требуется использование специального удерживающего устройства, подходящего под их рост и вес." },
          { q: "Две линии разметки полосы аварийной остановки служат для:", o1: "Декора дороги", o2: "Контроля правильной скорости", o3: "Контроля безопасной дистанции", o4: "Помощи при парковке", ans: 2, exp: "Это визуальный ориентир: на скорости 130 км/ч безопасная дистанция должна составлять не менее 2 линий разметки." },
        ],
        alcool: [
          { q: "Каков максимально допустимый уровень алкоголя для начинающего водителя?", o1: "0,2 г/л крови", o2: "0,5 г/л крови", o3: "0,8 г/л крови", o4: "0 г/л крови", ans: 0, exp: "Для водителей на испытательном сроке лимит составляет 0,2 г/л (фактически 0 бокалов)." },
          { q: "Один стандартный бокал алкоголя в баре повышает уровень алкоголя в крови примерно на:", o1: "0,10 г/л", o2: "0,20 - 0,25 г/л", o3: "0,50 г/л", o4: "0,80 г/л", ans: 1, exp: "Одна порция алкоголя в баре соответствует примерно 0,20–0,25 г/л в крови." },
          { q: "С какой средней скоростью алкоголь выводится из организма?", o1: "0,10 - 0,15 г/л в час", o2: "0,50 г/л в час", o3: "1 г/л в час", o4: "Мгновенно", ans: 0, exp: "Печень выводит алкоголь медленно. Никакие средства (кофе, вода и т.д.) не могут ускорить этот процесс." },
          { q: "Употребление наркотических веществ (каннабис и т.д.) за рулем:", o1: "Разрешено при медленной езде", o2: "Допускается по выходным", o3: "Строго запрещено для водителя", o4: "Законно для пассажиров", ans: 2, exp: "Тестирование на наркотики является обязательным при авариях или серьезных нарушениях ПДД." },
          { q: "Смешивание алкоголя и наркотических веществ увеличивает риск аварии со смертельным исходом в:", o1: "2 раза", o2: "5 раз", o3: "10 раз", o4: "29 раз", ans: 3, exp: "Сочетание алкоголя и каннабиса чрезвычайно опасно и лавинообразно увеличивает риски." },
          { q: "Лекарство с красным значком (уровень 3) на упаковке означает:", o1: "Осторожность при вождении", o2: "Необходима консультация врача", o3: "Опасность: управление автомобилем запрещено", o4: "Безопасный препарат", ans: 2, exp: "Уровень 3 налагает строгий запрет на управление транспортным средством во время приема препарата." },
          { q: "К какому основному эффекту приводит употребление алкоголя водителем?", o1: "Улучшение зрения", o2: "Переоценка своих сил и склонность к риску", o3: "Мгновенная усталость", o4: "Сильная жажда", ans: 1, exp: "Алкоголь искажает оценку ситуации: водителю кажется, что он контролирует дорогу лучше, хотя его способности сильно снижены." },
          { q: "Отказ от прохождения медицинского освидетельствования на алкоголь влечет за собой:", o1: "Отсутствие наказания", o2: "Обычный штраф", o3: "Те же наказания, что и при подтвержденном опьянении", o4: "Предупреждение", ans: 2, exp: "Отказ от теста является правонарушением, карающимся лишением баллов, приостановкой прав и крупным штрафом." },
          { q: "Управление машиной после бессонной ночи так же опасно, как вождение с уровнем алкоголя:", o1: "0,5 г/л", o2: "0,2 г/л", o3: "1,5 г/л", o4: "Абсолютно безопасно", ans: 0, exp: "Недостаток сна оказывает влияние на время реакции, аналогичное воздействию алкоголя в дозе 0,5 г/л." },
          { q: "Наличие алкотестера в каждом автомобиле во Франции является:", o1: "Обязательным (хотя штраф отменен)", o2: "Ложью, это не нужно", o3: "Обязательным только для грузовиков", o4: "Обязательным только ночью", ans: 0, exp: "Хотя штраф за отсутствие тестера был отменен, настоятельно рекомендуется иметь его для самоконтроля." },
          { q: "Пьяный водитель воспринимает свет фар и фонарей как:", o1: "Более четкий", o2: "Более мелкий", o3: "Ослепляющий и расплывчатый", o4: "Исчезающий", ans: 2, exp: "Алкоголь нарушает зрительное восприятие и способность справляться со слепящим светом и контрастами." },
          { q: "При уровне алкоголя 0,5 г/л (законный предел во Франции) риск аварии:", o1: "Снижается вдвое", o2: "Не меняется", o3: "Удваивается", o4: "Увеличивается в 10 раз", ans: 2, exp: "Уже при достижении этого порога когнитивные способности снижаются, а риск ДТП удваивается." },
        ],
        mecanique: [
          { q: "Красный индикатор на приборной панели требует:", o1: "Замедлить движение", o2: "Немедленно остановиться в безопасном месте", o3: "Обратиться в автосервис в течение недели", o4: "Включить дальний свет", ans: 1, exp: "Обычно красный цвет указывает на серьезную опасность для двигателя или безопасность движения." },
          { q: "Давление в шинах предпочтительно проверять:", o1: "На горячих шинах (после 50 км)", o2: "На холодных шинах (или проехав менее 3 км)", o3: "Раз в год", o4: "Только в случае прокола", ans: 1, exp: "Давление измеряется на холодных шинах, чтобы получить точные показания (при нагреве воздух расширяется)." },
          { q: "Уровень моторного масла проверяется:", o1: "При работающем двигателе", o2: "При холодном двигателе на ровной поверхности", o3: "Раз в 10 лет", o4: "Во время движения", ans: 1, exp: "Необходимо, чтобы масло стекло в картер, а автомобиль находился на строго горизонтальной поверхности." },
          { q: "Законный предел износа протектора шин составляет:", o1: "0,5 мм", o2: "1,6 мм", o3: "3 мм", o4: "5 мм", ans: 1, exp: "Если глубина протектора составляет менее 1,6 мм над индикаторами износа, эксплуатация шины запрещена законом." },
          { q: "Где предпочтительнее устанавливать новые шины?", o1: "Спереди", o2: "Сзади", o3: "Справа", o4: "Слева", ans: 1, exp: "Установка новых шин на заднюю ось обеспечивает лучшую курсовую устойчивость при торможении или в поворотах." },
          { q: "Крышку бачка охлаждающей жидкости никогда нельзя открывать при горячем двигателе:", o1: "Верно, высок риск серьезных ожогов", o2: "Неверно, это безопасно", o3: "Только зимой", o4: "Только на старых машинах", ans: 0, exp: "Система находится под высоким давлением и очень горячая; открытие может вызвать выброс обжигающего пара." },
          { q: "Для чего служит генератор переменного тока (альтернатор)?", o1: "Приведения машины в движение", o2: "Подзарядки аккумулятора во время вождения", o3: "Охлаждения двигателя", o4: "Переключения передач", ans: 1, exp: "Он преобразует энергию работающего двигателя в электричество для питания сети автомобиля и зарядки АКБ." },
          { q: "Чтобы проверить уровень тормозной жидкости, я смотрю на:", o1: "Под машину", o2: "Прозрачный бачок под капотом", o3: "Внутреннюю сторону шин", o4: "Выхлопную трубу", ans: 1, exp: "Уровень должен находиться строго между отметками 'Mini' and 'Maxi' на прозрачном бачке." },
          { q: "ESP — это система, которая позволяет:", o1: "Тормозить сильнее", o2: "Контролировать траекторию при заносе", o3: "Снижать выбросы", o4: "Увеличивать скорость", ans: 1, exp: "Она помогает водителю сохранять контроль над автомобилем при потере сцепления колес с дорогой." },
          { q: "В случае прокола колеса я должен использовать:", o1: "Ремонтный герметик или запасное колесо", o2: "Клейкую ленту (скотч)", o3: "Ничего, можно ехать на ободе", o4: "Теплую воду", ans: 0, exp: "Для безопасности движения необходимо заменить колесо или использовать временный ремкомплект." },
          { q: "Зимняя стеклоомывающая жидкость должна содержать:", o1: "Газированную воду", o2: "Незамерзающие компоненты (антифриз)", o3: "Оливковое масло", o4: "Хозяйственное мыло", ans: 1, exp: "Антифриз предотвращает замерзание жидкости, которое может повредить насос или трубки омывателя." },
          { q: "Оранжевый индикатор на панели обычно указывает на:", o1: "Немедленную опасность", o2: "Неисправность, требующую скорой проверки", o3: "Что все в порядке", o4: "Включенные фары", ans: 1, exp: "Оранжевый цвет предупреждает о необходимости проверки, тогда как красный сообщает о критической неисправности." },
        ],
        eco_conduite: [
          { q: "Каков наилучший способ начать движение для экономии топлива?", o1: "Прогревать двигатель 5 минут на месте", o2: "Начать движение сразу, соблюдая умеренный темп", o3: "Делать сильные перегазовки", o4: "Ждать, пока погаснет синий индикатор", ans: 1, exp: "Двигатель прогревается быстрее и эффективнее в движении на умеренной скорости, чем на холостом ходу." },
          { q: "На каких оборотах двигателя рекомендуется переходить на повышенную передачу (Бензин)?", o1: "1500 об/мин", o2: "2500 об/мин", o3: "4000 об/мин", o4: "При отсечке", ans: 1, exp: "Для бензинового двигателя оптимальная точка — 2500 об/мин, для дизельного — около 2000 об/мин." },
          { q: "Использование торможения двигателем позволяет тратить:", o1: "0 литров на 100 км", o2: "2 литра на 100 км", o3: "Столько же, сколько на холостом ходу", o4: "Больше, чем при обычном торможении", ans: 0, exp: "При отпускании педали газа с включенной передачей подача топлива полностью прекращается." },
          { q: "Снижение скорости на шоссе со 130 до 120 км/ч позволяет сэкономить около:", o1: "0,1 л/100 км", o2: "1 л/100 км", o3: "5 л/100 км", o4: "Ничего не экономит", ans: 1, exp: "Это существенная экономия топлива при минимальной потере времени." },
          { q: "Сниженное давление в шинах приводит к перерасходу топлива на:", o1: "2%", o2: "10%", o3: "25%", o4: "50%", ans: 1, exp: "Сопротивление качению увеличивается, заставляя двигатель работать с большей нагрузкой." },
          { q: "Что экономичнее делать на шоссе при скорости 130 км/ч?", o1: "Открыть окна", o2: "Включить кондиционер", o3: "Выключить фары", o4: "Ехать на нейтральной передаче", ans: 1, exp: "На высокой скорости аэродинамическое сопротивление от открытых окон увеличивает расход сильнее, чем работа кондиционера." },
          { q: "Оставленный на крыше пустой багажный бокс:", o1: "Ни на что не влияет", o2: "Увеличивает расход на 10-15%", o3: "Улучшает аэродинамику", o4: "Экономит топливо", ans: 1, exp: "Необходимо снимать багажники и боксы с крыши сразу же, когда они не используются." },
          { q: "В городе использование кондиционера увеличивает расход топлива на:", o1: "5%", o2: "10%", o3: "20 - 25%", o4: "50%", ans: 2, exp: "На низких скоростях работа компрессора кондиционера сильно нагружает двигатель." },
          { q: "Система Stop & Start полезна при остановках длительностью более:", o1: "1 секунды", o2: "20 секунд", o3: "2 минут", o4: "Только в вечернее время", ans: 1, exp: "Сэкономленная энергия превышает количество, необходимое для повторного запуска двигателя после 20 секунд простоя." },
          { q: "Быстрый переход на повышенные (5-ю и 6-ю) передачи:", o1: "Портит двигатель", o2: "Увеличивает выбросы", o3: "Снижает расход топлива", o4: "Запрещен", ans: 2, exp: "Чем выше передача, тем ниже обороты двигателя, что снижает расход." },
          { q: "Автомобиль с лишним грузом в 100 кг расходует больше топлива:", o1: "Столько же", o2: "Меньше", o3: "Больше", o4: "Только при езде в гору", ans: 2, exp: "Вес — враг экономии, особенно при разгонах автомобиля." },
          { q: "Эко-вождение также помогает уменьшить:", o1: "Расходы на обслуживание (шины, тормоза)", o2: "Время в пути", o3: "Стоимость страховки", o4: "Количество баллов", ans: 0, exp: "Плавный стиль вождения снижает износ тормозных колодок и протектора шин." },
        ],
        premiers_secours: [
          { q: "Каково самое первое действие при прибытии на место ДТП?", o1: "Вызвать экстренные службы", o2: "Обезопасить место происшествия", o3: "Извлечь пострадавших", o4: "Сделать фотографию", ans: 1, exp: "Необходимо предотвратить повторное столкновение, обозначив зону (аварийка, жилет, знак)." },
          { q: "Знак аварийной остановки должен быть установлен на расстоянии примерно:", o1: "10 метров", o2: "30 метров", o3: "100 метров", o4: "500 метров", ans: 1, exp: "Минимум 30 метров, чтобы быть заблаговременно заметным для других водителей." },
          { q: "Какой единый европейский номер вызова экстренных служб?", o1: "15", o2: "17", o3: "18", o4: "112", ans: 3, exp: "Номер 112 работает по всей Европе, даже при заблокированном телефоне." },
          { q: "Если пострадавший без сознания, но дышит, я кладу его в:", o1: "Сидячее положение", o2: "Боковое стабильное положение (PLS)", o3: "На живот", o4: "Не трогаю его", ans: 1, exp: "Боковое положение (PLS) обеспечивает свободное прохождение дыхательных путей и предотвращает удушье." },
          { q: "При сильном внешнем кровотечении я должен:", o1: "Дать попить", o2: "Наложить прямое давление на рану", o3: "Сразу сделать жгут", o4: "Промыть водой", ans: 1, exp: "Следует сильно прижать источник кровотечения рукой через чистую ткань." },
          { q: "Нужно ли снимать шлем с пострадавшего мотоциклиста?", o1: "Да, чтобы он мог дышать", o2: "Нет, кроме случаев крайней необходимости", o3: "Только по его просьбе", o4: "Всегда", ans: 1, exp: "Снятие шлема может усугубить травму шейного отдела позвоночника." },
          { q: "При серьезном ожоге у пострадавшего я должен:", o1: "Нанести масло", o2: "Поливать прохладной водой в течение длительного времени", o3: "Проколоть пузыри", o4: "Наложить тугую повязку", ans: 1, exp: "Вода охлаждает обожженную область и останавливает распространение термического повреждения." },
          { q: "Непрямой массаж сердца должен выполняться с частотой:", o1: "30 нажатий в минуту", o2: "60 нажатий в минуту", o3: "100 - 120 нажатий в минуту", o4: "500 нажатий в минуту", ans: 2, exp: "Это частота, необходимая для поддержания искусственного кровообращения." },
          { q: "Можно ли давать воду пострадавшему в ДТП?", o1: "Да, если просит", o2: "Только простую воду", o3: "Никогда", o4: "Если в сознании", ans: 2, exp: "Прием воды может осложнить последующее хирургическое вмешательство или вызвать рвоту." },
          { q: "Использование АНД (автоматического дефибриллятора) разрешено:", o1: "Только врачам", o2: "Только пожарным", o3: "Любому человеку, ставшему свидетелем остановки сердца", o4: "Только полиции", ans: 2, exp: "Прибор полностью автоматический и дает голосовые инструкции спасателю." },
          { q: "Какая информация является САМОЙ важной при вызове экстренных служб?", o1: "Цвет автомобилей", o2: "Точное местоположение происшествия", o3: "Моя фамилия", o4: "Время моей встречи", ans: 1, exp: "Без точных координат бригады спасателей не смогут прибыть на помощь." },
          { q: "Если пострадавший находится в шоковом состоянии, я должен:", o1: "Помочь ему идти", o2: "Укрыть и успокоить его", o3: "Потрясти его", o4: "Не обращать внимания", ans: 1, exp: "Необходимо предотвратить переохлаждение и оказывать психологическую поддержку." },
        ],
        partage_route: [
          { q: "Вне населенного пункта какой боковой интервал нужно оставить при обгоне велосипеда?", o1: "0,5 метра", o2: "1 метр", o3: "1,5 метра", o4: "3 метра", ans: 2, exp: "По закону это 1 м в городе и 1,5 м вне города из-за аэродинамического воздействия." },
          { q: "«Велосипедный шлюз» (зона) перед светофором зарезервирован для:", o1: "Спешащих автомобилей", o2: "Исключительно велосипедистов", o3: "Мотоциклов", o4: "Автобусов", ans: 1, exp: "Он позволяет велосипедистам стоять впереди, быть заметными и не вдыхать выхлопные газы." },
          { q: "Пешеход выражает намерение перейти дорогу вне пешеходного перехода:", o1: "Я проезжаю первым", o2: "Я сигналю", o3: "Я обязан уступить ему дорогу", o4: "Я игнорирую его", ans: 2, exp: "Водитель обязан уступить дорогу пешеходу, если тот уже начал движение или явно выражает намерение сделать это." },
          { q: "Слепые зоны у большегрузного автомобиля (грузовика) находятся:", o1: "Только сзади", o2: "Спереди, сзади и по бокам", o3: "Только слева", o4: "У него их нет", ans: 1, exp: "У водителя грузовика огромные невидимые сектора; критически важно не находиться в них." },
          { q: "В «зоне встреч» (жилой зоне) скорость ограничена до:", o1: "10 км/ч", o2: "20 км/ч", o3: "30 км/ч", o4: "50 км/ч", ans: 1, exp: "Пешеходы имеют приоритет движения по всей ширине дороги (кроме путей трамвая)." },
          { q: "Перед тем как открыть дверцу автомобиля для выхода, я должен:", o1: "Сразу открыть ее", o2: "Проверить зеркало и слепую зону", o3: "Посигналить перед выходом", o4: "Посмотреть на тротуар", ans: 1, exp: "Это необходимо, чтобы случайно не сбить велосипедиста, приближающегося сзади." },
          { q: "Имеет ли право велосипедист двигаться по левой стороне своей полосы в городе?", o1: "Никогда", o2: "Да, чтобы отдалиться от открывающихся дверей машин", o3: "Только при быстрой езде", o4: "Нет, это запрещено", ans: 1, exp: "Это разрешено (и рекомендуется), чтобы избежать столкновения с открывающимися дверьми припаркованных авто." },
          { q: "Дети считаются наиболее уязвимыми участниками движения, потому что:", o1: "Они быстро бегают", o2: "Они невысокого роста и непредсказуемы", o3: "У них тяжелые рюкзаки", o4: "Они шумят", ans: 1, exp: "Их поле зрения ограничено, и они не умеют правильно оценивать расстояние и скорость машин." },
          { q: "Когда автобус начинает движение от обозначенной остановки в городе:", o1: "Я проезжаю вперед него", o2: "Я обязан содействовать его выезду", o3: "Я сигналю", o4: "Я игнорирую его", ans: 1, exp: "Водители обязаны уступать общественному транспорту, отъезжающему от остановочного пункта в городе." },
          { q: "Электросамокаты (EDPM) имеют законное право двигаться:", o1: "По тротуарам", o2: "По велодорожкам и проезжей части", o3: "Только в парках", o4: "Везде", ans: 1, exp: "Движение на любых моторизованных средствах по тротуарам категорически запрещено." },
          { q: "При взаимодействии с трамваем я должен:", o1: "Иметь преимущество", o2: "Уступать ему дорогу практически во всех случаях", o3: "Обгонять его только справа", o4: "Увеличить скорость", ans: 1, exp: "Трамвай всегда имеет безусловный приоритет из-за своей массы и длинного тормозного пути." },
          { q: "Ночью велосипедист в обязательном порядке должен иметь:", o1: "Светоотражающий жилет вне населенного пункта", o2: "Закрытый мотошлем", o3: "Золотой звонок на руле", o4: "Противотуманную фару", ans: 0, exp: "Жилет необходим в темное время суток (или при плохой видимости) вне черты города." },
        ],
      }
    },
    cours: {
      global_title: "Наши учебные модули",
      global_subtitle: "Изучайте ПДД легко",
      btn_view: "Смотреть курс",
      footer_ready: "Готовы к тесту?",
      modules_list: {
        m1_title: "Дорожные знаки", m1_desc: "Разбор знаков, разметки и сигналов светофора.",
        m2_title: "Приоритеты и перекрестки", m2_desc: "Правила проезда (помеха справа, Стоп, Уступи).",
        m3_title: "Правила движения", m3_desc: "Расположение на дороге, разъезды и обгоны.",
        m4_title: "Скорость и ограничения", m4_desc: "Адаптация скорости под погодные условия и зоны.",
        m5_title: "Парковка и остановка", m5_desc: "Различия и запретные зоны для стоянки.",
        m6_title: "Магистрали и автобаны", m6_desc: "Въезд, движение на высоких скоростях и выезд.",
        m7_title: "Безопасность движения", m7_desc: "Дистанции, время реакции и бдительность.",
        m8_title: "Алкоголь и вождение", m8_desc: "Лимиты, санкции и влияние на реакцию.",
        m9_title: "Механика и уход", m9_desc: "Система индикаторов и базовые проверки.",
        m10_title: "Эко-вождение", m10_desc: "Экономия топлива и бережная эксплуатация.",
        m11_title: "Первая помощь", m11_desc: "Порядок действий при аварии (PAS).",
        m12_title: "Общая дорога", m12_desc: "Взаимодействие с пешеходами и велосипедистами."
      },
      signalisation: {
        badge: "Модуль 1",
        label: "Сигнализация",
        title: "Дорожные знаки и разметка",
        description: "Понимание и соблюдение визуальных кодов дороги для безопасного вождения.",
        footer_title: "Освойте знаки",
        footer_desc: "Вы изучили основы дорожной сигнализации. Готовы к следующему шагу?",
        btn_test: "Тест по знакам",
        sections: [
          {
            id: "objectif",
            title: "🎯 ЦЕЛЬ",
            desc: "Дорожная сигнализация позволяет организовать общественное пространство.",
            rules: [
              { title: "Роли", text: "Информирование пользователей, предотвращение опасностей, организация движения и установление правил." },
              { title: "Золотое правило", text: "Ее соблюдение ОБЯЗАТЕЛЬНО без исключений." }
            ],
            examples: ["Информировать", "Предотвращать", "Организовывать", "Обязывать"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "danger",
            title: "1. Предупреждающие знаки",
            desc: "Они предупреждают о предстоящей опасности, позволяя водителю подготовиться.",
            rules: [
              { title: "Характеристики", text: "Треугольная форма, красная окантовка, белый фон." },
              { title: "Поведение", text: "Адаптировать скорость и быть готовым к немедленной реакции." }
            ],
            examples: ["Опасный поворот", "Скользкая дорога", "Пешеходный переход", "Работы", "Опасный перекресток"],
            color: "border-red-500",
            bgBadge: "bg-red-500 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "obligation",
            title: "2. Предписывающие знаки",
            desc: "Они навязывают конкретное поведение, которое необходимо соблюдать обязательно.",
            rules: [
              { title: "Характеристики", text: "Круглая форма, синий фон." },
              { title: "Правило", text: "Вы ДОЛЖНЫ следовать указанию под угрозой санкций." }
            ],
            examples: ["Поворот направо", "Велосипедная дорожка", "Цепи противоскольжения"],
            color: "border-blue-600",
            bgBadge: "bg-blue-600 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "interdiction",
            title: "3. Запрещающие знаки",
            desc: "Они указывают на то, что запрещено делать, начиная от места установки знака.",
            rules: [
              { title: "Характеристики", text: "Круглая форма, красная окантовка, белый фон." },
              { title: "Правило", text: "Любое нарушение наказуемо (штраф, баллы)." }
            ],
            examples: ["Въезд запрещен", "Ограничение скорости", "Обгон запрещен"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "indication",
            title: "4. Информационные знаки",
            desc: "Они служат для предоставления полезной информации для вождения.",
            rules: [
              { title: "Характеристики", text: "Квадратная или прямоугольная форма, синий фон." },
              { title: "Роль", text: "Облегчение поездки и поиск услуг." }
            ],
            examples: ["Парковка", "Больница", "Автомагистраль", "Заправочная станция"],
            color: "border-sky-500",
            bgBadge: "bg-sky-500 text-white",
            bgLight: "bg-sky-50"
          },
          {
            id: "direction",
            title: "5. Знаки направления",
            desc: "Они направляют водителей к пункту назначения.",
            rules: [
              { title: "Цвета", text: "Синий (магистраль), Зеленый (крупные города), Белый (местный уровень)." },
              { title: "Польза", text: "Подготовка к изменению направления (маршруты, съезды)." }
            ],
            examples: ["Направления городов", "Маршруты", "Съезды"],
            color: "border-emerald-500",
            bgBadge: "bg-emerald-500 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "touristique",
            title: "6. Туристические знаки",
            desc: "Они указывают на места культурного или природного интереса.",
            rules: [
              { title: "Характеристики", text: "Коричневый фон, прямоугольная форма." }
            ],
            examples: ["Памятники архитектуры", "Природные парки", "Туристические объекты"],
            color: "border-amber-700",
            bgBadge: "bg-amber-700 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "temporaire",
            title: "7. Временные знаки",
            desc: "Они указывают на временные изменения на дороге.",
            rules: [
              { title: "Характеристики", text: "Желтый фон." },
              { title: "Приоритет", text: "Они ПРИОРИТЕТНЕЕ постоянных знаков." }
            ],
            examples: ["Работы", "Объезд", "Стройка"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-gray-900",
            bgLight: "bg-yellow-50"
          },
          {
            id: "marquage",
            title: "8. Дорожная разметка",
            desc: "Горизонтальная сигнализация имеет ту же ценность, что и знаки.",
            rules: [
              { title: "Типы", text: "Сплошные линии (запрещено), прерывистые (разрешено), стрелки, переходы." },
              { title: "Санкции", text: "Нарушение разметки является серьезным правонарушением." }
            ],
            examples: ["Сплошная линия", "Зебра", "Направляющая стрелка"],
            color: "border-gray-400",
            bgBadge: "bg-gray-400 text-white",
            bgLight: "bg-gray-50"
          },
          {
            id: "feux",
            title: "9. Светофоры",
            desc: "Они регулируют движение на перекрестках.",
            rules: [
              { title: "Красный", text: "Абсолютная и обязательная остановка." },
              { title: "Оранжевый", text: "Требуется остановка, кроме случаев опасности сзади." },
              { title: "Зеленый", text: "Проезд разрешен, если путь свободен." }
            ],
            examples: ["Красный", "Желтый", "Зеленый"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "pietons",
            title: "10. Пешеходные знаки",
            desc: "Безопасность уязвимых участников движения приоритетна.",
            rules: [
              { title: "Приоритет", text: "Всегда уступайте дорогу пешеходам на переходе." },
              { title: "Зоны", text: "Пешеходная зона, защищенный переход." }
            ],
            examples: ["Пешеходный переход", "Зона встречи"],
            color: "border-teal-500",
            bgBadge: "bg-teal-500 text-white",
            bgLight: "bg-teal-50"
          },
          {
            id: "hierarchie",
            title: "11. Иерархия сигналов",
            desc: "Обязательно знать для экзамена!",
            rules: [
              { title: "Порядок приоретета", text: "1. Регулировщик 👮, 2. Светофоры 🚦, 3. Знаки 🚧, 4. Разметка 🛣️." }
            ],
            examples: ["Полицейский", "Светофоры", "Знаки"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "erreurs",
            title: "12. Частые ошибки",
            desc: "Остерегайтесь классических ловушек.",
            rules: [
              { title: "Путаница", text: "Путать предписание (синий круг) и информацию (синий квадрат)." },
              { title: "Забывчивость", text: "Игнорирование временных знаков (желтых) или неверный приоритет." }
            ],
            examples: ["Игнорирование Стоп", "Неверный приоритет"],
            color: "border-red-700",
            bgBadge: "bg-red-700 text-white",
            bgLight: "bg-red-100"
          },
          {
            id: "astuces",
            title: "14. Советы для памяти",
            desc: "Запоминайте формы и цвета легко.",
            rules: [
              { title: "Формы", text: "Треугольник = Опасность ⚠️, Круг = Приказ (Запрет 🚫 или Обязательство 🔵)." },
              { title: "Цвета", text: "Красный = Предупреждение, Синий = Обязанность/Инфо, Желтый = Работы." }
            ],
            examples: ["Мнемоника", "Визуальное кодирование"],
            color: "border-purple-600",
            bgBadge: "bg-purple-600 text-white",
            bgLight: "bg-purple-50"
          }
        ],
        quiz_section: {
          title: "🧪 16. Экзаменационные вопросы",
          intro: "Проверьте свои знания по знакам перед переходом к следующему модулю.",
          questions: [
            {
              question: "Треугольный знак указывает на:",
              options: ["Обязательство", "Запрет", "Опасность", "Направление"],
              answer: 2,
              explanation: "Треугольники с красной окантовкой всегда указывают на опасность."
            },
            {
              question: "Круглый синий знак означает:",
              options: ["Информация", "Обязательство", "Опасность", "Запрет"],
              answer: 1,
              explanation: "Синие круги — это предписывающие знаки."
            },
            {
              question: "Желтый знак означает:",
              options: ["Постоянный", "Временный", "Опасность", "Направление"],
              answer: 1,
              explanation: "Желтый цвет зарезервирован для временных знаков (дорожные работы)."
            }
          ]
        }
      },
      priorites: {
        badge: "Модуль 2",
        label: "Приоритеты",
        title: "Приоритеты",
        description: "Понимание того, кто имеет приоритет, чтобы избежать аварий на перекрестках.",
        footer_title: "Освойте приоритеты",
        footer_desc: "Вы изучили основы приоритетов. Готовы к следующему шагу?",
        btn_test: "Тест по приоритетам",
        sections: [
          {
            id: "objectif",
            title: "🎯 Цель",
            desc: "Понимание того, кто имеет приоритет, чтобы избежать аварий на перекрестках.",
            rules: [
              { title: "Определение", text: "Приоритет определяет, какой участник движения должен проехать первым." }
            ],
            examples: ["Безопасность", "Общее правило"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "prio_droite",
            title: "1. Помеха справа",
            desc: "Базовое правило при отсутствии знаков.",
            rules: [
              { title: "Без знаков", text: "Приоритет у транспортного средства, приближающегося справа." }
            ],
            examples: ["Перекресток в городе", "Перекресток без знаков"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-white",
            bgLight: "bg-yellow-50"
          },
          {
            id: "cedez",
            title: "2. Знак \"Уступи дорогу\"",
            desc: "Нужно снизить скорость и пропустить.",
            rules: [
              { title: "Действие", text: "Снизить скорость и уступить дорогу другим." }
            ],
            examples: ["Въезд на скоростную трассу", "Кольцо"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "stop",
            title: "3. Знак СТОП",
            desc: "Требуется строгая остановка.",
            rules: [
              { title: "Действие", text: "ОБЯЗАТЕЛЬНАЯ остановка, затем уступить дорогу." }
            ],
            examples: ["Отсутствие видимости", "Стоп-линия"],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "route_prio",
            title: "4. Главная дорога",
            desc: "У вас преимущество.",
            rules: [
              { title: "Правило", text: "У вас приоритет на перекрестке." }
            ],
            examples: ["Федеральная трасса", "Главная улица"],
            color: "border-green-600",
            bgBadge: "bg-green-600 text-white",
            bgLight: "bg-green-50"
          },
          {
            id: "rond_point",
            title: "5. Кольцевое движение",
            desc: "Приоритет у тех, кто уже на кольце.",
            rules: [
              { title: "Въезд", text: "Приоритет у автомобилей, уже находящихся на круге." }
            ],
            examples: ["Круговое движение"],
            color: "border-purple-600",
            bgBadge: "bg-purple-600 text-white",
            bgLight: "bg-purple-50"
          },
          {
            id: "cas_dangereux",
            title: "⚠️ Опасные случаи",
            desc: "Будьте особенно внимательны.",
            rules: [
              { title: "Внимание", text: "Плохая видимость, городские перекрестки, быстрые водители." }
            ],
            examples: ["Ночь", "Сильный дождь", "Превышение скорости"],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "erreurs",
            title: "❌ Частые ошибки",
            desc: "Ошибки, которых нельзя допускать.",
            rules: [
              { title: "Ошибки", text: "Не смотреть вправо, считать себя приоритетным, игнорировать СТОП." }
            ],
            examples: ["Не уступил", "Проезд без остановки"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "cas_concret",
            title: "🚗 Реальная ситуация",
            desc: "Вы подъезжаете без знака:",
            rules: [
              { title: "Действие", text: "Машина справа → вы уступаете." }
            ],
            examples: ["Улица без разметки"],
            color: "border-cyan-600",
            bgBadge: "bg-cyan-600 text-white",
            bgLight: "bg-cyan-50"
          },
          {
            id: "astuce",
            title: "🧠 Совет",
            desc: "Для запоминания.",
            rules: [
              { title: "Правило", text: "\"Нет знака = помеха справа\"." }
            ],
            examples: ["Рефлекс"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "conclusion",
            title: "🎯 Заключение",
            desc: "Всегда анализируйте ситуацию перед проездом.",
            rules: [
              { title: "Легко запомнить", text: "Приоритет зависит от знаков и ситуации." }
            ],
            examples: ["Безопасность превыше всего"],
            color: "border-teal-600",
            bgBadge: "bg-teal-600 text-white",
            bgLight: "bg-teal-50"
          }
        ],
        quiz_section: {
          title: "🧪 Экзаменационные вопросы",
          intro: "Проверьте свои знания о приоритетах.",
          questions: [
            {
              question: "При отсутствии знака кто имеет приоритет?",
              options: ["Слева", "Справа", "Я", "Никто"],
              answer: 1,
              explanation: "Без знаков всегда действует правило 'помехи справа'."
            },
            {
              question: "У знака СТОП:",
              options: ["Я замедляюсь", "Я проезжаю", "Я останавливаюсь", "Я ускоряюсь"],
              answer: 2,
              explanation: "Знак СТОП обязывает сделать полную остановку автомобиля."
            },
            {
              question: "На круговом движении:",
              options: ["У меня приоритет", "Приоритет у тех кто справа", "Приоритет у тех, кто на кольце", "Ни у кого"],
              answer: 2,
              explanation: "За редкими исключениями, вы обязаны уступить дорогу транспорту, который уже находится на кольце."
            }
          ]
        }
      },
      circulation: {
        badge: "Модуль 3",
        label: "Движение",
        title: "Правила движения",
        description: "Правильно двигаться по дороге, соблюдая правила.",
        footer_title: "Освойте движение",
        footer_desc: "Вы завершили изучение основ движения по дороге. Готовы к следующему шагу?",
        btn_test: "Тест по движению",
        sections: [
          {
            id: "objectif",
            title: "🎯 Цель",
            desc: "Правильно двигаться по дороге, соблюдая правила.",
            rules: [
              { title: "Определение", text: "Положение и маневры определяют плавность дорожного движения." }
            ],
            examples: ["Плавность", "Общая безопасность"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "position",
            title: "1. Положение на проезжей части",
            desc: "При нормальном движении.",
            rules: [
              { title: "Правило", text: "Двигаться по правой стороне." }
            ],
            examples: ["Правая полоса на шоссе"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-white",
            bgLight: "bg-yellow-50"
          },
          {
            id: "changement_dir",
            title: "2. Изменение направления",
            desc: "Предупредите перед маневром.",
            rules: [
              { title: "Поворотник", text: "Использовать поворотник." },
              { title: "Обзор", text: "Проверять слепые зоны." }
            ],
            examples: ["Поворот налево", "Перестроение"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "depassement",
            title: "3. Обгон",
            desc: "Опережение более медленного участника.",
            rules: [
              { title: "Направление", text: "По левой стороне." },
              { title: "Условие", text: "Только если разрешено." }
            ],
            examples: ["Обгон грузовика"],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "croisement",
            title: "4. Встречный разъезд",
            desc: "Участники движения на встречной полосе.",
            rules: [
              { title: "Действие", text: "Держаться правее." }
            ],
            examples: ["Узкая дорога", "Сложный разъезд"],
            color: "border-green-600",
            bgBadge: "bg-green-600 text-white",
            bgLight: "bg-green-50"
          },
          {
            id: "cas_dangereux",
            title: "⚠️ Опасные ситуации",
            desc: "Случаи высокого риска.",
            rules: [
              { title: "Внимание", text: "Обгон без видимости, забытый поворотник." }
            ],
            examples: ["Вершина холма", "Слепой поворот"],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "erreurs",
            title: "❌ Частые ошибки",
            desc: "Ошибки, которых следует избегать.",
            rules: [
              { title: "Ошибки", text: "Обгон справа, отсутствие проверки зеркал." }
            ],
            examples: ["Игнорирование слепой зоны", "Обгон по медленной полосе"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "cas_concret",
            title: "🚗 Реальная ситуация",
            desc: "Логическая последовательность:",
            rules: [
              { title: "Действие", text: "Обгон = проверить + предупредить + обогнать." }
            ],
            examples: ["Обгон на трассе"],
            color: "border-cyan-600",
            bgBadge: "bg-cyan-600 text-white",
            bgLight: "bg-cyan-50"
          },
          {
            id: "astuce",
            title: "🧠 Совет",
            desc: "Базовое правило.",
            rules: [
              { title: "Запомните", text: "\"Смотреть → сигнализировать → действовать\"." }
            ],
            examples: ["Метод RCA"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "conclusion",
            title: "🎯 Заключение",
            desc: "Основа успешного коллективного движения.",
            rules: [
              { title: "Ключ", text: "Всегда предвидьте действия других." }
            ],
            examples: ["Постоянная бдительность"],
            color: "border-teal-600",
            bgBadge: "bg-teal-600 text-white",
            bgLight: "bg-teal-50"
          }
        ],
        quiz_section: {
          title: "🧪 Вопросы",
          intro: "Проверьте свои знания о правилах дорожного движения.",
          questions: [
            {
              question: "Обгон осуществляется:",
              options: ["Справа", "Слева", "Посередине", "Не имеет значения"],
              answer: 1,
              explanation: "Обгон систематически выполняется с левой стороны (за редкими исключениями)."
            },
            {
              question: "Перед поворотом нужно:",
              options: ["Ускориться", "Резко затормозить", "Включить поворотник", "Ничего"],
              answer: 2,
              explanation: "Поворотник предупреждает других участников о ваших намерениях задолго до торможения."
            },
            {
              question: "При встречном разъезде:",
              options: ["Ехать быстро", "Сигналить", "Оставаться справа", "Обгонять"],
              answer: 2,
              explanation: "При встрече с другим участником важно прижаться как можно правее для безопасности."
            }
          ]
        }
      },
      vitesse: {
        badge: "Модуль 4",
        label: "Скорость",
        title: "Скорость",
        description: "Адаптируйте скорость для безопасного вождения.",
        footer_title: "Контролируйте скорость",
        footer_desc: "Вы освоили правила скорости. Готовы к следующему шагу?",
        btn_test: "Тест Скорость",
        sections: [
          {
            id: "objectif",
            title: "🎯 Цель",
            desc: "Адаптация скорости для безопасности.",
            rules: [
              { title: "Безопасность", text: "Скорость определяет время реакции и силу удара." }
            ],
            examples: ["Выживание", "Предвидение"],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "limitations",
            title: "1. Общие ограничения",
            desc: "Правила по умолчанию.",
            rules: [
              { title: "Город", text: "50 км/ч" },
              { title: "Трасса", text: "80 км/ч" },
              { title: "Автомагистраль", text: "130 км/h" }
            ],
            examples: ["Знак 50", "Знак 130"],
            color: "border-yellow-500",
            bgBadge: "bg-yellow-500 text-white",
            bgLight: "bg-yellow-50"
          },
          {
            id: "adapter",
            title: "2. Адаптация скорости",
            desc: "Законный предел не является обязательной скоростью.",
            rules: [
              { title: "Погода", text: "Дождь, снег, туман." },
              { title: "Условия", text: "Плотный трафик, плохая видимость." }
            ],
            examples: ["Туман = 50 км/ч везде"],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "distance_secu",
            title: "3. Дистанция безопасности",
            desc: "Предугадать остановку.",
            rules: [
              { title: "Правило", text: "Минимум 2 секунды интервала." }
            ],
            examples: ["2 линии на трассе", "Считайте 'один крокодил, два крокодила'"],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "erreurs",
            title: "❌ Частые ошибки",
            desc: "Серьезные нарушения.",
            rules: [
              { title: "Превышение", text: "Ехать слишком быстро и не адаптировать скорость." }
            ],
            examples: ["Прижиматься к машине спереди (дистанции)"],
            color: "border-rose-600",
            bgBadge: "bg-rose-600 text-white",
            bgLight: "bg-rose-50"
          },
          {
            id: "cas_concret",
            title: "🚗 Реальная ситуация",
            desc: "Мокрая дорога:",
            rules: [
              { title: "Действие", text: "Дождь = снизить скорость (например, 130 -> 110)." }
            ],
            examples: ["Затопленная дорога"],
            color: "border-cyan-600",
            bgBadge: "bg-cyan-600 text-white",
            bgLight: "bg-cyan-50"
          },
          {
            id: "astuce",
            title: "🧠 Совет",
            desc: "Держите в уме.",
            rules: [
              { title: "Принцип", text: "\"Чем быстрее = тем опаснее\"." }
            ],
            examples: ["Экспоненциальное увеличение тормозного пути"],
            color: "border-indigo-600",
            bgBadge: "bg-indigo-600 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "conclusion",
            title: "🎯 Заключение",
            desc: "Уважайте кинетическую энергию.",
            rules: [
              { title: "Контроль", text: "Скорость всегда должна быть адаптирована." }
            ],
            examples: ["Адекватная скорость спасает жизни"],
            color: "border-teal-600",
            bgBadge: "bg-teal-600 text-white",
            bgLight: "bg-teal-50"
          }
        ],
        quiz_section: {
          title: "🧪 Вопросы",
          intro: "Пришло время для викторины по скорости.",
          questions: [
            {
              question: "В городе:",
              options: ["30", "50", "80", "100"],
              answer: 1,
              explanation: "За исключением особых указаний (Зона 30), лимит в населенном пункте установлен на уровне 50 км/ч."
            },
            {
              question: "Идеальная минимальная дистанция безопасности:",
              options: ["1 сек", "2 сек", "5 сек", "10 сек"],
              answer: 1,
              explanation: "Необходимо соблюдать интервал не менее 2 секунд до впередиидущего транспортного средства."
            },
            {
              question: "Во время дождя:",
              options: ["Ускориться", "Притормозить", "Сигналить", "Обгонять"],
              answer: 1,
              explanation: "Дождь увеличивает тормозной путь и снижает видимость. Необходимо замедлиться."
            }
          ]
        }
      },
      stationnement: {
        badge: "Модуль 05",
        label: "Остановка",
        title: "Парковка и стоянка",
        description: "Учимся не мешать другим при остановке.",
        sections: [
          {
            id: "definitions",
            title: "1. Разница",
            desc: "Остановка — не парковка.",
            rules: [
              { title: "Остановка (Arrêt)", text: "Недолго, водитель рядом (для посадки)." },
              { title: "Парковка", text: "Мотор выключен, вы ушли." }
            ],
            examples: [
              "Высадка друга.",
              "Уход в магазин."
            ],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "interdictions",
            title: "2. Запреты",
            desc: "Где нельзя стоять.",
            rules: [
              { title: "Желтая сплошная", text: "Запрет даже на остановку." },
              { title: "Желтая пунктирная", text: "Можно остановиться, нельзя парковаться." },
              { title: "Зигзаг", text: "Остановка автобуса. Нельзя занимать." }
            ],
            examples: [
              "Парковка перед гаражом.",
              "Место для инвалидов (135€ штраф)."
            ],
            color: "border-red-500",
            bgBadge: "bg-red-500 text-white",
            bgLight: "bg-red-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина по парковке",
          intro: "Проверьте свои знания о правилах стоянки.",
          questions: [
            {
              question: "Желтая сплошная линия у бордюра означает:",
              options: ["Остановка разрешена", "Парковка разрешена", "Остановка и парковка запрещены", "Зона погрузки"],
              answer: 2,
              explanation: "Сплошная желтая линия — это строгий запрет на любую иммобилизацию автомобиля."
            },
            {
              question: "Разница между остановкой и парковкой в том, что:",
              options: ["При остановке мотор работает", "При остановке водитель остается рядом", "Парковка всегда платная", "Нет разницы"],
              answer: 1,
              explanation: "Остановка — это кратковременное нахождение водителя у машины (например, для высадки пассажира)."
            },
            {
              question: "Парковка на месте для инвалидов без спецкарты карается штрафом:",
              options: ["35€", "68€", "135€", "450€"],
              answer: 2,
              explanation: "Это считается 'очень мешающей' парковкой и наказывается штрафом в 135 евро."
            }
          ]
        },
        footer_title: "Встали правильно?",
        footer_desc: "Парковка против движения — нарушение."
      },
      autoroute: {
        badge: "Модуль 06",
        label: "Высокая скорость",
        title: "Автомагистрали",
        description: "Самые безопасные дороги, но цена ошибки велика.",
        sections: [
          {
            id: "insertion",
            title: "1. Въезд",
            desc: "Используйте полосу разгона на 100%.",
            rules: [
              { title: "Цель", text: "Набрать скорость потока (около 90-110)." },
              { title: "Въезд", text: "Не заставляйте других тормозить." }
            ],
            examples: [
              "Выезд на А7.",
              "Полоса разгона."
            ],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "circulation_auto",
            title: "2. Движение",
            desc: "Держитесь правой стороны.",
            rules: [
              { title: "Левая полоса", text: "ТОЛЬКО для обгона. Нельзя просто ехать на ней." },
              { title: "Дистанция", text: "2 черты аварийной полосы между машинами." }
            ],
            examples: [
              "Обгон фуры.",
              "Движение в потоке."
            ],
            color: "border-emerald-500",
            bgBadge: "bg-emerald-500 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "urgences",
            title: "3. Экстренные случаи",
            desc: "Что делать при аварии.",
            rules: [
              { title: "Полоса BAU", text: "Только при поломке. Уходите за барьер безопасности." },
              { title: "Телефон", text: "Лучше использовать оранжевые SOS-будки." }
            ],
            examples: [
              "Прокол шины.",
              "Заглох двигатель."
            ],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина по трассам",
          intro: "Скорость требует дисциплины.",
          questions: [
            {
              question: "На полосе разгона я должен:",
              options: ["Остановиться в начале", "Разогнаться до скорости потока", "Проехать медленно", "Ждать, пока все проедут"],
              answer: 1,
              explanation: "Полоса разгона нужна для того, чтобы встроиться в поток на его скорости, не создавая помех."
            },
            {
              question: "Безопасная дистанция на трассе ориентировочно:",
              options: ["10 метров", "1 полоса BAU", "2 полосы BAU", "50 метров"],
              answer: 2,
              explanation: "Правило 'двух черт' позволяет держать достаточный интервал при 130 км/ч."
            },
            {
              question: "Левая полоса на магистрали используется:",
              options: ["Для быстрой езды постоянно", "Только для обгона", "Для грузовиков", "Для отдыха"],
              answer: 1,
              explanation: "Во Франции запрещено постоянно занимать левую полосу, если правая свободна."
            }
          ]
        },
        footer_title: "Скорость под контролем?",
        footer_desc: "Не забывайте отдыхать каждые 2 часа."
      },
      securite: {
        badge: "Модуль 07",
        label: "Жизненно",
        title: "Безопасность движения",
        description: "Факторы, спасающие жизни: ремни, дистанция, внимание.",
        sections: [
          {
            id: "elements",
            title: "1. Ремень и Airbag",
            desc: "Защита водителя и пассажиров.",
            rules: [
              { title: "Ремни", text: "Обязательны для ВСЕХ. Водитель отвечает за детей." },
              { title: "Штраф", text: "135 евро и -3 балла за непристегнутого." }
            ],
            examples: [
              "Поездка в школу.",
              "Пассажиры сзади."
            ],
            color: "border-blue-500",
            bgBadge: "bg-blue-500 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "distances_secu",
            title: "2. Дистанции",
            desc: "Правило 2 секунд (реакция + безопасность).",
            rules: [
              { title: "Тоннель", text: "Держите дистанцию в 2 синих диода." },
              { title: "Дождь", text: "Тормозной путь растет вдвое." }
            ],
            examples: [
              "Проезд тоннеля.",
              "Дистанция за городом."
            ],
            color: "border-indigo-500",
            bgBadge: "bg-indigo-500 text-white",
            bgLight: "bg-indigo-50"
          },
          {
            id: "fatigue",
            title: "3. Усталость",
            desc: "Главный враг на трассе.",
            rules: [
              { title: "Признаки", text: "Тяжелые веки, боль в шее, зевота." },
              { title: "Средства", text: "Кофе не помогает. Только сон 15 минут." }
            ],
            examples: [
              "Ночная поездка.",
              "Риск уснуть за рулем."
            ],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина по безопасности",
          intro: "Ваша жизнь в ваших руках.",
          questions: [
            {
              question: "Кто несет ответственность за непристегнутого ребенка?",
              options: ["Сам ребенок", "Водитель", "Родители (если они не в машине)", "Никто"],
              answer: 1,
              explanation: "Водитель обязан убедиться, что все несовершеннолетние пассажиры пристегнуты."
            },
            {
              question: "Признак сильной усталости, требующий немедленной остановки:",
              options: ["Жажда", "Тяжелые веки и зевота", "Громкая музыка", "Желание перекусить"],
              answer: 1,
              explanation: "Зевота и слипающиеся глаза — предвестники микросна, крайне опасного за рулем."
            },
            {
              question: "В тоннеле дистанция безопасности измеряется:",
              options: ["В метрах", "В синих диодах", "В секундах", "По знакам"],
              answer: 1,
              explanation: "В современных тоннелях синие огни на стенах помогают держать нужный интервал."
            }
          ]
        },
        footer_title: "Берегите себя!",
        footer_desc: "Безопасность — это не только техника, но и ваше состояние."
      },
      alcool: {
        badge: "Модуль 08",
        label: "Нулевая толерантность",
        title: "Алкоголь и лекарства",
        description: "Алкоголь разрушает жизнь и права.",
        sections: [
          {
            id: "limites",
            title: "1. Лимиты",
            desc: "Для новичка — 0.2 г/л (0 бокалов).",
            rules: [
              { title: "Тяжелое", text: "Свыше 0.8 г/л — это уже уголовное преступление." },
              { title: "Наркотики", text: "Запрещены в любом виде. -6 баллов." }
            ],
            examples: [
              "Бокал вина в баре.",
              "Тест на наркотики."
            ],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "sanctions_alcool",
            title: "2. Наказания",
            desc: "Очень суровые.",
            rules: [
              { title: "Баллы", text: "-6 баллов сразу (потеря прав для новичка)." },
              { title: "Тюрьма", text: "При аварии или рецидиве." }
            ],
            examples: [
              "Лишение прав.",
              "Штраф 4500 евро."
            ],
            color: "border-rose-700",
            bgBadge: "bg-rose-700 text-white",
            bgLight: "bg-rose-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина: Алкоголь и Наркотики",
          intro: "Знайте риски и закон.",
          questions: [
            {
              question: "Допустимый уровень алкоголя для начинающего водителя (A):",
              options: ["0.2 г/л", "0.5 г/л", "0.8 г/л", "0.1 г/л"],
              answer: 0,
              explanation: "Для новичков лимит очень строг (0.2 г/л), что фактически означает запрет на алкоголь перед вождением."
            },
            {
              question: "Какое наказание за вождение под наркотиками?",
              options: ["-2 балла", "-4 балла", "-6 баллов", "Предупреждение"],
              answer: 2,
              explanation: "Наркотики — это автоматическое снятие 6 баллов и уголовная ответственность."
            },
            {
              question: "С какого уровня алкоголя начинается уголовное преступление (délit)?",
              options: ["0.2 г/л", "0.5 г/л", "0.8 г/л", "1.0 г/л"],
              answer: 2,
              explanation: "Свыше 0.8 г/л правонарушение переходит в разряд преступлений с возможным тюремным сроком."
            }
          ]
        },
        footer_title: "Трезвый ум — залог успеха.",
        footer_desc: "Один бокал может стоить прав."
      },
      mecanique: {
        badge: "Модуль 09",
        label: "Техника",
        title: "Механика и уход",
        description: "Знай свою машину.",
        sections: [
          {
            id: "voyants",
            title: "1. Индикаторы",
            desc: "Красный — опасность, оранжевый — предупреждение.",
            rules: [
              { title: "Красные", text: "Масло, Тормоза, Аккумулятор." },
              { title: "Синие/Зеленые", text: "Фары, Поворотники." }
            ],
            examples: [
              "Индикатор масла.",
              "Индикатор ABS."
            ],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          },
          {
            id: "entretien",
            title: "2. Проверки",
            desc: "Под капотом.",
            rules: [
              { title: "Шины", text: "Протектор минимум 1.6мм. Давление раз в месяц." },
              { title: "Жидкости", text: "Омыватель, Антифриз, Масло." }
            ],
            examples: [
              "Проверка уровня масла.",
              "Накачка шин."
            ],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина по механике",
          intro: "Техника должна быть исправна.",
          questions: [
            {
              question: "Красный индикатор на панели означает:",
              options: ["Заехать в сервис через неделю", "Немедленная остановка", "Все в порядке", "Включены фары"],
              answer: 1,
              explanation: "Красные лампы сигнализируют о критической неисправности, требующей немедленного прекращения движения."
            },
            {
              question: "Минимальная глубина протектора шины:",
              options: ["0.5 мм", "1.0 мм", "1.6 мм", "3.0 мм"],
              answer: 2,
              explanation: "По закону протектор должен быть не менее 1.6 мм для обеспечения сцепления с дорогой."
            },
            {
              question: "Как часто нужно проверять давление в шинах?",
              options: ["Раз в год", "Раз в месяц", "Только если спустило", "Никогда"],
              answer: 1,
              explanation: "Рекомендуется проверять давление раз в месяц и перед долгими поездками."
            }
          ]
        },
        footer_title: "Машина готова к пути?",
        footer_desc: "Ухоженный автомобиль реже попадает в аварии."
      },
      eco_conduite: {
        badge: "Модуль 10",
        label: "Финансы и планета",
        title: "Эко-вождение",
        description: "Навык, который сейчас активно оценивается государством при сдаче. Эко-вождение — это не медленная езда, а изменение привычек для снижения выбросов CO2 и расхода топлива.",
        sections: [
          {
            id: "souple",
            title: "1. Плавное и осознанное вождение",
            desc: "Стиль вождения влияет на 40% расхода топлива.",
            rules: [
              { title: "Инерция", text: "Постепенный разгон без резких рывков педали." },
              { title: "Торможение двигателем", text: "Рано убирайте ногу с газа. Расход падает до 0." },
              { title: "Передачи", text: "Переключайтесь вверх рано (2000 об/мин для дизеля, 2500 для бензина)." },
              { title: "Круиз-контроль", text: "Стабилизирует обороты и исключает нервную работу ногой." }
            ],
            examples: [
              "120 км/ч вместо 130 км/ч экономит ~1 л на 100 км.",
              "Остановка более 20 сек — глушите двигатель."
            ],
            color: "border-green-500",
            bgBadge: "bg-green-500 text-white",
            bgLight: "bg-green-50"
          },
          {
            id: "facteurs_eco",
            title: "2. Внешние факторы",
            desc: "Ваша машина — это еще и стена перед ветром.",
            rules: [
              { title: "Кондиционер", text: "Увеличивает расход до 20% в городе." },
              { title: "Аэродинамика", text: "Снимайте пустые багажники с крыши сразу после поездки." },
              { title: "Окна", text: "Открытое окно на 130 км/ч работает как парашют. На трассе лучше кондиционер." },
              { title: "Вес", text: "Не возите лишний груз в багажнике просто так." }
            ],
            examples: [
              "Пустой багажник на крыше за год 'съедает' несколько полных баков."
            ],
            color: "border-emerald-600",
            bgBadge: "bg-emerald-600 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "entretien_eco",
            title: "3. Связь с техсостоянием",
            desc: "Плохо обслуженная машина — это задыхающаяся машина.",
            rules: [
              { title: "Шины", text: "Низкое давление = огромное трение (+10% к расходу)." },
              { title: "Фильтры", text: "Грязный фильтр мешает сгоранию, впрыскивается больше бензина." },
              { title: "Масло", text: "Старое масло увеличивает трение металлических деталей." }
            ],
            examples: [
              "Инспектор снизит балл, если вы слишком долго едете на 1-й передаче."
            ],
            color: "border-lime-600",
            bgBadge: "bg-lime-600 text-white",
            bgLight: "bg-lime-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина: Эко-вождение",
          intro: "Ездите экологично и выгодно.",
          questions: [
            {
              question: "При использовании торможения двигателем расход составляет:",
              options: ["0 л/100 км", "1 л/100 км", "2 л/100 км", "0.5 л/100 км"],
              answer: 0,
              explanation: "Когда вы убираете ногу с газа при включенной передаче, впрыск топлива полностью прекращается."
            },
            {
              question: "На скорости 130 км/ч экономичнее:",
              options: ["Открыть окна", "Включить кондиционер", "Ехать без света", "Резко ускоряться"],
              answer: 1,
              explanation: "На высокой скорости сопротивление воздуха из-за открытых окон тратит больше топлива, чем работа кондиционера."
            },
            {
              question: "Раннее переключение передач (2000-2500 об/мин) позволяет:",
              options: ["Испортить мотор", "Снизить расход", "Ехать быстрее", "Больше загрязнять"],
              answer: 1,
              explanation: "Поддержание низких оборотов двигателя — ключ к экономии топлива."
            }
          ]
        },
        footer_title: "Думайте об экологии!",
        footer_desc: "Эко-вождение может стать решающим баллом на практическом экзамене."
      },
      premiers_secours: {
        badge: "Модуль 11",
        label: "Гражданское выживание",
        title: "Первая помощь (P.A.S)",
        description: "Знаменитая формула P.A.S. (Защитить, Оповестить, Помочь) — обязательная часть подготовки каждого водителя.",
        sections: [
          {
            id: "proteger",
            title: "1. Защитить (Protéger)",
            desc: "Избежать повторного ДТП до того, как приблизитесь к пострадавшим.",
            rules: [
              { title: "Жилет", text: "Наденьте желтый жилет ПЕРЕД тем, как выйти из машины." },
              { title: "Сигналы", text: "Аварийка + Знак треугольник за 30 метров до места." },
              { title: "Автострада", text: "Знак треугольник НЕ обязателен, если это опасно для вашей жизни." },
              { title: "Пострадавший", text: "НИКОГДА не перемещайте раненого (кроме пожара или затопления)." }
            ],
            examples: [
              "Сначала обеспечьте безопасность места, потом идите к людям."
            ],
            color: "border-orange-500",
            bgBadge: "bg-orange-500 text-white",
            bgLight: "bg-orange-50"
          },
          {
            id: "alerter",
            title: "2. Оповестить (Alerter)",
            desc: "Дать четкую информацию нужным службам.",
            rules: [
              { title: "SOS-будки", text: "Мгновенная гео-позиция на магистралях." },
              { title: "Номера", text: "15 (SAMU), 18 (Пожарные), 17 (Полиция), 112 (Европа)." },
              { title: "Сообщение", text: "Кто, Где именно, Что случилось, Сколько пострадавших." },
              { title: "Связь", text: "Диспетчер кладет трубку последним." }
            ],
            examples: [
              "Не прерывайте звонок, пока не подтвердите точное местоположение."
            ],
            color: "border-amber-600",
            bgBadge: "bg-amber-600 text-white",
            bgLight: "bg-amber-50"
          },
          {
            id: "secourir",
            title: "3. Помочь (Secourir)",
            desc: "Жизненно важные действия до приезда профи.",
            rules: [
              { title: "Говорить/Укрыть", text: "Успокаивайте и боритесь с переохлаждением (шок)." },
              { title: "Без сознания", text: "Поза PLS (на боку), если человек дышит." },
              { title: "Кровотечение", text: "Сильное и постоянное прямое нажатие на рану." },
              { title: "Запреты", text: "НЕЛЬЗЯ давать пить/есть. НИКОГДА не снимайте шлем с мотоциклиста." }
            ],
            examples: [
              "Откажите пострадавшему в воде ради его же безопасности при операции."
            ],
            color: "border-red-600",
            bgBadge: "bg-red-600 text-white",
            bgLight: "bg-red-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина: Первая помощь",
          intro: "Знайте как спасти жизнь.",
          questions: [
            {
              question: "Порядок действий при ДТП (PAS) это:",
              options: ["Оповестить, Помочь, Защитить", "Защитить, Оповестить, Помочь", "Помочь, Защитить, Оповестить", "Оповестить, Защитить, Помочь"],
              answer: 1,
              explanation: "P.A.S: Сначала безопасность места, затем вызов служб, затем помощь пострадавшим."
            },
            {
              question: "Единый европейский номер экстренных служб:",
              options: ["15", "18", "112", "17"],
              answer: 2,
              explanation: "112 работает во всех странах ЕС, даже с заблокированного телефона."
            },
            {
              question: "Можно ли снимать шлем с пострадавшего мотоциклиста?",
              options: ["Да, чтобы он лучше дышал", "Нет, кроме случаев угрозы жизни", "Только если он просит", "Всегда нужно"],
              answer: 1,
              explanation: "Снятие шлема может повредить шейные позвонки. Это делают только профессионалы или при остановке дыхания."
            }
          ]
        },
        footer_title: "Действия ясны?",
        footer_desc: "PAS: Защитить, Оповестить, Помочь. Порядок неизменен."
      },
      partage_route: {
        badge: "Модуль 12",
        label: "Жить вместе",
        title: "Культура использования дороги",
        description: "Ответственность автомобилиста перед уязвимыми участниками (пешеходы и велосипедисты).",
        sections: [
          {
            id: "pietons_ru",
            title: "1. Пешеходы",
            desc: "Высший приоритет перед машинами.",
            rules: [
              { title: "Намерение", text: "Приоритет, как только он показал желание перейти (-6 баллов за отказ)." },
              { title: "ВНЕ перехода", text: "Даже если переходит в неположенном месте — он все равно главный." },
              { title: "Дети", text: "Непредсказуемы. Сразу тормозите, если на дороге мяч." },
              { title: "Зона встреч", text: "Скорость 20 км/ч, пешеходы главные ПОВСЮДУ." }
            ],
            examples: [
              "Дайте пожилому человеку закончить переход, даже если загорелся зеленый."
            ],
            color: "border-blue-400",
            bgBadge: "bg-blue-400 text-white",
            bgLight: "bg-blue-50"
          },
          {
            id: "cyclistes_ru",
            title: "2. Велосипедисты",
            desc: "Сосуществование на асфальте и спецполосах.",
            rules: [
              { title: "Интервал", text: "1 м в городе, 1.5 м вне города при обгоне." },
              { title: "Sas Vélo", text: "Зона перед светофором только для велов (штраф 35 евро)." },
              { title: "Велополосы", text: "Остановка на них — грубое нарушение (135 евро)." },
              { title: "Встречка", text: "В «Зонах 30» велы могут ехать навстречу потоку." }
            ],
            examples: [
              "Оставайтесь за велом, если нельзя оставить 1.5 м бокового интервала."
            ],
            color: "border-emerald-500",
            bgBadge: "bg-emerald-500 text-white",
            bgLight: "bg-emerald-50"
          },
          {
            id: "deux_roues_ru",
            title: "3. Мототранспорт",
            desc: "Невидимые и быстрые.",
            rules: [
              { title: "Слепая зона", text: "Обязательно поворачивайте голову перед маневром." },
              { title: "Междурядье", text: "Помогайте им проехать между двумя левыми полосами." },
              { title: "Погода", text: "Мото очень нестабильны в дождь. Увеличьте дистанцию вдвое." },
              { title: "Фары днем", text: "Обязаны ездить с включенным светом, чтобы не сливаться с домами." }
            ],
            examples: [
              "Открывайте дверь 'по-голландски' (дальней рукой), чтобы заметить скутер."
            ],
            color: "border-slate-600",
            bgBadge: "bg-slate-600 text-white",
            bgLight: "bg-slate-50"
          }
        ],
        quiz_section: {
          title: "🧪 Викторина: Общая дорога",
          intro: "Уважайте самых уязвимых.",
          questions: [
            {
              question: "Боковой интервал для обгона велосипедиста вне города:",
              options: ["0.5 метра", "1 метр", "1.5 метра", "2 метра"],
              answer: 2,
              explanation: "Вне населенных пунктов скорость выше, поэтому интервал должен быть не менее 1.5 метра."
            },
            {
              question: "Пешеход имеет приоритет:",
              options: ["Только на 'зебре'", "Как только показал намерение перейти", "Если он бежит", "Никогда вне перехода"],
              answer: 1,
              explanation: "Водитель обязан уступить пешеходу, как только тот явно выразил желание пересечь проезжую часть."
            },
            {
              question: "Зона 'sas vélo' на светофоре предназначена для:",
              options: ["Машин", "Мотоциклов", "Только велосипедистов", "Автобусов"],
              answer: 2,
              explanation: "Это специальная зона перед стоп-линией, позволяющая велосипедистам стартовать первыми в безопасности."
            }
          ]
        },
        footer_title: "Теория завершена!",
        footer_desc: "Вы успешно прошли все 12 учебных модулей."
      },
    },
    exam: {
      title: "Экзамен Blanc",
      subtitle: "Реальные условия - 30 минут",
      rules_title: "Правила симуляции",
      rules_1: "40 случайных вопросов",
      rules_2: "20 секунд на вопрос",
      rules_3: "Возврат назад невозможен",
      rules_4: "35/40 баллов для успеха",
      start_btn: "Начать экзамен",
      previous_btn: "Назад",
      timer_label: "Осталось времени",
      progress_label: "Вопрос {current} из {total}",
      next_btn: "Подтвердить и продолжить",
      finish_btn: "Завершить экзамен",
      confirm_finish: "Вы уверены, что хотите досрочно завершить экзамен?",
      result_success: "Поздравляем! Экзамен сдан.",
      result_fail: "Экзамен не сдан. Продолжайте тренировки.",
      score_label: "Ваш результат",
      score_desc: "Для успеха нужно как минимум 35 правильных ответов.",
      correction_title: "Подробный разбор",
      mistakes_title: "Анализ ваших частых ошибок",
      mistake_cat_signalisation: "Знаки: Повторите формы и цвета.",
      mistake_cat_priorites: "Приоритеты: Будьте внимательны на перекрестках.",
      mistake_cat_vitesse: "Скорость: Запомните лимиты и дистанции.",
      mistake_cat_circulation: "Движение: Расположение и обгоны.",
      mistake_cat_securite: "Безопасность: Бдительность и ремни.",
      mistake_cat_alcool: "Алкоголь: Запомните лимиты (0.2 и 0.5).",
      mistake_cat_mecanique: "Механика: Индикаторы и шины.",
      mistake_cat_eco_conduite: "Эко-вождение: Переключение передач.",
      mistake_cat_premiers_secours: "Первая помощь: Алгоритм PAS.",
      mistake_cat_partage_route: "Общая дорога: Велосипедисты и пешеходы.",
      your_answer: "Ваш ответ",
      correct_answer: "Верный ответ",
      explanation: "Пояснение",
      q_label: "Вопрос {num}",
      questions: {
          q1: { q: "Какое правило установки знака опасности в городе?", o: ["Прямо в месте опасности", "Примерно за 50 метров до него", "Примерно за 150 метров до него", "За 200 метров"], exp: "В городе скорость ниже, поэтому 50 метров достаточно для реакции." },
          q2: { q: "Знак 'Двустороннее движение' является исключением, потому что:", o: ["Он вступает в силу немедленно", "Он квадратный", "Он всегда временный", "Только на трассе"], exp: "Это единственный знак опасности, который не устанавливается заранее." },
          q3: { q: "Круглый красный знак с белым фоном означает:", o: ["Обязательство", "Запрет", "Информацию", "Опасность"], exp: "Красный круг — это всегда запрет." },
          q4: { q: "Знак STOP восьмиугольный, чтобы его узнавали:", o: ["Дальтоники", "Только ночью", "Издалека", "Даже если он засыпан снегом или виден сзади"], exp: "Эта форма уникальна и позволяет мгновенно опознать знак." },
          q5: { q: "Сплошная желтая линия на краю тротуара означает:", o: ["Парковка ок", "Остановка ок, стоянка нет", "Остановка и стоянка запрещены", "Для выгрузки"], exp: "Сплошная желтая линия запрещает любую остановку." },
          q6: { q: "На автостраде вешки поворота имеют цвет:", o: ["Белый с красным кольцом", "Синий с белым кольцом", "Желтый", "Зеленый"], exp: "Синие вешки J1 используются только на магистралях." },
          q7: { q: "Квадратный синий знак с белой каймой означает:", o: ["Запрет", "Обязательство", "Указание или сервис", "Конец зоны"], exp: "Квадратная форма информирует, а не приказывает." },
          q8: { q: "Табличка под основным знаком:", o: ["Отменяет его", "Уточняет или ограничивает его действие", "Только для грузовиков", "Необязательна"], exp: "Табличка дает детали: расстояние, время или тип транспорта." },
          q9: { q: "На перекрестке без знаков действует:", o: ["Приоритет слева", "Приоритет справа", "Первый приехал — первый проехал", "Прямо — приоритет"], exp: "Помеха справа — правило по умолчанию." },
          q10: { q: "Обязывает ли знак 'Уступи дорогу' к полной остановке?", o: ["Да, всегда", "Нет, если дорога пуста", "Только при плохой видимости", "Только новичков"], exp: "Если машин нет, можно проехать без остановки." },
          q11: { q: "Машина считается приоритетной, только если:", o: ["Она большая", "Это полиция", "Включены сирена И синий маячок", "Едет быстро"], exp: "Оба спецсигнала должны работать одновременно." },
          q12: { q: "На кольцевом движении приоритет у:", o: ["Въезжающих", "Уже находящихся на кольце", "Автобусов", "Самого быстрого"], exp: "Въезжающие уступают дорогу тем, кто слева на кольце." },
          q13: { q: "При желтом сигнале (не мигающем) я должен:", o: ["Ускориться", "Проехать, если уже внутри", "Остановиться, если это безопасно", "Гудеть"], exp: "Желтый свет требует остановки." },
          q14: { q: "Регулировщик стоит к вам лицом, руки в стороны:", o: ["Зеленый свет", "Красный свет (стоп)", "Замедлиться", "Разворот"], exp: "Грудь или спина регулировщика означают запрет проезда." },
          q15: { q: "Остановка у знака STOP должна быть:", o: ["3 секунды", "Для проверки сторон", "Полной фиксацией колес", "Необязательна без машин"], exp: "Важна полная неподвижность, время не регламентировано секундами." },
          q16: { q: "Выезд из двора или с частной парковки:", o: ["У меня приоритет справа", "Проехать силой", "Должен уступить всем на дороге", "С поворотником — приоритет"], exp: "Выезд из частной зоны не дает прав приоритета." },
          q17: { q: "На дороге без разделителя лимит по умолчанию:", o: ["90 км/ч", "80 км/ч", "70 км/ч", "100 км/ч"], exp: "80 км/ч — стандарт для безопасности на старых трассах." },
          q18: { q: "С момента знака въезда в город скорость лимитирована:", o: ["30 км/ч", "40 км/ч", "50 км/ч", "70 км/ч"], exp: "Въезд в город — это всегда 50 км/ч, если нет иных знаков." },
          q19: { q: "На трассе в дождь лимит 130 снижается до:", o: ["120 км/ч", "110 км/ч", "100 км/ч", "90 км/ч"], exp: "Скорость снижается для борьбы с аквапланированием." },
          q20: { q: "В тумане (видимость < 50м) макс. скорость:", o: ["50 км/ч", "70 км/ч", "80 км/ч", "30 км/ч"], exp: "Это предел для всех дорог в условиях плохой видимости." },
          q21: { q: "Обгон справа разрешен, если:", o: ["Пробка", "Передняя машина поворачивает налево", "На 3-х полосной трассе", "Только мотоциклам"], exp: "Единственный законный случай обгона справа." },
          q22: { q: "В горах на узкой дороге, кто должен сдавать назад?", o: ["Быстрый", "Легкий перед тяжелым", "Едущий вверх", "Опытный"], exp: "Легкий автомобиль более маневрен для сдачи назад." },
          q23: { q: "Метод RCA для смены полосы это:", o: ["Смотреть-Контроль-Действие", "Зеркала-Слепая зона-Поворотник", "Тормоз-Смена-Газ", "Регулировка-Маневр"], exp: "Последовательность для безопасного перестроения." },
          q24: { q: "Поворотник дает приоритет?", o: ["Да", "Нет, это лишь сигнал намерения", "Только в городе", "Только автобусам"], exp: "Никогда не заменяет контроль ситуации." },
          q25: { q: "Реакция водителя — 1с. ПРи 130 км/ч он проедет:", o: ["13 метров", "26 метров", "39 метров", "50 метров"], exp: "Расчет: десятки скорости x 3 = путь за 1 секунду." },
          q26: { q: "Кто виноват, если ребенок в машине не пристегнут?", o: ["Ребенок", "Родители", "Водитель", "Полиция"], exp: "Водитель несет ответственность за всех детей до 18 лет." },
          q27: { q: "Признаки усталости:", o: ["Голод", "Песок в глазах и боль в шее", "Быстрая езда", "Внимательность"], exp: "Физические сигналы организма нельзя игнорировать." },
          q28: { q: "Дистанция на трассе определяется по:", o: ["1 черте аварийки", "2 чертам аварийки", "Дистанции до соседа", "3 чертам"], exp: "Правило '2 черты' — жизненно важное пространство." },
          q29: { q: "Лимит алкоголя для новичка:", o: ["0,5 г/л", "0,2 г/л", "0,8 г/л", "0,0 г/л"], exp: "Это почти ноль, так как один бокал может уже быть 0.25." },
          q30: { q: "Смесь алкоголя и травки повышает риск смерти в:", o: ["2 раза", "10 раз", "15 раз", "29 раз"], exp: "Эффекты накладываются друг на друга." },
          q31: { q: "Организм выводит 1 бокал примерно за:", o: ["30 минут", "1 час", "2 часа", "5 часов"], exp: "Процесс идет медленно и его нельзя ускорить едой или водой." },
          q32: { q: "Загорелся красный индикатор при езде. Ваши действия?", o: ["Доехать до сервиса", "Сбавить газ", "Встать в безопасном месте и заглушить", "Ждать"], exp: "Красный — критическая неисправность." },
          q33: { q: "Давление в шинах проверять:", o: ["Каждую неделю", "Раз в месяц и на холодную", "Раз в год", "На вид"], exp: "Давление меняется от температуры и времени." },
          q34: { q: "Куда ставить новые шины?", o: ["Спереди", "Сзади", "Справа", "Все равно"], exp: "Задняя ось должна быть стабильнее." },
          q35: { q: "Переключать передачу вверх в эко-режиме нужно на:", o: ["1500 об/мин", "2500 об/мин", "4000 об/мин", "На красной зоне"], exp: "Раннее переключение бережет топливо." },
          q36: { q: "Торможение двигателем это расход:", o: ["Много", "0 литров", "Грязно", "Быстро"], exp: "Без газа форсунки закрываются полностью." },
          q37: { q: "Первое действие при аварии:", o: ["Звонок 112", "Помощь", "Обозначение (защита) места", "Сбор имен"], exp: "PAS: Протеже (Защита) — первый пункт." },
          q38: { q: "Единый номер спасения в Европе:", o: ["15", "17", "18", "112"], exp: "112 работает везде бесплатно." },
          q39: { q: "Интервал обгона велосипеда вне города:", o: ["0,5 м", "1 м", "1,5 м", "2 м"], exp: "Больше места из-за высокой скорости ветра." },
          q40: { q: "Трамвай в городе:", o: ["Уступает помехам справа", "Почти всегда главный", "Должен вас ждать", "Стоит у пешеходов"], exp: "Трамвай — король городских перекрестков." }
      },
      saving_results: "Сохранение ваших результатов...",
      success_title: "Поздравляем!",
      fail_title: "Требуется тренировка",
      retry_btn: "Пройти еще раз",
      review_errors: "Посмотреть ошибки",
      dashboard_btn: "Личный кабинет",
      back_to_results: "Назад к результатам",
      analysis_title: "Анализ ваших {count} ошибок",
      no_answer: "Нет ответа (Время истекло)",
      media_question_fallback: "Вопрос",
      shortcuts_label: "Горячие клавиши :",
      key_enter: "Ввод",
      validate_btn: "Подтвердить"
    },
    chatbot: {
      welcome: "Здравствуйте! Я ваш помощник \"Le Volant Pour Tous\". Есть ли у вас вопросы о водительских правах или правилах дорожного движения?",
      placeholder: "Задайте ваш вопрос...",
      assistant_title: "Помощник LVPT",
      online: "В сети",
      fallback: "Извините, я вас не совсем понял. Не могли бы вы переформулировать ваш вопрос о правилах дорожного движения или правах?",
      responses: {
        bonjour: "Здравствуйте! Как я могу помочь вам с обучением вождению сегодня?",
        prix: "Наши пакеты на права категории B начинаются от 650€. Интенсивные курсы теории стоят 250€. Хотите узнать подробности?",
        code: "Теоретический экзамен состоит из 40 вопросов. Для успешной сдачи нужно правильно ответить минимум на 35. Тренируйтесь на наших тестах!",
        permis: "Обязательное практическое обучение составляет минимум 20 часов вождения на механике или 13 часов на автомате.",
        auto_ecole: "У нас много автошкол-партнеров. Вы можете найти ближайшую на вкладке 'Автошколы' на карте."
      }
    },
    auth: {
      login: "Войти",
      logout: "Выйти",
      email: "Email адрес",
      password: "Пароль",
      name: "Имя или Никнейм",
      loading_login: "Загрузка...",
      loading_register: "Создание...",
      btn_login: "Завести двигатель",
      btn_register: "Присоединиться",
      no_account: "Еще нет аккаунта?",
      have_account: "Уже есть аккаунт?",
      register: "Зарегистрироваться",
      error_credentials: "Неверный email или пароль.",
      error_generic: "Произошла ошибка.",
      error_network: "Ошибка подключения к серверу."
    },
    dashboard: {
      welcome: "Привет, {name} 🚀",
      subtitle: "Готовы к следующей тренировке?",
      completed: "Пройдено",
      resume_title: "Продолжить обучение",
      resume_btn: "Продолжить тренировку",
      latest_exams: "Последние экзамены",
      no_exams: "Вы еще не проходили экзаменов.",
      exam_title: "Пробный тест #{number}",
      start_test: "Запустить тест",
      volant_ready: "Шанс сдачи",
      volant_ready_desc: "Вероятность успеха",
      ready_status_learning: "Обучение",
      ready_status_medium: "В процессе",
      ready_status_excellent: "Зеленый свет! Готов",
    },
    avis: {
      title: "Отзывы наших учеников",
      subtitle: "Узнайте мнение наших выпускников об обучении.",
      leave_review: "Оставить отзыв",
      name: "Ваше имя",
      rating: "Ваша оценка",
      message: "Ваш отзыв",
      placeholder: "Поделитесь вашим опытом с нами...",
      send: "Отправить отзыв",
      latest: "Последние отзывы",
      just_now: "Только что"
    },
    jeu: {
      back_to_hub: "Назад в хаб",
      choose_training: "Выберите вашу тренировку.",
      play: "Играть",
      sign_master_desc: "Тренируйте зрительные рефлексы на дорожных знаках. Перетаскивайте их как можно быстрее!",
      esquive_route_desc: "Избегайте препятствий на бесконечном шоссе. Тренируйте предвосхищение.",
      sign_master: {
        intro: "Проверьте свои рефлексы на дорожных знаках. Перетащите их на правильный ответ. У вас есть 60 секунд!",
        insert_coin: "Вставить жетон",
        score: "Счет",
        combo: "Комбо",
        time: "Время",
        drag_instruction: "Перетащите знак к его определению",
        sign_stop: "Обязательная остановка (СТОП)",
        sign_no_parking: "Стоянка запрещена",
        quit_game: "Выйти из игры"
      },
      esquive_route: {
        distance: "Дистанция: {score}м",
        crash: "Авария!",
        driving: "Вождение",
        final_score: "Финальный счет: {score}м",
        replay: "Играть снова",
        controls_instruction: "Используйте стрелки ← и → или кнопки"
      }
    },
    situations: {
      title: "Ситуации на Дороге",
      subtitle: "Решайте реальные экзаменационные сценарии прямо за рулем автомобиля!",
      progress: "Сценарий {current} из {total}",
      question_title: "Ситуация",
      question_ask: "Ваше решение :",
      btn_validate: "Подтвердить ответ",
      correct: "Правильный ответ! 🎉",
      incorrect: "Неверный ответ... ❌",
      explanation_title: "💡 Объяснение экзаменатора :",
      btn_next: "Следующий сценарий",
      btn_finish: "Начать сначала",
      score_title: "Итоги симуляции",
      score_desc: "Вы завершили все предложенные сценарии вождения.",
      score_result: "Ваш итоговый счет : {score} / {total}",
      feedback_excellent: "Отлично! Вы идеально справляетесь со сложными ситуациями. 🏆",
      feedback_medium: "Неплохо! Повторите базовые правила, чтобы быть полностью готовым к экзамену. 📚",
      feedback_low: "Внимание, вы совершили критические ошибки в нескольких ситуациях. Повторите теорию! ⚠️",
      list: [
        {
          situation: "Вы едете ночью по неосвещенной дороге. Вы догоняете медленно едущий автомобиль и хотите его обогнать. Вдали навстречу едет машина.",
          question: "Какая мера предосторожности абсолютно необходима, чтобы не ослепить водителей и обеспечить безопасность?",
          o1: "Я сразу включаю дальний свет, чтобы лучше видеть дорогу во время обгона.",
          o2: "Я остаюсь с ближним светом, чтобы не слепить водителя, и включаю дальний только когда поравняюсь с ним.",
          o3: "Я сигналю звуковым сигналом перед обгоном, чтобы предупредить о маневре.",
          o4: "Я включаю аварийную световую сигнализацию на протяжении всего обгона.",
          exp: "Дальний свет ослепит обгоняемого водителя через зеркало заднего вида, если включить его слишком рано. Следует ехать с ближним светом и переключаться на дальний, только когда вы поравняетесь с ним."
        },
        {
          situation: "Вы приближаетесь к железнодорожному переезду. Мигает красный сигнал светофора, шлагбаум начинает опускаться, но поезда еще не видно.",
          question: "Что вы должны сделать немедленно?",
          o1: "Я ускоряюсь, чтобы проехать до того, как шлагбаум полностью опустится.",
          o2: "Я обязан остановиться перед мигающим красным сигналом.",
          o3: "Я останавливаюсь только если шлагбаум находится в полностью горизонтальном положении.",
          o4: "Я сигналю, чтобы предупредить поезд о своем присутствии.",
          exp: "Мигающий красный сигнал светофора требует ОБЯЗАТЕЛЬНОЙ и немедленной остановки. Въезд на переезд после активации сигнала строго запрещен."
        },
        {
          situation: "Вы садитесь в автомобиль. Вы должны настроить водительское место перед началом движения.",
          question: "В какой обязательной хронологической последовательности вы выполняете эти регулировки?",
          o1: "Зеркала, сиденье, ремень безопасности.",
          o2: "Сиденье, зеркала, ремень безопасности.",
          o3: "Ремень безопасности, сиденье, зеркала.",
          o4: "Зеркала, ремень безопасности, сиденье.",
          exp: "Сначала настраивается сиденье (высота, наклон, вылет), затем зеркала заднего вида (так как их положение зависит от положения ваших глаз) и в последнюю очередь пристегивается ремень."
        },
        {
          situation: "Вы едете в тоннеле с двухсторонним движением. Машина перед вами резко останавливается из-за поломки.",
          question: "Какое ключевое правило безопасности необходимо соблюдать немедленно?",
          o1: "Я прижимаюсь как можно ближе к переднему автомобилю, чтобы освободить место сзади.",
          o2: "Я останавливаюсь на расстоянии не менее 150 метров от машины.",
          o3: "Я останавливаюсь, соблюдая безопасную дистанцию (ориентируясь по синим диодам на стене или дороге), и глушу двигатель.",
          o4: "Я немедленно еду задним ходом, чтобы выехать из тоннеля.",
          exp: "В тоннеле минимальная безопасная дистанция должна соблюдаться даже при остановке во избежание распространения огня в случае пожара. Отключение двигателя снижает концентрацию токсичных газов."
        }
      ]
    }
  }
};
