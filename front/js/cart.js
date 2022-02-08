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
// Ajout des Regex

let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')
let NameRegExp = new RegExp("^[a-zA-Z ,.'-]+$")
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+")


// "Ecoute" de la modification du prénom, nom, de l'adresse, de la ville, et de l'email.
// Puis, Vérification de la validité du prénom, du nom, de l'adresse, de la ville, et de l'email.
// Ou message d'erreur.
  
function getForm() {
  let form = document.querySelector(".cart__order__form")

  form.firstName.addEventListener('change', function(){
      validFirstName(this)
  })

  form.lastName.addEventListener('change', function() {
      validLastName(this)
  })

  form.address.addEventListener('change', function() {
      validAddress(this)
  })

  form.city.addEventListener('change', function() {
      validCity(this)
  })

  form.email.addEventListener('change', function() {
      validEmail(this)
  })


  const validFirstName = function(inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling
      if (NameRegExp.test(inputFirstName.value)) {
          firstNameErrorMsg.innerHTML = ''
      } else {
          firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  const validLastName = function(inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling
      if (NameRegExp.test(inputLastName.value)) {
          lastNameErrorMsg.innerHTML = ''
      } else {
          lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  const validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling
      if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = ''
      } else {
          addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  const validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling
      if (NameRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = ''
      } else {
          cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
      }
  }

  const validEmail = function(inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling
      const buttonCommande = document.getElementById("order")
      if (emailRegExp.test(inputEmail.value)) {
          emailErrorMsg.innerHTML = ''
      } else {
          emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.'
      }
  }
  }

  getForm()

// "Ecoute" du panier.
// Récupération des coordonnées du formulaire client.
// Construction d'un array depuis le localStorage.
// Requête post sur l'API, récupération de l'identifiant de commande dans la réponse.
// Redirection vers la page Confirmation

function postForm(){
      const buttonCommande = document.getElementById("order")
      let inputName = document.getElementById('firstName')
      let inputLastName = document.getElementById('lastName')
      let inputAdress = document.getElementById('address')
      let inputCity = document.getElementById('city')
      let inputEmail = document.getElementById('email')
      buttonCommande.addEventListener('click', function(e){
      e.preventDefault()
      if (cart.length === 0) {
        alert("Veuillez choisir un produit")
        return
    }
      if (NameRegExp.test(inputName.value) && NameRegExp.test(inputLastName.value) && addressRegExp.test(inputAdress.value) &&
          NameRegExp.test(inputCity.value) &&  emailRegExp.test(inputEmail.value)){ 

              const numberOfProducts = localStorage.length
                  const ids = []
                  for (let i = 0; i < numberOfProducts; i++) {
                      const key = localStorage.key(i)
                      const id = key.split(",")[0]
                      ids.push(id)
                  }

              const order = {
                  contact : {
                      firstName: inputName.value,
                      lastName: inputLastName.value,
                      address: inputAdress.value,
                      city: inputCity.value,
                      email: inputMail.value,
                  },
                  products: ids,
              } 

              console.log(order)
              console.log(NameRegExp.test(inputName.value))

              const options = {
                  method : 'POST',
                  body : JSON.stringify(order),
                  headers :{
                      'Accept' : 'application/json',
                      'Content-Type' : 'application/json'
                  },
                  
              }

              fetch("http://localhost:3000/api/products/order", options)
              .then(function(res){
                  if(res.ok){
                      return res.json()
                  }
              })
              .then(function(data){
                  console.log(data)
                  localStorage.clear()
                  localStorage.setItem("orderId", data.orderId)
                  document.location.href = "confirmation.html"
              })
              .catch((e)=>{
                alert("Problème avec fetch : " + err.message)
              })
          }
      })

}

postForm()


