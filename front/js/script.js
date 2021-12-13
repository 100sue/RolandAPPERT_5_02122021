fetch ("http://localhost:3000/api/products")
.then((reponse) => reponse.json())
.then((data) =>  addproducts(data))
