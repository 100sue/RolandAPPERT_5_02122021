// Récupération de l'url.
// Et, vérification de l'url lié à l'identifiant.

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText
}


// Intégration des données de l'Api dans la page produit

fetch ("http://localhost:3000/api/products/"+id)
.then((response) => response.json())
.then((res) => handleData(res))

function handleData(canap) {
    const altTxt = canap.altTxt
    const colors = canap.colors
    const description = canap.description
    const imageUrl = canap.imageUrl
    const name = canap.name
    const price = canap.price
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("image")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".items__img")
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


const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    if (isOrderInvalid (color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()

}

function saveOrder (color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imgUrl: imageUrl,
        altText: altTxt
    }
    localStorage.setItem(id, JSON.stringify(data))
}

function isOrderInvalid (color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Please select color and quantity")
        return true
    }
}

function redirectToCart() {
    window.location.href = "cart.html"
}