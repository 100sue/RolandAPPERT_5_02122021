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
// Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type de données avant l’envoi à l’API. 
// En cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ.
// Recherche de tous les inputs type text et type email :

const form = document.querySelector(".cart__order__form")
const inputs = document.querySelectorAll(
  'input[type ="text"], input[type ="email"], input [type ="submit"]'
)
let firstName, lastName, address, city, email


// Vérification de la validité des champs (si les champs sont vides ou ne respectent pas la regle, message d'erreur)
// Vérification de la validité de la forme du prénom :

const firstNameChecker = (value) => {
  const cartOrderForm = document.querySelector(".cart__order__form__question ")
  const firstNameError = document.getElementById("firstNameErrorMsg")

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    cartOrderForm.classList.add("cart__order")
    firstNameError.textContent = "Le prénom doit faire entre 3 et 20 caractères"
    firstName = null

  } else if (!value.match(/^[é è¨a-z ,.'-]+$/i)) {
    cartOrderForm.classList.add(".cart__order")
    firstNameError.textContent = "Le prénom ne doit pas contenir de caractères spéciaux "
    firstName = null

  } else {
    cartOrderForm.classList.remove("cart__order")
    firstNameError.textContent = ""
    firstName = value
  }
}


// Vérification de la validité de la forme du nom :

const lastNameChecker = (value) => {
  const cartOrderFormName = document.querySelector(".cart__order__form__question ")
  const lastNameError = document.getElementById("lastNameErrorMsg")

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    cartOrderFormName.classList.add("cart__order")
    lastNameError.textContent = "Le nom doit faire entre 3 et 20 caractères"
    lastName = null

  } else if (!value.match(/^[é è¨a-z ,.'-]+$/i)) {
    cartOrderFormName.classList.add("cart__order")
    lastNameError.textContent = "Le nom  ne doit pas contenir des caractères spéciaux "
    lastName = null

  } else {
    cartOrderFormName.classList.remove("cart__order")
    lastNameError.textContent = ""
    lastName = value
  }
}

// Vérification de la validité de l'adresse :

const addressChecker = (value) => {
  const cartOrderFormAdress = document.querySelector(".cart__order__form__question ")
  const adressError = document.getElementById("addressErrorMsg")

  if (value.length > 0 && (value.length < 3 || value.length > 100)) {
    cartOrderFormAdress.classList.add("cart__order")
    adressError.textContent = "Veuillez remplir ce champ, svp"
    address = null

  } else if (!value.match(/^[ 1234567890é è¨a-z ,.'-]+$/i)) {
    cartOrderFormAdress.classList.add("cart__order")
    adressError.textContent = "L'adresse ne doit pas contenir de caractères spéciaux "
    address = null

  } else {
    cartOrderFormAdress.classList.remove("cart__order")
    adressError.textContent = ""
    address = value
  }
}

// Vérification de la validité de la ville :

const cityChecker = (value) => {
  const cartOrderFormCity = document.querySelector(".cart__order__form__question")
  const cityError = document.getElementById("cityErrorMsg")

  if (value.length > 0 && (value.length < 3 || value.length > 100)) {
    cartOrderFormCity.classList.add("cart__order")
    cityError.textContent = "Veuillez remplir ce champ svp"
    city = null

  } else if (!value.match(/^[ 1234567890é è¨a-z ,.'-]+$/i)) {
    cartOrderFormCity.classList.add("cart__order")
    cityError.textContent = "La ville ne doit pas contenir de caractères spéciaux "
    city = null

  } else {
    cartOrderFormCity.classList.remove("cart__order")
    cityError.textContent = ""
    city = value
  }
}

// Vérification de la validité de l'email :

const emailChecker = (value) => {
  const cartOrderEmail = document.querySelector(".cart__order__form__question ")
  const emailError = document.getElementById("emailErrorMsg")
  if (
    !value.match("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g")
  ) {
    emailError.textContent = "Le mail n'est pas valide"
    email = null

  } else {
    emailError.textContent = "Le mail est valide"
    email = value
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break
      case "lastName":
        lastNameChecker(e.target.value);
        break
      case "address":
        addressChecker(e.target.value);
        break
      case "city":
        cityChecker(e.target.value);
        break
      case "email":
        emailChecker(e.target.value);
        break
      default:
        null
    }
  })
})



form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (firstName && lastName && address && city && email) {
    const data = {
      firstName,
      lastName,
      address,
      city,
      email,
    }
    console.log(data)

    inputs.forEach((input) => (input.value = ""))

    firstName = null
    lastName = null
    address = null
    city = null
    email = null

    alert("formulaire validée !");
  } else {
    alert("veuillez remplir correctement les champs")
  }
})

// "Ecoute" du panier.
// Récupération des coordonnées du formulaire client.
// Construction d'un array depuis le localStorage.
// Requête post sur l'API, récupération de l'identifiant de commande dans la réponse.
// Redirection vers la page Confirmation et insertion de l'orderId dans l'url.

function postForm() {
  const btn_commander = document.getElementById("order")
  btn_commander.addEventListener("click", (event) => {
    firstName = document.getElementById("firstName")
    lastName = document.getElementById("lastName")
    address = document.getElementById("address")
    city = document.getElementById("city")
    email = document.getElementById("email")

    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split(",")[0]
        ids.push(id)
    }
// Mise en place de la forme de la requête demandée par l'API.

    const order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: ids,
    }

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        localStorage.clear()
        localStorage.setItem("orderId", data.orderId)
        document.location.href = "confirmation.html"
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message)
      })
  })
}
postForm()
