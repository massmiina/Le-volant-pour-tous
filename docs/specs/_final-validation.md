# Audit Technique & Validation Finale du Système de Questions

> **Rôle** : Architecte Produit Senior & Auditeur Qualité
> **Statut** : Rapport d'Audit Critique (V1 de pré-production)

Ce document dresse un inventaire des risques d'ingénierie, des contradictions système et des opportunités d'amélioration identifiées sur la structure de la Question Bank et des moteurs de Quiz / Examen Blanc de la plateforme **Le Volant Pour Tous**.

---

## 1. Contradictions Identifiées & Résolutions

### ⚠️ Problème 1 : Désynchronisation de la progression invité
- **Description** : Un élève invité progresse sur 5 modules, s'inscrit, puis se connecte depuis un autre appareil. Si la synchronisation du `localStorage` n'est pas immédiate et atomique à la création de compte, sa progression locale est écrasée par la progression vide du cloud.
- **Résolution** : Le middleware et la page `/login` doivent intercepter la redirection de réussite d'authentification pour interroger et envoyer les données du `localStorage` au serveur *avant* de charger le Dashboard de l'élève.

### ⚠️ Problème 2 : Double source de vérité pour le texte des questions
- **Description** : Actuellement, le texte des questions de quiz est stocké dans le dictionnaire de traduction `lib/translations.ts` tandis que les images et métadonnées d'examen sont codées en dur dans `lib/examData.ts`. Si le traducteur modifie une clé ou un ID de thème sans adapter le typage dans le code TypeScript, l'application crashe au runtime.
- **Résolution** : Unifier les deux catalogues statiques dans un seul fichier JSON unifié (ex: `lib/questionBank.json`) contenant tous les champs (métadonnées, texte bilingue, réponses, explications) pour chaque question.

---

## 2. Risques Techniques & UX

### ❌ Risque UX : Complexité de l'interface bilingue sous chronomètre de 20s
- **Description** : À l'examen blanc, l'élève ne dispose que de 20 secondes pour analyser l'image de conduite, lire la question en français, lire la traduction en russe, lire les options de réponse dans les deux langues, et cocher sa réponse. Ce volume de lecture bilingue génère une surcharge cognitive et un taux d'échec artificiellement élevé.
- **Amélioration** : Ajouter un sélecteur de langue d'interface rapide (bouton à bascule d'une touche comme `Espace`) permettant à l'élève de masquer temporairement la traduction russe pour se concentrer sur l'énoncé officiel en français.

### ❌ Risque Technique : Pression sur les limites de connexion Supabase lors de la synchronisation
- **Description** : Si la route de synchronisation effectue des appels séquentiels en base de données pour insérer chaque score de quiz individuellement, cela peut saturer le pool de connexions SQL de PostgreSQL (surtout lors de la première connexion d'un utilisateur avec beaucoup de progression locale).
- **Amélioration** : Implémenter une API d'écriture en bloc (`Prisma createMany` ou mise à jour groupée) pour sauvegarder l'intégralité de la progression de l'élève en une seule transaction SQL.

---

## 3. Recommandations de Simplifications V1

### 💡 Recommandation 1 : Pas d'API de Questions Dynamique
- **Justification** : Pour la présentation et la V1, l'utilisation exclusive de fichiers JSON/TypeScript statiques locaux est à privilégier. Cela élimine la nécessité de développer des endpoints de gestion CRUD de questions et des interfaces d'administration sécurisées, réduisant ainsi la surface d'attaque et la latence à 0ms.

### 💡 Recommandation 2 : Chronomètre purement client (sans ping serveur)
- **Justification** : Le chronomètre de 20 secondes doit être calculé et rendu exclusivement côté navigateur. Un contrôle de temps côté serveur à chaque question ajouterait une latence réseau incompatible avec les 20 secondes réglementaires, en pénalisant les utilisateurs ayant des connexions instables.
