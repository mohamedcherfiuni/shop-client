# Shop client

Frontend de l'application de gestion de boutiques développé avec React 18.

## Prérequis

- Node.js 20 LTS
- npm 10+

## Lancer l'application avec npm

A la racine du répertoire shop-client, exécuter les commandes suivantes :

npm install

pour installer les dépendances, puis :

npm start

pour lancer l'application en mode développement.

L'application sera accessible à l'adresse http://localhost:4200

## Lancer l'application avec Docker

Depuis la racine du projet principal (où se trouve docker-compose.yml), exécuter :

docker compose up

L'application frontend sera accessible à l'adresse http://localhost:4200

## Technologies utilisées

- React 18.2.0
- TypeScript 5.3.3
- React Router DOM 6.21.1
- Axios 1.6.5
- Material-UI 5.15.6
- Node.js 20 LTS

## Fonctionnalités

- Affichage de la liste des boutiques avec pagination
- Recherche Elasticsearch avec filtres
- Affichage responsive (mobile, tablette, desktop)
- Gestion des erreurs avec messages clairs
- Formatage automatique des prix en euros

## Structure du projet

- src/components : Composants React réutilisables
- src/pages : Pages principales de l'application
- src/services : Services API et utilitaires
- src/utils : Fonctions utilitaires (formatters, etc.)
- src/assets : Fichiers CSS et ressources statiques
