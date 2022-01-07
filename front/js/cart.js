const cart = []
retrieveItemsFromCache ()

cart.forEach((item) => displayItem(item))

// Récupération de la clé ou des clefs ( ajout des articles commander précedemment)
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
    displayArticle(article)
    const div = makeImage(item)
    article.appendChild(div)
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement('article')
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article

}

// création de la div et de l'image à l'intérieur.

function makeImage(item) {
    const div = document.createElement('div')
    div.classList.add("cart__item__img")
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.altxt = item.altxt
    div.appendChild(image)
    return div
}