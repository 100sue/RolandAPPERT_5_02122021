const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()


function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

// Affichage du numéro de commande sur confirmation.

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

// Apres confirmation, suppression du cache (informations de la commande) dans local storage.

function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}