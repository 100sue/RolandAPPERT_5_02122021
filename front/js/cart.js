const cart = []
retrieveItemsFromCache ()
cart.forEach((item) => displayItem(item))

// Formulaire
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))


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
deleteDatafromCache(item)
deleteArticlefromPage(item)
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
// Prevent-default : évite le rechargement de la page qui vide les champs.
// Vérification de la validité des champs (si les champs sont vides ou email non valide, il stoppe)
// Récupération des données client.
// Requête post sur l'API, récupération de l'identifiant de commande dans la réponse.
// Redirection vers la page Confirmation et insertion de l'orderId dans l'url.

function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Please, select items to buy")
        return
    }
    if (isFormInvalid()) return
    if (isFirstNameInvalid()) return
    if (isLastNameInvalid()) return
    if (isAddressInvalid()) return
    if (isCityInvalid()) return
    if (isEmailInvalid()) return

    const form = document.querySelector(".cart__order__form")
    const body = makeRequestBody()
    fetch ("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        }
    }
    )
    .then((res => res.json()))
    .then((data) => {
        const orderId = data.orderId
        window.location.href = "../html/confirmation.html?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}


// Vérification de la validité des champs du formulaire :
// si form est invalide (champ vide -non rempli -), retourne true.
// si form est valide, retourne false.

function isFormInvalid() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Please fill all the fields")
            return true
        }
        return false
    })
}

// Vérification de la validité de la forme du prénom :

function isFirstNameInvalid() {
    const firstName = document.querySelector("#firstName")
    const regex = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/
    if (regex.test(firstName) === false) {
        alert ("Please enter valid firstName")
        return true
    }
    return false
}

// Vérification de la validité de la forme du nom :

function isLastNameInvalid() {
    const lastName = document.querySelector("#lastName")
    const regex = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/
    if (regex.test(lastName) === false) {
        alert ("Please enter valid lastName")
        return true
    }
    return false
}
  
// Vérification de la validité de l'adresse :

function isAddressInvalid() {
    const address = document.querySelector("#address")
    const regex = /\d{2}[ ]?\d{3}$/
    if (regex.test(address) === false) {
        alert ("Please enter valid address")
        return true
    }
    return false
}

// Vérification de la validité de la ville :

function isCityInvalid() {
    const city = document.querySelector("#city")
    const regex = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,10}$/
    if (regex.test(city) === false) {
        alert ("Please enter valid city")
        return true
    }
    return false
}

// Vérification de la validité de l'email :
// si Email est invalide , renvoie true.
// si Email est valide (repondant aux formes d'email valide), renvoie false.

function isEmailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert ("Please enter valid email")
        return true
    }
    return false
}

// Récuperation des coordonnées du formulaire client.
// Mise en place de la forme de la requête demandée par l'API.

function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName= form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsfromCache()
    }
    return body
}

// Récuperation des informations de la commande dans le localStorage.
// Construction d'une Array.

function getIdsfromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split(",")[0]
        ids.push(id)
    }
    return ids
}

