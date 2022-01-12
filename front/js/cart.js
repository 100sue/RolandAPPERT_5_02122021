const cart = []
retrieveItemsFromCache ()
cart.forEach((item) => displayItem(item))


// Récupération de la clé ou des clefs (ajout des articles commandés précedemment)
// Parsification de la string

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
    displayTotalQuantity()
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
    itemToUpdate.quantity =  Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalPrice()
    displayTotalQuantity()
    saveNewDatoToCache(item)
}

// Récuperation des nouvelles valeurs et remplacement, des anciennes, dans le localStorage.

function saveNewDatoToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = '${item.id}-${item.color}'
    localStorage.setItem(key, dataToSave)
}

// Ajout de "supprimer".

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", deleteItem)
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
cart.splice(itemToDelete, 1)
displayTotalPrice()
displayTotalQuantity()
deleteDataFromcCache(item)
deleteArticlefromPage(item)
}

function deleteArticlefromPage(item) {
    const articleToDelete = document.querySelector(
        'article[data-id="${item.id}"][data-color="${item.color}"]'
    )
    articleToDelete.remove()

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
    const total = cart.reduce((total,item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

