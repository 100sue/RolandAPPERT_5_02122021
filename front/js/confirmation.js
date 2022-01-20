const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

// Récupération de l'orderId dans les Params de l'url.

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("orderId")
    return orderId
}

// Affichage du numéro de commande (orderId) sur la page confirmation.

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
    
}

// Apres confirmation et affichage du numéro de commande, 
// suppression du cache (informations de la commande) dans local storage.

function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}


// console.log(orderId)