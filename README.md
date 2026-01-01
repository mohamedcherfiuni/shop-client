# Shop client

Frontend de l'application de gestion de boutiques développé avec React.

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
