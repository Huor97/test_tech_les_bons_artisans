![version](https://img.shields.io/badge/version-v0.1.0-blue)
![eslint](https://img.shields.io/badge/eslint-v2.4.2-%23ffa500)
![react](https://img.shields.io/badge/react-v18.2.0-blue)
![material-ui](https://img.shields.io/badge/mui%20-v11.11.1-%230000cd)
![axios](https://img.shields.io/badge/axios-v1.4.0-%23483d8b)
![nodeJS](https://img.shields.io/badge/nodeJS-v18.16.1-%2332cd32)
![express](https://img.shields.io/badge/express-v4.18.2-%23fff6e6)
![mongodb](https://img.shields.io/badge/mongodb%20-v%205.6.0-%231a6b1a)

# Test technique les bons artisans

<div style="display:flex; flex-direction: row; justify-content:space-evenly">
<div style="width: 100px">

[lien demo front end](https://test-tech-les-bons-artisans.vercel.app/)

[<img src="./client/images/page%20client%20test.png" width="100%" />](https://test-tech-les-bons-artisans.vercel.app/)

</div>

<div style="width: 100px">

[lien demo back end](https://test-tech-les-bons-artisans-api.vercel.app/phones)

[<img src="./client/images/serveur%20pages.png" width="100%" />](https://test-tech-les-bons-artisans-api.vercel.app/phones)

</div>

</div>

## Présentation générale :

Ce code vise à créer une API REST en Node.js/Express et une application Web en ReactJS liée à une base de données MongoDB. L'API permet de gérer des produits en effectuant des opérations de création, récupération, modification et suppression de données. Ce projet a été réalisé en utilisant la méthodologie MVP et a été développé en 3 jours. Une version démo en direct est disponible sur Vercel, en cliquant les écrans ou liens ci-dessus.

## Démarche MVP :

Une analyse rapide des besoins m'a montré la nécessité de gérer les stocks dans une base de données, en tenant compte des contraintes techniques imposées telles que React, Node.js, MongoDB et Material-UI. Les fonctionnalités essentielles réalisables dans le délai ont été identifiées, en tenant compte de mes connaissances en tant que développeur junior, dans le but de fournir une solution fonctionnelle. J'ai développé le code en commençant par le backend vers le frontend : installation du serveur de base de données (car j'ai changé d'ordinateur), configuration de la base, création de la structure de base de l'API, puis liaison des champs et enfin personnalisation de l'apparence des boutons. À chaque étape, j'ai vérifié le bon fonctionnement minimal.

## Idées d'améliorations :

Cette première itération pourrait être améliorée en répondant à des contraintes techniques importantes telles que l'utilisation de tokens pour éviter les conflits d'accès et l'authentification JWT. Pour améliorer l'expérience utilisateur, je prévoirais de peaufiner l'apparence, par exemple en redimensionnant les champs, en étudiant la possibilité d'intégrer le composant DataGrid de Material-UI avec des boutons sur le côté (ce composant offre des fonctions de tri et de filtrage), en ajoutant des composants stylisés pour les évaluations (par exemple, des étoiles) et en remplaçant le champ booléen par une case à cocher.
