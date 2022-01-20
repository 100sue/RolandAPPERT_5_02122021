// Requête Get sur l'API, récuperation des articles.

fetch ("http://localhost:3000/api/products")
.then((reponse) => reponse.json())
.then((data) => addProducts(data))
.catch((err) => console.error(err))

// Ajout des huit objets reçus sur la page HTML, répartition des données de l'API dans le DOM.

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

// Création de l'élement "anchor (a)":

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor 
}

// Insertion de "anchor" et "article" :

function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)  
 }

 // Création de l'image :

 function makeImage(imageUrl, altTxt) {
     const image = document.createElement("img")
     image.src = imageUrl
     image.alt = altTxt
     return image
 }

// Création du titre "h3" :

 function makeH3 (name) {
     const h3 = document.createElement("h3")
     h3.textcontent = name
     h3.classList.add("productName")
     return h3
 }

// Création de la description "p" :

 function makeParagraph (description) {
     const p = document.createElement ("p")
     p.textContent = description
     p.classList.add ("productdescription")
     return p
 }



