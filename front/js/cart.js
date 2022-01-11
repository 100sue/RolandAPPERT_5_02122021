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



function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemContent = makeCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayTotalPrice(item)
}

function displayTotalPrice(item) {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total

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
// création de la imageDiv et de l'image à l'intérieur.

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

function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__settings")
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings)
    return settings
}

function addDeleteToSettings(settings) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
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
    quantity.appendChild(input)
    settings.appendChild(quantity)
}