// Mission : Afficher tous les produits, avec les infos suivantes :
// Image + Nom + Description


// Requête Get sur l'API.

fetch ("http://localhost:3000/api/products")
.then((reponse) => reponse.json())
.then((data) => addProducts(data))

// Ajout des huit objets reçus sur la page HTML.

function addProducts(data) {

    for (let i = 0; i < data.length; i++){

        const _id = data[i]._id
        const imageUrl = data[i].imageUrl
        const altTxt = data[i].altTxt
        const name = data[i].name
        const description = data[i].description
     
        const anchor = makeAnchor(_id)
        const image = makeImage(imageUrl,altTxt)
        const article = document.createElement("article")
        const h3 = makeH3(name)
        const p = makeParagraph(description)
     
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p)
        appendChildren(anchor, article)
    }
       
}

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor 
}

function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)  
 }
 
 function makeImage(imageUrl, altTxt) {
     const image = document.createElement("img")
     image.src = imageUrl
     image.alt = altTxt
     return image
 }

 function makeH3 (name) {
     const h3 = document.createElement("h3")
     h3.textcontent = name
     h3.classList.add("productName")
     return h3
 }

 function makeParagraph (description) {
     const p = document.createElement ("p")
     p.textContent = description
     p.classList.add ("productdescription")
     return p
 }



