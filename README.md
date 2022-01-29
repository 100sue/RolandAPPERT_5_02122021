### Cinquième projet du parcours développeur web chez OpenClassrooms. ###

L'objectif principal consiste en la création, du front-end d'un site d'e-commerce, en Javascript par l'utilisation d'un API préalablement fourni .


### Compétences évaluées : ###

- Interagir avec un web service avec JavaScript
- Gérer des événements JavaScript
- Valider des données issues de sources externes
- Créer un plan de test pour une application

### Technologie utilisée : ###
- Utilisation uniquement du code de JavaScript pur. 
- L'utilisation de tout framework ou librairie JavaScript - React, Angular, Vue ou jQuery, par exemple - est interdite pour ce projet.

</br>

<p align="center">
<img src= "https://user-images.githubusercontent.com/90606431/150322976-c46776fa-6492-45ae-94e4-14eccd198d93.png"/>
</p>

# Kanap #

### Cahier des charges : ###

TODO-list :

- Vérifier que les inputs sont corrects avant l'envoi au back-end.
- Teminer le plan de test fourni.

Général :

- Création d'une page (c-à-d : intégrer ces éléments dynamiquement grâce à JS et l’API) présentant tous les produits.
- Création d'une page présentant les détails  panier contenant la liste des produits présents ainsi qu'un formulaire pour effectuer l'achat.
- Création d'une page-panier contenat la liste des produits présents ainsi qu'un formulaire pour effectuer l'achat.

Qualité du code :

- Le code devra etre indenté.
- Le code devra contenir des commentaires.
- Les promesses devront être utiliséees lors des appels.
- Le code devra être accompagné d'un document planifiant de futurs tests unitaires.

Expérience utilisateur :

-  Les inputs du formulaire devront être validés avant l'envoi à l'API.

</br>
</br>

## Tester l'application web en ligne : ##

### Pour tester simplement l'application web : ### 
Rendez-vous sur :  https://100sue.github.io/RolandAPPERT_5_02122021/front/html/index.html



### Tester le site en local : ###

Prérequis :

- Node.js (version )
- NPM (version )

### Back-end : ###
Le dossier back permet de faire tourner l'api contenant les données des produits.

Installation : 
Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande npm install.
Lancement du serveur : 
Il suffit de se positionner dans le dossier backend avec un terminal et de saisir la commande node start.
Par défaut le serveur sera lancé sur le port 3000 (http://localhost:3000).

### Route API : ###

Il y a trois routes disponibles sur le serveur :

- GET /api/products/  : Permet de récupérer l'ensemble des produits disponibles.

- GET /api/products/{id}  : {id} identifiant unique d'un produit Permet de récupérer un produit par son identifiant.

- POST /api/products/order  : Envoie une commande pour l'enregistrer. 
La commande envoyée doit être au format JSON suivant :

{
  contact{
          firstName: <string>,
          laststName: <string>,
          address: <string>,
          city: <string>,
          email: <string>
         },
          products: [<string>]
 }
 



 </br>
### This is the front end and back end server for Project 5 of the Web Developer path. ### 

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
  
  
 ###  Challenges ### 
  
The web application will consist of 4 pages.

  - A home page showing (dynamically) all the articles available at the sale.
  - A “product” page which displays (dynamically) the details of the product on which the user clicked from the home page. From this page, the user can select a quantity, a     color, and add the product to his basket.
  - A “shopping cart” page. This contains several parts:

  - A summary of the products in the cart, the total price and the possibility of modify the quantity of a selected product or delete it.
  - A form for placing an order. Data from form must be correct and well formatted before being returned to the back-end. For example, no number in a first name field.

  - A “confirmation” page:

  - An order confirmation message thanking the user for his order, and indicating the order ID sent by the API.

  <p align="center">
<img src= "https://user-images.githubusercontent.com/90606431/151660985-c0a30670-7d3b-4b86-89fe-566e96a15e79.jpg" />
</p>
