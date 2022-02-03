displayOrderId()
removeAllCache()

function displayOrderId(){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.innerText = localStorage.getItem("orderId")
    console.log(localStorage.getItem("orderId"))
}

function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}