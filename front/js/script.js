fetch ("http://localhost:3000/api/products")
.then((reponse) => reponse.json())
.then((data) => addproducts(data))


//altTxt: "Photo d'un canapé bleu, deux places"
//colors: (3) ['Blue', 'White', 'Black']
//description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//imageUrl: "http://localhost:3000/images/kanap01.jpeg"
//name: "Kanap Sinopé"
     //price: 1849 -Pas besoin !!!-
//_id: "107fb5b75607497b96722bda5b504926"


function addproducts(donnees) {
    const id = donnees[0]._id
    const imageUrl = donnees[0].imageUrl
    const altTxt = donnees[0].altTxt
    const name = donnees[0].name
    const description = donnees[0].description

    const image = makeImage(imageUrl,altTxt)
    const anchor = makeAnchor(id)
    const article = makeArticle()
    const h3 = makeH3(name)
    const p = makeParagraph(description)

    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    appendChildren(anchor, article)
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

 function makeArticle () {
     const article = document.createElement("article")
     return article
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





//console.log(article)
