const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const _id = urlParams.get("id")
console.log(id)

