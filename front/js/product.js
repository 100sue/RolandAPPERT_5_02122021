// Mission : Afficher le produit cliqué (en page index), ainsi que ses infos.
// Et sauvegarder le choix des inputs, de couleur et de prix, pour le panier(local storage)

// Récupération de l'id produit dans l'url.
// Et, vérification de l'url lié à l'identifiant.

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}

// Requête API sur ID produit.

fetch ("http://localhost:3000/api/products/"+id)
.then((response) => response.json())
.then((res) => handleData(res))

// Intégration des données de l'Api dans la page produit

function handleData(canap) {
    const altTxt = canap.altTxt
    const colors = canap.colors
    const description = canap.description
    const imageUrl = canap.imageUrl
    const name = canap.name
    const price = canap.price
    const _id = canap._id
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

// Création de option afin d'intégrer le choix des divers coloris proposés

function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)

        })
    }
}



// Enregistrement des données (couleur, quantité) par rapport au clic.

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 

// Récupération des options choisies pour la couleur et la quantité.
// Et, enregistrement dans le local storage.

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (isOrderInvalid (color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

function saveOrder(color, quantity) {
    const key ='${id}-${color}'
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(key, JSON.stringify(data))
}

// Message d'erreur si la couleur ou la quantité n'est pas mentionnée.

function isOrderInvalid(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Please select color and quantity")
        return true
    }
}

// Redirection vers la page Cart (panier)

function redirectToCart() {
    window.location.href = "cart.html"
}