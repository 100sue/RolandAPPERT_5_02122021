const cart = []
retrieveItemsFromCache ()
cart.forEach((item) => displayItem(item))

// Récupération de la clé ou des clefs (ajout des articles commandés précedemment)
// Parsification de la string puis affichage sur la page

function retrieveItemsFromCache () {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

// Intégration des données dans la page Cart (panier)

function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemContent = makeCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayTotalQuantity(item)
    displayTotalPrice()
}

// Mis en place de l'article

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}
// Création de l'article

function makeArticle(item) {
    const article = document.createElement('article')
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
// création de la div et de l'image à l'intérieur.

function makeImageDiv(item) {
    const imageDiv = document.createElement('imageDiv')
    imageDiv.classList.add("cart__item__img")
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.altxt = item.altxt
    imageDiv.appendChild(image)
    return imageDiv
}


// Mis en place de cartItemContent
// création des élements de description (nom, couleur, prix)

function makeCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)
    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

function makeDescription(item) {
    const imageDiv = document.createElement("imageDiv")
    imageDiv.classList.add("cart__item__content")
    const description = document.createElement("description")
    description.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p2")
    p2.textContent = item.price + "€"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    imageDiv.appendChild(description)
    return description
}

// Ajout de la case quantité des articles selon les articles commandés.
// Ajout fonction/bouton "supprimer"

function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__settings")
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function addQuantityToSettings (settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté :"
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updateTotalPriceAndQuantity(item.id, input.value, item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Quand changement des quantités sur panier, récuperation de la nouvelle quantité.
// Et, actualisation sur la page panier.

function updateTotalPriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id )
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalPrice()
    displayTotalQuantity()
    saveNewDataToCache(item)
}

// Ajout du total des articles (quantité et prix).
// total prix = (prix * quantité) pour chaque article commandé.

function displayTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

// Total quantité des articles commandés (addition de la quantité d'article)

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

// Récuperation des nouvelles valeurs et remplacement des anciennes, dans le localStorage.

function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = [item.id, item.color]
    localStorage.setItem(key, dataToSave)
}

// Ajout de "supprimer".

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

// Suppression de l'objet "article" du DOM et des "cookies" dans localStorage :
// Et, actualisation de la page.

function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
        )
cart.splice(itemToDelete, 1)
displayTotalPrice()
displayTotalQuantity()
deleteArticlefromPage(item)
deleteDatafromCache(item)
}

// Suppression des informations dans le local Storage .

function deleteDatafromCache(item) {
    const key = [item.id, item.color]
    localStorage.removeItem(key)
}

// Suppression de l'article de la page panier.

function deleteArticlefromPage(item) {
    const articleToDelete = document.querySelector("article")
    articleToDelete.remove(item)
}



// Formulaire :
// submitBtn cible le bouton commander :

const submitBtn = document.querySelector("#order")

// Ajout des Regex :

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
const addressRegex = /^[A-Za-z0-9\s]{5,50}$/
const cityRegex = /^[A-Za-z\s]{5,50}$/


// submitForm envoie le formulaire.
// e.preventDefault() permet d'éviter le comportement par defaut.
// Initialisation variable check à true, afin  de vérifier si l'utilisation à bien rempli le formulaire.

// La fonction checkInput permet de verifier les regex, et dans le cas ou l'input ne serait pas correct on affiche un message d'erreur.
// Avec checkInput on cible tous les éléments dont on aura besoin puis on applique les regex via .match et des conditions if / else.

// Puis la Fonction postApi va permetre de vérifier si check === true alors on enverra le formulaire.
// On Fetch l'api avec la méthode POST qui permet d'envoyer les données au serveur.
// Cela nous envoie sur la page confirmation. Attention, si les inputs ne sont pas remplis correctement (voir variable check), cela ne nous enverra pas sur la page confirmation.
// La fonction requestBody récupère les valeurs entrées dans les inputs. Boucle à l'interieur et donne à la variable idProducts, les id du produit.
// On créer aussi l'objet contact dans lequel on entre les données des inputs, et enfin un products avec l'id des produits récupérer dans la boucle.

function submitForm (e){
  e.preventDefault()
  let check = true

  function checkInput (){
  const prenom = document.getElementById('firstName')
  const prenomErreur = document.getElementById('firstNameErrorMsg')
  const nom = document.getElementById('lastName')
  const nomErreur = document.getElementById('lastNameErrorMsg')
  const adresse = document.getElementById('address')
  const adresseErreur = document.getElementById('addressErrorMsg')
  const ville = document.getElementById('city')
  const villeErreur = document.getElementById('cityErrorMsg')
  const mail = document.getElementById('email')
  const mailErreur = document.getElementById('emailErrorMsg')
  const msgErreur = document.querySelectorAll('.cart__order__form__question >  p')
  const prenomValue = prenom.value.trim()
  const nomValue = nom.value.trim()
  const adresseValue = adresse.value.trim()
  const villeValue = ville.value.trim()
  const mailValue = mail.value.trim()
  
    if(mailValue.match(emailRegex)){
      mailErreur.innerText = ""
    }else{
      check = false
      mailErreur.innerText = "Veuillez entrer une  adresse mail valide."
    }
    if(adresseValue.match(addressRegex)){
      adresseErreur.innerText=""
    }else{
      check = false
      adresseErreur.innerText="Veuillez entrer une adresse valide."
    }
    if(villeValue.match(cityRegex)){
      villeErreur.innerText = ""
    }else{
      check = false
      villeErreur.innerText = "Veuillez entrer un nom de ville correct."
    }
    if(prenomValue.length < 3 || prenomValue.length > 15){
      check = false
      prenomErreur.innerText = "Le prénom doit contenir entre 3 et 15 caractères"
    }else if (prenomValue.length >= 3){
      prenomErreur.innerText = ""
    }
    if(nomValue.length < 3 || nomValue.length > 35){
      check = false
      nomErreur.innerText = "Le nom doit contenir entre 3 et 15 caractères"
    }else if(nomValue.length >= 3){
      nomErreur.innerText = ""
    }
    
  }
  
  checkInput()

  function postApi(){
    if(check === true){

      if(cart.length === 0){
        alert ("Veuillez choisir un produit")
        return
      }
      alert("formulaire validée !")
     
      const body = requestBody()
   
      fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type" : "application/json",
        }
      })
    
      .then((res) => res.json())
    
      .then((data) => {
        const orderId = data.orderId
        window.location.href = "../html/confirmation.html?orderId=" + orderId
        return console.log(data)
      })
    
      .catch((err) => alert ("Erreur d'envoi du formulaire. Veuillez réessayer plus tard."))
    }
  }
  
  postApi()

 
  function requestBody(){
    const firstNameInput = document.querySelector('#firstName')
    const firstName = firstNameInput.value
    const lastNameInput = document.querySelector('#lastName')
    const lastName = lastNameInput.value
    const addressInput = document.querySelector('#address')
    const address = addressInput.value
    const cityInput = document.querySelector('#city')
    const city = cityInput.value
    const emailInput = document.querySelector('#email')
    const email = emailInput.value
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split(",")[0]
        ids.push(id)
  
    }
    const body = { 
      contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products : ids,
    }
    return body
  }
}

// Appel de la fonction.

submitBtn.addEventListener("click", (e) => submitForm(e))